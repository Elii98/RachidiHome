<?php

include "connect.php";

$addressid = get_post("addressid");
$userid = get_post("userid");
$q = "UPDATE addresses SET ismain = 0 WHERE userid = '$userid'";
sq($q);
$q = "UPDATE addresses SET ismain = 1 WHERE userid = '$userid' AND id='$addressid'";
sq($q);
