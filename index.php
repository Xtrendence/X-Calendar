<?php
	include "./assets/icons.php";
	include "./scripts/detect_device.php";
	if($user_agent_mobile) {
		$device = "mobile";
	}
	else {
		$device = "desktop";
	}
?>
<!-- Copyright <?php echo date('Y'); ?> © Xtrendence -->
<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
		<meta name="theme-color" content="#1b1b1b">
		<link rel="stylesheet" href="./source/css/style.css?<?php echo time(); ?>">
		<link rel="stylesheet" href="./source/css/resize.css?<?php echo time(); ?>">
		<script src="./source/js/jquery.js"></script>
		<script src="./source/js/main.js?<?php echo time(); ?>"></script>
		<title>X:/Calendar</title>
	</head>
	
	<body id="<?php echo $device; ?>">
		<div class="navbar">
			<div class="left">
				<div class="navbar-section month">
					<button class="navbar-item navbar-button prev last-month navigate month"><?php echo $arrow_icon; ?></button>
					<button class="navbar-item navbar-label month">Month</button>
					<button class="navbar-item navbar-button next next-month navigate month"><?php echo $arrow_icon; ?></button>
				</div>
				<div class="navbar-section year">
					<button class="navbar-item navbar-button prev last-year navigate year"><?php echo $arrow_icon; ?></button>
					<button class="navbar-item navbar-label year">Year</button>
					<button class="navbar-item navbar-button next next-year navigate year"><?php echo $arrow_icon; ?></button>
				</div>
			</div>
			<div class="right">
				<button class="navbar-item navbar-button today">Today</button>
				<button class="navbar-item navbar-button today-icon"><?php echo $target_icon; ?></button>
				<?php echo $menu_icon; ?>
			</div>
		</div>
		<div class="calendar-wrapper">
			
		</div>
		<?php include "./assets/ui_elements.php"; ?>
	</body>
</html>