$(document).ready(function() {
	initialize();
	setInterval(set_current_day, 10000);
	$(".navigate").on("click", function() {
		if($(this).hasClass("month")) {
			var month = $(this).attr("data-date");
			var year = $(".navbar-label.year").attr("data-date");
		}
		else {
			var month = $(".navbar-label.month").attr("data-date");
			var year = $(this).attr("data-date");
		}
		var active_month = $(".navbar-label.month").attr("data-date");
		var active_year = $(".navbar-label.year").attr("data-date");
		if(active_month == 12 && $(this).hasClass("next") && $(this).hasClass("month")) {
			var month = 1;
			var year = parseInt(active_year) + 1;
		}
		else if(active_month == 1 && $(this).hasClass("prev") && $(this).hasClass("month")) {
			var month = 12;
			var year = parseInt(active_year) - 1;
		}
		navigate(month, year);
	});
	$(".menu-item.month").on("click", function() {
		var month = $(this).attr("data-date");
		var year = $(".navbar-label.year").attr("data-date");
		navigate(month, year);
	});
	$(".navbar-button.today, .navbar-button.today-icon").on("click", initialize);
	$(".navbar-label.month").on("click", function() {
		if($(this).hasClass("active")) {
			hide_month_menu();
		}
		else {
			$(this).addClass("active");
			$(".month-menu").show().css("height", "275px");
		}
	});
	$(".navbar .menu-icon").on("click", function() {
		if($(this).hasClass("active")) {
			hide_main_menu();
		}
		else {
			$(this).addClass("active");
			$(".main-menu").show().animate({right:"0"}, 250);
		}
	});
	$(".calendar-wrapper").mouseup(function(e) {
		hide_month_menu();
		hide_main_menu();
		hide_event_list();
		if(!$(".day-block").is(e.target) && $(".day-block").has(e.target).length === 0) {
			hide_calendar_menu();
		}
	});
	$(".navbar").mouseup(function(e) {
		hide_calendar_menu();
		if(!$(".navbar .menu-icon").is(e.target) && $(".navbar .menu-icon").has(e.target).length === 0) {
			hide_main_menu();
		}
		if(!$(".navbar-label.month").is(e.target) && $(".navbar-label.month").has(e.target).length === 0) {
			hide_month_menu();
		}
		if(!$(".navbar-button.today").is(e.target) && $(".navbar-button.today").has(e.target).length === 0) {
			hide_event_list();
		}
	});
	$(".calendar-wrapper").delegate(".day-block", "click", function() {
		if($(this).hasClass("opened")) {
			hide_calendar_menu();
		}
		else {
			$(".calendar-menu").addClass("visible").show().animate({right:"15px"}, 250).attr("id", $(this).attr("id"));
			$(".day-block").removeClass("opened");
			$(this).addClass("opened");
			var day = $(this).attr("data-day");
			var month = $(this).attr("data-month");
			var year = $(this).attr("data-year");
			var date = $(this).attr("id");
			view_event(date);
			$(".preview-date.day").html(day);
			$(".preview-date.month").html(months[month]);
			$(".preview-date.year").html(year);
			$(".calendar-menu .menu-button.confirm").attr("id", date);
		}
	});
	$(".calendar-menu .menu-button.cancel").on("click", function() {
		hide_calendar_menu();
	});
	$(".calendar-menu .menu-button.confirm").on("click", function() {
		var date = $(this).attr("id");
		var title = $(".calendar-menu .menu-input.title").val();
		var details = $(".calendar-menu .menu-textarea.details").val();
		save_event(date, title, details);
	});
	$(".calendar-menu").keydown(function(e) {
		if(e.which == 13 && !$(".calendar-menu .menu-textarea").is(":focus")) {
			$(".calendar-menu .menu-button.confirm").trigger("click");
		}
	});
	$(".calendar-menu .menu-button.delete").on("click", function() {
		var date = $(".calendar-menu .menu-button.confirm").attr("id");
		delete_event(date);
	});
	$(".calendar-menu .menu-button.status").on("click", function() {
		var date = $(".calendar-menu .menu-button.confirm").attr("id");
		var status = $(this).attr("id");
		if(status == "unfinished") {
			mark_event(date, true);
		}
		else if(status == "finished") {
			mark_event(date, false);
		}
	});
	$(".main-menu .events").on("click", function() {
		if($(this).hasClass("active")) {
			hide_event_list();
		}
		else {
			populate_event_list();
			$(this).addClass("active");
			hide_main_menu();
			$(".event-list").show().animate({right:"0"}, 250);
		}
	});
	$(".main-menu .change-username").on("click", function() {
		var password = $(".main-menu .password").val();
		var username = $(".main-menu .username").val();
		$.ajax({
			type: "POST",
			url: "./scripts/process.php",
			data: { action: "change-username", password: password, username: username },
			success: function(data) {
				if(data.length == 0) {
					location.reload();
				}
				else {
					notify("Error", data, "rgb(245,75,50)", 5000);
				}
			}
		});
	});
	$(".main-menu .change-password").on("click", function() {
		var current_password = $(".main-menu .current-password").val();
		var new_password = $(".main-menu .new-password").val();
		var repeat_password = $(".main-menu .repeat-password").val();
		$.ajax({
			type: "POST",
			url: "./scripts/process.php",
			data: { action: "change-password", current_password: current_password, new_password: new_password, repeat_password: repeat_password },
			success: function(data) {
				if(data.length == 0) {
					location.reload();
				}
				else {
					notify("Error", data, "rgb(245,75,50)", 5000);
				}
			}
		});
	});
	$(".event-list").delegate(".event-view", "click", function() {
		var month = $(this).attr("data-month");
		var year = $(this).attr("data-year");
		navigate(month, year);
	});
	function view_event(date) {
		$.ajax({
			type: "POST",
			data: { action: "view-event", date: date },
			url: "./scripts/process.php",
			success: function(data) {
				if(typeof data !== "undefined" && data != "null" && data.length) {
					var event = JSON.parse(data);
					$(".calendar-menu").css("height", "490px");
					$(".calendar-menu .menu-input.title").val(event['title']);
					$(".calendar-menu .menu-textarea.details").val(event['details']);
					$(".calendar-menu .menu-button.delete").show();
					if(event['status'] == "unfinished") {
						var status_text = "Mark As Finished";
					}
					else if(event['status'] == "finished") {
						var status_text = "Mark As Unfinished";
					}
					$(".calendar-menu .menu-button.status").show().attr("id", event['status']).html(status_text);
				}
				else {
					$(".calendar-menu").css("height", "370px");
					$(".calendar-menu .menu-input.title").val("");
					$(".calendar-menu .menu-textarea.details").val("");
					$(".calendar-menu .menu-button.delete").hide();
					$(".calendar-menu .menu-button.status").hide().attr("id", "").html("");
				}
			}
		});
	}
	function save_event(date, title, details) {
		$.ajax({
			type: "POST",
			data: { action: "save-event", date: date, title: title, details: details },
			url: "./scripts/process.php",
			success: function(data) {
				if(data.length == 0) {
					hide_calendar_menu();
					refresh();
				}
				else {
					notify("Error", data, "rgb(245,75,50)", 5000);
				}
			}
		});
	}
	function delete_event(date) {
		$.ajax({
			type: "POST",
			data: { action: "delete-event", date: date },
			url: "./scripts/process.php",
			success: function() {
				refresh();
				hide_calendar_menu();
			}
		});
	}
	function mark_event(date, finished) {
		if(finished) {
			var status = "finished";
		}
		else {
			var status = "unfinished";
		}
		$.ajax({
			type: "POST",
			data: { action: "mark-event", date: date, status: status },
			url: "./scripts/process.php",
			success: function() {
				refresh();
				hide_calendar_menu();
			}
		});
	}
	function get_events(month, year) {
		$.ajax({
			type: "POST",
			data: { action: "get-events", month: month, year: year },
			url: "./scripts/process.php",
			success: function(data) {
				var events = JSON.parse(data);
				$.each(events, function(key, value) {
					$("#" + key).addClass("event").addClass(events[key]['status']);
				});
			}
		});
	}
	function populate_event_list() {
		$.ajax({
			type: "POST",
			data: { action: "get-all-events" },
			url: "./scripts/process.php",
			success: function(data) {
				if(data.length > 2) {
					var events = JSON.parse(data);
					$(".event-list").html("");
					var m_y = [];
					$.each(events, function(key, value) {
						var parts = key.split("-");
						var day = parts[0];
						var month = parts[1];
						var year = parts[2];
						if(!$(".event-date." + month + "-" + year).length) {
							$(".event-list").append('<button class="event-date ' + month + "-" + year + '">' + months[month] + " " + year + '</button><button class="event-view" data-month="' + month + '" data-year="' + year + '">View</button>');
						}
						if(events[key]['details'].length == 0) {
							var height = "18px";
						}
						else {
							var temp = $("<textarea>");
							$("body").append(temp);
							temp.html(events[key]['details']);
							var scroll_height = temp.prop("scrollHeight") + 20;
							var height = scroll_height + "px";
							temp.remove();
							if(scroll_height > 125) {
								var height = "125px";
							}
						}
						$(".event-list").append('<div class="event-item" id="' + key + '"><button class="event-day">' + nth(day) + '</button><button class="event-title">' + events[key]['title'] + '</button><button class="event-status ' + events[key]['status'] + '">' + ucfirst(events[key]['status']) + '</button><textarea class="event-details" placeholder="No additional details..." style="height:' + height + ';" readonly>' + events[key]['details'] + '</textarea></div>');
					});
				}
				else {
					$(".event-list").html('<button class="event-date" style="width:100%;">No events found...</button>');
				}
			}
		});
	}
	function hide_calendar_menu() {
		if($(".calendar-menu").is(":visible")) {
			$(".day-block").removeClass("opened");
			$(".calendar-menu").removeClass("visible").animate({right:"-315px"}, 250).attr("id", "");
			setTimeout(function() {
				$(".calendar-menu").removeAttr("style");
			}, 300);
		}
	}
	function hide_month_menu() {
		if($(".month-menu").is(":visible")) {
			$(".navbar-label.month").removeClass("active");
			$(".month-menu").css("height", "0");
			setTimeout(function() {
				$(".month-menu").removeAttr("style");
			}, 300);
		}
	}
	function hide_main_menu() {
		if($(".main-menu").is(":visible")) {
			$(".navbar .menu-icon").removeClass("active");
			$(".main-menu").animate({right:"-315px"}, 250);
			setTimeout(function() {
				$(".main-menu").removeAttr("style");
			}, 300);
		}
	}
	function hide_event_list() {
		if($(".event-list").is(":visible")) {
			$(".main-menu .events").removeClass("active");
			$(".event-list").animate({right:"-100vw"}, 250);
			setTimeout(function() {
				$(".event-list").removeAttr("style");
			}, 300);
		}
	}
	function initialize() {
		empty();
		months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		set_current_day();
		navigate(current_month, current_year);
		var use_account = false;
		if(!use_account) {
			$(".main-menu .account").hide();
		}
		var enable_actions = false;
		if(!enable_actions) {
			$(".main-menu .actions").hide();
		}
	}
	function refresh() {
		var month = $(".navbar-label.month").attr("data-date");
		var year = $(".navbar-label.year").attr("data-date");
		navigate(month, year);
	}
	function navigate(month, year) {
		var month = parseInt(month);
		var year = parseInt(year);
		empty();
		var month_name = months[month];
		var days = days_in_month(month, year);
		for(i = 1; i < days + 1; i++) {
			$(".calendar-wrapper").append('<div class="day-block-wrapper"><button class="day-block ' + odd_or_even(i) + '" id="' + i + '-' + month + '-' + year + '" data-day="' + i + '" data-month="' + month + '" data-year="' + year + '">' + i + '</button></div>');
		}
		set_current_day();
		get_events(month, year);
		$(".navbar-label.month").html(month_name).attr("data-date", month);
		$(".navbar-label.year").html(year).attr("data-date", year);
		$(".menu-item.month").removeClass("active");
		$("#menu-month-" + month).addClass("active");
		$(".last-month").attr("data-date", month - 1);
		$(".next-month").attr("data-date", month + 1);
		$(".last-year").attr("data-date", year - 1);
		$(".next-year").attr("data-date", year + 1);
	}
	function empty() {
		$(".calendar-wrapper").html("");
	}
	function set_current_day() {
		current_date = new Date();
		current_month = current_date.getMonth() + 1;
		current_year = current_date.getFullYear();
		current_day =current_date.getDate();
		$("#" + current_day + "-" + current_month + "-" + current_year).addClass("current");
	}
	function odd_or_even(number) {
		if(number % 2 == 0) {
			return "even";
		}
		else {
			return "odd";
		}
	}
	function nth(n) {
		return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
	}
	function remove_duplicates(array) {
		return array.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
	} 
	function ucfirst(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	function days_in_month(month, year) {
		// If the month is September, April, June, or November, return 30.
		if(/9|4|6|11/.test(month)) {
			return 30;
		}
		// If the month isn't February, return 31 days.
		if(month != 2) {
			return 31;
		} 
		// If the month is February and it's a leap year, return 29.
		if((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
			return 29;
		}
		// Otherwise, return 28.
		return 28;
	}
	function notify(title, description, color, duration) {
		var build = $('<div class="notification-wrapper noselect"><div class="notification-title-wrapper"><span class="notification-title">' + title + '</span></div><div class="notification-description-wrapper"><span class="notification-description">' + description + '</span></div></div>');
		$(".notification-area").show().append(build);
		$(build).show().css({"left":"-600px","background":color}).animate({left: 0}, 400);
		setTimeout(function() {
			$(build).animate({left: -600}, 400);
			setTimeout(function() {
				$(build).remove();
				if($(".notification-area").html().length == 0) {
					$(".notification-area").hide();
				}
			}, 400);
		}, duration);
	}
});