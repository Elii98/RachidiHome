<?php
include "connect.php";

$id = get_post('id');
$q = "SELECT * FROM items WHERE categoryid = '$id'";
$items = sq_array($q);
$ret = ['items' => $items];

echo json_encode($ret);
