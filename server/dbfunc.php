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
		'array' => true,
		'col' => ''
	];
	$y = array_replace($y, $x);
	$res = sq($q);
	$arr = [];
	if ($y['array']) {
		while ($row = mysqli_fetch_assoc($res)) {
			$row = empty($y['col']) ? $row : $row[$y['col']];
			if (!empty($y['k'])) {
				$arr[$row[$y['k']]] = $row;
			} else {
				$arr[] = $row;
			}
		}
	} else {
		while ($row = mysqli_fetch_assoc($res)) {
			$row = empty($y['col']) ? $row : $row[$y['col']];
			$arr = $row;
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

// inserts dates $from $to and returns array of dates from $from to $to 
function date_array($from, $to)
{
	$period = new DatePeriod(
		new DateTime($from),
		new DateInterval('P1D'),
		new DateTime($to)
	);
	$array = [];
	foreach ($period as $k => $v) {
		$array[] = $v->format('Y-m-d');
	}
	return $array;
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
				$ret = intval($ret);
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
function upload_file($inputName, $x = [])
{
	if (empty($_FILES[$inputName])) return '';
	$files = $_FILES[$inputName];
	if (empty($files['name']) or empty($files['name'][0])) {
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

// error reporting and backtrack for mysql queries
function report_error()
{
	global $db;

	$backtrace = debug_backtrace();
	$backtrace['mysql'] = mysqli_error($db);
	var_dump($backtrace);
}

// generate jwt token out of an array using global signature and sha256 encoding
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

// checks if jwt is valid
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

// check if userid is in jwt
function check_login($userid, $jwt)
{
	$jwt1 = generate_jwt($userid);

	return $jwt === $jwt1;
}

// generate from array k => columns and v => values for insert
function insert_array($arr = [])
{
	$cols = [];
	$vals = [];

	foreach ($arr as $k => $v) {
		$cols[] = "`$k`";
		$vals[] = "'$v'";
	}

	$cols = implode(',', $cols);
	$vals = implode(',', $vals);

	return [
		'columns' => $cols,
		'values' => $vals
	];
}
// generate from array k => columns and v => values for update
function update_array($arr = [])
{
	$values = [];

	foreach ($arr as $k => $v) {
		$values[] = " `$k`= '$v' ";
	}

	$values = implode(',', $values);

	return $values;
}

// checks if key exists in array and returns the value, or boolean
function is_there($arr, $key, $is_bool = false)
{
	return !empty($arr[$key]) ? ($is_bool ? 1 : $arr[$key]) : ($is_bool ? 0 : '');
}

// escape string
function escape_string($string)
{
	global $db;

	return $db->real_escape_string($string);
}

// recursevly escape array and all children of array
function escape_array($dirty_array)
{
	$clean_array = [];
	foreach ($dirty_array as $k => $v) {
		if (is_array($v)) {
			$clean_array[$k] = escape_array($v);
		} else {
			$clean_array[$k] = escape_string($v);
		}
	}
	return $clean_array;
}

function ret_json($array = [])
{
	echo json_encode($array);
	die();
}

// decodes a json request
function get_json($name)
{
	return escape_array(json_decode($_REQUEST['name'], true));
}
