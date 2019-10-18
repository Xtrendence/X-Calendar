<div class="month-menu">
	<button class="menu-item month" data-date="1" id="menu-month-1">January</button>
	<button class="menu-item month" data-date="2" id="menu-month-2">February</button>
	<button class="menu-item month" data-date="3" id="menu-month-3">March</button>
	<button class="menu-item month" data-date="4" id="menu-month-4">April</button>
	<button class="menu-item month" data-date="5" id="menu-month-5">May</button>
	<button class="menu-item month" data-date="6" id="menu-month-6">June</button>
	<button class="menu-item month" data-date="7" id="menu-month-7">July</button>
	<button class="menu-item month" data-date="8" id="menu-month-8">August</button>
	<button class="menu-item month" data-date="9" id="menu-month-9">September</button>
	<button class="menu-item month" data-date="10" id="menu-month-10">October</button>
	<button class="menu-item month" data-date="11" id="menu-month-11">November</button>
	<button class="menu-item month" data-date="12" id="menu-month-12">December</button>
</div>
<div class="calendar-menu">
	<button class="preview-date day">Day</button>
	<button class="preview-date month">Month</button>
	<button class="preview-date year">Year</button>
	<input type="text" class="menu-input title" placeholder="Event Title...">
	<textarea class="menu-textarea details" placeholder="Event details..."></textarea>
	<button class="menu-button half cancel">Cancel</button>
	<button class="menu-button half confirm">Confirm</button>
	<button class="menu-button status">Status</button>
	<button class="menu-button delete">Delete</button>
</div>
<div class="main-menu">
	<button class="main-menu-button events">Event List</button>
	<div class="section account">
		<button class="main-menu-item">Account</button>
		<button class="main-menu-label">Change Username</button>
		<input type="text" class="main-menu-input username" placeholder="New Username...">
		<input type="password" class="main-menu-input password" placeholder="Password...">
		<button class="main-menu-button change-username">Confirm</button>
		<button class="main-menu-label">Change Password</button>
		<input type="password" class="main-menu-input current-password" placeholder="Current Password...">
		<input type="password" class="main-menu-input new-password" placeholder="New Password...">
		<input type="password" class="main-menu-input repeat-password" placeholder="Repeat Password...">
		<button class="main-menu-button change-password">Confirm</button>
	</div>
	<div class="section actions">
		<button class="main-menu-item">Actions</button>
		<button class="main-menu-button delete-all-events">Delete All Events</button>
		<button class="main-menu-button mark-all-as-finished">Mark All As Finished</button>
	</div>
</div>
<div class="event-list"></div>
<div class="notification-area"></div>