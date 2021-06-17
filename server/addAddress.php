<?php
include "connect.php";

$user_id = get_post('user_id');
$jwt = get_post('jwt');
$check = check_login($user_id, $jwt);
if (!$check) die();

$address_id = get_post('address_id');

if (empty($address_id)) {
	$q = "INSERT INTO addresses (userid) VALUES ('$user_id')";
	sq($q);
	$address_id = sq_id();
}

$post = [
	'nickname' => get_post('nickname'),
	'city' => get_post('city'),
	'streetname' => get_post('streetname'),
	'buildingname' => get_post('buildingname'),
	'landmark' => get_post('landmark'),
	'details' => get_post('details'),
];

$update = update_array($post);

$q = "UPDATE addresses SET $update WHERE id = '$address_id'";
sq($q);
