<?php
include "connect.php";

$q = "SELECT * from categories";

$categories = sq_array($q);
$ret = ['category' => $categories];
echo json_encode($ret);
