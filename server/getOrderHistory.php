<?php
include "connect.php";

$userid = get_post('userid');
$jwt = get_post('jwt');
$check = check_jwt($userid, $jwt);
if (!$check) die();

$q = "SELECT i.*
FROM items i, orders o
WHERE i.id = o.itemid AND o.userid = $userid";
$items = sq_array($q);

ret_json(['items' => $items]);
