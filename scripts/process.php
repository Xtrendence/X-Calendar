<?php	
	$action = $_POST['action'];
	$events_file = "../source/cfg/events.config";
	$account_file = "../source/cfg/account.config";
	$events = json_decode(file_get_contents($events_file), true);
	$account = json_decode(file_get_contents($account_file), true);
	if($action == "save-event") {
		$date = $_POST['date'];
		$title = $_POST['title'];
		$details = $_POST['details'];
		if(!empty(trim($title))) {
			$events[$date] = array("title" => $title, "details" => $details, "status" => "unfinished");
			file_put_contents($events_file, json_encode($events));
		}
		else {
			echo "Please provide at least a title for this event.";
		}
	}
	if($action == "get-events") {
		$month = $_POST['month'];
		$year = $_POST['year'];
		$dates = array();
		// Ensure only the events for the month the user is currently viewing are outputted to avoid parsing unnecessary data.
		foreach($events as $date => $content) {
			$parts = explode("-", $date);
			$m = $parts[1];
			$y = $parts[2];
			if($m == $month && $y == $year) {
				$dates[$date] = $content;
			}
		}
		echo json_encode($dates);
	}
	if($action == "view-event") {
		$date = $_POST['date'];
		$event = $events[$date];
		echo json_encode($event);
	}
	if($action == "delete-event") {
		$date = $_POST['date'];
		unset($events[$date]);
		file_put_contents($events_file, json_encode($events));
	}
	if($action == "mark-event") {
		$date = $_POST['date'];
		$status = $_POST['status'];
		if($status == "finished") {
			$mark = "finished";
		}
		elseif($status == "unfinished") {
			$mark = "unfinished";
		}
		$events[$date]['status'] = $mark;
		file_put_contents($events_file, json_encode($events));
	}
	if($action == "get-all-events") {
		$this_year = date("Y");
		$next_year = $this_year + 1;
		$dates = array();
		foreach($events as $date => $content) {
			$parts = explode("-", $date);
			$m = $parts[1];
			$y = $parts[2];
			if($y == $this_year or $y == $next_year) {
				$dates[$date] = $content;
			}
		}
		$sorted = array();
		foreach($dates as $date => $content) {
			$sorted[strtotime($date)] = $content;
		}
		ksort($sorted);
		$output = array();
		foreach($sorted as $date => $content) {
			$output[date("j-n-Y", $date)] = $content;
		}
		echo json_encode(array_reverse($output));
	}
?>