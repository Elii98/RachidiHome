<?php

include "connect.php";
$q = "SELECT * from faq";
$faqs = sq_array($q);

$ret = ['faqs' => $faqs];

echo json_encode($ret);
