<?php
include "connect.php";


$userid = get_post('userid');
$q = "SELECT * FROM orders WHERE userid = '$userid'";
$orders = sq_array($q);
$idarray = array();
foreach ($orders as $key => $value) {

	array_push($idarray, $orders[$key]["itemid"]);
}
$ids = implode(', ', $idarray);
$q = "SELECT * FROM items WHERE id IN ($ids)";
$items = sq_array($q);

echo json_encode($ret = ['items' => $items]);
