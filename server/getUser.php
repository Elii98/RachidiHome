<?php
include "connect.php";

$id = get_post('id');

$q = "SELECT * FROM users WHERE id = '$id'";
$user = sq_array($q);
$ret = ['user' => $user];

echo json_encode($ret);
