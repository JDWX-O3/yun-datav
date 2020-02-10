var symptomName = last_month_day();

$(function(){


    init();
    echart_map_1111();
    init2();
    $("#el-dialog").addClass("hide");

    $(".close").click(function(event) {
        $("#el-dialog").addClass("hide");
    });

    /*
    $("#btn11").click(function(event) {
        alert("段落被点击了。");
        toggleFullScreen_2();
    });
*/
    fullScreen();
  var date = new Date();
     var numble = date.getDate();
     var today = getFormatMonth(new Date());
     $("#date1").html(today);
     $("#date2").html(today);
     $("#date3").html(today);
     $("#date4").html(today);


  lay('.demo-input').each(function(){
     laydate.render({
        type: 'month',
         elem: this,
         trigger: 'click',
         theme: '#95d7fb',
         calendar: true,
         showBottom: true,
         done: function () {
            console.log( $("#startDate").val())

         }
     })
 });


});

//全屏
function fullScreen(){
    var el = document.documentElement;
    var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
    if(typeof rfs != "undefined" && rfs) {
        rfs.call(el);
    }else if (typeof window.ActiveXObject != "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
    return;
}


function toggleFullScreen_2() {
    var btn = document.getElementById("btn11");

    btn.onclick = function() {

        alert("段落被点击了。");
        fullScreen();
    };

    function requestFullScreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        }
//FireFox
        else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        }
//Chrome等
        else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
        }
//IE11
        else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    };
}

// echart_map中国地图
function echart_map_1111()
{

    /**
     此版本通过设置geoindex && seriesIndex: [1] 属性来实现geo和map共存，来达到hover散点和区域显示tooltip的效果

     默认情况下，map series 会自己生成内部专用的 geo 组件。但是也可以用这个 geoIndex 指定一个 geo 组件。这样的话，map 和 其他 series（例如散点图）就可以共享一个 geo 组件了。并且，geo 组件的颜色也可以被这个 map series 控制，从而用 visualMap 来更改。
     当设定了 geoIndex 后，series-map.map 属性，以及 series-map.itemStyle 等样式配置不再起作用，而是采用 geo 中的相应属性。

     http://echarts.baidu.com/option.html#series-map.geoIndex

     并且加了pin气泡图标以示数值大小
     */
    /*
    全局变量区:参考江西绿色金融（谢谢：本来想用闭包实现接口数据调用，没时间了）
    说明：实习做的，辞了有一段时间来做毕业设计，所以没有回复评论，不好意思咯！
    更新：1、有人问我气泡数值的问题，看了下评论，评论者：蚊子不可恶 正解，现已经修改进代码里
    2、更新自适应屏幕
    */
    var name_title = "金大万翔臭氧应用区域分析\n";
    var subname = '根据金大万翔板式臭氧发生器市场应用情况进行地图区域分析\n\n气泡是对应的臭氧公斤数';
    var nameColor = " rgb(255, 215, 0)";
    var name_fontFamily = '宋体';
    var name_fontSize = 35;
    var mapName = 'china';
    var data = [];
    var geoCoordMap = {};
    var toolTipData = [];

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('mapChart'));


    /*获取地图数据*/
    myChart.showLoading();
    var mapFeatures = echarts.getMap(mapName).geoJson.features;
    myChart.hideLoading();
    mapFeatures.forEach(function(v) {
        // 地区名称
        var name = v.properties.name;
        // 地区经纬度
        geoCoordMap[name] = v.properties.cp;
        data.push({
            name: name,
            value: Math.round(Math.random() * 100 + 10)
        });
        toolTipData.push({
            name: name,
            value: [{
                    name: "项目数",
                    value: Math.round(Math.random() * 100 + 10)
                },
                {
                    name: "公斤数",
                    value: Math.round(Math.random() * 100 + 10)
                },
                {
                    name: "模块数",
                    value: Math.round(Math.random() * 100 + 10)
                }
            ]
        })
    });

    console.log("============geoCoordMap===================")
    console.log(geoCoordMap)
    console.log("================data======================")
    console.log(data)
    var max = 480,
        min = 9; // todo
    var maxSize4Pin = 50,
        minSize4Pin = 20;

    var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value),
                });
            }
        }
        return res;
    };
    option = {
        title: {
            text: name_title,
            subtext: subname,
            x: 'center',
            textStyle: {
                color: nameColor,
                fontFamily: name_fontFamily,
                fontSize: name_fontSize
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                if (typeof(params.value)[2] == "undefined") {
                    var toolTiphtml = ''
                    for (var i = 0; i < toolTipData.length; i++) {
                        if (params.name == toolTipData[i].name) {
                            toolTiphtml += toolTipData[i].name + ':<br>'
                            for (var j = 0; j < toolTipData[i].value.length; j++) {
                                toolTiphtml += toolTipData[i].value[j].name + ':' + toolTipData[i].value[j].value + "<br>"
                            }
                        }
                    }
                    console.log(toolTiphtml)
                    // console.log(convertData(data))
                    return toolTiphtml;
                } else {
                    var toolTiphtml = ''
                    for (var i = 0; i < toolTipData.length; i++) {
                        if (params.name == toolTipData[i].name) {
                            toolTiphtml += toolTipData[i].name + ':<br>'
                            for (var j = 0; j < toolTipData[i].value.length; j++) {
                                toolTiphtml += toolTipData[i].value[j].name + ':' + toolTipData[i].value[j].value + "<br>"
                            }
                        }
                    }
                    console.log(toolTiphtml)
                    // console.log(convertData(data))
                    return toolTiphtml;
                }
            }
        },
        legend: {
            orient: 'vertical',
            y: 'bottom',
            x: 'right',
            data: ['credit_pm2.5'],
            textStyle: {
                color: '#fff'
            }
        },
        visualMap: {
            show: false,
            min: 0,
            max: 500,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'], // 文本，默认为数值文本
            calculable: true,
            seriesIndex: [1],
            inRange: {
                // color: ['#3B5077', '#031525'] // 蓝黑
                // color: ['#ffc0cb', '#800080'] // 红紫
                // color: ['#3C3B3F', '#605C3C'] // 黑绿
                //  color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
                // color: ['#23074d', '#cc5333'] // 紫红
                //   color: ['#00467F', '#A5CC82'] // 蓝绿
                // color: ['#1488CC', '#2B32B2'] // 浅蓝
                color: ['#00467F', '#A5CC82', '#ffc0cb'] // 蓝绿红
                // color: ['#00467F', '#A5CC82'] // 蓝绿
                // color: ['#00467F', '#A5CC82'] // 蓝绿
                // color: ['#00467F', '#A5CC82'] // 蓝绿

            }
        },
        /*工具按钮组*/
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {

                dataView: {
                    readOnly: false
                },
                restore: {},
                saveAsImage: {}
            }
        },
        geo: {
            show: true,
            map: mapName,
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false,
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#031525',
                    borderColor: '#097bba',
                },
                emphasis: {
                    areaColor: '#2B91B7',
                }
            }
        },
        series: [{
            name: '散点',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: function(val) {
                return val[2] / 10;
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#05C3F9'
                }
            }
        },
            {
                type: 'map',
                map: mapName,
                geoIndex: 0,
                aspectScale: 0.75, //长宽比
                showLegendSymbol: false, // 存在legend时显示
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#031525',
                        borderColor: '#3B5077',
                    },
                    emphasis: {
                        areaColor: '#2B91B7'
                    }
                },
                animation: false,
                data: data
            },
            {
                name: '点',
                type: 'scatter',
                coordinateSystem: 'geo',
                symbol: 'pin', //气泡
                symbolSize: function(val) {
                    var a = (maxSize4Pin - minSize4Pin) / (max - min);
                    var b = minSize4Pin - a * min;
                    b = maxSize4Pin - a * max;
                    return a * val[2] + b;
                },
                label: {

                    normal: {
                        show: true,
                        formatter: function(params) {
                            return params.data.value[2]
                        },
                        textStyle: {
                            color: '#fff',
                            fontSize: 9,
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#F62157', //标志颜色
                    }
                },
                zlevel: 6,
                data: convertData(data),
            },
            {
                name: 'Top 5',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: convertData(data.sort(function(a, b) {
                    return b.value - a.value;
                }).slice(0, 5)),
                symbolSize: function(val) {
                    return val[2] / 10;
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#05C3F9',
                        shadowBlur: 10,
                        shadowColor: '#05C3F9'
                    }
                },
                zlevel: 1
            },

        ]
    };

    //myChart.setOption(option);
    //取代传统设置，加入自动适应屏幕代码
    //window.addEventListener("resize", function() {
    //    option.chart.resize();
    //});
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });

}

// echart_map中国地图
function echart_map() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('mapChart'));

    var mapName = 'china'
    var data = []
    var toolTipData = [];

    /*获取地图数据*/
    myChart.showLoading();
    var mapFeatures = echarts.getMap(mapName).geoJson.features;
    myChart.hideLoading();
    var geoCoordMap = {
        '福州': [119.4543, 25.9222],
        '长春': [125.8154, 44.2584],
        '重庆': [107.7539, 30.1904],
        '西安': [109.1162, 34.2004],
        '成都': [103.9526, 30.7617],
        '常州': [119.4543, 31.5582],
        '北京': [116.4551, 40.2539],
        '北海': [109.314, 21.6211],
        '海口': [110.3893, 19.8516],
        '长沙': [113.019455,28.200103],
        '上海': [121.40, 31.73],
        '内蒙古': [110.82, 41.67]
    };

    var GZData = [
        [{
            name: '北京'
        }, {
            name: '福州',
            value: 95
        }],
        [{
            name: '北京'
        }, {
            name: '长春',
            value: 80
        }],
        [{
            name: '北京'
        }, {
            name: '重庆',
            value: 70
        }],
        [{
            name: '北京'
        }, {
            name: '西安',
            value: 60
        }],
        [{
            name: '北京'
        }, {
            name: '成都',
            value: 50
        }],
        [{
            name: '北京'
        }, {
            name: '常州',
            value: 40
        }],
        [{
            name: '北京'
        }, {
            name: '北京',
            value: 30
        }],
        [{
            name: '北京'
        }, {
            name: '北海',
            value: 20
        }],
        [{
            name: '北京'
        }, {
            name: '海口',
            value: 10
        }],
        [{
            name: '北京'
        }, {
            name: '上海',
            value: 80
        }],
        [{
            name: '北京'
        }, {
            name: '内蒙古',
            value: 80
        }]
    ];

    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = geoCoordMap[dataItem[0].name];
            var toCoord = geoCoordMap[dataItem[1].name];
            if (fromCoord && toCoord) {
                res.push({
                    fromName: dataItem[0].name,
                    toName: dataItem[1].name,
                    coords: [fromCoord, toCoord]
                });
            }
        }
        return res;
    };

    var color = ['#c5f80e'];
    var series = [];
    [
        ['石家庄', GZData]
    ].forEach(function (item, i) {
        series.push({
            name: item[0],
            type: 'lines',
            zlevel: 2,
            symbol: ['none', 'arrow'],
            symbolSize: 10,
            effect: {
                show: true,
                period: 6,
                trailLength: 0,
                symbol: 'arrow',
                symbolSize: 5
            },
            lineStyle: {
                normal: {
                    color: color[i],
                    width: 1,
                    opacity: 0.6,
                    curveness: 0.2
                }
            },
            data: convertData(item[1])
        }, {
            name: item[0],
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
                brushType: 'stroke'
            },
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    formatter: '{b}'
                }
            },
            symbolSize: function (val) {
                return val[2] / 8;
            },
            itemStyle: {
                normal: {
                    color: color[i]
                }
            },
            data: item[1].map(function (dataItem) {
                return {
                    name: dataItem[1].name,
                    value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                };
            })
        });
    });

    option = {
        tooltip: {
            trigger: 'item'
        },
        geo: {
            map: 'china',
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    borderColor: 'rgba(147, 235, 248, 1)',
                    borderWidth: 1,
                    areaColor: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.8,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(175,238,238, 0)' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(47,79,79, .1)' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    },
                    shadowColor: 'rgba(128, 217, 248, 1)',
                    // shadowColor: 'rgba(255, 255, 255, 1)',
                    shadowOffsetX: -2,
                    shadowOffsetY: 2,
                    shadowBlur: 10
                },
                emphasis: {
                    areaColor: '#389BB7',
                    borderWidth: 0
                }
            }
        },
        series: series
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });

}

function init_p1(){

    //手术工作量
    var pieChart1 = echarts.init(document.getElementById('pieChart1'));
    pieChart1.setOption({
        color:["#87cefa","#ff7f50","#32cd32","#da70d6",],
        tooltip : {
            trigger: 'item',
            formatter: "{a}<br/>{b}<br/>{c}个项目"
        },
        calculable : true,
        series : [
            {
                name:'应用领域',
                type:'pie',
                radius : [30, 110],
                center : ['50%', '50%'],
                roseType : 'area',
                x: '50%',
                max: 40,
                sort : 'ascending',
                data:[
                    {value:335, name:'自来水深度处理'},
                    {value:310, name:'污水处理'},
                    {value:234, name:'烟气脱硝'},
                    {value:135, name:'黑臭水体治理'}
                ]
            }
        ]
    })

}
function init_p2(){


    //平均住院天数
    var histogramChart4 = echarts.init(document.getElementById('lineChart'));
    histogramChart4.setOption( {
        color:['#5bc0de'],
        grid:{
            left: '5%',
            right: '5%',
            bottom: '5%',
            containLabel: true
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a}<br/>{b}<br/>{c}公斤"
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : ['自来水深度处理','污水处理','烟气脱硝','黑臭水体治理',],
                axisLine:{
                    lineStyle:{
                        color: '#87cefa'
                    },
                },
                axisLabel : {
                    interval:0,
                    rotate:40,

                    textStyle: {
                        color: '#fff',
                        fontSize:13
                    }
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLine:{
                    lineStyle:{
                        color: '#87cefa'
                    },
                },
                splitLine: {
                    "show": false
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    },
                    formatter: function (value) {
                        return value + "公斤"
                    },
                },
            }
        ],
        series : [
            {
                name:'应用领域',
                type:'bar',
                barWidth:30,
                data:[600,800,758,526],
            },
        ]
    });

}

function init_p3(){


    //体检人次
    var lineChart2 = echarts.init(document.getElementById('histogramChart'));
    lineChart2.setOption( {
        color:["#87cefa","#ff7f50","#32cd32","#da70d6",],
        tooltip : {
            trigger: 'item',
            formatter: "{a}<br/>{b}<br/>{c}公斤"
        },
        legend: {
            data: ['自来水','污水','烟气','黑臭水体',],
            y: 'bottom',
            x:'center',
            textStyle:{
                color:'#fff',
                fontSize:12
            }
        },
        grid:{
            left: '5%',
            right: '5%',
            bottom: '10%',
            containLabel: true
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : ['2015年','2016年','2017年','2018年','2019年'],
                axisLine:{
                    lineStyle:{
                        color: '#87cefa'
                    },
                },
                axisLabel : {
                    interval:0,
                    rotate:40,

                    textStyle: {
                        color: '#fff',
                        fontSize:13
                    }
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLine:{
                    lineStyle:{
                        color: '#87cefa'
                    },
                },
                splitLine: {
                    "show": false
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    },
                    formatter: function (value) {
                        return value + "公斤"
                    },
                },
            }
        ],
        series : [
            {
                name:'自来水',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data:[221, 524, 460, 530, 610]
            },
            {
                name:'污水',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data:[534, 691, 490, 130, 110]
            },
            {
                name:'烟气',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data:[161, 134, 112, 190, 120]
            },
            {
                name:'黑臭水体',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data:[461, 34, 202, 93, 222]
            }
        ]

    })

}

function init_p4(){

    //平均住院天数
    var histogramChart4 = echarts.init(document.getElementById('lineChart2'));
    histogramChart4.setOption( {
        color:['#5bc0de'],
        grid:{
            left: '5%',
            right: '5%',
            bottom: '5%',
            containLabel: true
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a}<br/>{b}<br/>{c}个"
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : ['自来水深度处理','污水处理','烟气脱硝','黑臭水体治理',],
                axisLine:{
                    lineStyle:{
                        color: '#87cefa'
                    },
                },
                axisLabel : {
                    interval:0,
                    rotate:40,

                    textStyle: {
                        color: '#fff',
                        fontSize:13
                    }
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLine:{
                    lineStyle:{
                        color: '#87cefa'
                    },
                },
                splitLine: {
                    "show": false
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    },
                    formatter: function (value) {
                        return value + "个"
                    },
                },
            }
        ],
        series : [
            {
                name:'臭氧应用量',
                type:'bar',
                barWidth:30,
                data:[60,81,72,5],
            },
        ]
    });
}


function init(){
  //地图
    /*
  var mapChart = echarts.init(document.getElementById('mapChart'));
  mapChart.setOption({
      bmap: {
          center: [118.096435,24.485408],
          zoom: 12,
          roam: true,

      },
      tooltip : {
          trigger: 'item',
          formatter:function(params, ticket, callback){
              return params.value[2]
          }
      },
      series: [{
          type: 'scatter',
          coordinateSystem: 'bmap',
          data: [
            [118.096435, 24.485408, '自来水深度处理'] ,
            [118.094564, 24.457358, '污水处理'] ,
            [118.104103, 24.477761, '烟气脱硝'],
            [118.14748, 24.506295, '黑臭水体治理'],
           ]
      }]
  });
  mapChart.on('click', function (params) {
      $("#el-dialog").removeClass('hide');
      $("#reportTitle").html(params.value[2]);
  });

  var bmap = mapChart.getModel().getComponent('bmap').getBMap();
  bmap.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP,BMAP_SATELLITE_MAP ]}));
  bmap.setMapStyle({style:'midnight'})
*/
  console.log('111111111111');
    init_p1();
    init_p2();
    init_p3();
    init_p4();

/*
  var pieChart1 = echarts.init(document.getElementById('pieChart1'));
  pieChart1.setOption({

    color:["#87cefa","#ff7f50","#32cd32","#da70d6",],

    legend: {
        y : '260',
        x : 'center',
        textStyle : {
            color : '#ffffff',

        },
         data : ['自来水深度处理','污水处理','烟气脱硝','黑臭水体治理',],
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a}<br/>{b}<br/>{c}G ({d}%)"
    },
    calculable : false,
    series : [
        {
            name:'采集数据量',
            type:'pie',
            radius : ['30%', '50%'],
            center : ['50%', '45%'],
            itemStyle : {
                normal : {
                    label : {
                        show : false
                    },
                    labelLine : {
                        show : false
                    }
                },
                emphasis : {
                    label : {
                        show : true,
                        position : 'center',
                        textStyle : {
                            fontSize : '20',
                            fontWeight : 'bold'
                        }
                    }
                }
            },
            data:[
                {value:335, name:'自来水深度处理'},
                {value:310, name:'污水处理'},
                {value:234, name:'烟气脱硝'},
                {value:135, name:'黑臭水体治理'}

            ]
        }
    ]
    });
*/
    /*
    var lineChart = echarts.init(document.getElementById('lineChart'));
    lineChart.setOption({

      color:["#87cefa","#ff7f50","#32cd32","#da70d6",],
      legend: {
          y : '260',
          x : 'center',
          textStyle : {
              color : '#ffffff',

          },
           data : ['自来水深度处理','污水处理','烟气脱硝','黑臭水体治理']
      },
      calculable : false,
      tooltip : {
          trigger: 'item',
          formatter: "{a}<br/>{b}<br/>{c}条"
      },
      yAxis: [
            {
                type: 'value',
                axisLine : {onZero: false},
                axisLine:{
                    lineStyle:{
                        color: '#034c6a'
                    },
                },

                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    },
                    formatter: function (value) {
                        return value + "k条"
                    },
                },
                splitLine:{
                    lineStyle:{
                        width:0,
                        type:'solid'
                    }
                }
            }
        ],
        xAxis: [
            {
                type: 'category',
                data : ['8:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00'],
                axisLine:{
                    lineStyle:{
                        color: '#034c6a'
                    },
                },
                splitLine: {
                    "show": false
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    },
                    formatter: function (value) {
                        return value + ""
                    },
                },
                splitLine:{
                    lineStyle:{
                        width:0,
                        type:'solid'
                    }
                },
            }
        ],
        grid:{
                left: '5%',
                right: '5%',
                bottom: '20%',
                containLabel: true
        },
        series : [
          {
              name:'自来水深度处理',
              type:'line',
              smooth:true,
              itemStyle: {
                  normal: {
                      lineStyle: {
                          shadowColor : 'rgba(0,0,0,0.4)'
                      }
                  }
              },
              data:[15, 0, 20, 45, 22.1, 25, 70, 55, 76]
          },
          {
              name:'污水处理',
              type:'line',
              smooth:true,
              itemStyle: {
                  normal: {
                      lineStyle: {
                          shadowColor : 'rgba(0,0,0,0.4)'
                      }
                  }
              },
              data:[25, 10, 30, 55, 32.1, 35, 80, 65, 76]
          },
          {
              name:'烟气脱硝',
              type:'line',
              smooth:true,
              itemStyle: {
                  normal: {
                      lineStyle: {
                          shadowColor : 'rgba(0,0,0,0.4)'
                      }
                  }
              },
              data:[35, 20, 40, 65, 42.1, 45, 90, 75, 96]
          },
          {
              name:'黑臭水体治理',
              type:'line',
              smooth:true,
              itemStyle: {
                  normal: {
                      lineStyle: {
                          shadowColor : 'rgba(0,0,0,0.4)'
                      }
                  }
              },
              data:[45, 30, 50, 75, 52.1, 55, 100, 85, 106]
          }
      ]
    });
*/
    /*
    var histogramChart = echarts.init(document.getElementById('histogramChart'));
    histogramChart.setOption({

      color:["#87cefa","#ff7f50","#32cd32","#da70d6",],
      legend: {
          y : '250',
          x : 'center',
          data : ['自来水深度处理','污水处理','烟气脱硝','黑臭水体治理'],
          textStyle : {
              color : '#ffffff',

          }
      },

      calculable :false,


      grid:{
              left: '5%',
              right: '5%',
              bottom: '20%',
              containLabel: true
      },

      tooltip : {
          trigger: 'axis',
          axisPointer : {
              type : 'shadow'
          }
      },

      xAxis : [
          {
              type : 'value',
              axisLabel: {
                  show: true,
                  textStyle: {
                      color: '#fff'
                  }
              },
              splitLine:{
                  lineStyle:{
                      color:['#f2f2f2'],
                      width:0,
                      type:'solid'
                  }
              }

          }
      ],

      yAxis : [
          {
              type : 'category',
              data:['门诊人数(人)', '住院人次(人)','人均费用(元)'],
              axisLabel: {
                  show: true,
                  textStyle: {
                      color: '#fff'
                  }
              },
              splitLine:{
                  lineStyle:{
                      width:0,
                      type:'solid'
                  }
              }
          }
      ],

      series : [
          {
              name:'厦门第一医院',
              type:'bar',
              stack: '总量',
              itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
              data:[320, 302, 301]
          },
          {
              name:'厦门中山医院',
              type:'bar',
              stack: '总量',
              itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
              data:[120, 132, 101]
          },
          {
              name:'厦门中医院',
              type:'bar',
              stack: '总量',
              itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
              data:[220, 182, 191]
          },
          {
              name:'厦门第五医院',
              type:'bar',
              stack: '总量',
              itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
              data:[150, 212, 201]
          }

      ]
   });
*/
    /*
   var lineChart2 = echarts.init(document.getElementById('lineChart2'));
    lineChart2.setOption({

        color:["#87cefa","#ff7f50","#32cd32","#da70d6",],
        legend: {
            y : '260',
            x : 'center',
            textStyle : {
                color : '#ffffff',

            },
            data : ['自来水深度处理','污水处理','烟气脱硝','黑臭水体治理'],
        },
        calculable : false,
        tooltip : {
            trigger: 'item',
            formatter: "{a}<br/>{b}<br/>{c}条"
        },
        yAxis: [
            {
                type: 'value',
                axisLine : {onZero: false},
                axisLine:{
                    lineStyle:{
                        color: '#034c6a'
                    },
                },

                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    },
                    formatter: function (value) {
                        return value + "k条"
                    },
                },
                splitLine:{
                    lineStyle:{
                        width:0,
                        type:'solid'
                    }
                }
            }
        ],
        xAxis: [
            {
                type: 'category',
                data : ['8:00','10:00','12:00','14:00','16:00','18:00'],
                axisLine:{
                    lineStyle:{
                        color: '#034c6a'
                    },
                },
                splitLine: {
                    "show": false
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    },
                    formatter: function (value) {
                        return value + ""
                    },
                },
                splitLine:{
                    lineStyle:{
                        width:0,
                        type:'solid'
                    }
                },
            }
        ],
        grid:{
            left: '5%',
            right: '5%',
            bottom: '20%',
            containLabel: true
        },
        series : [
            {
                name:'自来水深度处理',
                type:'line',
                smooth:true,
                itemStyle: {
                    normal: {
                        lineStyle: {
                            shadowColor : 'rgba(0,0,0,0.4)'
                        }
                    }
                },
                data:[15, 0, 20, 45, 22.1, 25,].reverse()
            },
            {
                name:'污水处理',
                type:'line',
                smooth:true,
                itemStyle: {
                    normal: {
                        lineStyle: {
                            shadowColor : 'rgba(0,0,0,0.4)'
                        }
                    }
                },
                data:[25, 10, 30, 55, 32.1, 35, ].reverse()
            },
            {
                name:'烟气脱硝',
                type:'line',
                smooth:true,
                itemStyle: {
                    normal: {
                        lineStyle: {
                            shadowColor : 'rgba(0,0,0,0.4)'
                        }
                    }
                },
                data:[35, 20, 40, 65, 42.1, 45, ].reverse()
            },
            {
                name:'黑臭水体治理 ',
                type:'line',
                smooth:true,
                itemStyle: {
                    normal: {
                        lineStyle: {
                            shadowColor : 'rgba(0,0,0,0.4)'
                        }
                    }
                },
                data:[45, 30, 50, 75, 52.1, 55, 6].reverse()
            }
        ]
    });

*/

}

function init2(){
  var lineChart3 = echarts.init(document.getElementById('lineChart3'));
  lineChart3.setOption({

    color:["#87cefa","#ff7f50",],
    legend: {
        y : 'top',
        x : 'center',
        textStyle : {
            color : '#ffffff',

        },
         data : ['门诊人次','住院人次'],
    },
    calculable : false,
    tooltip : {
        trigger: 'item',
        formatter: "{a}<br/>{b}<br/>{c}人"
    },
    dataZoom: {
         show: true,
         realtime : true,
         start: 0,
         end: 18,
         height: 20,
         backgroundColor: '#f8f8f8',
         dataBackgroundColor: '#e4e4e4',
         fillerColor: '#87cefa',
         handleColor: '#87cefa',
     },
    yAxis: [
          {
              type: 'value',
              axisLine : {onZero: false},
              axisLine:{
                  lineStyle:{
                      color: '#034c6a'
                  },
              },

              axisLabel: {
                  textStyle: {
                      color: '#fff'
                  },
                  formatter: function (value) {
                      return value + "人"
                  },
              },
              splitLine:{
                  lineStyle:{
                      width:0,
                      type:'solid'
                  }
              }
          }
      ],
      xAxis: [
          {
              type: 'category',
              data : symptomName,
              boundaryGap : false,
              axisLine:{
                  lineStyle:{
                      color: '#034c6a'
                  },
              },
              splitLine: {
                  "show": false
              },
              axisLabel: {
                  textStyle: {
                      color: '#fff'
                  },
                  formatter: function (value) {
                      return value + ""
                  },
              },
              splitLine:{
                  lineStyle:{
                      width:0,
                      type:'solid'
                  }
              },
          }
      ],
      grid:{
              left: '5%',
              right: '5%',
              bottom: '20%',
              containLabel: true
      },
      series : [
        {
            name:'门诊费用',
            type:'line',
            smooth:true,
            itemStyle: {
                normal: {
                    lineStyle: {
                        shadowColor : 'rgba(0,0,0,0.4)'
                    }
                }
            },
            data:[1150, 180, 2100, 2415, 1212.1, 3125,1510, 810, 2100, 2415, 1122.1, 3215,1510, 801, 2001, 2245, 1232.1, 3245,1520, 830, 2200, 2145, 1223.1, 3225,150, 80, 200, 245, 122.1, 325]
        },
        {
            name:'住院费用',
            type:'line',
            smooth:true,
            itemStyle: {
                normal: {
                    lineStyle: {
                        shadowColor : 'rgba(0,0,0,0.4)'
                    }
                }
            },
            data:[2500, 1000, 3000, 5005, 3200.1, 3005, 2500, 1000, 3000, 5005, 3200.1, 3005,2500, 1000, 3000, 5005, 3200.1, 3005,2500, 1000, 3000, 5005, 3200.1, 3005, 2500, 1000, 3000, 5005, 3200.1, 3005,2500, 1000, 3000, 5005, 3200.1, 3005,]
        },
    ]
  });


  var lineChart4 = echarts.init(document.getElementById('lineChart4'));
  lineChart4.setOption({

    color:["#87cefa","#ff7f50",],
    calculable : false,
    tooltip : {
        trigger: 'item',
        formatter: "{a}<br/>{b}<br/>{c}元"
    },
    dataZoom: {
         show: true,
         realtime : true,
         start: 0,
         end: 18,
         height: 20,
         backgroundColor: '#f8f8f8',
         dataBackgroundColor: '#e4e4e4',
         fillerColor: '#87cefa',
         handleColor: '#87cefa',
     },
    yAxis: [
          {
              type: 'value',
              axisLine : {onZero: false},
              axisLine:{
                  lineStyle:{
                      color: '#034c6a'
                  },
              },

              axisLabel: {
                  textStyle: {
                      color: '#fff'
                  },
                  formatter: function (value) {
                      return value + "元"
                  },
              },
              splitLine:{
                  lineStyle:{
                      width:0,
                      type:'solid'
                  }
              }
          }
      ],
      xAxis: [
          {
              type: 'category',
              data : symptomName,
              boundaryGap : false,
              axisLine:{
                  lineStyle:{
                      color: '#034c6a'
                  },
              },
              splitLine: {
                  "show": false
              },
              axisLabel: {
                  textStyle: {
                      color: '#fff'
                  },
                  formatter: function (value) {
                      return value + ""
                  },
              },
              splitLine:{
                  lineStyle:{
                      width:0,
                      type:'solid'
                  }
              },
          }
      ],
      grid:{
              left: '5%',
              right: '5%',
              bottom: '20%',
              containLabel: true
      },
      series : [
        {
            name:'医疗费用',
            type:'line',
            smooth:true,
            itemStyle: {
                normal: {
                    lineStyle: {
                        shadowColor : 'rgba(0,0,0,0.4)'
                    }
                }
            },
            data:[1500, 800, 1200, 2450, 1122.1, 1325,1150, 180, 1200, 1245, 1122.1, 1325,150, 180, 1200, 2145, 1212.1, 3215,1510, 180, 2100, 2415, 122.1, 325,150, 80, 200, 245, 122.1, 325].reverse()
        },
    ]
  });

  //年龄分布
  var pieChart2 = echarts.init(document.getElementById('pieChart2'));
  pieChart2.setOption({
    color:["#32cd32","#ff7f50","#87cefa","#FD6C88","#4b5cc4","#faff72"],
    tooltip : {
     trigger: 'item',
     formatter: "{a}<br/>{b}<br/>{c}人"
    },
    calculable : true,
    series : [
        {
            name:'发病人数',
            type:'pie',
            radius : [30, 110],
            center : ['50%', '50%'],
            roseType : 'area',
            x: '50%',



            sort : 'ascending',
            data:[
                {value:10, name:'婴儿(1-3岁)'},
                {value:5, name:'少儿(4-10岁)'},
                {value:15, name:'少年(10-18岁)'},
                {value:25, name:'青年(18-45岁)'},
                {value:125, name:'中年(45-60岁)'},
                {value:175, name:'老年(60岁以上)'},
            ]
        }
    ]
  })

  //医疗费用组成
  var pieChart3 = echarts.init(document.getElementById('pieChart3'));
  pieChart3.setOption({
    color:["#32cd32","#ff7f50","#87cefa","#FD6C88","#4b5cc4","#faff72"],
    tooltip : {
     trigger: 'item',
     formatter: "{a}<br/>{b}<br/>{c}元"
    },
    calculable : true,
    series : [
        {
            name:'发病人数',
            type:'pie',
            radius : [30, 110],
            center : ['50%', '50%'],
            roseType : 'area',
            x: '50%',



            sort : 'ascending',
            data:[
                {value:10, name:'诊察费用'},
                {value:500, name:'检查费用'},
                {value:150, name:'检验费用'},
                {value:250, name:'西药费用'},
                {value:125, name:'中药费用'},
                {value:1750, name:'手术费用'},
            ]
        }
    ]
  })
}
