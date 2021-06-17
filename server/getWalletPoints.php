<?php
include "connect.php";

$userid = get_post('userid');
$jwt = get_post('jwt');
$check = check_login($userid, $jwt);
if (!$check) die();

$q = "SELECT walletpoints FROM users WHERE id = '$userid'";
$points = sq_array($q);
$ret = ['walletpoints' => $points];

echo json_encode($ret);
