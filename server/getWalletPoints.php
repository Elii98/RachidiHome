<?php
include "connect.php";

$userid = get_post('userid');
$jwt = get_post('jwt');
$check = check_login($userid, $jwt);
if (!$check) die();

$q = "SELECT walletpoints FROM users WHERE id = '$userid'";
$points = sq_array($q);
$points = !empty($points) ? $points[0]['walletpoints'] : 0;

$q = "SELECT id, wallet_points, DATE_FORMAT(in_date, '%Y-%M-%D %h:%m %p') 'in_date' FROM user_wallet WHERE user_id = '$userid' ORDER BY id DESC";
$history = sq_array($q);

ret_json([
	'points' => $points,
	'history' => $history,
]);
