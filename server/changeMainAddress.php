<?php

include "connect.php";

$userid = get_post("userid");
$jwt = get_post('jwt');
$check = check_login($userid, $jwt);
if (!$check) die();

$addressid = get_post("addressid");

$q = "UPDATE addresses SET ismain = 0 WHERE userid = '$userid'";
sq($q);

$q = "UPDATE addresses SET ismain = 1 WHERE userid = '$userid' AND id='$addressid'";
sq($q);
