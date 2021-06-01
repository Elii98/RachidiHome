<?php
include "connect.php";

$idsarray = get_post("ids");
if (!empty($idsarray)) {
	$ids = implode(",", $idsarray);
	$q = "SELECT * FROM items WHERE id IN ($ids)";
	$ret = sq_array($q);
} else {
	$ret = [];
}

echo json_encode($ret);
