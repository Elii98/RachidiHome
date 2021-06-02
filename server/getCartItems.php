<?php
include "connect.php";

$idsarray = get_post('ids');
$ids = [];
foreach ($idsarray as $itemId => $itemQuantity) {
	$ids[] = $itemId;
}
$idString = implode(',', $ids);
$q = "SELECT * FROM items WHERE id IN ($idString)'";
$items = sq_array($q);
$ret = ['items' => $items];

echo json_encode($ret);
