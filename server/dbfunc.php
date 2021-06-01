<?php
$report_error = true;

// send a query
function sq($q)
{
	global $db, $report_error;
	$res = $db->query($q);
	if ($res === false and $report_error === true) {
		die(report_error());
	}
	return $res;
}

// send a query and return an array of data from db *can select k option*
function sq_array($q, $x = [])
{
	global $db;
	$y = [
		'k' => '',
	];
	$y = array_replace($y, $x);
	$res = sq($q);
	$arr = [];
	while ($row = mysqli_fetch_assoc($res)) {
		if (!empty($y['k'])) {
			$arr[$row[$y['k']]] = $row;
		} else {
			$arr[] = $row;
		}
	}
	return $arr;
}

// for insert, delete or update queries (do not use for select)
function sq_multi($qArr)
{
	global $db;
	if ($db->multi_query(implode(';', $qArr))) {
		$i = 0;
		do {
			$i++;
		} while ($db->more_results() && $db->next_result());
	}
	if ($db->errno) {
		echo "Batch execution prematurely ended on statement $i.\n";
		var_dump($qArr[$i], $db->error);
	}
}

// checks if request is array and returns the value with escaped string
function get_post_arr($xname, $type = '')
{
	global $db;
	if (is_array($xname)) {
		$arr = [];
		foreach ($xname as $k => $v) {
			$arr[$k] = get_post_arr($v);
		}
		$ret = $arr;
	} else {
		$ret =  $db->real_escape_string($xname);
	}
	switch ($type) {
		case 'int': {
				intval($ret);
				break;
			}
	}
	return $ret;
}

// use on all requests to escape string
function get_post($xname = '', $type = '')
{
	$val = !empty($xname) ? @$_REQUEST[$xname] : $_REQUEST;
	return get_post_arr($val, $type);
}

// return password hash from form request
function get_password($xname = '')
{
	global $db;

	return hash('sha256', $db->real_escape_string($_REQUEST[$xname]));
}

// return 0 or 1 if post exists
function get_on($xname = '')
{
	return !empty($_REQUEST[$xname]) ? 1 : 0;
}

// gets insert id from an insert query;
function sq_id()
{
	global $db;
	return mysqli_insert_id($db);
}

// stops code if session is empty
function check_session($option = 'id')
{
	if (empty($_SESSION['app'][$option])) {
		die();
	}
}

// uploaded file to server and returns an array of information
function upload_file($files, $x = [])
{
	if (empty($files['name'])) {
		return false;
	}

	$y = [
		'multiple' => true, // for multiple or single upload
		'w_list' => [], // white list
		'b_list' => [], // black list
		'limit' => false, // size limit in KB
	];

	$y = array_replace($y, $x);

	$direct = '../media/upload/';
	$ret = [];
	if ($y['multiple']) {
		foreach ($files['name'] as $k => $v) {
			$info = pathinfo($v);
			$save_name = microtime(true) . '.' . $info['extension'];
			$size = round(($files["size"][$k] / 1024), 1); // size in KB

			// Black list and white list check
			if ((!empty($y['b_list']) and array_search($info['extension'], $y['b_list']) !== false) or (!empty($y['w_list']) and array_search($info['extension'], $y['w_list']) === false)) {
				$ret[$k] = false;
				continue;
			}

			if ($size > $y['limit'] and $y['limit'] !== false) {
				continue;
			}

			if (move_uploaded_file($files['tmp_name'][$k], $direct . $save_name)) {
				$ret[$k]['save_name'] = $save_name;
				$ret[$k]['name'] = $info['filename'];
			} else {
				$ret[$k] = false;
			}
		}
	} else {
		$info = pathinfo($files['name']);
		$save_name = microtime(true) . '.' . $info['extension'];
		$size = round($files['size'] / 1024, 1); // size in KB

		// Black list and white list check
		do {
			if ((!empty($y['b_list']) and array_search($info['extension'], $y['b_list']) !== false) or (!empty($y['w_list']) and array_search($info['extension'], $y['w_list']) === false)) {
				$ret = false;
				break;
			}

			if ($size > $y['limit'] and $y['limit'] !== false) {
				$ret = false;
				break;
			}

			if (move_uploaded_file($files['tmp_name'], $direct . $save_name)) {
				$ret['save_name'] = $save_name;
				$ret['name'] = $info['filename'];
			} else {
				$ret = false;
			}
		} while (false);
	}

	return $ret;
}

function report_error()
{
	global $db;

	$backtrace = debug_backtrace();
	$backtrace['mysql'] = mysqli_error($db);
	var_dump($backtrace);
}

function generate_jwt($payload = [])
{
	global $jwt_secret;
	$header = json_encode(['type' => 'JWT', 'alg', 'HS256']);
	$payload = json_encode($payload);
	$base64Header = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
	$base64Payload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
	$signature = hash_hmac('sha256', $base64Header . "." . $base64Payload, $jwt_secret, true);
	$base64Signature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

	$jwt = $base64Header . "." . $base64Payload . "." . $base64Signature;

	return $jwt;
}

function check_jwt($jwt)
{
	global $jwt_secret;

	$arr = explode('.', $jwt);
	$base64Header = $arr[0];
	$base64Payload = $arr[1];
	$signature = hash_hmac('sha256', $base64Header . "." . $base64Payload, $jwt_secret, true);
	$base64Signature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
	$jwt1 = $base64Header . "." . $base64Payload . "." . $base64Signature;

	return $jwt1 === $jwt;
}
