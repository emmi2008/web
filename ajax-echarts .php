/**
 * �������ݿ��ȡ����
 *
 * User: cuixiaohuan
 * Date: 15/12/4
 * Time: ����6:47
 */

// ��ȡ���������
$type = $_GET['type'];

// ���ӷ�����
$link = mysql_connect('ip:port', 'user', 'password');
if (!$link) {
    die("Could not connect:" . mysql_error());
}

// ��ȡtest������
$crowd_db = mysql_select_db('test', $link);
$day_time = date("Y-m-d");

// ���ݴ�����������ݻ�ȡ����
$static_sql = "select v from test where id = " . $type . " limit 10";

// ��ȡ����֮�󷵻�
$res = mysql_query($static_sql, $link_2004);

if ($res) {
    // ���������������
    $row = mysql_fetch_row($res);

    if($row[0]){
        echo $row[0];
    }
    mysql_free_result($res);
}