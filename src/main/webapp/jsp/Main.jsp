<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%-- <c:import url="/jsp/PublicLink/PublicLink.jsp"></c:import> --%>
<%@ include file="/jsp/PublicLink/PublicLink.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7,IE=9,IE=10,IE=11" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<link rel="shortcut icon" type="image/svg" href="${pathweb}/content/images/login.ico" media="screen" /><!--网页小图标-->
<link rel="stylesheet" href="${pathweb}/layui/css/layui.css">
<link rel="stylesheet" href="${pathweb}/content/css/Main.css">
<link href="${pathweb}/content/css/FullWindow.css" type="text/css" rel="stylesheet" /><!-- 窗体插件 -->
<script type="text/javascript" src="${pathweb}/content/script/jquery.2.1.4.min.js"></script><!-- jquery -->
<link rel="stylesheet" href="${path}/web/jsTree/themes/default/style.min.css" />
<script src="${path}/web/jsTree/jstree.min.js"></script>
<title>梅州市资源环境管理应用系统</title>
<style type="text/css">
  #myMenu {
    position: absolute;
    visibility: hidden;
    z-index: 9999;
  }

  #myMenu ul {
    float: left;
    border: 1px solid #979797;
    background: #f1f1f1 url(../web/content/images/line.png) 36px 0 repeat-y;
    padding: 2px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, .6);
  }

  #myMenu ul li {
    width: 112px;
    float: left;
    clear: both;
    height: 30px;
    cursor: pointer;
    line-height: 30px;
  }

  #myMenu ul li:hover {
    background-color: #CAE1FF;
  }
</style>
</head>
<body id="bodyall" >
  <!-- 全屏遮罩 -->
  <div class="main-loading" id="main-loading">
    <div class="loading-con">
      <div class="loading-circle"></div>
      <img src="${pathweb}/content/images/logo.ico" title="loading" alt="loading">
    </div>
  </div>
  <!-- 头部区域 -->
  <div id="top"> 
    <div id="top_title">
      <a href="Main.jsp"><img id="top_title_img" alt="logo" src="${pathweb}/content/images/login.png" /></a>
    </div>
    <div id="top_info">
      <a href="javascript:;"> <img alt="图片" src="${pathweb}/content/images/avatar-default_b67b11e.png" id="userimg" /> <span id="username" style="margin-right: 18px;">李三</span> <span class="more"></span>
      </a>
      <div id="nav-child-bg">
        <dl class="nav-child">
          <dd>
            <a href="">基本资料</a>
          </dd>
          <dd>
            <a href="">安全设置</a>
          </dd>
          <dd>
            <a href="${path}/userTable/loginOut.do">退出登录</a>
          </dd>
        </dl>
      </div>
    </div>
    <ul id="top_menu">
      <li title="资源核算" class="menu_hover_bg"><a href="javascript:void(0)"><img alt="图片" src="${pathweb}/content/images/aliicons/map.png" /><span>资源核算</span></a></li>
      <li title="离任审计"><a href="javascript:void(0)"><img alt="图片" src="${pathweb}/content/images/aliicons/audit.png" /><span>离任审计</span></a></li>
      <li title="用户管理"><a href="javascript:void(0)"><img alt="图片" src="${pathweb}/content/images/aliicons/usermanage.png" /><span>用户管理</span></a></li>
      <li title="数据管理"><a href="javascript:void(0)"><img alt="图片" src="${pathweb}/content/images/aliicons/datamanage.png" /><span>数据管理</span></a></li>
      <li title="用户指南"><a href="javascript:void(0)"><img alt="图片" src="${pathweb}/content/images/aliicons/companion.png" /><span>用户指南</span></a></li>
    </ul>
  </div>
  <!-- 内容区域 -->
  <div id="body">
    <!-- 遮罩 -->
    <!-- <div class="load-bg" id="left-load-bg"></div>
    <div class="load-bg" id="right-load-bg"></div> -->

    <!-- 内容主体区域 -->
    <div id="body_content">
      <div id="map"></div>
      <!-- 右键菜单 -->
      <div id="myMenu">
        <ul style="margin-top: 0px; margin-bottom: 0px; margin-left:0px;">
          <li onclick="zoomin()">
              <div style="float:left;padding-right: 5px;width:30px;height:30px"><img src="${pathweb}/content/images/plus.png"/></div>
              <div style="float:left;width:52px;height:30px;  text-align: center; font-size: 15px;">放大</div>
          </li>
          <li onclick="zoomout()">
              <div style="float:left;padding-right: 5px;width:30px;height:30px"><img src="${pathweb}/content/images/subtract.png"/></div>
              <div style="float:left;width:52px;height:30px;  text-align: center; font-size: 15px;">缩小</div>
          </li>
        </ul>
      </div>
      <div id='result' class='container'hidden></div>
      <div id="popup"></div>
      <div id="popup2" class="ol-popup">
        <div id="popup-content"></div>
      </div>
      
      <!-- 统计图类型 -->
      <div class="editPane" role="group" aria-label="...">
        <button type='button' class='btn btn-default graph graph-active' id='bar'></button>
        <button type='button' class='btn btn-default graph' id='bar3d'></button>
        <button type='button' class='btn btn-default graph' id='ling'></button>
        <button type='button' class='btn btn-default graph' id='point'></button>
        <button type='button' class='btn btn-default graph' id='pie'></button>
        <button type='button' class='btn btn-default graph' id='ring'></button>
      </div>
      
      <!-- 图例 -->
      <div id="mapLegend" class="legend">
  			<div class="legendTitle"> <span>图例</span> </div>
  			<div class="legendContent">
  				<table>
  					<tr>
  						<td class="legendItemHeader" id="spe-year">资源价值量(2005年)</td>
  						<td class="legendItemValue">颜色</td>
  					</tr>
  					<tr>
  						<td class="legendItemHeader" id="spe-sub1">0亿 - 30亿</td>
  						<td class="legendItemValue" style="background: #FDE2CA" id="spe-sub-color1"></td>
  					</tr>
  					<tr>
  						<td class="legendItemHeader" id="spe-sub2">30亿 - 60亿</td>
  						<td class="legendItemValue" style="background: #FACE9C" id="spe-sub-color2"></td>
  					</tr>
  					<tr>
  						<td class="legendItemHeader" id="spe-sub3">60亿 - 90亿</td>
  						<td class="legendItemValue" style="background: #F09C42" id="spe-sub-color3"></td>
  					</tr>
  					<tr>
  						<td class="legendItemHeader" id="spe-sub4">90亿 - 120亿</td>
  						<td class="legendItemValue" style="background: #D0770B" id="spe-sub-color4"></td>
  					</tr>
  					<tr>
  						<td class="legendItemHeader" id="spe-sub5">120亿以上</td>
  						<td class="legendItemValue" style="background: #945305" id="spe-sub-color5"></td>
  					</tr>
  				</table>
  			</div>
  		</div>
  		<div id="infoBox">
  			<div style="text-align: center;background: #1E90FF"> 信息 </div>
  			<div id="infoContent" style="overflow-y: auto; padding: 5px; background-color: #FFFFFF"> </div>
  		</div>
    </div>

    <!-- 基础地图移入显示信息弹窗 -->
    <div id="baseInfoBox" class="panel panel-primary infoPane">
      <div class="panel-heading">
        <h5 class='panel-title text-center' >区县信息</h5>
      </div>
      <div id="baseInfoContent" class="panel-body content"> </div>
    </div>

    <!-- 快捷功能栏 -->
    <ul id="speedy">
      <li title="全屏" style="margin-right: 25px;"><img alt="图片" src="${pathweb}/content/images/aliicons/scan.png" /><span>全屏</span><span class="splitline">|</span></li>
      <li title="清空" onclick="clearFeatures()"><img alt="图片" src="${pathweb}/content/images/aliicons/delete.png" /><span>清空</span><span class="splitline">|</span></li>
      <li title="测量" class="li-menu"><img alt="图片" src="${pathweb}/content/images/aliicons/tool.png" /> <span>测量</span> <span class="splitline">|</span> <span class="li-menu-more"></span>
        <div id="measure-nav-child-bg">
          <dl class="measure-nav-child" id="measureTools">
            <dd title="长度"onclick="distanceMeasure()">
              <a>长度</a>
            </dd>
            <dd title="面积"onclick="areaMeasure()" >
              <a>面积</a>
            </dd>
          </dl>
        </div>
      </li>
      <li title="打印"><img alt="图片" src="${pathweb}/content/images/aliicons/screenshot.png" /><span>打印</span><span class="splitline">|</span></li>
      <li title="截图"><img alt="图片" src="${pathweb}/content/images/aliicons/screenshot.png" /><span>截图</span><span class="splitline">|</span></li>
      <li title="全图"><img alt="图片" src="${pathweb}/content/images/aliicons/full.png" /><span>全图</span><span class="splitline">|</span></li>
      <li title="漫游"><img alt="图片" src="${pathweb}/content/images/aliicons/move.png" /><span>漫游</span><span class="splitline">|</span></li>
      <li title="缩小" onclick="mapreduce()"><img alt="图片" src="${pathweb}/content/images/aliicons/zoomout.png" /><span>缩小</span><span class="splitline">|</span></li>
      <li title="放大" onclick="mapenlarge()"><img alt="图片" src="${pathweb}/content/images/aliicons/zoomin.png" /><span>放大</span><span class="splitline">|</span></li>  
    </ul>
    <div title="收起" id="speedybtn"></div>

    <!-- 左侧面板 -->
    <div id="left_view">
      <!-- 菜单-->
      <ul id="left_view_menu" style="margin-left: 0px;">
        <li hidden>
          <img alt="图片" src="${pathweb}/content/images/aliicons/search.png" /><span>搜索</span>
          <div style="background: #F60;">
            <nobr>搜索</nobr>
            <span style="border-top-color: #F60;"></span>
          </div>
        </li>
        <li class="view_menu_bg">
          <img alt="图片" src="${pathweb}/content/images/aliicons/catalog.png" /><span>区域</span>
          <div style="background: #F60;">
            <nobr>各区县定位</nobr>
            <span style="border-top-color: #F60;"></span>
          </div>
        </li>
        <li hidden>
          <img alt="图片" src="${pathweb}/content/images/aliicons/statistics.png" /><span>统计</span>
          <div style="background: #F60;">
            <nobr>统计</nobr>
            <span style="border-top-color: #F60;"></span>
          </div>
        </li>
        <li>
          <img alt="图片" src="${pathweb}/content/images/aliicons/sign.png" /><span>核算</span>
          <div style="background: #F60;">
            <nobr>核算统计</nobr>
            <span style="border-top-color: #F60;"></span>
          </div>
        </li>
        <li>
          <img alt="图片" src="${pathweb}/content/images/aliicons/analyze.png" style="width: 30px;height: 26px;"/><span>分析</span>
          <div style="background: #F60;">
            <nobr>地图专题图分析</nobr>
            <span style="border-top-color: #F60;"></span>
          </div>
        </li>
        <li>
          <img alt="图片" src="${pathweb}/content/images/aliicons/rs.png"  style="width: 28px;height: 28px;"/><span>遥感</span>
          <div style="background: #F60;">
            <nobr>查看遥感图片</nobr>
            <span style="border-top-color: #F60;"></span>
          </div>
        </li>
        <li>
          <img alt="图片" src="${pathweb}/content/images/aliicons/pdflook.png" /><span>查看</span>
          <div style="background: #F60;">
            <nobr>查看PDF</nobr>
            <span style="border-top-color: #F60;"></span>
          </div>
        </li>
      </ul>
      <!-- 内容区域 -->
      <div id="left_view_content">
        <!-- 搜索 -->
        <div class="left_view_content_panel" id="map_search">
          1
        </div>
         <!-- 区域 -->
        <div class="left_view_content_panel" id="map_catalogue" style="display: block;">
          <div style="display: inline-block; width: 100%; height: 100%; overflow: auto;">
            <ul id="areaDataTree"></ul>
          </div>
        </div>
        <!-- 统计 -->
        <div class="left_view_content_panel" id="map_statistics">
          3
        </div>        
        <!-- 核算 -->
        <div class="left_view_content_panel" id="map_accounting">
          <div id="tab_menu">
            <ul id="tab_menu_ul">
              <li style="width: 115px;"><a>统计图</a></li>
              <li style="width: 115px;"><a>统计表</a></li>
            </ul>
            <div id="tab_menu_select"></div>
          </div>
          <div id="tab_content">
            <!-- 统计图  -->
            <div class="tab_panel" id="panel_resoure">
              <div class="tab_panel_content" id="restypeStatics">
                <table class="tab_table_tb" id="tab_table">
                  <tr>
                    <td colspan="2" style="text-align: center;height:25px;font-size: 14px;"><b>资源类型统计</b></td>
                  </tr>
                  <tr>
                    <td colspan="2" style="text-align: left;height:20px;">说明：以下统计为资源价值量统计</td>
                  </tr>
                  <tr>
                    <td>查询年份：</td>
                    <td>
                      <select id="select-year" class="re-select"></select>
                    </td>
                  </tr>
                  <tr style="display:none;">
                    <td>查询范围：</td>
                    <td>
                      <select id="select-area" class="re-select"></select>
                    </td>
                  </tr>
                  <tr>
                    <td>资源类型：</td>
                    <td>
                      <select id="select-resource" class="re-select"><!-- onchange="selectResourceType()" -->
                        <option value="1">土地</option>
                        <option value="2">水</option>
                        <option value="3">林木</option>
                        <option value="4">矿产</option>
                        <option value="5">可再生能源</option>
                        <option value="6">大气</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>价值类型：</td>
                    <td>
                      <select id="select-res-value" class="re-select">
                        <option value="1">经济价值</option>
                        <option value="2">生态价值</option>
                        <option value="3">社会价值</option>
                      </select>
                    </td>
                  </tr>
                  <tr style="display: none;">
                    <td>类型分类：</td>
                    <td>
                      <select id="select-resource-type" class="re-select"></select>
                    </td>
                  </tr>
                  <tr style="height: 10px;"></tr>
                  <tr>
                    <td style="vertical-align: top;">选择展示：</td>
                    <td>
                      <ul class="ul-label-ck" id="ul-radio-chart">
                        <li style="height: 50px;" hidden>
                          <label class="label-ck" for="map-statistics"><input name="statistics-type" id="map-statistics" type="radio" checked="checked">统计图</label> 
                          <select id="select-statistics" class="re-select" style="margin-top: 5px;">
                            <option value="Bar">柱状图</option>
                            <option value="Bar3D">三维柱状图</option>
                            <option value="Point">点状图</option>
                            <option value="Line">折线图</option>
                            <option value="Pie">饼形图</option>
                            <option value="Ring">环形图</option>
                          </select>
                        </li>
                        <li><label class="label-ck" for="radio-chart-type1"><input name="ra-chart-type" id="radio-chart-type1" type="radio" checked="checked">柱状图</label></li>
                        <li><label class="label-ck" for="radio-chart-type2"><input name="ra-chart-type" id="radio-chart-type2" type="radio">三维柱状图</label></li>
                        <li><label class="label-ck" for="radio-chart-type3"><input name="ra-chart-type" id="radio-chart-type3" type="radio">点状图</label></li>
                        <li style="display:none"><label class="label-ck" for="radio-chart-type4"><input name="ra-chart-type" id="radio-chart-type4" type="radio">折线图</label></li>
                        <li><label class="label-ck" for="radio-chart-type5"><input name="ra-chart-type" id="radio-chart-type5" type="radio">饼形图</label></li>
                        <li><label class="label-ck" for="radio-chart-type6"><input name="ra-chart-type" id="radio-chart-type6" type="radio">环形图</label></li>
                      </ul>
                    </td>
                  </tr>
                  <tr style="height: 10px;"></tr>
                  <tr>
                    <td colspan="2" class="tab_table_btn">
                      <button class="layui-btn layui-btn-fluid layui-btn-normal " id="btn-accounting" onclick="accountingResource()">查看统计图</button>
                      <button class="layui-btn layui-btn-fluid layui-btn-normal" id="btn-accounting-return" onclick="accountingResourceReturn()">关闭统计图</button>                    
                    </td>
                  </tr>
                </table>
                <!-- 结果展示  -->
                <div id="resource-result">
                  <div class="resource-result-more">
                    <table class="stb-result" id="tb-statics-result">
                      <tr><td colspan="2" class="stb-result-tl">查询信息</td></tr>
                      <tr><td style="width: 60px">查询范围：</td><td>全市</td></tr>
                      <tr><td>资源类型：</td><td>资源名称</td></tr>
                      <tr><td>价值类型：</td><td>价值类型</td></tr>
                      <tr><td>查询年份：</td><td>年份</td></tr>
                      <tr><td>统计类型：</td><td>统计图</td></tr>
                      <tr><td colspan="2" class="stb-result-tl">结果分析(各区县优势资源)</td></tr>
                      <tr><td class="tb-statics-result-td-r">梅江区：</td><td>资源价值量</td></tr>
                      <tr><td class="tb-statics-result-td-r">梅县区：</td><td>资源价值量</td></tr>
                      <tr><td class="tb-statics-result-td-r">兴宁市：</td><td>资源价值量</td></tr>
                      <tr><td class="tb-statics-result-td-r">平远县：</td><td>资源价值量</td></tr>
                      <tr><td class="tb-statics-result-td-r">蕉岭县：</td><td>资源价值量</td></tr>
                      <tr><td class="tb-statics-result-td-r">大埔县：</td><td>资源价值量</td></tr>
                      <tr><td class="tb-statics-result-td-r">丰顺县：</td><td>资源价值量</td></tr>
                      <tr><td class="tb-statics-result-td-r">五华县：</td><td>资源价值量</td></tr>
                    </table>
                  </div>
                  <!-- <button class="layui-btn layui-btn-fluid layui-btn-normal" id="btn-accounting-return" onclick="accountingResourceReturn()">返 回</button> -->
                </div>                
              </div>
              <div class="tab_panel_content" id="dateoverStatics">
                <table class="tab_table_tb" id="tab_table_date">
                  <tr>
                    <td colspan="2" style="text-align: center;height:25px;font-size: 14px;"><b>时间过度统计</b></td>
                  </tr>
                  <tr>
                    <td colspan="2" style="text-align: left;height:20px;">说明：以下统计为资源价值量统计</td>
                  </tr>
                  <tr style="display:none;">
                    <td style="width: 60px;">开始年份：</td>
                    <td><input readonly="true" id="select-year-start" class="re-text" type="text" name="title" placeholder="请选择年份" autocomplete="off" class="layui-input"></td>
                  </tr>
                  <tr style="display:none;">
                    <td>结束年份：</td>
                    <td><input readonly="true" id="select-year-end" class="re-text" type="text" name="title" placeholder="请选择年份" autocomplete="off" class="layui-input"></td>
                  </tr>
                  <tr>
                    <td>资源类型：</td>
                    <td>
                      <select id="select-resource-date" class="re-select" onchange="selectResValueChangeMxType()">
                        <option value="1" selected="selected">土地</option>
                        <option value="2">水</option>
                        <option value="3">林木</option>
                        <option value="4">矿产</option>
                        <option value="5">可再生能源</option>
                        <option value="6">大气</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>价值类型：</td>
                    <td>
                      <select id="select-res-value-date" class="re-select" onchange="selectResValueChangeMxType()">
                        <option value="1" selected="selected">经济价值</option>
                        <option value="2">生态价值</option>
                        <option value="3">社会价值</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>明细类型：</td>
                    <td>
                      <select id="select-res-detail-date" class="re-select"></select>
                    </td>
                  </tr>
                  <tr style="height: 10px;"></tr>
                  <tr>
                    <td style="vertical-align: top;">选择展示：</td>
                    <td>
                      <ul class="ul-label-ck" id="ul-radio-chart-date">
                        <li><label class="label-ck" for="radio-chart-type1-date"><input name="ra-chart-type-date" id="radio-chart-type1-date" type="radio" checked="checked">柱状图</label></li>
                        <li><label class="label-ck" for="radio-chart-type2-date"><input name="ra-chart-type-date" id="radio-chart-type2-date" type="radio">三维柱状图</label></li>
                        <li><label class="label-ck" for="radio-chart-type3-date"><input name="ra-chart-type-date" id="radio-chart-type3-date" type="radio">点状图</label></li>
                        <li><label class="label-ck" for="radio-chart-type4-date"><input name="ra-chart-type-date" id="radio-chart-type4-date" type="radio">折线图</label></li>
                        <li style="display:none"><label class="label-ck" for="radio-chart-type5-date"><input name="ra-chart-type-date" id="radio-chart-type5-date" type="radio">饼形图</label></li>
                        <li style="display:none"><label class="label-ck" for="radio-chart-type6-date"><input name="ra-chart-type-date" id="radio-chart-type6-date" type="radio">环形图</label></li>
                      </ul>
                    </td>
                  </tr>
                  <tr style="height: 10px;"></tr>
                  <tr>
                    <td colspan="2" class="tab_table_btn">
                      <button class="layui-btn layui-btn-fluid layui-btn-normal " id="btn-accounting-date" onclick="accountingResourceByDate()">查看统计图</button>
                      <button class="layui-btn layui-btn-fluid layui-btn-normal" id="btn-accounting-return-date" onclick="accountingResReturnByDate()">关闭统计图</button>                    
                    </td>
                  </tr>
                </table>
                <!-- 结果展示  -->
                <div id="resource-result-date">
                  <div class="resource-result-more">
                    <table class="stb-result" id="tb-statics-result-date">
                      <tr><td colspan="2" class="stb-result-tl">查询信息</td></tr>
                      <tr><td style="width: 60px">查询范围：</td><td>全市</td></tr>
                      <tr><td>资源类型：</td><td>资源名称</td></tr>
                      <tr><td>价值类型：</td><td>价值类型</td></tr>
                      <tr><td>查询年份：</td><td>年份</td></tr>
                      <tr><td>统计类型：</td><td>统计图</td></tr>
                      <tr><td colspan="2" class="stb-result-tl">结果分析(各区县价值量)</td></tr>
                      <tr><td class="tb-statics-result-td-r">梅江区：</td><td>资源价值量</td></tr>
                      <tr><td class="tb-statics-result-td-r">梅县区：</td><td>资源价值量</td></tr>
                      <tr><td class="tb-statics-result-td-r">兴宁市：</td><td>资源价值量</td></tr>
                      <tr><td class="tb-statics-result-td-r">平远县：</td><td>资源价值量</td></tr>
                      <tr><td class="tb-statics-result-td-r">蕉岭县：</td><td>资源价值量</td></tr>
                      <tr><td class="tb-statics-result-td-r">大埔县：</td><td>资源价值量</td></tr>
                      <tr><td class="tb-statics-result-td-r">丰顺县：</td><td>资源价值量</td></tr>
                      <tr><td class="tb-statics-result-td-r">五华县：</td><td>资源价值量</td></tr>
                    </table>
                  </div>
                  <!-- <button class="layui-btn layui-btn-fluid layui-btn-normal" id="btn-accounting-return-date" onclick="accountingResReturnByDate()">返 回</button> -->
                </div>                
              </div>
              <div class="tab_panel_menu" id="tab_panel_menu_sel">
                <div class="tab_panel_menu_select">资源类型统计</div>
                <div>时间过度统计</div>
              </div>
            </div>
            <!-- 统计表  -->
            <div class="tab_panel" id="panel_debt">
              <div class="tab_table_btn" style="margin-top: 10px;">
                <button class="layui-btn layui-btn-fluid layui-btn-normal " id="btn-accounting-more" onclick="accResourceReturnMore()">查看统计表</button>
                <button class="layui-btn layui-btn-fluid layui-btn-normal " id="btn-accounting-contrast" onclick="accResourceContrast()">数据对比</button>
              </div> 
            </div>
          </div>
          <!-- 加载面板  -->
          <div id="resource-loading">
            <i class="layui-icon layui-anim layui-anim-rotate layui-anim-loop">&#xe63d;</i>
          </div>
        </div>
        <!-- 分析  -->
        <div class="left_view_content_panel" id="map_analyze">
          <table class="an-tb-pan">
            <tr style="height: 40px;">
              <td colspan="2" style="font-size: 16px;text-align: center;">地图专题图</td>
            </tr>
            <tr>
              <td><label>查询年份</label> </td>
              <td>
                <select id="an-select-year" class="re-select">
                  <option value="1">2005</option>
                  <option value="6">2010</option>
                  <option value="11">2015</option>
                </select>
              </td>
            </tr>
            <tr>
              <td style="width: 70px;"><label>资源类型</label> </td>
              <td>
                <select id="an-select-restype" class="re-select" onchange="ckAnResType()">
                  <option value="1">土地</option>
                  <option value="2">水</option>
                  <option value="3">林木</option>
                  <option value="4">矿产</option>
                  <option value="5">可再生能源</option>
                  <option value="6">大气</option>
                </select>
              </td>
            </tr>
            <tr>
              <td><label>价值类型</label></td>
              <td>
                <select id="an-select-value" class="re-select">
                  <option value="1">经济价值</option>
                  <option value="2">生态价值</option>
                  <option value="3">社会价值</option>
                </select>
              </td>
            </tr>
            <tr>
              <td><label>专题图类型</label> </td>
              <td>
                <select id="an-select-spe" class="re-select">
                  <option value="1" hidden>密度专题图</option>
                  <option value="2" selected="selected">等级专题图</option>
                  <option value="3">分段专题图</option>
                  <option value="4" style="display:none;">单值专题图</option>
                </select>
              </td>
            </tr>
            <tr style="display: none;">
              <td><label>专题图颜色</label> </td>
              <td>
                <select id="an-select-color" class="re-select">
                  <option value="1">红色</option>
                  <option value="2">蓝色</option>
                  <option value="3">深绿色</option>
                </select>
              </td>
            </tr>
          </table>
          <button class="layui-btn layui-btn-fluid layui-btn-normal an-panel-btn" id="btn-acc-an-sel" onclick="analyzeResSpecial()">创建专题图</button>
          <button class="layui-btn layui-btn-fluid layui-btn-normal an-panel-btn" id="btn-acc-an-close" onclick="closeAnalyzeResSpecial()">关闭专题图</button>
        </div>
        <!-- 遥感  -->
        <div class="left_view_content_panel" id="map_yingxiang">
          
        </div>        
        <!-- 查看  -->
        <div class="left_view_content_panel" id="map_pdflook">
          <script type="text/javascript">
               $("#map_pdflook").load("${path}/jsp/pdfLook/pdfTree.jsp");
          </script>
        </div>
      </div>

      <!-- 面板按钮 -->
      <div id="left_view_btn">
        <div class="left_btn" id="left_btn_show" title="收起">
          <div class="left_btn" id="left_btn_blck"></div>
          <div id="left_btn_icon"></div>
        </div>
      </div>
    </div>
    
    <!-- 地图切换 -->
    <div id="map_switch">
      <div id="mapType">
        <div class="mapTypeCard normal active" onclick="showyinxiang()">
          <span>地图</span>
        </div>
        <div class="mapTypeCard earth"  onclick="show()">
          <span>卫星</span>
        </div>
      </div>
    </div>

    <!-- 测量结果展示 -->
    <div id="measure-result"></div>

    <!-- 统计窗体 -->
    <div id="StatisticsResult">
      <div class="StatisticsMenu">
        <label>查询区域</label> 
        <select id="area" style="width: 80px;">
          <option value="0">全市</option>
          <option value="1">梅江区</option>
          <option value="2">梅县区</option>
          <option value="3">兴宁市</option>
          <option value="4">平远县</option>
          <option value="5">蕉岭县</option>
          <option value="6">大埔县</option>
          <option value="7">丰顺县</option>
          <option value="8">五华县</option>
        </select> 
        <label style="margin-left: 20px;">统计展示</label> 
        <select id="StatisticsType" style="width: 100px; margin-left: 5px;">
          <option value="1">柱形图</option>
          <option value="2">饼形图</option>
        </select>
        <div class="closeStatistics">
          <img alt="关闭" src="${pathweb}/content/images/close.png" onclick="closeStatisticsPanel()" />
        </div>
      </div>
      <div id="showResult"></div>
      <div id="showResult2"></div>
    </div>

    <!-- 统计表窗体 -->
    <div id="WindowAccounting">
      <div class="window-accounting-title" id="WindowAccountingTop">
        <span>统计表</span>
        <div title="关闭" onclick="closeAccountingMore()"></div>
      </div>
      <div class="window-accounting-content">
        <div class="layui-tab layui-tab-card" lay-filter="tab-accounting">
          <ul class="layui-tab-title">
            <li lay-id="1" class="layui-this">价值量总统计</li>
            <li lay-id="2">土地资源明细</li>
            <li lay-id="3">水资源明细</li>
            <li lay-id="4">林木资源明细</li>
            <li lay-id="5">矿产资源明细</li>
            <li lay-id="6">可再生能源明细</li>
            <li lay-id="7">大气资源明细</li>
          </ul>
          <div class="layui-tab-content">
            <!-- 价值量总统计 -->
            <div class="layui-tab-item layui-show">
              <div class="accWinReport-mx">
                <table id="accWinReport-vl" class="layui-table accWinReport-mx-tb acc-mx-tb">
                  <thead>
                    <tr><th colspan="9" >
                    <select id="accWinReport-vl-sel" onchange="valueYearSelCk()" style="height: 24px;"></select>年
                    <select id="accWinReport-vl-sel-area" onchange="resetAllValTableBySelectArea()" style="height:24px;"></select>价值量汇总(元)</th></tr>
                    <tr><th></th><th>土地</th><th>水</th><th>林木</th><th>矿产</th><th>可再生能源</th><th>大气</th><th>合计1</th><th>合计2</th></tr>
                  </thead>
                  <tbody>
                    
                  </tbody>
                </table>
                <label style="line-height: 30px;">说明：合计1等于土地、水、林木、矿产的总和；合计2等于土地、水、林木、矿产、可再生能源和大气的总和</label>
              </div>
            </div>
            <!-- 土地资源明细 -->
            <div class="layui-tab-item">
              <div class="accWinReport-mx">
                <table class="layui-table accWinReport-mx-tb acc-mx-tb" id="accWinReport-mx-tb-land">
                  <thead>
                    <tr>
                      <th colspan="11">
                        <select id="acc-mx-tb-sel-land" style="height: 24px;" onchange="acctbSelChLand()"></select>年
                        <select id="acc-mx-tb-sel-area-land" onchange="resetMxTableBySelectArea('accWinReport-mx-tb-land')" style="height:24px;"></select>土地资源
                        <select id="acc-mx-tb-sel-ac-land" style="height: 24px;" onchange="acctbSelChLand()">
                          <option value="1">实物量</option>
                          <option value="2">价值量</option>
                        </select>明细统计
                      </th>
                    </tr>
                    <tr>
                      <th style="max-width: 65px;">类型</th>
                      <th>梅江区</th>
                      <th>梅县区</th>
                      <th>兴宁市</th>
                      <th>平远县</th>
                      <th>蕉岭县</th>
                      <th>大埔县</th>
                      <th>丰顺县</th>
                      <th>五华县</th>
                      <th>全市</th>
                      <th style="width: 60px;">单位</th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
                <div class="accWinReport-mx-me">
                  <div class="accWinReport-mx-me-div">
                    <label>类型：</label>            
                    <select class="acc-select" id="amountTypeSelect-land" onchange="acctbSelChLand()">
                      <option value="1">资源实物量</option>
                      <option value="2">功能实物量</option>
                      <option value="3">社会实物量</option>
                    </select>
                    <select class="acc-select" id="valueTypeSelect-land" onchange="acctbSelChLand()" style="display: none;">
                      <option value="1">经济价值</option>
                      <option value="2">生态价值</option>
                      <option value="3">社会价值</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <!-- 水资源明细 -->
            <div class="layui-tab-item">              
              <div class="accWinReport-mx">
                <table class="layui-table accWinReport-mx-tb acc-mx-tb" id="accWinReport-mx-tb-water">
                  <thead>
                    <tr>
                      <th colspan="11">
                        <select id="acc-mx-tb-sel" style="height: 24px;" onchange="acctbSelCh()"></select>年
                        <select id="acc-mx-tb-sel-area-water" onchange="resetMxTableBySelectArea('accWinReport-mx-tb-water')" style="height:24px;"></select>水资源
                        <select id="acc-mx-tb-sel-ac" style="height: 24px;" onchange="acctbSelCh()">
                          <option value="1">实物量</option>
                          <option value="2">价值量</option>
                        </select>明细统计
                      </th>
                    </tr>
                    <tr>
                      <th style="width: 65px;">类型</th>
                      <th>梅江区</th>
                      <th>梅县区</th>
                      <th>兴宁市</th>
                      <th>平远县</th>
                      <th>蕉岭县</th>
                      <th>大埔县</th>
                      <th>丰顺县</th>
                      <th>五华县</th>
                      <th>全市</th>
                      <th style="width: 60px;">单位</th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
                <div class="accWinReport-mx-me">
                  <div class="accWinReport-mx-me-div">
                    <label>类型：</label>            
                    <select class="acc-select" id="amountTypeSelect" onchange="acctbSelCh()">
                      <option value="1">资源实物量</option>
                      <option value="2">功能实物量</option>
                      <option value="3">社会实物量</option>
                    </select>
                    <select class="acc-select" id="valueTypeSelect" onchange="acctbSelCh()" style="display: none;">
                      <option value="1">经济价值</option>
                      <option value="2">生态价值</option>
                      <option value="3">社会价值</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <!-- 林木资源明细 -->
            <div class="layui-tab-item">
              <div class="accWinReport-mx">
                <table class="layui-table accWinReport-mx-tb acc-mx-tb" id="accWinReport-mx-tb-forest">
                  <thead>
                    <tr>
                      <th colspan="11">
                        <select id="acc-mx-tb-sel-forest" style="height: 24px;" onchange="acctbSelChForest()"></select>年
                        <select id="acc-mx-tb-sel-area-forest" onchange="resetMxTableBySelectArea('accWinReport-mx-tb-forest')" style="height:24px;"></select>林木资源
                        <select id="acc-mx-tb-sel-ac-forest" style="height: 24px;" onchange="acctbSelChForest()">
                          <option value="1">实物量</option>
                          <option value="2">价值量</option>
                        </select>明细统计
                      </th>
                    </tr>
                    <tr>
                      <th style="width: 65px;">类型</th>
                      <th>梅江区</th>
                      <th>梅县区</th>
                      <th>兴宁市</th>
                      <th>平远县</th>
                      <th>蕉岭县</th>
                      <th>大埔县</th>
                      <th>丰顺县</th>
                      <th>五华县</th>
                      <th>全市</th>
                      <th style="width: 60px;">单位</th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
                <div class="accWinReport-mx-me">
                  <div class="accWinReport-mx-me-div">
                    <label>类型：</label>            
                    <select class="acc-select" id="amountTypeSelect-forest" onchange="acctbSelChForest()">
                      <option value="1">资源实物量</option>
                      <option value="2">功能实物量</option>
                      <option value="3">社会实物量</option>
                    </select>
                    <select class="acc-select" id="valueTypeSelect-forest" onchange="acctbSelChForest()" style="display: none;">
                      <option value="1">经济价值</option>
                      <option value="2">生态价值</option>
                      <option value="3">社会价值</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <!-- 矿产资源明细 -->
            <div class="layui-tab-item">
              <div class="accWinReport-mx">
                <table class="layui-table accWinReport-mx-tb acc-mx-tb" id="accWinReport-mx-tb-mine">
                  <thead>
                    <tr>
                      <th colspan="11">
                        <select id="acc-mx-tb-sel-mine" style="height: 24px;" onchange="acctbSelChMine()"></select>年
                        <select id="acc-mx-tb-sel-area-mine" onchange="resetMxTableBySelectArea('accWinReport-mx-tb-mine')" style="height:24px;"></select>矿产资源
                        <select id="acc-mx-tb-sel-ac-mine" style="height: 24px;" onchange="acctbSelChMine()">
                          <option value="1">实物量</option>
                          <option value="2">价值量</option>
                        </select>明细统计
                      </th>
                    </tr>
                    <tr>
                      <th style="width: 65px;">类型</th>
                      <th>梅江区</th>
                      <th>梅县区</th>
                      <th>兴宁市</th>
                      <th>平远县</th>
                      <th>蕉岭县</th>
                      <th>大埔县</th>
                      <th>丰顺县</th>
                      <th>五华县</th>
                      <th>全市</th>
                      <th style="width: 60px;">单位</th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
                <div class="accWinReport-mx-me">
                  <div class="accWinReport-mx-me-div">
                    <label>类型：</label>            
                    <select class="acc-select" id="amountTypeSelect-mine" onchange="acctbSelChMine()">
                      <option value="1">资源实物量</option>
                      <option value="2">功能实物量</option>
                      <option value="3">社会实物量</option>
                    </select>
                    <select class="acc-select" id="valueTypeSelect-mine" onchange="acctbSelChMine()" style="display: none;">
                      <option value="1">经济价值</option>
                      <option value="2">生态价值</option>
                      <option value="3">社会价值</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <!-- 可再生能源明细 -->
            <div class="layui-tab-item">
              <div class="accWinReport-mx">
                <table class="layui-table accWinReport-mx-tb acc-mx-tb" id="accWinReport-mx-tb-renewable">
                  <thead>
                    <tr>
                      <th colspan="11">
                        <select id="acc-mx-tb-sel-renewable" style="height: 24px;" onchange="acctbSelChRenewable()"></select>年
                        <select id="acc-mx-tb-sel-area-renewable" onchange="resetMxTableBySelectArea('accWinReport-mx-tb-renewable')" style="height:24px;"></select>可再生能源
                        <select id="acc-mx-tb-sel-ac-renewable" style="height: 24px;" onchange="acctbSelChRenewable()">
                          <option value="1">实物量</option>
                          <option value="2">价值量</option>
                        </select>明细统计
                      </th>
                    </tr>
                    <tr>
                      <th style="width: 65px;">类型</th>
                      <th>梅江区</th>
                      <th>梅县区</th>
                      <th>兴宁市</th>
                      <th>平远县</th>
                      <th>蕉岭县</th>
                      <th>大埔县</th>
                      <th>丰顺县</th>
                      <th>五华县</th>
                      <th>全市</th>
                      <th style="width: 60px;">单位</th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
                <div class="accWinReport-mx-me">
                  <div class="accWinReport-mx-me-div">
                    <label>类型：</label>            
                    <select class="acc-select" id="amountTypeSelect-renewable" onchange="acctbSelChRenewable()">
                      <option value="1">资源实物量</option>
                      <option value="2">功能实物量</option>
                      <option value="3">社会实物量</option>
                    </select>
                    <select class="acc-select" id="valueTypeSelect-renewable" onchange="acctbSelChRenewable()" style="display: none;">
                      <option value="1">经济价值</option>
                      <option value="2">生态价值</option>
                      <option value="3">社会价值</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <!-- 大气资源明细 -->
            <div class="layui-tab-item">
              <div class="accWinReport-mx">
                <table class="layui-table accWinReport-mx-tb acc-mx-tb" id="accWinReport-mx-tb-atmosphere">
                  <thead>
                    <tr>
                      <th colspan="11">
                        <select id="acc-mx-tb-sel-atmosphere" style="height: 24px;" onchange="acctbSelChAtmosphere()"></select>年
                        <select id="acc-mx-tb-sel-area-atmosphere" onchange="resetMxTableBySelectArea('accWinReport-mx-tb-atmosphere')" style="height:24px;"></select>大气资源
                        <select id="acc-mx-tb-sel-ac-atmosphere" style="height: 24px;" onchange="acctbSelChAtmosphere()">
                          <option value="1">实物量</option>
                          <option value="2">价值量</option>
                        </select>明细统计
                      </th>
                    </tr>
                    <tr>
                      <th style="width: 65px;">类型</th>
                      <th>梅江区</th>
                      <th>梅县区</th>
                      <th>兴宁市</th>
                      <th>平远县</th>
                      <th>蕉岭县</th>
                      <th>大埔县</th>
                      <th>丰顺县</th>
                      <th>五华县</th>
                      <th>全市</th>
                      <th style="width: 60px;">单位</th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
                <div class="accWinReport-mx-me">
                  <div class="accWinReport-mx-me-div">
                    <label>类型：</label>            
                    <select class="acc-select" id="amountTypeSelect-atmosphere" onchange="acctbSelChAtmosphere()">
                      <option value="1">资源实物量</option>
                      <option value="2">功能实物量</option>
                      <option value="3">社会实物量</option>
                    </select>
                    <select class="acc-select" id="valueTypeSelect-atmosphere" onchange="acctbSelChAtmosphere()" style="display: none;">
                      <option value="1">经济价值</option>
                      <option value="2">生态价值</option>
                      <option value="3">社会价值</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 核算结果窗体 -->
    <div id="WindowAccountingquyu" style="z-index: 1010;position:absolute;left:0px;top:60px;display:none;">
      <div class="window-accounting-title" id="WindowAccountingquyuTop">
        <span id="mingchen1";></span>
        <div title="关闭" onclick="closeAccountingMoreArea()"></div>
      </div>
      <div class="window-accounting-content" style="padding:0px;">
        <div class="layui-tab layui-tab-card" lay-filter="tab-accounting">
          <div class="layui-tab-content" style="padding:0px;">
            <!-- 总统计 -->
            <div class="layui-tab-item layui-show">
              <table id="accWinReport" class="layui-table">
                <thead>
                  <tr>
                    <th colspan="4" style="min-width: 688px;">
                      <select id="allYearSelArea" style="height: 24px;" onchange="selWaterTotalValue()"></select>年统计
                    </th>
                  </tr>
                  <tr><th>类型</th><th>价值量(单位亿元)</th><th style="width: 100px;"></th></tr>
                </thead>
                <tbody>
                  <tr><td>土地</td><td id="tudijiazhi"></td><td><a href="javascript:void(0);" onclick="showResInfoMore(this)">明细信息</a></td></tr>
                  <tr><td>水</td><td id="shuiJiaZhiLiang"></td><td><a href="javascript:void(0);" onclick="showResInfoMore(this)">明细信息</a></td></tr>
                  <tr><td>林木</td><td id="linmujiazhi"></td><td><a href="javascript:void(0);" onclick="showResInfoMore(this)">明细信息</a></td></tr>
                  <tr><td>矿产</td><td id="kuangchangjiazhi"></td><td><a href="javascript:void(0);" onclick="showResInfoMore(this)">明细信息</a></td></tr>
                  <tr><td>大气</td><td id="daqijiazhi"></td><td><a href="javascript:void(0);" onclick="showResInfoMore(this)">明细信息</a></td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div> 

    <!-- 核算数据对比展示结果 -->
    <div id="accContrastshow">
      <div id="accContrastshow-tl" class="window-accounting-title">
        <span>数据对比</span>
        <div title="关闭" onclick="closeAccContrast()"></div>
      </div>
      <div id="accContrastshow-ct">
        <div class="accContrastshow-form">
          <label>资源类型：</label>
          <select id="accCtResSelect" class="acc-select" onchange="selYearConCh(1,1,true)">
            <option value="1">土地</option>
            <option value="2">水</option>
            <option value="3">林木</option>
            <option value="4">矿产</option>
            <option value="5">可再生能源</option>
            <option value="6">大气</option>
          </select>                        
        </div>
        <div id="accContrastshow-one">
          <div class="accContrastshow-form">
            <label style="float: left;line-height: 24px">选择年份：</label>
            <div id="accCtYearOneSelect">
              <select id="accCtYearOneSelect1" onchange="selYearConCh(1,1,false)" class="acc-select"></select>    
              <select id="accCtYearOneSelect2" onchange="selYearConCh(1,1,false)" class="acc-select con-select-year"></select>    
              <select id="accCtYearOneSelect3" onchange="selYearConCh(1,1,false)" class="acc-select con-select-year"></select> 
              <select id="accCtYearOneSelect4" onchange="selYearConCh(1,1,false)" class="acc-select con-select-year"></select> 
              <select id="accCtYearOneSelect5" onchange="selYearConCh(1,1,false)" class="acc-select con-select-year"></select> 
              <select id="accCtYearOneSelect6" onchange="selYearConCh(1,1,false)" class="acc-select con-select-year"></select>   
            </div>
          </div>
          <table id="accContrastshow-tbone" class="layui-table acc-table">
            <thead>
              <tr><th colspan="2" >2005</th></tr>
              <tr><th>行政分区</th><th>价值量(元)</th></tr>
            </thead>
            <tbody>
              
            </tbody>
          </table>
        </div>
        <div id="accContrastshow-two">
          <div class="accContrastshow-form">
            <label style="float: left;line-height: 24px">选择年份：</label>
            <div id="accCtYearTwoSelect">
              <select id="accCtYearTwoSelect1" onchange="selYearConCh(1,1,false)" class="acc-select"></select>    
              <select id="accCtYearTwoSelect2" onchange="selYearConCh(1,1,false)" class="acc-select con-select-year"></select> 
              <select id="accCtYearTwoSelect3" onchange="selYearConCh(1,1,false)" class="acc-select con-select-year"></select> 
              <select id="accCtYearTwoSelect4" onchange="selYearConCh(1,1,false)" class="acc-select con-select-year"></select> 
              <select id="accCtYearTwoSelect5" onchange="selYearConCh(1,1,false)" class="acc-select con-select-year"></select> 
              <select id="accCtYearTwoSelect6" onchange="selYearConCh(1,1,false)" class="acc-select con-select-year"></select>   
            </div>
          </div>
          <table id="accContrastshow-tbtwo" class="layui-table acc-table acc-fixed-tb">
            <thead>
              <tr><th colspan="3" >2010</th></tr>
              <tr><th>行政分区</th><th>价值量(元)</th></tr>
            </thead>
            <tbody>
              
            </tbody>
          </table>
        </div>
        <div id="accContrastshow-three">
          <div class="accContrastshow-form">
            <label>变化量：</label>
            <label for="difPercentageSortValCk" class="acc_dif_label"><input type="checkbox" id="difPercentageSortValCk" onclick="difPercentageSortChange(1)"/>变化量排序</label>
            <label for="difPercentageSortPerCk" class="acc_dif_label"><input type="checkbox" id="difPercentageSortPerCk" onclick="difPercentageSortChange(2)"/>变化百分比排序</label>
          </div>
          <table id="accContrastshow-tbthree" class="layui-table acc-table acc-fixed-tb">
            <thead>
              <tr><th colspan="2">2005 - 2010</th></tr>
              <tr><th>变化量(元)</th><th>变化量(百分比)</th></tr>
            </thead>
            <tbody>
            
            </tbody>
          </table>
        </div>
      </div>
      <table id="SortSubstitutionTable" style="display:none;">
        <thead><tr><th>价值量1</th><th>价值量2</th><th>变化量(元)</th><th>变化量(百分比)</th><th>行政分区</th></tr></thead>
        <tbody></tbody>
      </table>
    </div>

    <!-- 自定义图层管理器 -->
    <div id="CutLayerManage"hidden>
      <div class="layer-switcher">
        <img title="图层管理器" alt="图层管理器" src="${pathweb}/SuperMap/images/layer-switcher-maximize.png"/>
        <div id="layer-switcher-ct">
          <h3>图层管理器</h3>
          <ul id="layer-switcher-ul">
            <li><label><input type="checkbox" checked="checked"/>基础图层</label></li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- 多功能窗体 -->
  <div id="fulldrag">
    <!--标题-->
    <div class="fulldrag-title">
      <h2>其他信息</h2>
      <div>
        <a class="fulldrag-min" href="javascript:;" title="最小化"></a> 
        <a class="fulldrag-max" href="javascript:;" title="最大化"></a> 
        <a class="fulldrag-revert" href="javascript:;" title="还原"></a> 
        <a class="fulldrag-close" href="javascript:;" title="关闭"></a>
      </div>
    </div>
    <!--拖拽-->
    <div class="fulldrag-resizeL"></div>
    <div class="fulldrag-resizeT"></div>
    <div class="fulldrag-resizeR"></div>
    <div class="fulldrag-resizeB"></div>
    <div class="fulldrag-resizeLT"></div>
    <div class="fulldrag-resizeTR"></div>
    <div class="fulldrag-resizeBR"></div>
    <div class="fulldrag-resizeLB"></div>
    <!--内容-->
    
    <div class="fulldrag-content">
      ① 窗口可以拖动；<br /> 
      ② 窗口可以通过八个方向改变大小；<br /> 
      ③ 窗口可以最小化、最大化、还原、关闭；<br /> 
      ④ 限制窗口最小宽度/高度。
    </div>
  </div>
  
  <script type="text/javascript" src="${pathweb}/content/script/jquery.cookie.js"></script><!-- jquery cookie -->
  <script type="text/javascript">
    var pathweb = "${pathweb}";
    var pathbase= "${path}";
    var isloaded = $.cookie('isloaded');
    if(!isloaded){
    	//设置不关闭项目不重新加载loading界面
  	  $.cookie('isloaded', 'true');
    }else{
      $("#main-loading").css("display", "none");
    }
  </script>    
   
  <!-- layui -->
  <script type="text/javascript" src="${pathweb}/layui/layui.js"></script>
  <!-- echarts -->
  <script type="text/javascript" src="${pathweb}/content/script/echarts.min.js"></script>
  
  <!-- html2canvas库 -->
  <script type="text/javascript" src="${pathweb}/content/script/html2canvas.min.js"></script>
  <!-- 截图插件 -->
  <script type="text/javascript" src="${pathweb}/content/script/SnippingTool.js"></script>
  <!-- 拖拽插件 -->
  <script type="text/javascript" src="${pathweb}/content/script/DragWindow.js"></script>
  <!-- 多功能窗体-->
 <script type="text/javascript" src="${pathweb}/content/script/FullWindow.js"></script>
  <!-- 超图api -->
  <script type="text/javascript" src="${pathweb}/SuperMap/libs/SuperMap.Include.js"></script>
  <script type="text/javascript" src="${pathweb}/SuperMap/js/graph/Pie.js"></script>
  <script type="text/javascript" src="${pathweb}/SuperMap/js/graph/Bar.js"></script>
  <script type="text/javascript" src="${pathweb}/SuperMap/js/graph/Bar3D.js"></script>
  <script type="text/javascript" src="${pathweb}/SuperMap/js/graph/Circle.js"></script>
  <script type="text/javascript" src="${pathweb}/SuperMap/js/graph/Line.js"></script>
  <script type="text/javascript" src="${pathweb}/SuperMap/js/graph/Point.js"></script>
  <script type="text/javascript" src="${pathweb}/SuperMap/js/graph/Ring.js"></script>
  <!-- 页面js -->
  <script src="${pathweb}/content/js/Main.js" charset="utf-8"></script>
  <script src="${pathweb}/content/js/MainMap2.js" charset="utf-8"></script>
  <script src="${pathweb}/content/js/MainMap1.js" charset="utf-8"></script>
  <script type="text/javascript">
    
  </script>
</body>
</html>