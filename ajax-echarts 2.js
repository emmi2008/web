Echartsͨ��Ajaxʵ�ֶ�̬���ݼ���
Echarts��3.x�棩����ʵ�������ݶ��Ǿ�̬�ģ�ʵ��ʹ����������Ҫ��ӷ�������ȡ���ݽ��ж�̬��ʾ�������̳���������첽���ݼ��غܴ��ԣ�������Թ�����򵥵�ʵ��Ϊ���ӣ���ϸ��ʾ���¹��̣�1.�ͻ���ͨ��ajax��������2.��������Servlet��������3.����json���ݲ����ظ��ͻ��ˣ�4.�ͻ��˽������ݺ���ʾ��

1.�ͻ���ͨ��ajax��������

�Ȼ���һ����򵥵�Echartsͼ��

�������ֱ�����ϴ����ˣ�ֱ���õ��ǹ����̳����첽���ݼ��غ͸�����Ĵ��룩

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="zh-CN">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>ECharts</title>
    
    <!-- ���� echarts.js -->
    <script type="text/javascript" src="echarts.min.js"></script>
    <!-- ����jquery.js -->
    <script type="text/javascript" src="jquery-1.12.3.js"></script>
</head>

<body>
    <!-- ΪECharts׼��һ���߱���С����ߣ���Dom -->
    <div id="main" style="width: 600px;height:400px;"></div>
    
    <script type="text/javascript">
        
        var myChart = echarts.init(document.getElementById('main'));
         // ��ʾ���⣬ͼ���Ϳյ�������
         myChart.setOption({
             title: {
                 text: '�첽���ݼ���ʾ��'
             },
             tooltip: {},
             legend: {
                 data:['����']
             },
             xAxis: {
                 data: []
             },
             yAxis: {},
             series: [{
                 name: '����',
                 type: 'bar',
                 data: []
             }]
         });


����</script>
    
</body>
</html>
�����˰ɣ�����option�е�xAxis��yAxis���data���ǿ�ֵ����������ǻ��ôӷ�����ȡ�ص�����ȥ������������

�������ϲ�����ajax���ֵ�����ǰ�˴��룺

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="zh-CN">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>ECharts</title>
    
    <!-- ���� echarts.js -->
    <script type="text/javascript" src="echarts.min.js"></script>
    <!-- ����jquery.js -->
    <script type="text/javascript" src="jquery-1.12.3.js"></script>
</head>

<body>
    <!-- ΪECharts׼��һ���߱���С����ߣ���Dom -->
    <div id="main" style="width: 600px;height:400px;"></div>
    
    <script type="text/javascript">
        
        var myChart = echarts.init(document.getElementById('main'));
         // ��ʾ���⣬ͼ���Ϳյ�������
         myChart.setOption({
             title: {
                 text: '�첽���ݼ���ʾ��'
             },
             tooltip: {},
             legend: {
                 data:['����']
             },
             xAxis: {
                 data: []
             },
             yAxis: {},
             series: [{
                 name: '����',
                 type: 'bar',
                 data: []
             }]
         });
         
         myChart.showLoading();    //���ݼ�����֮ǰ����ʾһ�μ򵥵�loading����
         
         var names=[];    //������飨ʵ������ʢ��X������ֵ��
         var nums=[];    //�������飨ʵ������ʢ��Y����ֵ��
         
         $.ajax({
         type : "post",
         async : true,            //�첽����ͬ�����󽫻���ס��������û�������������ȴ�������ɲſ���ִ�У�
         url : "TestServlet",    //�����͵�TestServlet��
         data : {},
         dataType : "json",        //����������ʽΪjson
         success : function(result) {
             //����ɹ�ʱִ�иú������ݣ�result��Ϊ���������ص�json����
             if (result) {
                    for(var i=0;i<result.length;i++){       
                       names.push(result[i].name);    //����ȡ����������������
                     }
                    for(var i=0;i<result.length;i++){       
                        nums.push(result[i].num);    //����ȡ��������������������
                      }
                    myChart.hideLoading();    //���ؼ��ض���
                    myChart.setOption({        //��������ͼ��
                        xAxis: {
                            data: names
                        },
                        series: [{
                            // �������ֶ�Ӧ����Ӧ��ϵ��
                            name: '����',
                            data: nums
                        }]
                    });
                    
             }
         
        },
         error : function(errorMsg) {
             //����ʧ��ʱִ�иú���
         alert("ͼ����������ʧ��!");
         myChart.hideLoading();
         }
    })

         
    </script>
    
</body>
</html> 