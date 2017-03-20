/**
 * 连接数据库获取数据
 *
 * User: cuixiaohuan
 * Date: 15/12/4
 * Time: 下午6:47
 */

// 获取请求的类型
$type = $_GET['type'];

// 连接服务器
$link = mysql_connect('ip:port', 'user', 'password');
if (!$link) {
    die("Could not connect:" . mysql_error());
}

// 获取test库数据
$crowd_db = mysql_select_db('test', $link);
$day_time = date("Y-m-d");

// 根据传输过来的数据获取数据
$static_sql = "select v from test where id = " . $type . " limit 10";

// 获取数据之后返回
$res = mysql_query($static_sql, $link_2004);

if ($res) {
    // 将结果进行入库操作
    $row = mysql_fetch_row($res);

    if($row[0]){
        echo $row[0];
    }
    mysql_free_result($res);
}