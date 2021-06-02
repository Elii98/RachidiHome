<?php
include "connect.php";

$id = get_post('id');
$sort = get_post('sort');
$filter = get_post('filter');
$filterQuery = "1=1";
if (!empty($filter)) {
	$filterQuery = "newprice BETWEEN $filter[0] AND $filter[1] ";
}
$sortQuery = "SELECT * FROM items WHERE categoryid = '$id' AND $filterQuery";
if ($sort == "alphabetical") {
	$q = " $sortQuery ORDER BY title";
} else if ($sort == "priceHigh") {
	$q = "$sortQuery ORDER BY newprice DESC ";
} else if ($sort == "priceLow") {
	$q = "$sortQuery ORDER BY newprice";
} else {
	$q = "$sortQuery";
}
$items = sq_array($q);
$ret = ['items' => $items];

echo json_encode($ret);
