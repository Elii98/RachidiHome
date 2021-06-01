<?php
include "connect.php";

$itemid = get_post('itemid');

if (empty($itemid)) {
	$q = "SELECT * FROM items";
	$items = sq_array($q);
	$ret = ['firstItems' => $items, 'secondItems' => $items];
} else {
	$q = "SELECT * FROM items WHERE id = '$itemid'";
	$item = sq_array($q);
	$ret = ['item' => $item];
}

echo json_encode($ret);
