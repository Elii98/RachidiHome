<?php
include 'connect.php';

$user_id = get_post('user_id');
$jwt = get_post('jwt');
$check = check_login($user_id, $jwt);
if (!$check) die();

$items = get_post('items');

$counters = 0;
$mq = [];
foreach ($items as $k => $v) {
	$counters += intval($v['counter']);
	$mq[] = "SELECT id, (newprice * {$v['counter']}) 'price' FROM items WHERE id = '$k'";
}

$total_price = 0;
$mq = implode(';', $mq);
if ($db->multi_query($mq)) {
	do {
		if ($result = $db->store_result()) {
			while ($row = $result->fetch_assoc()) {
				$total_price += $row['price'];
				$items[$row['id']]['price'] = $row['price'];
			}
			$result->free_result();
		}
	} while ($db->next_result());
}

$post = [
	'user_id' => $user_id,
	'billing_id' => get_post('billing_id'),
	'shipping_id' => get_post('shipping_id'),
	'total_price' => $total_price,
	'quantity' => $counters,
	'payment' => get_post('payment'),
];
$insert = insert_array($post);
$q = "INSERT INTO orders ({$insert['columns']}) VALUES ({$insert['values']})";
sq($q);
$order_id = sq_id();

foreach ($items as $k => $v) {
	$post = [
		'order_id' => $order_id,
		'item_id' => $k,
		'quantity' => $v['counter'],
		'price' => $v['price']
	];
	$insert = insert_array($post);
	$q = "INSERT INTO order_items ({$insert['columns']}) VALUES ({$insert['values']})";
	sq($q);
}
