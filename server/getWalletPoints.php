<?php
include "connect.php";

$userid = get_post('userid');
$q = "SELECT walletpoints FROM users WHERE id = '$userid'";
$points = sq_array($q);
$ret = ['walletpoints' => $points];

echo json_encode($ret);
