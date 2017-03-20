$(document).ready(function () {

    // 绘制反馈量图形
    var init_echarts = function () {
        var refreshChart = function (show_data) {
            my_demo_chart = echarts.init(document.getElementById('echart_show'));
            my_demo_chart.showLoading({
                text: '加载中...',
                effect: 'whirling'
            });


            var echarts_all_option = {
                title: {
                    text: '动态数据',
                    subtext: '纯属虚构'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['最新成交价', '预购队列']
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
                        name: '价格',
                        boundaryGap: [0.2, 0.2]
                    },
                    {
                        type: 'value',
                        scale: true,
                        name: '预购量',
                        boundaryGap: [0.2, 0.2]
                    }
                ],
                series: [
                    {
                        name: '预购队列',
                        type: 'bar',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        // 获取到数据库的数据
                        data: show_data[0]
                    },
                    {
                        name: '最新成交价',
                        type: 'line',
                        // 实时获取的数据
                        data:show_data[1]
                    }
                ]
            };

            my_demo_chart.hideLoading();
            my_demo_chart.setOption(echarts_all_option);

        };

        // 获取原始数据
        $.ajax({
            url: "http://cuihuan.net:1015/demo_file/echarts_realtime_demo/get_data.php",
            data: {type: "2"},
            success: function (data) {
                // 根据数据库取到结果拼接现在结果
                refreshChart(eval(data));
            }
        });

    };

    // 开启实时获取数据更新
    $("#getData").on("click",function() {
        var timeTicket;
        var lastData = 11;
        var axisData;
        clearInterval(timeTicket);
        timeTicket = setInterval(function () {
            // 获取实时更新数据
            $.ajax({
                url: "http://cuihuan.net:1015/demo_file/echarts_realtime_demo/get_data.php",
                data: {type: "new"},
                success: function (data) {
                    // 根据条件转换成相应的api 转化为echart 需要的数据
                    // todo 更新数据采用随机更新的方式
                    lastData += Math.random() * ((Math.round(Math.random() * 10) % 2) == 0 ? 1 : -1);
                    lastData = lastData.toFixed(1) - 0;
                    axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');

                    // 动态数据接口 addData
                    my_demo_chart.addData([
                        [
                            0,        // 系列索引
                            Math.round(Math.random() * 1000), // 新增数据
                            true,     // 新增数据是否从队列头部插入
                            false     // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
                        ],
                        [
                            1,        // 系列索引
                            lastData, // 新增数据
                            false,    // 新增数据是否从队列头部插入
                            false,    // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
                            axisData  // 坐标轴标签
                        ]
                    ]);
                }
            });

        }, 2100);

        // 关闭更新操作
        $("#stopData").on("click", function () {
            clearInterval(timeTicket);
        });

    });


    // 默认加载
    var default_load = (function () {
        init_echarts();
    })();
});