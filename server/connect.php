<?php
header("Access-Control-Allow-Origin: *");

ob_start();


$dbHost = 'localhost';
$dbName = 'rachidi_home';
$dbusername = 'root';
$dbpassword = '';
$jwt_secret = 'Hesoyam1';

$db = new mysqli($dbHost, $dbusername, $dbpassword, $dbName);
mysqli_set_charset($db, "utf8mb4");
if ($_SERVER['REQUEST_METHOD'] === 'POST' && empty($_REQUEST)) {
	$_REQUEST = json_decode(file_get_contents('php://input'), true);
}
date_default_timezone_set('Asia/Beirut');

$tz = (new DateTime('now', new DateTimeZone('Asia/Beirut')))->format('P');
mysqli_query($db, "SET time_zone='$tz';");

include 'dbfunc.php';
