<?php
include 'connect.php';

$address_id = get_post('address_id');

$q = "SELECT * FROM addresses WHERE id = '$address_id'";
$address = sq_array($q);
$address = !empty($address) ? $address[0] : $address;

ret_json($address);
