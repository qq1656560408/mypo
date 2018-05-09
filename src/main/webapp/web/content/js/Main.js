/**
 * 主界面3
 */
var leftMenuIndex = 0;//判断是不是点击相同菜单按钮
var isfirst = true;//是否第一次加载
var accountingSelectYearStart = "", accountingSelectYearEnd = "";//核算选择年份

//load加载
$(document).ready(function() {
	resizeView();//初始化适应屏幕
	$("#left_btn_show").click(function () {
		leftBtnEvents();//左侧栏收缩按钮点击事件
  });
	modelSelectClick();//模块菜单选择点击事件
	topMenuShow();//便捷菜单收缩展开
  speedyMenuSelect();//绑定便捷菜单点击事件
  leftMenuSelect();//绑定左侧菜单点击事件
  //selectStatisticsType();//绑定统计下拉框选择事件    
  dragWin("body","StatisticsResult");//传递拖动范围div的id，拖动div的id，即可拖拽div    
  dragWinByTop("body","WindowAccounting","WindowAccountingTop");//传递拖动范围div的id，拖动窗体id，拖动div顶部的id，即可拖拽div    
  dragWinByTop("body","accContrastshow","accContrastshow-tl");//传递拖动范围div的id，拖动窗体id，拖动div顶部的id，即可拖拽div    
  dragWinByTop("body","WindowAccountingquyu","WindowAccountingquyuTop");
  accTabChange();//绑定核算面板头部tab点击事件
  //statisTypeSelect();//核算结果弹窗1统计类型li绑定事件  
  bindTabPanelMenuEvent();//核算面板-绑定下栏菜单点击事件
});

//模块菜单选择点击事件
function modelSelectClick(){
  $.each($("#top_menu li"), function(index, obj){
    $(obj).on("click", function(event){
      var index = $(this).index();
      switch(index){
        case 0:
          window.location.href = pathbase + "/jsp/Main.jsp"; 
          break;
        case 1:
          window.location.href = pathbase + "/jsp/ResignAudit.jsp"; 
          break;
        case 2:
          window.location.href = pathbase + "/jsp/UserManage.jsp"; 
          break;
        case 3:
          window.location.href = pathbase + "/jsp/DataManage.jsp"; 
          break;
        case 4:
          window.location.href = pathbase + "/jsp/UserGuide.jsp"; 
          break;
        default:
          window.location.href = pathbase + "/jsp/error.jsp"; 
          break;
      }
    });
  });
}

//收缩按钮点击事件
function leftBtnEvents(){	
  loadAreaTree();//绑定区域树
	if($('#left_view_content').is(":visible")){
		$('#left_btn_icon').css("background", "url("+pathweb+"/content/images/aliicons/rightarrows.png) no-repeat");//设置按钮
		$('#left_view_content').animate({ width: 'toggle' }, 'normal', function () {
			//动画完成执行~
			$('#left_btn_blck').css("border-left", "10px solid #FFF");//设置按钮
			$('#left_btn_blck').css("left", "-11px");//设置按钮
			$('#left_btn_blck').attr("title", "展开");//设置按钮提示文本
			$('#left_view_menu').css("border-right", "1px solid #BFBFBF");//设置右外边框
    });
	}else{
		$('#left_btn_icon').css("background", "url("+pathweb+"/content/images/aliicons/leftarrows.png) no-repeat");//设置按钮
		$('#left_view_menu').css("border-right", "0");
		$('#left_view_btn').css("left", "-1px");//设置按钮
		$('#left_view_content').animate({ width: 'toggle' }, 'normal', function () {
			//动画完成执行
			$('#left_btn_blck').css("border-left", "11px solid #FFF");//设置按钮
			$('#left_btn_blck').css("left", "-12px");//设置按钮
			$('#left_btn_blck').attr("title", "收起");//设置按钮提示文本
		});
	}
}

//初始化适应屏幕
function resizeView(){
	var w = document.documentElement.clientWidth || document.body.clientWidth;
	var h = document.documentElement.clientHeight || document.body.clientHeight;
	var top_height = $("#top").height();
	$("#map").height((h - top_height) + "px");
	$("#left_btn_show").css("top", (((h - top_height) / 2) - 40) + "px");
	if(w >= 930){
		$("#top").width(w + "px");
		$("#body").width(w + "px");
	}else{
		$("#top").width("930px");
		$("#body").width("930px");
	}
	if(h >= 450){
		$("#body").height((h - top_height) + "px");
		$("#left_view").height((h - top_height) + "px");
	}else{
		$("#body").height("450px");
		$("#left_view").height("450px");
	}
	$("#tab_content").css("height", (h - top_height - 30)+"px");//核算面板高度设置
	$("#map_switch").css("display", "block");
	if(isfirst && !isloaded){
		isfirst = false;		
		//地图加载背景图片
//		$(".load-bg").css("background-size", w + "px " + (h - top_height) + "px");
//		$("#left-load-bg").width((w/2) + "px");
//		$("#left-load-bg").height((h - top_height) + "px");
//		$("#right-load-bg").css("width", (w/2)+"px");
//		$("#right-load-bg").css("height", (h - top_height)+"px");
//		$("#right-load-bg").css("background-position", (-w/2) + "px 0px");
		closePanel();//关闭遮罩
	}
}

//关闭遮罩
function closePanel(){
//	$('.load-bg').animate({ width: '0px' }, 1500, function () {
//		//动画完成执行~
//		
//  });	
	$("#main-loading").css("display", "none");
}

//页面大小调整
$(window).resize(function(){
	resizeView();
});

//便捷菜单操作
function speedyMenuSelect(){
	$("#speedy li").on("click", function(){
		var index = $(this).index();//获取索引
		switch(index){
			case 0:
				//全屏~还原
				full($(this));
				break;
			case 1:
				//清空
			  accountingResourceReturn(); //清空核算统计图
				break;
			case 2:
				//测量~onclick()			  
				break;
			case 3:
				//打印
			  createPrintMap("map");
				break;
			case 4:
				//截图
				startPrintps('bodyall');//传递要截图的html节点id名称
				break;
			case 5:
				//全图
				map.zoomTo(0);
				map.setCenter([116.134, 24.146]);
				break;
			case 6:
				//漫游				
				break;
			case 7:
				//缩小
				break;
			case 8:
				//放大
				break;
			default:
				break;
		}
	});
}

//全屏~还原
function full(li){
//	var w = document.documentElement.clientWidth || document.body.clientWidth;
//	var h = document.documentElement.clientHeight || document.body.clientHeight;
//	var top_height = $("#top").height();
//	if($('#top').is(":visible")){
//		$('#top').css("display", "none");
//		$("#map").height(h + "px");
//		$("#body").width(w + "px");
//		$("#body").height(h + "px");
//		$("#left_view").height(h + "px");
//		$("#left_view").css("top", "0px");
//		$("#speedy").css("top", "0px");
//		$("#speedybtn").css("top", "0px");
//		$("#left_btn_show").css("top", ((h / 2) - 40) + "px");
//		$(li).children("img").attr("src", pathweb+"/content/images/aliicons/restore.png");
//		$(li).children("span:first").text("还原");
//	}else{
//		$('#top').css("display", "none");
//		$("#body").width(w + "px");
//		$("#body").height((h-top_height) + "px");
//		$("#map").height((h-top_height) + "px");
//		$("#left_view").height((h-top_height) + "px");
//		$("#left_view").css("top", "60px");
//		$("#speedy").css("top", "60px");
//		$("#speedybtn").css("top", "60px");
//		$("#left_btn_show").css("top", (((h - top_height) / 2) - 40) + "px");
//		$('#top').css("display", "block");
//		$(li).children("img").attr("src", pathweb+"/content/images/aliicons/scan.png");
//		$(li).children("span:first").text("全屏");
//	}
  if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
    $(li).children("span:first").text("还原");
  } else {
    // 取消全屏
    if (document.cancelFullScreen) { 
      document.cancelFullScreen(); 
    } else if(document.mozCancelFullScreen) {
      document.mozCancelFullScreen(); 
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen(); 
    }
    $(li).children("span:first").text("全屏");
  }
}

//打印
function printWin(){
	$("#bodyall").print();
}

//便捷菜单收缩展开
function topMenuShow(){
	$("#speedybtn").on("click", function(){
		if($('#speedy').is(":visible")){
			$('#speedybtn').css("background", "url("+pathweb+"/content/images/aliicons/expand2.png) no-repeat");//设置图片
			$('#speedy').animate({ height: 'toggle' }, 'normal', function () {
				//动画完成执行~
				$('#speedybtn').attr("title","展开");
      });
		}else{
			$('#speedybtn').css("background", "url("+pathweb+"/content/images/aliicons/putaway.png) no-repeat");//设置图片
			$('#speedy').animate({ height: 'toggle' }, 'normal', function () {
				//动画完成执行
				$('#speedybtn').attr("title","收起");
      });
		}
	});
}

//地图左侧菜单操作
function leftMenuSelect(){
	$("#left_view_menu li").on("click", function(){
		var index = $(this).index();//获取索引
		//判断是不是点击相同菜单按钮
		if(leftMenuIndex != index){
			//更换菜单按钮背景
			$.each($("#left_view_menu li"), function(index, object){
				$(object).removeClass("view_menu_bg");
			});
			$(this).addClass("view_menu_bg");
			//更换显示面板
			$("#map_search").css("display", "none");
			$("#map_catalogue").css("display", "none");
			$("#map_statistics").css("display", "none");
			$("#map_accounting").css("display", "none");
			$("#map_yingxiang").css("display", "none");
			$("#map_pdflook").css("display", "none");
			$("#map_analyze").css("display", "none");
			switch(index){
				case 0:
					//搜索
					leftMenuIndex=0;
					$("#map_search").css("display", "block");
					break;
				case 1:
					//区域
					leftMenuIndex=1;
					$("#map_catalogue").css("display", "block");
					loadAreaTree();//绑定区域树
					break;
				case 2:
					//统计
					leftMenuIndex=2;
					$("#map_statistics").css("display", "block");
					$("#StatisticsResult").css("display", "block");
					init1();//统计1
					break;
				case 3:
					//核算
					leftMenuIndex=3;
					$("#map_accounting").css("display", "block");						
					closeAnalyzeResSpecial();//清空分析面板-专题图
					break;
				case 4:
          //分析
          leftMenuIndex=4;
          $("#map_analyze").css("display", "block");
          accountingResourceReturn();//清空核算面板-统计图
          break;
				case 5:
					//遥感
					leftMenuIndex=5;
					$("#map_yingxiang").css("display", "block");
					$("#map_yingxiang").load("../../ResourceCheck/jsp/RemoteSensingData/remoteSensingDataLook.jsp");
					break;
				case 6:
          //查看
          leftMenuIndex=6;
          $("#map_pdflook").css("display", "block");
          break;
				default:
					break;
			}
			if(leftMenuIndex == 0 || leftMenuIndex == 2 || leftMenuIndex == 5 || leftMenuIndex == 6 ){
			  accountingResourceReturn();//清空核算面板-统计图
	      closeAnalyzeResSpecial();//清空分析面板-专题图
			}
		}else{
			leftBtnEvents();
			if(index == 2){
				$("#StatisticsResult").css("display", "block");
			}
		}
		selectAllDynamicYear();//查询年份及区县绑定下拉框
		//展开面板
		if(index != 2){
			if($('#left_view_content').is(":hidden")){
				leftBtnEvents();
			}
		}
	});
}

//区域树
var isLoadAreaDataTree=false;
var bootzoom=false;
function loadAreaTree(){
  if(!isLoadAreaDataTree){
    isLoadAreaDataTree = true;
    var areaJson = [{ //节点
      name: '梅州市',
      spread: true,  //展开
      children: [{
          name: '梅江区',
        },{
          name: '梅县区',
        },{
          name: '兴宁市',
        },{
          name: '蕉岭县',
        },{
          name: '丰顺县',
        },{
          name: '大埔县',
        },{
            name: '平远县',
        },{
          name: '五华县',
        }]
      }];
    layui.use('tree', function(){
      layui.tree({
        elem : '#areaDataTree',//传入元素选择器
        nodes : areaJson,
        click : function(currentNode) {
          var name = currentNode.name;
          if (name != "") {        	  
        	bootzoom=true;
            areaShow(name);
          }
        }
      });
    });    
  }
}

//核算tab切换
function accTabChange(){
	$.each($("#tab_menu_ul li"), function(index, obj){
		$(obj).on("click", index, function(){
			switch(index){
				case 0:
					$("#tab_menu_select").css("left", "50px");
					$("#panel_resoure").css("display", "block");
					$("#panel_debt").css("display", "none");
					break;
				case 1:
					$("#tab_menu_select").css("left", "165px");
					$("#panel_resoure").css("display", "none");
					$("#panel_debt").css("display", "block");
					break;
				default:
					break;
			}
		});
	});
}

//核算结果弹窗-1
function statisTypeSelect(){
  $.each($("#tsmul li"), function(index, obj){
    $(obj).on("click", index, function(){
      $.each($("#tsmul li"),function(index, obj1){
        $(obj1).removeClass("tabcontent-select-menu-active");
      });
      $(this).addClass("tabcontent-select-menu-active");
      //显示与隐藏界面选中统计界面
      switch(index){
      case 0:
        //表格
        $.each($("#tabcontent-select div"),function(index2, obj2){
          if(index2 == 0){
            $(obj2).css("display", "block");
          }else{
            $(obj2).css("display", "none");
          }
        });
        break;
      case 1:
        //柱状图
        $.each($("#tabcontent-select div"),function(index2, obj2){
          if(index2 == 1){
            $(obj2).css("display", "block");
          }else{
            $(obj2).css("display", "none");
          }
        });
        break;
      case 2:
        //饼形图
        $.each($("#tabcontent-select div"),function(index2, obj2){
          if(index2 == 2){
            $(obj2).css("display", "block");
          }else{
            $(obj2).css("display", "none");
          }
        });
        break;
      case 3:
        //折线图
        $.each($("#tabcontent-select div"),function(index2, obj2){
          if(index2 == 3){
            $(obj2).css("display", "block");
          }else{
            $(obj2).css("display", "none");
          }
        });
        break;
      case 4:
        //导出
        $.each($("#tabcontent-select div"),function(index2, obj2){
          if(index2 == 4){
            $(obj2).css("display", "block");
          }else{
            $(obj2).css("display", "none");
          }
        });
        break;
      default:
        break;
    }
    });
  });
}

//选择统计图显示
function selectStatisticsType(){
	$("#StatisticsType").bind("change",function(){
      var value = $(this).val();
      if(value == 1){
        init1();
      	$("#showResult").css("display", "block");
      	$("#showResult2").css("display", "none");
      }else if(value == 2){
      	init2();
      	$("#showResult2").css("display", "block");
      	$("#showResult").css("display", "none");
      }
  });
}
//统计图
function init1(){
	// 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('showResult'));
  // 指定图表的配置项和数据
  var option = {
      title: {
          text: '梅州市各区县资源价值量统计'
      },
      tooltip: {},
      legend: {
          data:['资源价值量'],
          x:'right'
      },
      xAxis: {
          data: ["梅江区","梅县区","兴宁市","平远县",
                 "蕉岭县","大埔县","丰顺县","五华县"]
      },
      yAxis: {},
      series: [{
          name: '资源价值量',
          type: 'bar',
          data: [5, 3, 2, 6, 
                 2, 3, 5, 5]
      }]
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}

function init2(){
	// 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('showResult2'));
    // 指定图表的配置项和数据
    var option = {
	    title : {
	        text: '梅州市各区县资源价值量统计',
	        subtext: '各区县价值量及比重',
	        x:'right'
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        orient: 'vertical',
	        left: 'left',
	        data: ["梅江区","梅县区","兴宁市","平远县",
            "蕉岭县","大埔县","丰顺县","五华县"]
	    },
	    series : [
	        {
	            name: '数量及比重',
	            type: 'pie',
	            radius : '55%',
	            center: ['65%', '65%'],
	            data: [
                {value:5, name:'梅江区'},
                {value:3, name:'梅县区'},
                {value:2, name:'兴宁市'},
                {value:6, name:'平远县'},
                {value:2, name:'蕉岭县'},
                {value:3, name:'大埔县'},
                {value:5, name:'丰顺县'},
                {value:5, name:'五华县'}
              ],
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}
//关闭添加界面
function closeStatisticsPanel(){
	$("#StatisticsResult").css("display", "none");
}

//layui代码块
layui.use(['laydate','element'], function(){
  var laydate = layui.laydate;//layui对象
  var element = layui.element;
  var date = new Date().getTime();//获取当前时间戳
  //执行一个laydate实例
  var yearStart = laydate.render({
    elem: '#select-year-start', //指定元素
    type: 'year',
    format: 'yyyy', //可任意组合
    max: date,
    value: '2005',
    done: function(value, date, endDate){ //监听日期选择完毕
    	yearEnd.config.min = date; //设置最小时间
    	accountingSelectYearStart = date;
    }
  });
  //执行一个laydate实例
  var yearEnd = laydate.render({
    elem: '#select-year-end', //指定元素
    type: 'year',
    format: 'yyyy', //可任意组合
    max: date,
    value: '2015',
    done: function(value, date, endDate){ //监听日期选择完毕
      accountingSelectYearEnd = date;
    }
  });
  
  //tab事件监听---核算结果弹窗
  element.on('tab(tab-accounting)', function(data){
    var index = this.getAttribute('lay-id');
   	switch(Number(index)){
     	case 1:
     	  //价值量总统计
     	 accResourceReturnMore();
     	  break;
     	case 2:
     	  //土地资源明细
     	 findLandDataDetal();
        break;
     	case 3:
        //水资源明细
     	 findWaterDataDetal();
        break;
     	case 4:
        //林木资源明细
     	 findForestDataDetal();
        break;
     	case 5:
        //矿产资源明细
     	 findMineDataDetal();
        break;
     	case 6:
        //可再生能源明细
     	 findRenewableDataDetal();
        break;
     	case 7:
        //大气资源明细
     	 findAtmosphereDataDetal();
        break;
   	}
  });
});

//核算面板-查询统计表的动态年份
var isselectAllDynamicYear = false;
function selectAllDynamicYear(){
  if(!isselectAllDynamicYear){
    isselectAllDynamicYear = true;//只绑定年份一次
    selectArea();//查询区县数据 ，后面统计图要用到      
    findTypeValueYearByCondition();//价值量总统计-获取有数据的年份
    findWaterYearByCondition();//水资源-获取有数据的年份
    findLandYearByCondition();//土地资源-获取有数据的年份
    findForestYearByCondition();//林木资源-获取有数据的年份
    findMineYearByCondition();//矿产资源-获取有数据的年份
    findRenewableYearByCondition();//可再生能源-获取有数据的年份
    findAtmosphereYearByCondition();//大气资源-获取有数据的年份
    selectResValueChangeMxType();//绑定-时间过度统计-价值类型-明细类型
  }
}

//核算面板-绑定下栏菜单点击事件
var selectTabPanelMenuIndex = 0;
function bindTabPanelMenuEvent(){
  $.each($("#tab_panel_menu_sel div"), function(index,obj){
    $(obj).on("click", function(){
      var index = $(this).index();
      if(index != selectTabPanelMenuIndex){
        selectTabPanelMenuIndex = index;
        //隐藏所有面板
        $("#restypeStatics").css("display", "none");
        $("#dateoverStatics").css("display", "none");
        $.each($("#tab_panel_menu_sel div"), function(index,obj){
          $(obj).removeClass("tab_panel_menu_select");
        });
        //显示选择面板
        $(this).addClass("tab_panel_menu_select");
        switch(index){
          case 0:
            accountingResourceReturn();//关闭资源类型统计
            $("#restypeStatics").css("display", "block");
            break;
          case 1:
            accountingResourceReturn();//关闭资源类型统计
            $("#dateoverStatics").css("display", "block");
            break;
          default:
            break;
        }
      }
    });
  });
}

//核算面板-资源类型统计-点击查看统计图
var accountingJson,strAccountingJson,strname;
var staticsctypeid = 0;
function accountingResource(){
	$("#resource-loading").css("display", "block");	 //加载面板
	isdblckick = true;//关闭移动弹出统计图
	isMapMoving = true; //关闭移动高亮区县
	handleStaticsNeedData();//查询资源类型统计图    
}

//核算面板-资源类型统计--关闭统计图
function accountingResourceReturn(){ 
  $("#resource-loading").css("display", "none");
	$("#resource-result").css("display", "none");
	$("#tab_table").css("display", "block");
	removeThemeLayerAcc();//清除统计图
	isdblckick = false;//打开移动弹出统计图
	isMapMoving = false; //打开移动高亮区县
}

//核算面板-时间过度统计-点击查看统计图
function accountingResourceByDate(){
  if($("#select-res-detail-date option:selected").text() != ""){
    $("#resource-loading").css("display", "block");  //加载面板
    isdblckick = true;//关闭移动弹出统计图
    isMapMoving = true; //关闭移动高亮区县
    handleStaticsNeedDataByDate();//查询时间过度统计图    
  }else{
    tipMapStaticsNoDataAutoHide("请更换价值类型或选择明细类型");
  }
}

//核算面板-时间过度统计--关闭统计图
function accountingResReturnByDate(){
  $("#resource-loading").css("display", "none");
  $("#resource-result-date").css("display", "none");
  $("#tab_table_date").css("display", "block");
  removeThemeLayerAcc();//清除统计图
  isdblckick = false;//打开移动弹出统计图
  isMapMoving = false; //打开移动高亮区县
}

//核算面板--时间过度统计---选择价值类型后查询对应明细下拉框数据并重新绑定
function selectResValueChangeMxType(){
  var restypeid = $("#select-resource-date option:selected").val();
  var waterTypeID = $("#select-res-value-date option:selected").val();
  switch(Number(restypeid)){
    case 1:
      bindDateOverSelectLand(waterTypeID);
      break;
    case 2:
      bindDateOverSelectWater(waterTypeID);
      break;
    case 3:
      bindDateOverSelectForest(waterTypeID);
      break;
    case 4:
      bindDateOverSelectMine(waterTypeID);
      break;
    case 5:
      bindDateOverSelectRenewable(waterTypeID);
      break;
    case 6:
      bindDateOverSelectAtmosphere(waterTypeID);
      break;
    default:
      break;
  }
}

//核算面板-关闭-统计表
function closeAccResourceResult(){
  closeAccountingMore();//关闭更多(报表)弹窗
  closeAccContrast();//关闭对比展示弹窗
}

//核算结果统计表弹窗--默认查询-价值量总统计
var isaccResourceReturnMore = false;
function accResourceReturnMore(){
  $("#WindowAccounting").css("display", "block");
  $("#accContrastshow").css("display", "none");
  if(!isaccResourceReturnMore){
    isaccResourceReturnMore = true;
    findAllResValueData(); //查询所有资源价值量总统计
  }
}

//核算结果统计表弹窗-关闭核算结果弹窗
function closeAccountingMore(){
  $("#WindowAccounting").css("display", "none");
  $("#Windowquxianxinxi") .css("display","none");
}

//核算结果统计表弹窗-查询所有资源价值量总统计
function findAllResValueData(){
  //findTypeValueYearByCondition();//先绑定年份下拉框，再查询根据年份查询数据
  valueYearSelCk();//静态下拉框，查询数据
}

//核算结果统计表弹窗-查询所有资源价值量总统计--下拉框选择后查询
function valueYearSelCk(){
  var yearID = $('#accWinReport-vl-sel option:selected').val();//实物量-价值量
  //查询价值量总统计
  findTypeValueDataByCondition(yearID, 0); //0：所有价值类型
}

//======================================核算统计表弹窗--资源明细查询Start===========================================
//打开水资源明细查询
var isFindDetalWater = false;
function findWaterDataDetal(){
  if(!isFindDetalWater){
    isFindDetalWater = true;
    acctbSelCh();//静态下拉框，查询数据
  }
}

//水资源明细查询--选择不同下拉框后-查询
function acctbSelCh(){
  useDataAllType = 1;
  var tbsel = $('#acc-mx-tb-sel option:selected').val();//时间年份
  var tbselac = $('#acc-mx-tb-sel-ac option:selected').val();//实物量-价值量
  if(tbselac == "1"){
    var valueTypesel = $('#amountTypeSelect option:selected').val();//类型
    findWaterDataByCondition(tbsel, valueTypesel); //查询实物量
    $("#amountTypeSelect").css("display","block");
    $("#valueTypeSelect").css("display","none");
  }else{
    var valueTypesel = $('#valueTypeSelect option:selected').val();//类型
    findWaterValueDataByCondition(tbsel, valueTypesel); //查询价值量
    $("#valueTypeSelect").css("display","block");
    $("#amountTypeSelect").css("display","none");
  }
}

//打开土地资源明细查询
var isFindDetalLand = false;
function findLandDataDetal(){
  if(!isFindDetalLand){
    isFindDetalLand = true;
    acctbSelChLand();//静态下拉框，查询数据
  }
}

//土地资源明细查询--选择不同下拉框后-查询
function acctbSelChLand(){  
  useDataAllType = 1;
  var tbsel = $('#acc-mx-tb-sel-land option:selected').val();//时间年份
  var tbselac = $('#acc-mx-tb-sel-ac-land option:selected').val();//实物量-价值量
  if(tbselac == "1"){
    var valueTypesel = $('#amountTypeSelect-land option:selected').val();//类型
    findLandDataByCondition(tbsel, valueTypesel); //查询实物量
    $("#amountTypeSelect-land").css("display","block");
    $("#valueTypeSelect-land").css("display","none");
  }else{
    var valueTypesel = $('#valueTypeSelect-land option:selected').val();//类型
    findLandValueDataByCondition(tbsel, valueTypesel); //查询价值量
    $("#valueTypeSelect-land").css("display","block");
    $("#amountTypeSelect-land").css("display","none");
  }
}

//打开林木资源明细查询
var isFindDetalForest = false;
function findForestDataDetal(){
  if(!isFindDetalForest){
    isFindDetalForest = true;
    acctbSelChForest();//静态下拉框，查询数据
  }
}

//林木资源明细查询--选择不同下拉框后-查询
function acctbSelChForest(){  
  useDataAllType = 1;
  var tbsel = $('#acc-mx-tb-sel-forest option:selected').val();//时间年份
  var tbselac = $('#acc-mx-tb-sel-ac-forest option:selected').val();//实物量-价值量
  if(tbselac == "1"){
    var valueTypesel = $('#amountTypeSelect-forest option:selected').val();//类型
    findForestDataByCondition(tbsel, valueTypesel); //查询实物量
    $("#amountTypeSelect-forest").css("display","block");
    $("#valueTypeSelect-forest").css("display","none");
  }else{
    var valueTypesel = $('#valueTypeSelect-forest option:selected').val();//类型
    findForestValueDataByCondition(tbsel, valueTypesel); //查询价值量
    $("#valueTypeSelect-forest").css("display","block");
    $("#amountTypeSelect-forest").css("display","none");
  }
}

//打开矿产资源明细查询
var isFindDetalMine = false;
function findMineDataDetal(){
  if(!isFindDetalMine){
    isFindDetalMine = true;
    acctbSelChMine();//静态下拉框，查询数据
  }
}

//矿产资源明细查询--选择不同下拉框后-查询
function acctbSelChMine(){  
  useDataAllType = 1;
  var tbsel = $('#acc-mx-tb-sel-mine option:selected').val();//时间年份
  var tbselac = $('#acc-mx-tb-sel-ac-mine option:selected').val();//实物量-价值量
  if(tbselac == "1"){
    var valueTypesel = $('#amountTypeSelect-mine option:selected').val();//类型
    findMineDataByCondition(tbsel, valueTypesel); //查询实物量
    $("#amountTypeSelect-mine").css("display","block");
    $("#valueTypeSelect-mine").css("display","none");
  }else{
    var valueTypesel = $('#valueTypeSelect-mine option:selected').val();//类型
    findMineValueDataByCondition(tbsel, valueTypesel); //查询价值量
    $("#valueTypeSelect-mine").css("display","block");
    $("#amountTypeSelect-mine").css("display","none");
  }
}

//打开可再生能源明细查询
var isFindDetalRenewable = false;
function findRenewableDataDetal(){
  if(!isFindDetalRenewable){
    isFindDetalRenewable = true;
    acctbSelChRenewable();//静态下拉框，查询数据
  }
}

//可再生能源明细查询--选择不同下拉框后-查询
function acctbSelChRenewable(){  
  useDataAllType = 1;
  var tbsel = $('#acc-mx-tb-sel-renewable option:selected').val();//时间年份
  var tbselac = $('#acc-mx-tb-sel-ac-renewable option:selected').val();//实物量-价值量
  if(tbselac == "1"){
    var valueTypesel = $('#amountTypeSelect-renewable option:selected').val();//类型
    findRenewableDataByCondition(tbsel, valueTypesel); //查询实物量
    $("#amountTypeSelect-renewable").css("display","block");
    $("#valueTypeSelect-renewable").css("display","none");
  }else{
    var valueTypesel = $('#valueTypeSelect-renewable option:selected').val();//类型
    findRenewableValueDataByCondition(tbsel, valueTypesel); //查询价值量
    $("#valueTypeSelect-renewable").css("display","block");
    $("#amountTypeSelect-renewable").css("display","none");
  }
}

//打开大气资源明细查询
var isFindDetalAtmosphere = false;
function findAtmosphereDataDetal(){
  if(!isFindDetalAtmosphere){
    isFindDetalAtmosphere = true;
    acctbSelChAtmosphere();//静态下拉框，查询数据
  }
}

//大气资源明细查询--选择不同下拉框后-查询
function acctbSelChAtmosphere(){  
  useDataAllType = 1;
  var tbsel = $('#acc-mx-tb-sel-atmosphere option:selected').val();//时间年份
  var tbselac = $('#acc-mx-tb-sel-ac-atmosphere option:selected').val();//实物量-价值量
  if(tbselac == "1"){
    var valueTypesel = $('#amountTypeSelect-atmosphere option:selected').val();//类型
    findAtmosphereDataByCondition(tbsel, valueTypesel); //查询实物量
    $("#amountTypeSelect-atmosphere").css("display","block");
    $("#valueTypeSelect-atmosphere").css("display","none");
  }else{
    var valueTypesel = $('#valueTypeSelect-atmosphere option:selected').val();//类型
    findAtmosphereValueDataByCondition(tbsel, valueTypesel); //查询价值量
    $("#valueTypeSelect-atmosphere").css("display","block");
    $("#amountTypeSelect-atmosphere").css("display","none");
  }
}
//======================================核算统计表弹窗--资源明细查询End===========================================

//核算结果对比弹窗-打开核算结果对比展示
var isfindWaterCompareValueData = false;
function accResourceContrast(){
  $("#accContrastshow").css("display", "block");
  $("#WindowAccounting").css("display", "none");
  if(!isfindWaterCompareValueData){
    isfindWaterCompareValueData = true;
    selYearConCh(1,1);//查询数据
  }
}

//核算结果对比弹窗-核算对比展示-查询数据-时间选择
//参数(one：第一张表格;two：第二张表格。排序需要同时查询两张表格;selchange：判断是否更换下拉框)
function selYearConCh(one,two,selchange){ 
  if(selchange){
    $.each($("#accCtYearOneSelect select"), function(index, obj){
      $(obj).css("display", "none");
    });
    $.each($("#accCtYearTwoSelect select"), function(index, obj){
      $(obj).css("display", "none");
    });
  }
  var restypeid = $('#accCtResSelect option:selected').val();//资源类型
  switch(Number(restypeid)){
    case 1:
      //查询土地资源
      if(selchange){
        $("#accCtYearOneSelect1").css("display", "block");
        $("#accCtYearTwoSelect1").css("display", "block");
      }
      if(one == 0 && two == 1){
        var yearID = $('#accCtYearTwoSelect1 option:selected').val();//时间年份 
        findLandValueDataAllByConditionCon(yearID,0,"accContrastshow-tbtwo",one,two);//查询对比数据
      }else {
        var yearID = $('#accCtYearOneSelect1 option:selected').val();//时间年份 
        findLandValueDataAllByConditionCon(yearID,0,"accContrastshow-tbone",one,two);//查询对比数据
      }
      break;
    case 2:
      //查询水资源
      if(selchange){
        $("#accCtYearOneSelect2").css("display", "block");
        $("#accCtYearTwoSelect2").css("display", "block");
      }
      if(one == 0 && two == 1){
        var yearID = $('#accCtYearTwoSelect2 option:selected').val();//时间年份 
        findWaterValueDataAllByConditionCon(yearID,0,"accContrastshow-tbtwo",one,two);//查询对比数据
      }else {
        var yearID = $('#accCtYearOneSelect2 option:selected').val();//时间年份 
        findWaterValueDataAllByConditionCon(yearID,0,"accContrastshow-tbone",one,two);//查询对比数据
      }
      break;
    case 3:
      //查询林木资源
      if(selchange){
        $("#accCtYearOneSelect3").css("display", "block");
        $("#accCtYearTwoSelect3").css("display", "block");
      }
      if(one == 0 && two == 1){
        var yearID = $('#accCtYearTwoSelect3 option:selected').val();//时间年份 
        findForestValueDataAllByConditionCon(yearID,0,"accContrastshow-tbtwo",one,two);//查询对比数据
      }else {
        var yearID = $('#accCtYearOneSelect3 option:selected').val();//时间年份 
        findForestValueDataAllByConditionCon(yearID,0,"accContrastshow-tbone",one,two);//查询对比数据
      }
      break;
    case 4:
      //查询矿产资源
      if(selchange){
        $("#accCtYearOneSelect4").css("display", "block");
        $("#accCtYearTwoSelect4").css("display", "block");
      }
      if(one == 0 && two == 1){
        var yearID = $('#accCtYearTwoSelect4 option:selected').val();//时间年份 
        findMineValueDataAllByConditionCon(yearID,0,"accContrastshow-tbtwo",one,two);//查询对比数据
      }else {
        var yearID = $('#accCtYearOneSelect4 option:selected').val();//时间年份 
        findMineValueDataAllByConditionCon(yearID,0,"accContrastshow-tbone",one,two);//查询对比数据
      }
      break;
    case 5:
      //查询可再生能源
      if(selchange){
        $("#accCtYearOneSelect5").css("display", "block");
        $("#accCtYearTwoSelect5").css("display", "block");
      }
      if(one == 0 && two == 1){
        var yearID = $('#accCtYearTwoSelect5 option:selected').val();//时间年份 
        findRenewableValueDataAllByConditionCon(yearID,0,"accContrastshow-tbtwo",one,two);//查询对比数据
      }else {
        var yearID = $('#accCtYearOneSelect5 option:selected').val();//时间年份 
        findRenewableValueDataAllByConditionCon(yearID,0,"accContrastshow-tbone",one,two);//查询对比数据
      }
      break;
    case 6:
      //查询大气资源
      if(selchange){
        $("#accCtYearOneSelect6").css("display", "block");
        $("#accCtYearTwoSelect6").css("display", "block");
      }
      if(one == 0 && two == 1){
        var yearID = $('#accCtYearTwoSelect6 option:selected').val();//时间年份 
        findAtmosphereValueDataAllByConditionCon(yearID,0,"accContrastshow-tbtwo",one,two);//查询对比数据
      }else {
        var yearID = $('#accCtYearOneSelect6 option:selected').val();//时间年份 
        findAtmosphereValueDataAllByConditionCon(yearID,0,"accContrastshow-tbone",one,two);//查询对比数据
      }
      break;
    default:
      break
  }
}

//核算结果对比弹窗-关闭核算结果对比展示
function closeAccContrast(){
  $("#accContrastshow").css("display", "none");
}

//分析面板--选择不同类型资源--设置专题图颜色
function ckAnResType(){
  var restypeid = $("#an-select-restype option:selected").val();
  //根据选择资源类型---设置生成的专题图颜色样式
  switch(Number(restypeid)){
    case 1:
      //查询土地
      colorList = ["#FDE2CA","#FACE9C","#F09C42","#D0770B","#945305"];
      break;
    case 2:
      //查询水
      colorList = ["#78C0F0","#0090F0","#004DF0","#000BF0","#0600A6"];
      break;
    case 3:
      //查询林木
      colorList = ["#B5F5B5","#56D156","#00B400","#007E00","#004D00"];
      break;
    case 4:
      //查询矿产
      colorList = ["#D1D1D1","#A8A8A8","#808080","#4F4F4F","#262626"];
      break;
    case 5:
      //查询可再生能源
      colorList = ["#DBF7BE","#ACF760","#90E33D","#78C22F","#558A21"];
      break;
    case 6:
      //查询大气
      colorList = ["#A3DAF7","#63C3F7","#36B4F7","#07A3F7","#0094E3"];
      break;
    default:
      break;
  }
}

//分析面板--生成统计专题图
function analyzeResSpecial(){
  var yearID = $('#an-select-year option:selected').val();//专题图类型
  var restypeid = $('#an-select-restype option:selected').val();//资源类型
  var waterTypeID = $('#an-select-value option:selected').val();//价值类型
  var speid = $('#an-select-spe option:selected').val();//专题图类型
  //var colorid = $('#an-select-color option:selected').val();//选中的值  
  specialThemeSelect(restypeid,yearID,waterTypeID,speid);//选择专题图展示
}

//分析面板--关闭统计专题图
function closeAnalyzeResSpecial(){
  removeDensityLayer();//清除密度专题图
  removeThemeLayerSub();//清除分段专题图
  removeThemeLayerRank();//清除等级专题图
  isdblckick = false;//打开移动弹出统计图
  isMapMoving = false; //打开移动高亮区县
}

//区县基础信息
function Windowquxianjichuxinxi(mingchen)
{
  // $("#Windowquxianxinxi")	.css("display","block");
$("#quyuming").text(mingchen)
  if(mingchen =="梅江区"){
  $("#shiwu05").text(75324.7497);  $("#shiwu10").text(75324.7497);  $("#shiwu15").text(75325.97);
  $("#jiazhi05").text(2237.673);  $("#jiazhi10").text(2235.736);  $("#jiazhi15").text(2241.002);
   }else if (mingchen =="兴宁市"){
	   $("#shiwu05").text(255585.9292);  $("#shiwu10").text(249672.5092);  $("#shiwu15").text(499628.4713);
	   $("#jiazhi05").text(2240.966);  $("#jiazhi10").text(2238.986);  $("#jiazhi15").text(2233.897);
   }else if (mingchen =="梅县区"){
	   $("#shiwu05").text(395454.0646);  $("#shiwu10").text(364708.5592);  $("#shiwu15").text(369517.7523);
	   $("#jiazhi05").text(2237.6731);  $("#jiazhi10").text(2235.7361);  $("#jiazhi15").text(2235.377);
   }else if (mingchen =="平远县"){
	   $("#shiwu05").text(177064.3304);  $("#shiwu10").text(177064.7166);  $("#shiwu15").text(172407.6713);
	   $("#jiazhi05").text(2240.34835);  $("#jiazhi10").text(2238.36835);  $("#jiazhi15").text(2231.277);
   }else if (mingchen =="蕉岭县"){
	   $("#shiwu05").text(155734.5471);  $("#shiwu10").text(157981.6624);  $("#shiwu15").text(137840.8797);
	   $("#jiazhi05").text(2238.2297);  $("#jiazhi10").text(2236.2537);  $("#jiazhi15").text(2235.427);
   }else if (mingchen =="大埔县"){
	   $("#shiwu05").text(512492.0696);  $("#shiwu10").text(512493.579);  $("#shiwu15").text(386913.2711);
	   $("#jiazhi05").text(2237.397);  $("#jiazhi10").text(2235.417);  $("#jiazhi15").text(2231.647);
   }else if (mingchen =="大埔县"){
	   $("#shiwu05").text(512492.0696);  $("#shiwu10").text(512493.579);  $("#shiwu15").text(386913.2711);
	   $("#jiazhi05").text(2237.397);  $("#jiazhi10").text(2235.417);  $("#jiazhi15").text(2231.647);
   }
}

//明细信息查询
function showResInfoMore(t){
  $("#accWinReport-mx").css("display", "block");
  $("#accWinReport").css("display", "none");
  findWaterDataByCondition(1,1);
}

//查询区域
var isfirstAccountingCbo = true;
var saveArea; //保存区县数据，后面统计图用到
function selectArea(){
	if(isfirstAccountingCbo){ //是否查询
	  isfirstAccountingCbo = false;
		$.ajax({
		    url:pathbase+'/areaTable/findArea.do',
		    type:'POST', //GET
		    async:true, //true或false,是否异步,异步：true
		    data:{}, //传递参数 
		    timeout:5000,    //超时时间
		    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
		    success:function(data,textStatus,jqXHR){
		    	var str = "";
		    	if(data != null){
		    	  saveArea = data;
		    		for(var i = 0; i < data.length;i++){
		    		  if(i == data.length-1){ //默认绑定全市
		    		    str += "<option value=" + data[i].areaID + " selected='selected'>" + data[i].areaMC + "</option>";
		    		  }else{
		    		    str += "<option value=" + data[i].areaID + ">" + data[i].areaMC + "</option>";
		    		  }
	     	    }
		        //$("#select-area").html(str);
		        $("#accWinReport-vl-sel-area").html(str);
		        $("#acc-mx-tb-sel-area-land").html(str);
		        $("#acc-mx-tb-sel-area-water").html(str);
		        $("#acc-mx-tb-sel-area-forest").html(str);
		        $("#acc-mx-tb-sel-area-mine").html(str);
		        $("#acc-mx-tb-sel-area-renewable").html(str);
		        $("#acc-mx-tb-sel-area-atmosphere").html(str);
		    	}
		    },
		    error:function(xhr,textStatus){
		      isfirstAccountingCbo = true;
	        console.log('selectArea()错误');
		    }
		});
	}
}

//查询资源类型
var ResourceTypeList;
function selectResource(){
	$.ajax({
	    url:pathbase+'/resourceTypeTable/get.do',
	    type:'POST', //GET
	    async:true, //或false,是否异步
	    data:{  }, //传递参数 
	    timeout:5000,    //超时时间
	    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
	    success:function(data,textStatus,jqXHR){
	    	var strResource = "<option value='0'>全部</option>";//<option value='0'>全部</option>
	    	var strResourceType = "<option value='0'>全部</option>";
	    	if(data != null){
	    	  var strjson = "[";
	    		for(var i = 0; i < data.length;i++){
//	    		  strjson += '[{"resourcetypeid":"' + data.data[i].resource_ID 
//	    		    + '"},{"resourcetypename":"' + data.data[i].resource_MC 
//	    		    +'"}],';//保存strjson
	    		  strResource += "<option value=" + data[i].resourceID + ">" + data[i].resourceMC + "</option>";
//	    			if(data.data[i].farresourcetypeid == 0){ //资源类型
//	    				
//	    			}else if(data.data[i].farresourcetypeid == 1){ //类型分类默认选项
//	    				strResourceType += "<option value=" + data.data[i].resourcetypeid + ">" + data.data[i].resourcetypename + "</option>";
//	    			}
     	    }
	        $("#select-resource").html(strResource);
//	        $("#select-resource-type").html(strResourceType);
//	        if(strjson.indexOf(",") != 0){
//	          strjson = strjson.substring(0, strjson.length-1);//截取最后一个“,”
//	          strjson += "]";
//	          ResourceTypeList = JSON.parse(strjson);//stringify():反转
//	        }
	    	}
	    },
	    error:function(xhr,textStatus){
	        console.log('selectResource()错误');
	    }
	});
}

//查询类型分类
var oldfarid = 1;//默认选项
function selectResourceType(){
	var farid = $('#select-resource option:selected').val();//选中的值
	if(oldfarid != farid){
		oldfarid = farid;
		var str = "<option value='0'>全部</option>";
		for(var i = 0; i < ResourceTypeList.length;i++){
			if(ResourceTypeList[i][0].farresourcetypeid == farid){
				str += "<option value=" + ResourceTypeList[i][1].resourcetypeid + ">" + ResourceTypeList[i][2].resourcetypename + "</option>";
			}
		}
    $("#select-resource-type").html(str);
	}
}




