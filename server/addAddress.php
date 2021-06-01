<?php
include "connect.php";


$userid = get_post('userid');

$nickname = get_post('nickname');
$city = get_post('city');
$streetname = get_post('streetname');
$buildingname = get_post('buildingname');
$landmark = get_post('landmark');

$q = "INSERT INTO addresses (nickname,city,streetname,buildingname,landmark, userid, ismain) VALUES ('$nickname', '$city', '$streetname', '$buildingname', '$landmark', '$userid', 1)";
sq($q);
