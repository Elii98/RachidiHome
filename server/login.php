<?php
include 'connect.php';

$phone = get_post('phone');
$password = get_post('password');

$q = "SELECT * FROM users WHERE phone_number = '$phone' AND password = '$password'";
$user = sq_array($q);
if (!empty($user)) {
	$jwt = generate_jwt($user[0]['id']);
	$user = $user;
	$ret = ['user' => $user, 'jwt' => $jwt];
} else {
	$ret = ['user' => 0];
}

echo json_encode($ret);
