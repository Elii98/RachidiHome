<?php
include "connect.php";

$q = "SELECT * from bannerimages";
$banners = sq_array($q);
$ret = ['banners' => $banners];
echo json_encode($ret);
