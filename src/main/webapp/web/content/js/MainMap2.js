/**
 * Main地图服务js
 */

var localhost = "http://127.0.0.1:8090";


var map = null;
var layer = null;
var vectorLayer_WG, vectorLayer_Grid, maplayer,vectorLayer1,cjsvectorLayer,MousePosition,vectorLayer2, vectorLayer3,utfGridMaplayer,utfGridControl;
var tempLayerID = null;
var local, drawLine, lineLayer,diming,dinajidrawPoint, mingchen1,tucengMC;
var url = localhost + "/iserver/services/map-MeiZhouShi/rest/maps/meizhou";
var utfgrid, utfclickcontron, chartLayer;
var pieChartDom;
var elementsDiv;
var isMapMoving = false,isdblckick=false;
var quyuMC,quyuresult;


style = {
	strokeColor : "#304DBE",
	strokeWidth : 2,
	pointerEvents : "visiblePainted",
	fillColor : "#304DBE",
	fillOpacity : 0.1
},
style1 = {
		strokeColor : 'Orange',// 边颜色
		strokeWidth : 1,// 边宽度
		strokeDashstyle : 'solid',// 边类型，虚线
		fillColor : 'Orange',// 填充颜色
		fillOpacity : 0.1,// 透明度
		fontColor : 'Orange',
		fontOpacity : "1",
		fontSize : '10px',
	},

// 加载
$(function() {
	getLayersInfo();
})

// 影像
function showyinxiang() {
	layer.params.layersID = "[0:0,1,21,22,25,26]";
	layer.redraw();
}

// 矢量
function show() {
	layer.params.layersID = "[0:0,1,21,22,24,25,26]";
	layer.redraw();
}

function getLayersInfo() {
	// 点图层
  cjsvectorLayer = new SuperMap.Layer.Vector("Vector Layer");
  vectorLayer1 = new SuperMap.Layer.Vector("Vector Layer1");
  vectorLayer2 = new SuperMap.Layer.Vector("Layer2");
  vectorLayer3 = new SuperMap.Layer.Vector("Layer3");
  // 点查询
  drawPoint = new SuperMap.Control.DrawFeature(cjsvectorLayer, SuperMap.Handler.Point);
     
  //点击图层
  dinajidrawPoint = new SuperMap.Control.DrawFeature(vectorLayer2, SuperMap.Handler.Point);
  dinajidrawPoint.events.on({"featureadded": dinajidrawPointCompleted});
  
	// 新建线矢量图层
	lineLayer = new SuperMap.Layer.Vector("lineLayer");
	// 对线图层应用样式style（前面有定义）
	lineLayer.style = style;

	polygonLayer = new SuperMap.Layer.Vector("polygonLayer");
	// 对面图层应用样式style（前面有定义）
	polygonLayer.style = style;

	// 创建画线控制，图层是lineLayer;这里DrawFeature(图层,类型,属性)；multi:true在将要素放入图层之前是否现将其放入几何图层中
	drawLine = new SuperMap.Control.DrawFeature(lineLayer,
			SuperMap.Handler.Path, {
				multi : true
			});

	drawPolygon = new SuperMap.Control.DrawFeature(polygonLayer,
			SuperMap.Handler.Polygon);
	drawPolygon.events.on({
		"featureadded" : drawCompleted
	});

	/*
	 * 注册featureadded事件,触发drawCompleted()方法 例如注册"loadstart"事件的单独监听 events.on({
	 * "loadstart": loadStartListener });
	 */
	drawLine.events.on({
		"featureadded" : drawxian
	});

	// 获取地图状态参数必设：url
	var getLayersInfoService = new SuperMap.REST.GetLayersInfoService(url);
	maplayer = new SuperMap.Layer.Range(url);
	vectorLayer_WG = new SuperMap.Layer.Vector("默认图层"); // 创建图层
	vectorLayer_Grid = new SuperMap.Layer.Vector("网格");
	getLayersInfoService.events.on({
		"processCompleted" : getLayersInfoCompleted
	});
	getLayersInfoService.processAsync();

}




// 与服务器交互成功，得到子图层信息
var subLayers = new Array();
function getLayersInfoCompleted(getLayersInfoEventArgs) {
	if (getLayersInfoEventArgs.result) {
		{
			if (getLayersInfoEventArgs.result.subLayers) {
				for (var j = 0; j < getLayersInfoEventArgs.result.subLayers.layers.length; j++) {
					subLayers
							.push(getLayersInfoEventArgs.result.subLayers.layers[j]);
				}
			}
		}
	}
	installPanel(subLayers);
}

// 组装操作面板，显示子图层列表，并初始化地图显示
function installPanel(subLayers) {
	var layersList = "";
	for (var i = 0; i < subLayers.length; i++) {
		if (eval(subLayers[i].visible) == true) {
			layersList += '<label class="checkbox" style="line-height: 28px; display: block"><input type="checkbox"  class = "checkboxSel" id="layersList'
					+ i
					+ '" name="layersList" value="'
					+ subLayers[i].name
					+ '" checked=true title="是否可见" />'
					+ subLayers[i].name
					+ '</label>';
		} else {
			layersList += '<label class="checkbox" style="line-height: 28px; display: block"><input type="checkbox" class = "checkboxSel" id="layersList'
					+ i
					+ '" name="layersList" value="'
					+ subLayers[i].name
					+ '" title="是否可见"  />' + subLayers[i].name + '</label>';
		}
	}
	showWindow(layersList);
	$(".checkbox").click(setLayerStatus);

	// 样式为BootStrap框架设置
	$(".checkbox").hover(function() {
		$(this).addClass("label-success");
	}, function() {
		$(this).removeClass("label-success");
	});
	createTempLayer();
}

// 创建临时图层来初始化当前地图显示
function createTempLayer() {
	// 子图层控制参数必设：url、mapName、SetLayerStatusParameters
	var layerStatusParameters = new SuperMap.REST.SetLayerStatusParameters();
	layerStatusParameters = getLayerStatusList(layerStatusParameters);

	var setLayerStatusService = new SuperMap.REST.SetLayerStatusService(url);
	setLayerStatusService.events.on({
		"processCompleted" : createTempLayerCompleted
	});
	setLayerStatusService.processAsync(layerStatusParameters);
}

// 获取当前地图子图层状态信息
function getLayerStatusList(parameters) {
	var layersList = document.getElementsByName("layersList");
	for (var i = 0; i < layersList.length; i++) {
		var layerStatus = new SuperMap.REST.LayerStatus();
		layerStatus.layerName = layersList[i].value;
		layerStatus.isVisible = eval(layersList[i].checked);
		parameters.layerStatusList.push(layerStatus);
	}
	// 设置资源在服务端保存的时间，单位为分钟，默认为10
	parameters.holdTime = 30;
	return parameters;
}


//移动
function refreshUTFGridLayer(){
	 
	var layerName = "区县界_region@meizhoumap";
	if(!layerName || layerName==""){
		return ;
	}
	if(utfGridMaplayer!=null){// not first
		// 必须先destory，客户端bug，，先绕过去。
   		utfGridControl.destroy();
		map.removeLayer(utfGridMaplayer);
		map.removeControl(utfGridControl);
		utfGridMaplayer = null;
		utfGridControl = null;
	}
	utfGridMaplayer = new SuperMap.Layer.UTFGrid("UTFGridLayer", url,
                {
                    layerName:"区县界_region@meizhoumap",/* 客户端带#的图层有bug，不能显示 */
                    utfTileSize: 256,
                    pixcell: 16,
                    isUseCache: true
                },
                {
                    utfgridResolution: 16
                }
    );
    utfGridMaplayer.maxExtent = layer.maxExtent;
    utfGridControl = new SuperMap.Control.UTFGrid({
        layers: [utfGridMaplayer],
        callback: utfGridCallBack,
        handlerMode: "move"
    });

    if(map.scales){
        utfGridMaplayer.scales = map.scales;
    }
  
    //
   /* utfgrid = new SuperMap.Layer.UTFGrid("UTFGridLayer1", url,
            {
                layerName:"区县界_region@meizhoumap", 客户端带#的图层有bug，不能显示 
                utfTileSize: 256,
                pixcell: 16,
                isUseCache: true
            },
            {
                utfgridResolution: 16
            }
);
    utfgrid.maxExtent = layer.maxExtent;
    utfclickcontron = new SuperMap.Control.UTFGrid({
    layers: [utfgrid],
    callback: clickcallback,
    handlerMode: "click"
});*/
    map.addControl(utfGridControl);
    //map.addControl(utfclickcontron);
    map.addLayers([utfGridMaplayer]);
}

function addUTFGridLayer(){
 	map.addLayers([utfGridMaplayer]);
}
var infomovdata,pixelmovdata;
var itemStyle= {
    normal: {
　　　　　　　　//好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                  color: function(params) {
                      // build a color map as your need.
                      var colorList = [
                   	   '#30A4D5','#F4B359','#5C5E53','#FDF500','#E42227',
                          '#1D7C00'
                      ];
                      return colorList[params.dataIndex]
                  },
　　　　　　　　//以下为是否显示，显示位置和显示格式的设置了
                  /*label: {
                      show: true,
                      position: 'top',
//                       formatter: '{c}'
                      formatter: '{b}\n{c}'
                  }*/
              }
          }
var yAxis=[
    {
        type: 'value',
        name: '价值量（亿）',
        /*min: function(value) {
            return 0;
        }*/
        /*splitNumber:6,
        minInterval:0.1,
        maxInterval:1000,*/
        //interval:1,
    }
]
var isclicktreenode=false;
// 移动
function utfGridCallBack(infoLookup, loc, pixel){
	pixelmovdata=pixel;
	if (infoLookup && isMapMoving === false) {
       	//var info;
       	for (var idx in infoLookup) {
       		infomovdata = infoLookup[idx];
           if (infomovdata && infomovdata.data) {
        	   if(isclicktreenode==false){
        		   setDifFeatureStyle(infomovdata.data.SmID,false); //高亮区县feature，不需要查询services
        	   }
           	
                       if(isdblckick===true){
                    	   return;
                       }
                       if (isOneData != infomovdata.data.SmID) {
                         
                    	   SelectdatabyMC(infomovdata.data.NAME);
                       }
                       else {
                           thedata = theDataCache;
                         //document.getElementById("piechart").innerHTML = "";
                           pieChartDom.style.display = "block";

                           // 基于准备好的dom，初始化echarts图表
                           var myChart = echarts.init(pieChartDom);

                           
                           theDataCache = thedata;
                           // echart 图表配置参数
                           var option = {
                              /* tooltip: {
                                   show: true
                               },*/
                        		  /* legend: {
                        	            data: ['2005', '2010', '2015'],
                        	            //align: 'right'
                        	        },*/
                        	        toolbox: {
                        	        	feature: {  
                        	                myTool1: {  
                        	                    show: true,  
                        	                    title: '关闭',  
                        	                    icon: 'image://http://localhost:8080/ResourceCheck/web/icon/close.png',  
                        	                    onclick: function (){  
                        	                    	 pieChartDom.style.display = "none";
                        	                    }  
                        	                }
                                            /*,  
                        	                myTool2: {  
                        	                    show: true,  
                        	                    title: '自定义扩展方法',  
                        	                    icon: 'image://http://echarts.baidu.com/images/favicon.png',  
                        	                    onclick: function (){  
                        	                        alert('myToolHandler2')  
                        	                    }  
                        	                }  */
                        	            }  
                        	        },
                        	        tooltip: {
                                        
                                    },
                               title: {
                                   x: "center",
                                   text: infomovdata.data.NAME + '各资源每年价值量统计'
                               }, /*dataZoom: [
                                   {
                                       type: 'slider',
                                       show: true,
                                       xAxisIndex: [0],
                                       start: 1,
                                       end: 35
                                   },
                                   {
                                       type: 'slider',
                                       show: true,
                                       yAxisIndex: [0],
                                       left: '93%',
                                       start: 29,
                                       end: 36
                                   },
                                   {
                                       type: 'inside',
                                       xAxisIndex: [0],
                                       start: 1,
                                       end: 35
                                   },
                                   {
                                       type: 'inside',
                                       yAxisIndex: [0],
                                       start: 29,
                                       end: 36
                                   }
                               ],*/
                               xAxis: 
                                   [{
                                       data: ["水", "土地", "矿产", "能源", "大气","林木"],
                                       silent: false,
                                       splitLine: {
                                           show: false
                                       }
                                   }],
                               yAxis: yAxis,
                               series: [
                                   {
                                       "name": "2005",
                                       "type": "bar",
                                       itemStyle: itemStyle,
                                       "data": thedata[0]
                                   },
                                   {
                                       "name": "2010",
                                       "type": "bar",
                                       itemStyle: itemStyle,
                                       animationDelay: function (idx) {
                                           return idx * 10;
                                       },
                                       "data": thedata[1]
                                   },
                                   {
                                       "name": "2015",
                                       "type": "bar",
                                       itemStyle: itemStyle,
                                       animationDelay: function (idx) {
                                           return idx * 10;
                                       },
                                       "data": thedata[2]
                                   }
                               ],
                               animationEasing: 'elasticOut',
                               animationDelayUpdate: function (idx) {
                                   return idx * 5;
                               }
                           };
                           // 为echarts对象加载数据
                           myChart.setOption(option, true);
                           // 图表位置
                           pieChartDom.style.left = (pixel.x + 20) + "px";
                           pieChartDom.style.top = (pixel.y - 20) + "px";
                           
                           // 图表背景颜色
                           pieChartDom.style.backgroundColor = "#F4F3F0";
                           $("#piechart").parent().css("z-index","999");
                       }
                       
                     
                   }
                   else if(isdblckick===false){
                       //清除饼图
                       //document.getElementById("piechart").innerHTML = "";
                       pieChartDom.style.display = "none";
                   }
      	}
        
       
	}
}


//echart
//鼠标移动中仍保持在同一个数据上
var isOneData = "";
var theDataCache;
var thedata;

//相同数据检测
function clickcallback(infoLookup, loc, pixel) {	
 if (infoLookup) {
     var info;
     for (var idx in infoLookup) {
         info = infoLookup[idx];
         quyuMC=info.data.NAME;
         SelectdatabyMC(quyuMC);
         if (info && info.data) {
           
         }
     }
 }
};
var yearArray;
//通过用户名称获取数据
function SelectdatabyMC(quyuMC)
{
    $.ajax({
    	url:"/ResourceCheck/areaTable/findAreaMessage.do",
    	data:{areaMC:quyuMC},
    	dataType:"json",
    	type:"post",
    	async:false,
    	success:function(result){
    		//console.log(result);//输出返回值
    		//分组年份
    		yearArray=new Array();
    		for (var i=0;i<result.length;i++)
    		{ 
    			if(yearArray.indexOf(result[i].yearMC)==-1){
    				yearArray.push(result[i].yearMC);
    			};
    		}
    		//console.log(yearArray);//输出年份数组
    		thedata=new Array();//重新创建数据数组
    		
    		for (var i=0;i<yearArray.length;i++){
    			thedata[i] = [
                    //getRandomNumber(0, 1, 0),
                    0,0,0,0,0,0
                ];
    			for (var j=0;j<result.length;j++)
        		{ 
    				//console.log(result[j].yearMC==yearArray[i]);
        			if(result[j].yearMC==yearArray[i]){
        					switch(result[j].res)
        					{
        					case "水":
        						thedata[i][0]=result[j].amountValue
        					  break;
        					case "土地":
        						thedata[i][1]=result[j].amountValue
        					  break;
        					case "矿产":
        						thedata[i][2]=result[j].amountValue
        					  break;
        					case "可再生能源":
        						thedata[i][3]=result[j].amountValue
        					  break;
        					case "大气":
        						thedata[i][4]=result[j].amountValue
        					  break;
        					case "林木":
        						thedata[i][5]=result[j].amountValue
        					  break;
        					//default:;
        					}
        			};
        		}
    		}
    		var myquxian="梅州市";
    		//console.log(thedata);
    		if(quyuMC!=""){
    			if(isDifFeatureStyle==false){
    				isOneData = infomovdata.data.SmID
        			myquxian=infomovdata.data.NAME;
    			}else{
    				isOneData=-1;
    				myquxian=quyuMC;
    				isdblckick=true;
    			}
    			
    			
    		}else{
    			isOneData=-1;
    			isdblckick=true;
    		}
    		//document.getElementById("piechart").innerHTML = "";
            pieChartDom.style.display = "block";

            // 基于准备好的dom，初始化echarts图表
            var myChart = echarts.init(pieChartDom);

            
            theDataCache = thedata;
            // echart 图表配置参数
            var option = {
            		 toolbox: {
         	        	feature: {  
         	                myTool1: {  
         	                    show: true,  
         	                    title: '关闭',  
         	                    icon: 'image://http://localhost:8080/ResourceCheck/web/icon/close.png',  
         	                    onclick: function (){  
         	                    	 pieChartDom.style.display = "none";
         	                    }  
         	                }
                             /*,  
         	                myTool2: {  
         	                    show: true,  
         	                    title: '自定义扩展方法',  
         	                    icon: 'image://http://echarts.baidu.com/images/favicon.png',  
         	                    onclick: function (){  
         	                        alert('myToolHandler2')  
         	                    }  
         	                }  */
         	            }  
         	        },
                tooltip: {
                    show: true
                },
                title: {
                    x: "center",
                    text: myquxian + '各资源每年价值量统计'
                },
                xAxis: 
                    {
                        type: 'category',
                        data: ["水", "土地", "矿产", "能源", "大气","林木"]
                    },
                    axisLabel:{
                    	formatte:function formatteshow(){
                    		return "哈哈哈哈";
                    	}
                    }
                ,
                yAxis: yAxis,
                series: [
                    {
                        "name": "2005",
                        "type": "bar",
                        itemStyle: itemStyle,
                        "data": thedata[0]
                    },
                    {
                        "name": "2010",
                        "type": "bar",
                        itemStyle: itemStyle,
                        "data": thedata[1]
                    },
                    {
                        "name": "2015",
                        "type": "bar",
                        itemStyle: itemStyle,
                        "data": thedata[2]
                    }
                ]/*,
                dataZoom: [
                    {
                        type: 'slider',
                        show: true,
                        xAxisIndex: [0],
                        start: 1,
                        end: 35
                    },
                    {
                        type: 'slider',
                        show: true,
                        yAxisIndex: [0],
                        left: '93%',
                        start: 29,
                        end: 36
                    },
                    {
                        type: 'inside',
                        xAxisIndex: [0],
                        start: 1,
                        end: 35
                    },
                    {
                        type: 'inside',
                        yAxisIndex: [0],
                        start: 29,
                        end: 36
                    }
                ]*/
            };
            // 为echarts对象加载数据
            myChart.setOption(option, true);
            if(quyuMC!=""){
            // 图表位置
            pieChartDom.style.left = (pixelmovdata.x + 20) + "px";
            pieChartDom.style.top = (pixelmovdata.y - 20) + "px";
            // 图表背景颜色
            pieChartDom.style.backgroundColor = "#F4F3F0";
            
            }
            $("#piechart").parent().css("z-index","999");
    		//quyuresult=result;
    		return result;
    	}
    })
}

// 与服务器交互成功，创建临时图层
function createTempLayerCompleted(createTempLayerEventArgs) {
	tempLayerID = createTempLayerEventArgs.result.newResourceID;
	// 创建地图控件
	map = new SuperMap.Map("map", {
		controls : [ new SuperMap.Control.ScaleLine(),
				new SuperMap.Control.Zoom(),
				new SuperMap.Control.Navigation({
					dragPanOptions : {
						enableKinetic : true,
					}
				}), drawLine, drawPolygon,drawPoint,dinajidrawPoint], // 测量控件
		units: "m", // 比例单位：米
		scales: [1 / 1100000,1 / 1000000, 1 / 800000, 1 / 600000, 1 / 400000, 1 / 200000, 1 / 100000, 1 / 50000]// 设置可缩放级别，配合切片
	});
	//地图移动过程中不显示图表
    map.events.on({
        "movestart": function () {
            //document.getElementById("piechart").innerHTML = "";
            pieChartDom.style.display = "none";
            isMapMoving = true;
        }
    });
    map.events.on({
        "moveend": function () {
            isMapMoving = false;
        }
    });
	// echats
	 chartLayer = new SuperMap.Layer.Elements("eCharts");
	 // 获取 Elements 图层 div
	 elementsDiv =  chartLayer.getDiv();
	 // 设置Elements实例的div为地图大小
	 var mapsize = map.getSize();
	 elementsDiv.style.width = mapsize.w;
	 elementsDiv.style.height = mapsize.h;

	 // 创建图表 div, 设置其基本属性, 并添加到 Elements 图层
	 pieChartDom = document.createElement("div");
	 pieChartDom.id = "piechart";
	 pieChartDom.style.width = "500px";
	 pieChartDom.style.height = "240px";
	 pieChartDom.style.position = "absolute";
	 pieChartDom.style.opacity = 0.8;
	 elementsDiv.appendChild(pieChartDom);
	 
	// 创建 TiledDynamicRESTLayer
	layer = new SuperMap.Layer.TiledDynamicRESTLayer("梅州", url, {
		transparent : true,
		cacheEnabled : true,
		redirect : false,
		layersID : tempLayerID,
	}, {
	  maxResolution : "auto",
     useCanvas: false,
     useCORS: true
	});
	layer.events.on({
		"layerInitialized" : addLayer
	});
 //map.events.on({"click":drawGeometry4});  // 添加click事件
	saveAreaLayer = new SuperMap.Layer.Vector("区县界"); //定义区县界矢量图层
}



// 添加图层
function addLayer() {
	map.addLayers([layer,chartLayer, //
	  vectorLayer_WG, 
	  vectorLayer_Grid,
	  maplayer,
	  lineLayer,
	  polygonLayer,
	  cjsvectorLayer,
	  vectorLayer1,
	  vectorLayer2,
	  vectorLayer3,
	  saveAreaLayer
    ]);
	map.setCenter(new SuperMap.LonLat(116.12 , 24.16), 1); // 设置中心，缩放级别(0级开始)
	refreshUTFGridLayer();
	findAllAreaFeaturesTo();//查询所有区县要素
}

// 点击查询
function drawGeometry4() {
    // 先清除上次的显示结果
	clearFeatures();
    dinajidrawPoint.activate();
}



// 鼠标移入点
function drawGeometry3(e) {
	// 、
    // 先清除上次的显示结果
	clearFeatures();
    drawPoint.activate();
}



// 子图层可见性控制
function setLayerStatus() {
	var layersList = document.getElementsByName("layersList");
	var str = "[0:";
	for (var i = 0; i < layersList.length; i++) {
		if (eval(layersList[i].checked) == true) {
			if (i < layersList.length) {
				str += i.toString();

			}
			if (i < layersList.length - 1) {
				str += ",";
			}
		}
	}
	str += "]";
	// 当所有图层都不可见时
	if (str.length < 5) {
		str = "[]";
	}
	layer.params.layersID = str;

	layer.redraw();
}

// 与服务器交互成功，修改临时图层的子图层可见性
function setLayerStatusCompleted(setLayerStatusEventArgs) {
	// 刷新显示临时图层
	layer.redraw();
}

function showWindow(winMessage) {
	if (document.getElementById("popupWin")) {
		$("#popupWin").css("display", "block");
	} else {
		$("<div id='popupWin'></div>").addClass("popupWindow").appendTo(
				$("#result"));
	}
	$("#popupWin").css("display", "none");
	var str = "";
	str += '<div class="winTitle" onMouseDown="startMove(this,event)" onMouseUp="stopMove(this,event)"><span class="title_left">World地图子图层</span><span class="title_right"><a href="javascript:closeWindow()" title="关闭窗口">关闭</a></span><br style="clear:right"/></div>'; // 标题栏

	str += '<div class="winContent" style="overflow-y:auto;height:400px;">';
	str += winMessage;
	str += '</div>';
	$("#popupWin").html(str);
	document.getElementById("popupWin").style.width = "250px";
	document.getElementById("popupWin").style.height = "432px";
}
window.closeWindow = function() {
	$("#popupWin").css("display", "none");
}
window.startMove = function(o, e) {
	var wb;
	if (SuperMap.Browser.name === "msie" && e.button === 1)
		wb = true;
	else if (e.button === 0)
		wb = true;
	if (wb) {
		var x_pos = parseInt(e.clientX - o.parentNode.offsetLeft);
		var y_pos = parseInt(e.clientY - o.parentNode.offsetTop);
		if (y_pos <= o.offsetHeight) {
			document.documentElement.onmousemove = function(mEvent) {
				var eEvent = (SuperMap.Browser.name === "msie") ? event
						: mEvent;
				o.parentNode.style.left = eEvent.clientX - x_pos + "px";
				o.parentNode.style.top = eEvent.clientY - y_pos + "px";
			}
		}
	}
}
window.stopMove = function(o, e) {
	document.documentElement.onmousemove = null;
}

// 距离测算
function distanceMeasure() {
	clearFeatures();
	drawLine.activate();
	isdblckick = true;//关闭移动弹出统计图
	isMapMoving = true; //关闭移动高亮区县
}

// 绘完触发事件
function drawxian(drawGeometryArgs) {
	// 停止画面控制
	drawLine.deactivate();
	// alert(drawGeometryArgs.feature.geometry.x+drawGeometryArgs.feature.geometry.y);
	// 获得图层几何对象
	var geometry = drawGeometryArgs.feature.geometry, measureParam = new SuperMap.REST.MeasureParameters(
			geometry), /* MeasureParameters：量算参数类。 客户端要量算的地物间的距离或某个区域的面积 */
	myMeasuerService = new SuperMap.REST.MeasureService(url); // 量算服务类，该类负责将量算参数传递到服务端，并获取服务端返回的量算结果
	myMeasuerService.events.on({
		"processCompleted" : measureCompletedxian
	});

	// 对MeasureService类型进行判断和赋值，当判断出是LineString时设置MeasureMode.DISTANCE，否则是MeasureMode.AREA

	myMeasuerService.measureMode = SuperMap.REST.MeasureMode.DISTANCE;

	myMeasuerService.processAsync(measureParam); // processAsync负责将客户端的量算参数传递到服务端。
}

// 测量结束调用事件
function measureCompletedxian(measureEventArgs) {
  var distance = measureEventArgs.result.distance;
  var unit = measureEventArgs.result.unit;
  layui.use('layer', function(){
    var layer = layui.layer;
    layer.open({
      type: 1
      ,offset: 't' //具体配置参考：offset参数项
      ,content: '<div style="min-width:200px;padding:15px;text-align:center;">量算结果：' + transitionNumToShort(distance,3) + '米</div>'
      ,closeBtn: 0
      ,btn: '关闭'
      ,btnAlign: 't' //按钮居上
      ,shade: 0 //不显示遮罩
      ,yes: function(index){
        layer.close(index);
        isdblckick = false;//打开移动弹出统计图
        isMapMoving = false; //打开移动高亮区县
        clearFeatures();//清空测量
      }
    });
  });
}


// 移除图层要素
function clearFeatures() {
	lineLayer.removeAllFeatures();
	polygonLayer.removeAllFeatures();
	cjsvectorLayer.removeAllFeatures();
	vectorLayer1.removeAllFeatures();
	vectorLayer_WG.removeAllFeatures();// 清除上一次查询
	vectorLayer2.removeAllFeatures();
	vectorLayer3.removeAllFeatures();
}

function clearFeatures23() {
	lineLayer.removeAllFeatures();
	polygonLayer.removeAllFeatures();
	cjsvectorLayer.removeAllFeatures();
	vectorLayer1.removeAllFeatures();
	vectorLayer_WG.removeAllFeatures();// 清除上一次查询
}

// 点查询
function drawPointCompleted(drawGeometryArgs) {

    drawPoint.deactivate();
    var feature = new SuperMap.Feature.Vector();
    
    if(drawGeometryArgs.feature==null){
    	var pointgeometry = new SuperMap.Geometry.Point(drawGeometryArgs.lon, drawGeometryArgs.lat);
    	feature.geometry =pointgeometry;
    }else{
    	feature.geometry = drawGeometryArgs.feature.geometry;
    }
    
    
    feature.style = style;
    cjsvectorLayer.addFeatures(feature);

    var queryParam, queryByGeometryParameters, queryService;
    queryParam = new SuperMap.REST.FilterParameter({name: "区县界_region@meizhoumap"});
    queryByGeometryParameters = new SuperMap.REST.QueryByGeometryParameters({
        queryParams: [queryParam],
        geometry: new SuperMap.Geometry.Point(drawGeometryArgs.lon, drawGeometryArgs.lat),
        spatialQueryMode: SuperMap.REST.SpatialQueryMode.INTERSECT
    });
    queryService = new SuperMap.REST.QueryByGeometryService(url, {
        eventListeners: {
            "processCompleted": processCompleted,
            "processFailed": processFailed
        }
    });
    queryService.processAsync(queryByGeometryParameters);
}

function processCompleted(queryEventArgs) {
	    var currentCount= queryEventArgs.originResult.currentCount
	    if (currentCount ==1){
	   	 var mingchen=queryEventArgs.originResult.recordsets[0].features[0].fieldValues[12];
		  if (mingchen !=diming){
			  clearFeatures23();
				var N = [], S = [], W = [], E = [],bounds
			    drawPoint.deactivate();
			    var i, j, result = queryEventArgs.result;
			    if (result && result.recordsets) {
			        for (i=0, recordsets=result.recordsets, len=recordsets.length; i<len; i++) {
			            if (recordsets[i].features) {
			                for (j=0; j<recordsets[i].features.length; j++) {
			                    var feature = recordsets[i].features[j];
			                    var point = feature.geometry;
			                   diming=feature.attributes.NAME;
			                    if(point.CLASS_NAME == SuperMap.Geometry.Point.prototype.CLASS_NAME){
			                       
			                    }else{
			                        feature.style = style1;
			                        vectorLayer1.addFeatures(feature);
			                        bounds = feature.geometry.bounds;
									if (bounds != null) {
										if (bounds.top != null
												&& Boolean(bounds.top) == true) {
											N.push(Number(bounds.top));
										}
										if (bounds.bottom != null
												&& Boolean(bounds.bottom) == true) {
											S.push(Number(bounds.bottom));
										}
										if (bounds.left != null
												&& Boolean(bounds.left) == true) {
											W.push(Number(bounds.left));
										}
										if (bounds.right != null
												&& Boolean(bounds.right) == true) {
											E.push(Number(bounds.right));
										}
									}
			                    }
			                }
			            }
			        }
			    }
		  }else{
			  
		  }  
    }
}

// 面积
function areaMeasure() {
	clearFeatures();
	drawPolygon.activate();
	isdblckick = true;//关闭移动弹出统计图
    pieChartDom.style.display = "true";
	isMapMoving = true; //关闭移动高亮区县
}

// 绘完触发事件
function drawCompleted(drawGeometryArgs) {
	// 停止画面控制
	drawPolygon.deactivate();
	// alert(drawGeometryArgs.feature.geometry.x+drawGeometryArgs.feature.geometry.y);
	// 获得图层几何对象
	var geometry = drawGeometryArgs.feature.geometry, measureParam = new SuperMap.REST.MeasureParameters(
			geometry), /* MeasureParameters：量算参数类。 客户端要量算的地物间的距离或某个区域的面积 */
	myMeasuerService = new SuperMap.REST.MeasureService(url); // 量算服务类，该类负责将量算参数传递到服务端，并获取服务端返回的量算结果
	myMeasuerService.events.on({
		"processCompleted" : measureCompleted
	});

	// 对MeasureService类型进行判断和赋值，当判断出是LineString时设置MeasureMode.DISTANCE，否则是MeasureMode.AREA

	myMeasuerService.measureMode = SuperMap.REST.MeasureMode.AREA;

	myMeasuerService.processAsync(measureParam); // processAsync负责将客户端的量算参数传递到服务端。
}

// 测量结束调用事件
function measureCompleted(measureEventArgs) {
	var area = measureEventArgs.result.area, unit = measureEventArgs.result.unit;
	layui.use('layer', function(){
    var layer = layui.layer;
    layer.open({
      type: 1
      ,offset: 't' //具体配置参考：offset参数项
      ,content: '<div style="min-width:200px;padding:15px;text-align:center;">量算结果：' + transitionNumToShort(area,3) + '平方米</div>'
      ,closeBtn: 0
      ,btn: '关闭'
      ,btnAlign: 't' //按钮居上
      ,shade: 0 //不显示遮罩
      ,yes: function(index){
        layer.close(index);
        isMapMoving = false; //打开移动高亮区县
        clearFeatures();//清空测量
      }
    });
  });
}
var clickTreeName="";
// 点击树形节点跳转对应地图
function areaShow(name) {
	clickTreeName=name;
	clearFeatures();
	clearFeatures23();
	var SmID;
	isclicktreenode=true;
	if (name == "梅县区") {
		SmID = 1;
	} else if (name == "蕉岭县") {
		SmID = 2;
	} else if (name == "梅江区") {
		SmID = 3;
	} else if (name == "兴宁市") {
		SmID = 4;
	} else if (name == "丰顺县") {
		SmID = 7;
	} else if (name == "五华县") {
		SmID = 11;
	} else if (name == "大埔县") {
		SmID = 15;
	} else if (name == "平远县") {
		SmID = 16;
	}else if (name == "梅州市"){
		setDifFeatureStyle(0,true);
		return;
	}
	setDifFeatureStyle(SmID,true);
}

// 获取对地图的SmID进行跳转
function clickSelectMapBYZoneLocation(SmID) {
	// 声明字段
	var queryParam = [], queryBySQLParams, queryBySQLService;
	queryParam.push(new SuperMap.REST.FilterParameter({
		name : "区县界_region@meizhoumap",// 查询数据集名称或者图层名称，根据实际的查询对象而定，必设属性
		attributeFilter : "SmID=" + SmID,// 属性过滤条件 相当于 SQL 语句中的 WHERE 子句，
	}));
	// SQL 查询参数类。 该类用于设置 SQL 查询的相关参数。
	queryBySQLParams = new SuperMap.REST.QueryBySQLParameters({
		queryParams : queryParam
	});
	// SQL 查询服务类。 在一个或多个指定的图层上查询符合 SQL 条件的空间地物信息。
	queryBySQLService = new SuperMap.REST.QueryBySQLService(url, {// url
																	// 服务的访问地址
		eventListeners : {
			"processCompleted" : processCompleted_PG,
			"processFailed" : processFailed_PG
		}
	});
	// 传递到服务端
	queryBySQLService.processAsync(queryBySQLParams);
}
function processFailed_PG(er) {

}


// 跳转画面
function processCompleted_PG(queryEventArgs) {
	// 声明字段
	var i, j, feature, bounds, N = [], S = [], W = [], E = [], result = queryEventArgs.result;// 获取服务器传回来的数据
	vectorLayer_WG.removeAllFeatures();// 清除上一次查询
	clearFeatures();
	var features = [];
	// 判断是否有数据
	if (result && result.recordsets) {// 判断查询的查询结果记录集数组是否为空
		for (i = 0; i < result.recordsets.length; i++) {// 循环记录集数组
			// features===用于存放矢量要素
			if (result.recordsets[i].features) {// 判断记录集数组的矢量要素是否为空
				// 如果记录集数组的矢量要素不为空，则又循环 记录集数组的矢量要素
				for (j = 0; j < result.recordsets[i].features.length; j++) {
					feature = result.recordsets[i].features[j];// 获取记录集数组的矢量要素
					// 判断显示面或点
					if (feature.geometry.CLASS_NAME == SuperMap.Geometry.Point.prototype.CLASS_NAME) {// 判断返回的数据是不是这个数据

					} else {
						// 社区网格
						feature.style = {
							strokeColor : 'Orange',// 边颜色
							strokeWidth : 1,// 边宽度
							strokeDashstyle : 'solid',// 边类型，虚线
							fillColor : 'Orange',// 填充颜色
							fillOpacity : 0.15,// 透明度
							label : feature.data.Name,
							fontColor : 'Orange',
							fontOpacity : "1",
							fontSize : '10px',
							fontWeight : 700
						};
						vectorLayer_WG.addFeatures(feature);// 给这个图层添加features。也就是把查询结果显示出来
						  bounds = feature.geometry.bounds;
							if (bounds != null) {
								if (bounds.top != null
										&& Boolean(bounds.top) == true) {
									N.push(Number(bounds.top));
								}
								if (bounds.bottom != null
										&& Boolean(bounds.bottom) == true) {
									S.push(Number(bounds.bottom));
								}
								if (bounds.left != null
										&& Boolean(bounds.left) == true) {
									W.push(Number(bounds.left));
								}
								if (bounds.right != null
										&& Boolean(bounds.right) == true) {
									E.push(Number(bounds.right));
								}
							}	
					}
				}
			}
		}
	}
	
	if(bootzoom){
		if (W.length > 0 && S.length > 0 && E.length > 0 && N.length > 0) {
			var bounds = new SuperMap.Bounds(Math.min.apply(null, W),// 最小的水平坐标系。
			Math.min.apply(null, S),// 最小的垂直坐标系。
			Math.max.apply(null, E),// 最大的水平坐标系。
			Math.max.apply(null, N) // 最大的垂直坐标系。
			);
		 bootzoom=false;
		 map.zoomToExtent(bounds);// 缩放到指定范围，重新定位中心点。
		}
	}
	
}

// 点击查询
function dinajidrawPointCompleted(drawGeometryArgs) {
	dinajidrawPoint.deactivate();
    var feature = new SuperMap.Feature.Vector();
    feature.geometry = drawGeometryArgs.feature.geometry,
            feature.style = style;
    vectorLayer2.addFeatures(feature);
    var queryParam, queryByGeometryParameters, queryService;
    queryParam = new SuperMap.REST.FilterParameter({name: "区县界_region@meizhoumap"});
    queryByGeometryParameters = new SuperMap.REST.QueryByGeometryParameters({
        queryParams: [queryParam],
      geometry: drawGeometryArgs.feature.geometry,
        spatialQueryMode: SuperMap.REST.SpatialQueryMode.INTERSECT
    });
    queryService = new SuperMap.REST.QueryByGeometryService(url, {
        eventListeners: {
            "processCompleted": dinajiprocessCompleted,
            "processFailed": processFailed
        }
    });
    queryService.processAsync(queryByGeometryParameters);
}

// 点击查询
function dinajiprocessCompleted(queryEventArgs) {
	if(queryEventArgs.originResult.recordsets[0].features[0]){
		 mingchen1=queryEventArgs.originResult.recordsets[0].features[0].fieldValues[12];
		dinajidrawPoint.deactivate();
	    var i, j, result = queryEventArgs.result;
	    if (result && result.recordsets) {
	        for (i=0, recordsets=result.recordsets, len=recordsets.length; i<len; i++) {
	            if (recordsets[i].features) {
	                for (j=0; j<recordsets[i].features.length; j++) {
	                    var feature = recordsets[i].features[j];
	                    var point = feature.geometry;
	                    if(point.CLASS_NAME == SuperMap.Geometry.Point.prototype.CLASS_NAME){
	                    }else{
	                        feature.style = style1;
	                        vectorLayer3.addFeatures(feature); 
	                    }
	                }
	            }
	        }
	    }
	} 
}


function processFailed(e) {
    alert(e.error.errorMsg);
}

// 缩小
function mapreduce() {
	map.zoomOut();
}

// 放大
function mapenlarge() {
	map.zoomIn();
}

// 全图
function quantu()
{
	map.zoomTo(0);
	map.setCenter([116.134, 24.146]);	
}

/////////////////////////////////////////////////////////////////////////
/*$("#map").click(function(e){
	  //console.log(e);
	});
$("#map div").dblclick(function(event){
	event.stopPropagation();
	if(isdblckick){
		 isdblckick=false;
	}else{
		 isdblckick=true;
	}
	  //console.log("db"+e);
	});*/
//创建EventUtil对象
var EventUtil = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        }
        else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        }
    },
    getEvent: function (event) {
        return event ? event : window.event;
    },
    //取消事件的默认行为
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
};

var menu=document.getElementById("myMenu");
EventUtil.addHandler(window, "load", function (event) {
    var mapDiv = document.getElementById("map");
    //menu = document.getElementById("myMenu");
    //关闭浏览器默认右键事件
    EventUtil.addHandler(mapDiv, "contextmenu", function (event) {
    	event = EventUtil.getEvent(event);
        EventUtil.preventDefault(event);
        isclicktreenode=false;
        if(isdblckick){
        	isdblckick=false;
        	 pieChartDom.style.display = "block";
        }else{
        	isdblckick=true;
        }
        
    });
    EventUtil.addHandler(myMenu, "contextmenu", function (event) {
        event = EventUtil.getEvent(event);
        EventUtil.preventDefault(event);
        menu.style.visibility = "visible";
    });
});
//放大 ，在当前缩放级别的基础上放大一级。
function zoomin() {
    menu.style.visibility = "hidden";
    map.zoomIn();
}
//缩小，在当前缩放级别的基础上缩小一级。
function zoomout() {
    menu.style.visibility = "hidden";
    map.zoomOut();
}

//查询所有区县要素
function findAllAreaFeaturesTo() {
  var getFeatureParam, getFeatureBySQLService, getFeatureBySQLParams;
  getFeatureParam = new SuperMap.REST.FilterParameter({
    name: "区县界_region",
    attributeFilter: "SMID > -1"
  });
  getFeatureBySQLParams = new SuperMap.REST.GetFeaturesBySQLParameters({
    queryParameter: getFeatureParam,
    toIndex: 500,
    datasetNames: ["meizhoumap:区县界_region"]
  });
  getFeatureBySQLService = new SuperMap.REST.GetFeaturesBySQLService(urlData, {
    eventListeners: {
      "processCompleted": processCompletedAllArea,
      "processFailed": processFailed
    }
  });
  getFeatureBySQLService.processAsync(getFeatureBySQLParams);
}

//要素查询成功
function processCompletedAllArea(getFeaturesEventArgs) {
  var features = [];
  var resultFeatures = getFeaturesEventArgs.result.features;
  for(var i = 0, len = resultFeatures.length; i < len; i++) {
    var feature = resultFeatures[i];
    feature.style = {
      strokeColor : 'Orange',// 边颜色
      strokeWidth : 0,// 边宽度
      strokeDashstyle : 'solid',// 边类型，虚线
      fillColor : 'Orange',// 填充颜色
      fillOpacity : 0,// 透明度
      label : feature.data.Name,
      fontColor : 'Orange',
      fontOpacity : "1",
      fontSize : '10px',
      fontWeight : 700
   };
    features.push(feature);
  }
  saveAreaLayer.addFeatures(features); //把区县feature全部保存好
  isclicktreenode=true;
  setDifFeatureStyle(0,true);
  $("#left_view_menu li:nth-child(1)").click();
}
var isDifFeatureStyle=false;
//设置要素特殊样式
function setDifFeatureStyle(fid,isZoom){
	  clearFeatures();
	  clearFeatures23();
	  
  var features = saveAreaLayer.features;
  
  if(fid == 0 && isZoom){
	  
	  quantu();
	  var pixe2=map.getPixelFromLonLat(new SuperMap.LonLat(116.134,24.146));
	  console.log(pixe2.x);
	  SelectdatabyMC("");
	  // 图表位置
      pieChartDom.style.left = (pixe2.x + 20) + "px";
      pieChartDom.style.top = (pixe2.y - 20) + "px";
      pieChartDom.style.backgroundColor = "#F4F3F0";
  }
  for(var i=0;i<features.length;i++){
    var feature = features[i];
    var smid = feature.attributes.SMID;
    if(smid == fid){
      feature.style.fillOpacity = 0.15;  //高亮样式
      feature.style.strokeWidth = 1;
      if(isZoom){
    	  var bounds, N = [], S = [], W = [], E = [];
    	  bounds = feature.geometry.bounds;
	  		if (bounds != null) {
				if (bounds.top != null && Boolean(bounds.top) == true) {
					N.push(Number(bounds.top));
				}
				if (bounds.bottom != null && Boolean(bounds.bottom) == true) {
					S.push(Number(bounds.bottom));
				}
				if (bounds.left != null && Boolean(bounds.left) == true) {
					W.push(Number(bounds.left));
				}
				if (bounds.right != null && Boolean(bounds.right) == true) {
					E.push(Number(bounds.right));
				}
			}
			if (W.length > 0 && S.length > 0 && E.length > 0 && N.length > 0) {
				var bounds = new SuperMap.Bounds(Math.min.apply(null, W),// 最小的水平坐标系。
				Math.min.apply(null, S),// 最小的垂直坐标系。
				Math.max.apply(null, E),// 最大的水平坐标系。
				Math.max.apply(null, N) // 最大的垂直坐标系。
				);
				map.zoomToExtent(bounds);// 缩放到指定范围，重新定位中心点。
			}
			//console.log(feature.geometry);
			isDifFeatureStyle=true;
			SelectdatabyMC(clickTreeName);
			var centroid = feature.geometry.getCentroid(); //获取geometry质心
			var x1 = centroid .x;
			var y1 = centroid .y;
			var pixe2=map.getPixelFromLonLat(new SuperMap.LonLat(x1,y1));
			pieChartDom.style.left = (pixe2.x + 20) + "px";
            pieChartDom.style.top = (pixe2.y - 20) + "px";
			 pieChartDom.style.backgroundColor = "#F4F3F0";
			 isDifFeatureStyle=false;
			//console.log(pixe2);
      }
    }else if(fid != 0){
      feature.style.fillOpacity = 0; 
      feature.style.strokeWidth = 0;
    }
    if(fid == 0){
    	feature.style.fillOpacity = 0.15;  //高亮样式
        feature.style.strokeWidth = 1;
    }
  }
  saveAreaLayer.redraw(); //刷新图层
}

//////////////////////////////////////////////
//获取指定范围内的随机数
// min - 范围下限
// max - 范围上限
// decimalNum - 返回结果的小数位数。如果为 0，返回整数。
function getRandomNumber(min, max, decimalNum) {
    var rNum = min + Math.random() * (max - min);

    if (decimalNum) {
        if (!isNaN(decimalNum)) {
            return rNum;
        }
        else {
            decimalNum = parseInt(decimalNum);
        }

        if (decimalNum === 0) {
            return Math.round(rNum);
        }
        else {
            return parseFloat(rNum).toFixed(decimalNum);
        }
    }
    else {
        return rNum;
    }
}