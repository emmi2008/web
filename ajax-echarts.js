$(document).ready(function () {

    // ���Ʒ�����ͼ��
    var init_echarts = function () {
        var refreshChart = function (show_data) {
            my_demo_chart = echarts.init(document.getElementById('echart_show'));
            my_demo_chart.showLoading({
                text: '������...',
                effect: 'whirling'
            });


            var echarts_all_option = {
                title: {
                    text: '��̬����',
                    subtext: '�����鹹'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['���³ɽ���', 'Ԥ������']
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {show: true},
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                dataZoom: {
                    show: false,
                    start: 0,
                    end: 100
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: true,
                        data: (function () {
                            var now = new Date();
                            var res = [];
                            var len = 10;
                            while (len--) {
                                res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
                                now = new Date(now - 2000);
                            }
                            return res;
                        })()
                    },
                    {
                        type: 'category',
                        boundaryGap: true,
                        data: (function () {
                            var res = [];
                            var len = 10;
                            while (len--) {
                                res.push(len + 1);
                            }
                            return res;
                        })()
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        scale: true,
                        name: '�۸�',
                        boundaryGap: [0.2, 0.2]
                    },
                    {
                        type: 'value',
                        scale: true,
                        name: 'Ԥ����',
                        boundaryGap: [0.2, 0.2]
                    }
                ],
                series: [
                    {
                        name: 'Ԥ������',
                        type: 'bar',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        // ��ȡ�����ݿ������
                        data: show_data[0]
                    },
                    {
                        name: '���³ɽ���',
                        type: 'line',
                        // ʵʱ��ȡ������
                        data:show_data[1]
                    }
                ]
            };

            my_demo_chart.hideLoading();
            my_demo_chart.setOption(echarts_all_option);

        };

        // ��ȡԭʼ����
        $.ajax({
            url: "http://cuihuan.net:1015/demo_file/echarts_realtime_demo/get_data.php",
            data: {type: "2"},
            success: function (data) {
                // �������ݿ�ȡ�����ƴ�����ڽ��
                refreshChart(eval(data));
            }
        });

    };

    // ����ʵʱ��ȡ���ݸ���
    $("#getData").on("click",function() {
        var timeTicket;
        var lastData = 11;
        var axisData;
        clearInterval(timeTicket);
        timeTicket = setInterval(function () {
            // ��ȡʵʱ��������
            $.ajax({
                url: "http://cuihuan.net:1015/demo_file/echarts_realtime_demo/get_data.php",
                data: {type: "new"},
                success: function (data) {
                    // ��������ת������Ӧ��api ת��Ϊechart ��Ҫ������
                    // todo �������ݲ���������µķ�ʽ
                    lastData += Math.random() * ((Math.round(Math.random() * 10) % 2) == 0 ? 1 : -1);
                    lastData = lastData.toFixed(1) - 0;
                    axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');

                    // ��̬���ݽӿ� addData
                    my_demo_chart.addData([
                        [
                            0,        // ϵ������
                            Math.round(Math.random() * 1000), // ��������
                            true,     // ���������Ƿ�Ӷ���ͷ������
                            false     // �Ƿ����Ӷ��г��ȣ�false���Զ�ɾ��ԭ�����ݣ���ͷ����ɾ��β����β����ɾ��ͷ
                        ],
                        [
                            1,        // ϵ������
                            lastData, // ��������
                            false,    // ���������Ƿ�Ӷ���ͷ������
                            false,    // �Ƿ����Ӷ��г��ȣ�false���Զ�ɾ��ԭ�����ݣ���ͷ����ɾ��β����β����ɾ��ͷ
                            axisData  // �������ǩ
                        ]
                    ]);
                }
            });

        }, 2100);

        // �رո��²���
        $("#stopData").on("click", function () {
            clearInterval(timeTicket);
        });

    });


    // Ĭ�ϼ���
    var default_load = (function () {
        init_echarts();
    })();
});