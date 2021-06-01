<?php
include "connect.php";

$userid = get_post('userid');

$q = "SELECT * FROM addresses WHERE userid = '$userid'";
$addresses = sq_array($q);
$ret = ['addresses' => $addresses];

echo json_encode($ret);
