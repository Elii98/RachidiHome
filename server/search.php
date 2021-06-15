<?php
include "connect.php";

$input = get_post('search');
if ($input == "") {
	$ret = ["items" => []];
} else {
	$q = "SELECT * FROM items WHERE title LIKE '%$input%'";
	$res = sq_array($q);
	$ret = ["items" => $res];
}

echo json_encode($ret);
