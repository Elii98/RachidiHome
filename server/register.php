<?php
include 'connect.php';

$password = get_post('password');
$fName = get_post('firstName');
$phone = get_post('phone');
$lName = get_post('lastName');
$phone = get_post('phone');

$q = "SELECT id FROM users WHERE phone_number='$phone'";
$users = sq_array($q);
if (!empty($users)) {
	$ret = ['message' => 'user already registered'];
} else {
	$q = "INSERT INTO users (password, first_name, phone_number, last_Name) VALUES
	( '$password', '$fName', '$phone', '$lName')";
	sq($q);
	$ret = ['message' => 'Registered'];
}
echo json_encode($ret);
