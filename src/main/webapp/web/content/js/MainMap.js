/**
 * Main地图服务js
 */
var localhost="http://127.0.0.1:8090";
var url = localhost + "/iserver/services/map-MeiZhouShi/rest/maps/meizhou"; //地图服务
var urlData = localhost + "/iserver/services/data-MeiZhouShi/rest/data";  //数据服务 
var map;
map = new ol.Map({
  target: 'map',
  controls: ol.control.defaults({ attributionOptions: { collapsed: false } }).extend([new ol.control.ScaleLine()]),
  view: new ol.View({
    center: [116.134, 24.146],
    zoom: 9,
    projection: 'EPSG:4326'
  })
});

//需要在这里添加layer
var layer = new ol.layer.Tile({
  source: new ol.source.TileSuperMapRest({
    url: url
  }),
  projection: 'EPSG:4326'
});
map.addLayer(layer);

var layer2 = new ol.layer.Tile({
  source: new ol.source.TileSuperMapRest({
    url: "http://localhost:8090/iserver/services/map-china400/rest/maps/China_4326"
  }),
  projection: 'EPSG:4326'
});
//map.addLayer(layer2);

//地图第一次渲染后执行方法
map.once('postrender', function() {
  map.updateSize();//重绘地图~
  if(isloaded){
    $("#main-loading").css("display", "none");
  }
  //查询基础显示图层
  selectBaseLayer();
  //图层管理器
  CustomLayerManage();     
  var layers = map.getLayers(); //获取地图中所有图层
});

//自定义图层管理器-接口
function CustomLayerManage(){
  $("#CutLayerManage").hover(
    function(){
      $("#layer-switcher-ct").addClass("layer-switcher-hover");
    },
    function(){
      $("#layer-switcher-ct").removeClass("layer-switcher-hover");
    }
  );
  bindLayerManage();//图层管理事件
}

//添加图层管理到图层管理器-接口
function addLyerToManage(name, ck){
  if(ck){
    $("#layer-switcher-ul").append('<li><label><input type="checkbox" checked="checked"/>' + name + '</label></li>');
  }else{
    $("#layer-switcher-ul").append('<li><label><input type="checkbox"/>' + name + '</label></li>');
  }
}

//从图层管理器移除图层管理-接口
function removeLyerToManage(name){
  $.each($("#layer-switcher-ul li"), function(index, obj){
    var li = $(obj);
    var liname = $(obj).children("label").text();
    if(liname == name){
      $(li).remove(); //移除元素
    }
  });
}

//代码点击关闭图层显示 - 接口
function hideLayerByCode(name){
  $.each($("#layer-switcher-ul li label"), function(index, obj){
    var layername = $(obj).text();
    if(name == layername){
      $(obj).click();
    }
  });
}

//绑定图层管理器事件
function bindLayerManage(){
  $.each($("#layer-switcher-ul li label"), function(index, obj){
    $(obj).on("click", function(){
      circulationLayerManage();//判断隐藏图层
    });
  });
}

//图层控制
function circulationLayerManage(){
  $.each($("#layer-switcher-ul li label"), function(index, obj){
    var name = $(obj).text();
    var ck = $(obj).children("input").is(':checked');
    if(ck){
      showCustomLayer(name);
    }else{
      hideCustomLayer(name);
    }
  });
}

//隐藏图层
function hideCustomLayer(layerName){
  var layer = getCustomLayerByName(layerName, false);
  if(layer != null && layer){
    var layerVb = layer.getVisible();
    if(layerVb == true){
      layer.setVisible(false);
    }
  }
}

//显示图层
function showCustomLayer(layerName){
  var layer = getCustomLayerByName(layerName, true);
  if(layer != null && layer){
    var layerVb = layer.getVisible();
    if(layerVb == false){
      layer.setVisible(true);
    }
  }
}

//获取图层并设置相关控件启用否
function getCustomLayerByName(layerName, visb){
  var layer = null;
  switch(layerName){
    case "基础图层":
      layer = baseThemeLayer;//获取layer
      map.removeInteraction(basePointerInteraction);
      if(visb){
        map.addInteraction(basePointerInteraction);
      }
      break;
    case "":
      break;
    case "":
      break;
    case "":
      break;
    case "":
      break;
    case "":
      break;
    default:
      break;
  }
  return layer;
}

//查询基础显示图层
var baseThemeSource,baseThemeLayer,basePointerInteraction;
function selectBaseLayer(){
  var getBaseFeatureParam, getBaseFeatureBySQLService, getBaseFeatureBySQLParams;
  getBaseFeatureParam = new SuperMap.FilterParameter({
    name: "区县界_region",
    attributeFilter: "SMID > -1"
  });
  getBaseFeatureBySQLParams = new SuperMap.GetFeaturesBySQLParameters({
    queryParameter: getBaseFeatureParam,
    toIndex: 500,
    datasetNames: ["meizhoumap:区县界_region"]
  });
  getBaseFeatureBySQLService = new SuperMap.GetFeaturesBySQLService(urlData, {
    format: SuperMap.DataFormat.ISERVER,
    eventListeners: {
      "processCompleted": baseProcessCompleted,
      "processFailed": baseProcessFailed
    }
  });
  getBaseFeatureBySQLService.processAsync(getBaseFeatureBySQLParams);
}z

//查询成功
function baseProcessCompleted(getFeaturesEventArgs) {
  var result = getFeaturesEventArgs.result;
  var feas = [];
  if(result && result.features) {
    var features = result.features;
    for(var i = 0, len = features.length; i < len; i++) {
      var feature = features[i];
      var smid = feature.fieldValues[0];//取值
      feas.push(feature);
    }
    //样式
    baseThemeSource = new ol.source.Unique("ThemeLayer", {
      map: map,
      attributions: " ",
      style: {
        shadowBlur: 3,
        shadowColor: "#000000",
        shadowOffsetX: 1,
        shadowOffsetY: 1,
        fillColor: "#FFFFFF"
      },
      isHoverAble: true,
      highlightStyle: {
        stroke: true,
        strokeWidth: 1,
        strokeColor: 'blue',
        fillColor: "#00F5FF",
        fillOpacity: 0.2
      },
      themeField: "NAME", //字段
      styleGroups: [{
        value: "梅江区",
        style: {
          fillColor: "#C1FFC1",
          fillOpacity: 0.2
        }
      }, {
        value: "梅县区",
        style: {
          fillColor: "#CD7054",
          fillOpacity: 0.2
        }
      }, {
        value: "兴宁市",
        style: {
          fillColor: "#7CCD7C",
          fillOpacity: 0.2
        }
      }, {
        value: "平远县",
        style: {
          fillColor: "#EE9A49",
          fillOpacity: 0.2
        }
      }, {
        value: "蕉岭县",
        style: {
          fillColor: "#8EE5EE",
          fillOpacity: 0.2
        }
      }, {
        value: "大埔县",
        style: {
          fillColor: "#7CCD7C",
          fillOpacity: 0.2
        }
      }, {
        value: "丰顺县",
        style: {
          fillColor: "#EE9A49",
          fillOpacity: 0.2
        }
      }, {
        value: "五华县",
        style: {
          fillColor: "#8EE5EE",
          fillOpacity: 0.2
        }
      }]
    });
    baseThemeSource.addFeatures(feas);
    //mousemove事件
    baseThemeSource.on('mousemove', function(e) {
      if(e.target && e.target.refDataID) {
        document.getElementById("baseInfoBox").style.display = "block";
        var fid = e.target.refDataID;
        var fea = baseThemeSource.getFeatureById(fid); //
        if(fea) {
          document.getElementById("baseInfoContent").innerHTML = "";
          document.getElementById("baseInfoContent").innerHTML += "区县名称: " + fea.attributes.NAME + "<br/>";
          document.getElementById("baseInfoContent").innerHTML += "区县面积: " + parseFloat(fea.attributes.SMAREA).toFixed(3) + "平方米" + "<br/>";
        }
      } else {
        document.getElementById("baseInfoContent").innerHTML = "";
        document.getElementById("baseInfoBox").style.display = "none";
      }
    });
    //选取控件
    basePointerInteraction = new ol.interaction.Pointer({
      handleMoveEvent: function(event) {
        baseThemeSource.fire('mousemove', event);
      }
    });
    map.addInteraction(basePointerInteraction);
    //图层添加到地图
    baseThemeLayer = new ol.layer.Image({
      source: baseThemeSource
    });
    //baseThemeLayer.setOpacity(0.2);
    map.addLayer(baseThemeLayer);
  }
  //图例
  //document.getElementById("baseMapLegend").style.display = "block";
}

//查询失败
function baseProcessFailed(e) {
  console.info("selectBaseLayer查询图层错误");
}

//清除基础显示图层
function clearBaseThemeLayer(){
  if(baseThemeLayer){
    baseThemeSource.clear();
    map.removeLayer(baseThemeLayer);
    map.removeInteraction(basePointerInteraction);
  }
}

//8c统计图
var ecThemeSource,
popup2Content = document.getElementById('popup-content'),
overlay = new ol.Overlay({
  element: document.getElementById('popup2'),
  autoPan: true,
  autoPanAnimation: {
    duration: 250
  }
});
map.addOverlay(overlay);

//测量
var measureLineInteraction,measureAreaInteraction,measureFeature;
var measureSource = new ol.source.Vector({ wrapX: false });
var measureVectorLayer = new ol.layer.Vector({
  source: measureSource
});;
var isAddMeasureLayer = false;
//测量距离
function measureLine(){
  measureSource.clear();
  if(!isAddMeasureLayer){
    isAddMeasureLayer = true;
    map.addLayer(measureVectorLayer);
  }
  measureLineInteraction = new ol.interaction.Draw({
    source : measureSource,
    type : "LineString"
  });
  map.addInteraction(measureLineInteraction);
  measureLineInteraction.on('drawstart', function(evt) {
    measureFeature = evt.feature;
  });
  measureLineInteraction.on('drawend', function() {
    var distanceMeasureParam = new SuperMap.MeasureParameters(measureFeature.getGeometry());
    new ol.supermap.MeasureService(url, {
      measureMode : ""
    }).measureDistance(distanceMeasureParam, function(serviceResult) {
      layui.use('layer', function(){
        var layer = layui.layer;
        layer.alert(parseFloat(serviceResult.result.distance).toFixed(3) + "米", function(index){
          //测量完毕清空
          map.removeInteraction(measureLineInteraction);
          measureSource.clear();
          layer.close(index);
        }); 
      });    
    });
  });
}
//测量面积
function measureArea(){
  measureSource.clear();
  if(!isAddMeasureLayer){
    isAddMeasureLayer = true;
    map.addLayer(measureVectorLayer);
  }
  measureAreaInteraction = new ol.interaction.Draw({
    source : measureSource,
    type : "Polygon",
  });
  map.addInteraction(measureAreaInteraction);
  measureAreaInteraction.on('drawstart', function(evt) {
    measureFeature = evt.feature;
  });
  measureAreaInteraction.on('drawend', function() {
    var areaMeasureParam = new SuperMap.MeasureParameters(measureFeature.getGeometry());
    new ol.supermap.MeasureService(url).measureArea(areaMeasureParam, function(serviceResult) {
      layui.use('layer', function(){
        var layer = layui.layer;
        layer.alert(parseFloat(serviceResult.result.area).toFixed(3) + "平方米", function(index){
          //测量完毕清空
          map.removeInteraction(measureAreaInteraction);
          measureSource.clear();
          layer.close(index);
        }); 
      }); 
    });
  });
}

//清除测量
function clearsMeasure() {
  if(isAddMeasureLayer){
    isAddMeasureLayer = false;
    map.removeInteraction(measureLineInteraction);
    map.removeInteraction(measureAreaInteraction);
    measureSource.clear();
    map.removeLayer(measureVectorLayer);
  }
}

//柱形统计图
var resultLayer,resultSource;
var chart;
var popup = new ol.Overlay({
  element: document.getElementById('popup'),
  offset: [5, 5]
});
map.addOverlay(popup);
var select,areaFeatures;
function queryResource() {
  clearLayer(); //清除
  var queryService = new ol.supermap.QueryService(url);
  var param = new SuperMap.QueryBySQLParameters({
    queryParams: [{
      name: "区县界_region@meizhoumap#1",  //查询图层名称
      attributeFilter: "1 = 1"    //过滤属性，还有 ids:[]（数组）；fields :[]等等~~API搜索“FilterParameter”
    }]
  });
  queryService.queryBySQL(param, function(serviceResult) {
    var features = [];
    for(var i = 0; i < serviceResult.result.recordsets.length; i++) {
      areaFeatures = serviceResult.result.recordsets[i].features;
      //readFeatures()
      var temp = (new ol.format.GeoJSON()).readFeatures(serviceResult.result.recordsets[i].features, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:4326'
      });
      //
      features = features.concat(temp); //concat：数组设置值方法
    }    
    resultSource = new ol.source.Vector({
      wrapX: false,
      features: features
    });
    resultLayer = new ol.layer.Vector({
      source: resultSource
    });
    map.addLayer(resultLayer);
    select = new ol.interaction.Select();
    map.addInteraction(select);
    select.on('select', function(e) {
      if(this.getFeatures().getLength() > 0) {
        var feature = this.getFeatures().item(0);
        var city = feature.getProperties().NAME;
        var data1 = [];
        var data2 = [];
        for(var i = 0; i < 6; i++) {
          var data = Math.random().toFixed(2);
          data1.push(data);
          data2.push(data * (Math.random() + 1.5));
        }
        if(staticsctypeid == 1){
          chart.setOption({
            title: {
              text: city + "资源分布状况",
            },
            series: [{
              name: "资源类型",
              data: dataMap[city]
            }]
          });
        }else if(staticsctypeid == 2){
          chart.setOption({
            title: {
              text: city,
              subtext: "多年度数据统计"
            },
            series: [{
              name: "2004年",
              data: data1,
            }, {
              name: "2005年",
              data: data2,
            }],
          });          
        }        
        popup.setElement(chart.getDom());
        var coordinate = e.mapBrowserEvent.coordinate;
        popup.setPosition(coordinate);
      } else {
        popup.setPosition(undefined);
      }
    });
  });
}

var option1 = {
  title: {
    subtext: "各类资源价值状况",
    textStyle: {
      color: '#fff',
      fontSize: 16
    }
  },
  backgroundColor: '#404a59',
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b}: {c} ({d}%)"
  },
  legend: {
    orient: 'vertical',
    x: 'right',
    y: 'bottom',
    textStyle: {
      color: '#fff',
      fontSize: 12
    },
    data: ["矿产","水","林木","土地","大气"]
  },
  series: [{
    name: "资源类型",
    type: 'pie',
    selectedMode: 'single',
    radius: [0, '60%']
  }]
};
var option2 = {
  legend: {
    data: ["2004年", "2005年"],
    align: 'left'
  },
  toolbox: {
    feature: {
      magicType: {
        type: ['stack', 'tiled']
      },
      saveAsImage: {
        pixelRatio: 2   
      }
    }
  },
  backgroundColor: '#fff', //echarts弹窗背景色
  tooltip: {},
  xAxis: {
    data: ["矿产","水","林木","土地","大气","新能源"],
    silent: false,
    splitLine: {
      show: false
    }
  },
  yAxis: {},
  series: [{
    name: 'bar',
    type: 'bar',
    animationDelay: function(idx) {  //动画效果延迟时间
      return idx * 10;
    }
  }, {
    name: 'bar2',
    type: 'bar',
    animationDelay: function(idx) {
      return idx * 10 + 100;
    }
  }],
  animationEasing: 'elasticOut',
  animationDelayUpdate: function(idx) {
    return idx * 5;
  }
};

//移除图层
function clearLayer() {
  if(resultLayer) {
    resultSource.clear();
    map.removeLayer(resultLayer);
    popup.setPosition(undefined);  
    map.removeInteraction(select); //移除选取控件
  }
}

//8c统计图
function bindEvent() {
  $(".graph").on("click", function() {
    $(".graph").removeClass("graph-active");
  });
  $("#bar").on("click", function() {
    $("#bar").addClass("graph-active");
    initFeaterDatasAddStyles();
    clearThemeLayer();
    createBarThemeLayer();
  });
  $("#bar3d").on("click", function() {
    $("#bar3d").addClass("graph-active");
    initFeaterDatasAddStyles();
    clearThemeLayer();
    createBar3DThemeLayer();
  });
  $("#ling").on("click", function() {
    $("#ling").addClass("graph-active");
    initFeaterDatasAddStyles();
    clearThemeLayer();
    createLineThemeLayer();
  });
  $("#point").on("click", function() {
    $("#point").addClass("graph-active");
    initFeaterDatasAddStyles();
    clearThemeLayer();
    createPointThemeLayer();
  });
  $("#pie").on("click", function() {
    $("#pie").addClass("graph-active");
    initFeaterDatasAddStyles();
    clearThemeLayer();
    createPieThemeLayer();
  });
  $("#ring").on("click", function() {
    $("#ring").addClass("graph-active");
    initFeaterDatasAddStyles();
    clearThemeLayer();
    createRingThemeLayer();
  });
}

var features,
  themeLayer,
  chartsSettingForBarAddBar3DCommon,
  chartsSettingForPointOrLine,
  chartsSettingForPieOrRing,
  themeLayerOptions;

//附着要素
function initFeaterDatasAddStyles() {
  //创建附着要素
  features = [];
  for(var i = 0, len = chinaConsumptionLevel.length; i < len; i++) {
    // 省居民消费水平（单位：元）信息
    var provinceInfo = chinaConsumptionLevel[i];
    var geo = new ol.geom.Point([provinceInfo[1], provinceInfo[2]]); //点数据
    var attrs = {};
    attrs.NAME = provinceInfo[0];
    attrs.CON2004 = provinceInfo[3];
    attrs.CON2005 = provinceInfo[4];
    attrs.CON2009 = provinceInfo[5];
    attrs.CON2010 = provinceInfo[6];
    attrs.CON2014 = provinceInfo[7];
    var fea = new ol.supermap.ThemeFeature(geo, attrs);
    features.push(fea);
  }
  //Bar add Bar3D chartsSetting
  chartsSettingForBarAddBar3DCommon = {
    width: 260,
    height: 120,
    codomain: [0, 40000],
    xShapeBlank: [15, 15, 15],
    axisYTick: 4,
    axisYLabels: ["4万", "3万", "2万", "1万", "0"],
    axisXLabels: ["04年", "05年", "09年", "10年", "14年"],
    backgroundRadius: [5, 5, 5, 5],
    backgroundStyle: {
      fillColor: "#d1eeee",
      shadowBlur: 12,
      shadowColor: "#d1eeee"
    }
  };
  //Point add Line chartsSetting
  chartsSettingForPointOrLine = {
    width: 220,
    height: 100,
    codomain: [0, 40000],
    xShapeBlank: [10, 10],
    axisYTick: 4,
    axisYLabels: ["4万", "3万", "2万", "1万", "0"],
    axisXLabels: ["04年", "05年", "09年", "10年", "14年"],
    backgroundStyle: {
      fillColor: "#d1eeee"
    },
    backgroundRadius: [5, 5, 5, 5],
    useXReferenceLine: true,
    pointStyle: {
      pointRadius: 5,
      shadowBlur: 12,
      shadowColor: "#D8361B",
      fillOpacity: 0.8
    },
    pointHoverStyle: {
      stroke: true,
      strokeColor: "#D8361B",
      strokeWidth: 2,
      fillColor: "#ffffff",
      pointRadius: 4
    }
  };
  //Pie add Ring chartsSetting
  chartsSettingForPieOrRing = {
    width: 240,
    height: 100,
    codomain: [0, 40000], // 允许图表展示的值域范围，此范围外的数据将不制作图表
    sectorStyle: {
      fillOpacity: 0.8
    }, // 柱状图中柱条的（表示字段值的图形）样式
    sectorStyleByFields: [{
      fillColor: "#FFB980"
    }, {
      fillColor: "#5AB1EF"
    }, {
      fillColor: "#B6A2DE"
    }, {
      fillColor: "#2EC7C9"
    }, {
      fillColor: "#D87A80"
    }],
    sectorHoverStyle: {
      fillOpacity: 1
    },
    xShapeBlank: [10, 10, 10], // 水平方向上的空白间距参数
    axisYLabels: ["4万", "3万", "2万", "1万", "0"], // y 轴标签内容
    axisXLabels: ["04年", "05年", "09年", "10年", "14年"], // x 轴标签内容
    backgroundStyle: {
      fillColor: "#CCE8CF"
    }, // 背景样式
    backgroundRadius: [5, 5, 5, 5], // 背景框圆角参数
  };
  //设置graphThemeLayer option参数
  themeLayerOptions = {
    map: map,
    attributions: " ",
    themeFields: ["CON2004", "CON2005", "CON2009", "CON2010", "CON2014"],  //根据字段展示对应弹窗
    opacity: 0.9,
    chartsSetting: {},
  };
}

//点选取控件
var pointerInteraction = null;
function addPointerInteraction(ecThemeSource) {
  pointerInteraction = new ol.interaction.Pointer({
    handleMoveEvent: function(event) {
      ecThemeSource.fire('mousemove', event); //绑定事件
    }
  });
  map.addInteraction(pointerInteraction); 
}
//创建Bar图表
function createBarThemeLayer() {
  var chartsSettingForBar = chartsSettingForBarAddBar3DCommon;
  chartsSettingForBar.barStyle = {
    fillOpacity: 0.7
  }; // 柱状图中柱条的（表示字段值的图形）样式
  chartsSettingForBar.barHoverStyle = {
    fillOpacity: 1
  }; //  柱条 hover 样式
  //阴影样式
  chartsSettingForBar.barShadowStyle = {
    shadowBlur: 8,
    shadowOffsetX: 2,
    shadowOffsetY: 2,
    shadowColor: "rgba(100,100,100,0.8)"
  };
  chartsSettingForBar.barLinearGradient = [
    ["#00FF00", "#00CD00"],
    ["#00CCFF", "#5E87A2"],
    ["#00FF66", "#669985"],
    ["#CCFF00", "#94A25E"],
    ["#FF9900", "#A2945E"]
  ];
  themeLayerOptions.chartsSetting = chartsSettingForBar;
  ecThemeSource = new ol.source.Graph("BarLayer", "Bar", themeLayerOptions);
  ecThemeSource.on("mousemove", showInfoWin);
  ecThemeSource.addFeatures(features);
  addPointerInteraction(ecThemeSource); //绑定事件
  themeLayer = new ol.layer.Image({
    source: ecThemeSource,
  });
  map.addLayer(themeLayer);
}
//创建Bar3D图表
function createBar3DThemeLayer() {
  var chartsSettingForBar3D = chartsSettingForBarAddBar3DCommon;
  chartsSettingForBar3D.useXReferenceLine = true;
  chartsSettingForBar3D.xReferenceLineStyle = {
    strokeColor: "#008acd",
    strokeOpacity: 0.4
  };
  // 3d 柱条正面样式（3d 柱条的侧面和顶面会以 3d 柱条正面样式为默认样式）
  chartsSettingForBar3D.barFaceStyle = {
    stroke: true
  };
  // 按字段设置 3d 柱条正面样式
  chartsSettingForBar3D.barFaceStyleByFields = [{
    fillColor: "#FFB980"
  }, {
    fillColor: "#5AB1EF"
  }, {
    fillColor: "#B6A2DE"
  }, {
    fillColor: "#2EC7C9"
  }, {
    fillColor: "#D87A80"
  }];
  // 3d 柱条正面 hover 样式（3d 柱条的侧面和顶面 hover 会以 3d 柱条正面 hover 样式为默认 hover 样式）
  chartsSettingForBar3D.barFaceHoverStyle = {
    stroke: true,
    strokeWidth: 1,
    strokeColor: "#ffff00"
  };
  themeLayerOptions.chartsSetting = chartsSettingForBar3D;
  ecThemeSource = new ol.source.Graph("Bar3DLayer", "Bar3D", themeLayerOptions);
  ecThemeSource.on("mousemove", showInfoWin);
  ecThemeSource.addFeatures(features);
  addPointerInteraction(ecThemeSource);
  themeLayer = new ol.layer.Image({
    source: ecThemeSource
  });
  map.addLayer(themeLayer);
}
//创建Line图表
function createLineThemeLayer() {
  chartsSettingForPointOrLine.pointStyle.fillColor = "#9966CC";
  themeLayerOptions.chartsSetting = chartsSettingForPointOrLine;
  ecThemeSource = new ol.source.Graph("LineLayer", "Line", themeLayerOptions);
  ecThemeSource.on("mousemove", showInfoWin);
  ecThemeSource.addFeatures(features);
  addPointerInteraction(ecThemeSource);
  themeLayer = new ol.layer.Image({
    source: ecThemeSource
  });
  map.addLayer(themeLayer);
}
//创建Point图表
function createPointThemeLayer() {
  chartsSettingForPointOrLine.pointStyle.fillColor = "#D8361B";
  themeLayerOptions.chartsSetting = chartsSettingForPointOrLine;
  ecThemeSource = new ol.source.Graph("PointLayer", "Point", themeLayerOptions);
  ecThemeSource.on("mousemove", showInfoWin);
  ecThemeSource.addFeatures(features);
  addPointerInteraction(ecThemeSource);
  themeLayer = new ol.layer.Image({
    source: ecThemeSource
  });
  map.addLayer(themeLayer);
}
//创建Pie图表
function createPieThemeLayer() {
  themeLayerOptions.chartsSetting = chartsSettingForPieOrRing;
  ecThemeSource = new ol.source.Graph("PieLayer", "Pie", themeLayerOptions);
  ecThemeSource.on("mousemove", showInfoWin);
  ecThemeSource.addFeatures(features);
  addPointerInteraction(ecThemeSource);
  themeLayer = new ol.layer.Image({
    source: ecThemeSource
  });
  map.addLayer(themeLayer);
}
//创建Ring图表
function createRingThemeLayer() {
  chartsSettingForPieOrRing.innerRingRadius = 20;
  themeLayerOptions.chartsSetting = chartsSettingForPieOrRing;
  ecThemeSource = new ol.source.Graph("RingLayer", "Ring", themeLayerOptions);
  ecThemeSource.on("mousemove", showInfoWin);
  ecThemeSource.addFeatures(features);
  addPointerInteraction(ecThemeSource);
  themeLayer = new ol.layer.Image({
    source: ecThemeSource
  });
  map.addLayer(themeLayer);
}
//清除图表专题图
function clearThemeLayer() {
  if(ecThemeSource && themeLayer) {
    map.removeLayer(themeLayer); 
    map.removeInteraction(pointerInteraction); //移除点选取控件
    ecThemeSource = null;
    themeLayer = null;
  }
}
// 地图弹窗的显示
function showInfoWin(e) {
  // e.target 是图形对象，即数据的可视化对象，柱状图中是柱条;
  // 图形对象的 refDataID 属性是数据（feature）的 id 属性，它指明图形对象是由那个数据制作而来;
  // 图形对象的 dataInfo 属性是图形对象表示的具体数据，他有两个属性，field 和 value;
  $(".ol-popup").css("display", "block");
  if(e.target && e.target.refDataID && e.target.dataInfo) {
    closeInfoWin();
    // 获取图形对应的数据 (feature)
    var fea = ecThemeSource.getFeatureById(e.target.refDataID);
    var info = e.target.dataInfo;
    // 弹窗内容
    var contentHTML = "<div style='color: #000; background-color: #fff'>";
    contentHTML += "区县名称" + "<br><strong>" + fea.attributes.NAME + "</strong>";
    contentHTML += "<hr style='margin: 3px'>";
    switch(info.field) {
      case "CON2004":
        contentHTML += "04" + "资源价值量" + " <br/><strong>" + info.value + "</strong>" + "（万元）";
        break;
      case "CON2005":
        contentHTML += "05" + "资源价值量" + " <br/><strong>" + info.value + "</strong>" + "（万元）";
        break;
      case "CON2009":
        contentHTML += "09" + "资源价值量" + "<br/><strong>" + info.value + "</strong>" + "（万元）";
        break;
      case "CON2010":
        contentHTML += "10" + "资源价值量" + " <br/><strong>" + info.value + "</strong>" + "（万元）";
        break;
      case "CON2014":
        contentHTML += "14" + "资源价值量" + " <br/><strong>" + info.value + "</strong>" + "（万元）";
        break;
      default:
        contentHTML += "No Data";
    }
    contentHTML += "</div>";
    popup2Content.innerHTML = contentHTML;
    overlay.setPosition(map.getCoordinateFromPixel([e.event.x, e.event.y]));
    return;
  }
  closeInfoWin();
}
// 移除地图弹窗
function closeInfoWin() {
  if(overlay) {
    overlay.setPosition(undefined);
  }
}

//单值专题图
function selectBySingleSpecial(){
  
}

//分段专题图
var getFeatureParam, getFeatureBySQLService, getFeatureBySQLParams;
var subsectionThemeSource;//方法实例化并设置样式
var subsectionThemeLayer;
var subsectionPointerInteraction;//选取控件
function selectBySubsectionSpecial(){
  getFeatureParam = new SuperMap.FilterParameter({
    name: "区县界_region@meizhoumap#1",
    attributeFilter: "1 = 1"
  });
  getFeatureBySQLParams = new SuperMap.GetFeaturesBySQLParameters({
    queryParameter: getFeatureParam,
    toIndex: 500,
    datasetNames: ["meizhoumap:区县界_region"]
  });
  getFeatureBySQLService = new SuperMap.GetFeaturesBySQLService(urlData, {
    format: SuperMap.DataFormat.ISERVER,
    eventListeners: {
      "processCompleted": subsectionProcessCompleted,
      "processFailed": processFailed
    }
  });
  getFeatureBySQLService.processAsync(getFeatureBySQLParams);
}

//查询成功
function subsectionProcessCompleted(getFeaturesEventArgs) {
  var result = getFeaturesEventArgs.result;
  if(result && result.features) {
    addThemeLayer(); //设置样式，添加ThemeLayer
    subsectionThemeSource.addFeatures(result.features);
    //显示图例
    document.getElementById("subsectionMap").style.display = "block";
    document.getElementById("mapLegend").style.display = "block";
  }
}
//设置样式，添加ThemeLayer
function addThemeLayer() {
  subsectionThemeSource = new ol.source.Range("ThemeLayer", {
    map: map,
    attributions: " ",
    style: {
      shadowBlur: 16,
      shadowColor: "#000000",
      fillColor: "#FFFFFF"
    },
    isHoverAble: true,
    highlightStyle: {
      stroke: true,
      strokeWidth: 1,
      strokeColor: 'blue',
      fillColor: "#00EEEE",
      fillOpacity: 0.6
    },
    themeField: "RES_DENSITY", //密度字段
    //分段颜色
    styleGroups: [{
      start: 0,
      end: 0.02,
      style: {
        color: '#FDE2CA'
      }
    }, {
      start: 0.02,
      end: 0.04,
      style: {
        color: '#FACE9C'
      }
    }, {
      start: 0.04,
      end: 0.06,
      style: {
        color: '#F09C42'
      }
    }, {
      start: 0.06,
      end: 0.1,
      style: {
        color: '#D0770B'
      }
    }, {
      start: 0.1,
      end: 0.2,
      style: {
        color: '#945305'
      }
    }]
  });
  //专题图层 mousemove 事件
  subsectionThemeSource.on('mousemove', function(e) {
    if(e.target && e.target.refDataID) {
      document.getElementById("infoBox").style.display = "block";
      var fid = e.target.refDataID;
      var fea = subsectionThemeSource.getFeatureById(fid);
      if(fea) {
        document.getElementById("infoContent").innerHTML = "";
        document.getElementById("infoContent").innerHTML += "ID: " + fea.attributes.SMID + "<br/>";
        document.getElementById("infoContent").innerHTML += "行政区名：" + fea.attributes.NAME + "<br/>";
      }
    } else {
      document.getElementById("infoContent").innerHTML = "";
      document.getElementById("infoBox").style.display = "none";
    }
  });
  subsectionPointerInteraction = new ol.interaction.Pointer({
    handleMoveEvent: function(event) {
      subsectionThemeSource.fire('mousemove', event);
    }
  });
  map.addInteraction(subsectionPointerInteraction);
  subsectionThemeLayer = new ol.layer.Image({
    source: subsectionThemeSource
  });
  subsectionThemeLayer.setOpacity(0.6);
  map.addLayer(subsectionThemeLayer); //添加到地图中
}
//要素查询失败
function processFailed(e) {
  console.info("专题图查询失败");
}
//清除分段专题图
function clearSubsectionMap(){
  if(subsectionThemeLayer){
    document.getElementById("subsectionMap").style.display = "none";
    document.getElementById("mapLegend").style.display = "none";
    subsectionThemeSource.clear();
    map.removeInteraction(subsectionPointerInteraction); 
    map.removeLayer(subsectionThemeLayer); 
  }
}

//查询统计图
function selectResByTable(){
  
}

//饼形图数据
var dataMap = {
  "梅江区": [{
    value: 335,
    name: "矿产"
  }, {
    value: 310,
    name: "水"
  }, {
    value: 234,
    name: "林木"
  }, {
    value: 135,
    name: "土地"
  }, {
    value: 1048,
    name: "大气"
  }],
  "梅县区": [{
    value: 117,
    name: "矿产"
  }, {
    value: 284,
    name: "水"
  }, {
    value: 768,
    name: "林木"
  }, {
    value: 215,
    name: "土地"
  }, {
    value: 901,
    name: "大气"
  }],
  "兴宁市": [{
    value: 475,
    name: "矿产"
  }, {
    value: 29,
    name: "水"
  }, {
    value: 430,
    name: "林木"
  }, {
    value: 753,
    name: "土地"
  }, {
    value: 248,
    name: "大气"
  }],
  "平远县": [{
    value: 475,
    name: "矿产"
  }, {
    value: 219,
    name: "水"
  }, {
    value: 430,
    name: "林木"
  }, {
    value: 742,
    name: "土地"
  }, {
    value: 236,
    name: "大气"
  }],
  "蕉岭县": [{
    value: 475,
    name: "矿产"
  }, {
    value: 239,
    name: "水"
  }, {
    value: 430,
    name: "林木"
  }, {
    value: 235,
    name: "土地"
  }, {
    value: 528,
    name: "大气"
  }],
  "大埔县": [{
    value: 475,
    name: "矿产"
  }, {
    value: 291,
    name: "水"
  }, {
    value: 234,
    name: "林木"
  }, {
    value: 642,
    name: "土地"
  }, {
    value: 362,
    name: "大气"
  }],
  "丰顺县": [{
    value: 475,
    name: "矿产"
  }, {
    value: 29,
    name: "水"
  }, {
    value: 344,
    name: "林木"
  }, {
    value: 234,
    name: "土地"
  }, {
    value: 178,
    name: "大气"
  }],
  "五华县": [{
    value: 475,
    name: "矿产"
  }, {
    value: 29,
    name: "水"
  }, {
    value: 230,
    name: "林木"
  }, {
    value: 461,
    name: "土地"
  }, {
    value: 372,
    name: "大气"
  }]
}