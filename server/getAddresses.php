<?php
include "connect.php";

$userid = get_post('userId');
$jwt = get_post('jwt');
$check = check_login($userid, $jwt);
if (!$check) die();

$q = "SELECT * FROM addresses WHERE userid = '$userid'";
$addresses = sq_array($q, ['k' => 'id']);
$ret = ['addresses' => $addresses];

echo json_encode($ret);
