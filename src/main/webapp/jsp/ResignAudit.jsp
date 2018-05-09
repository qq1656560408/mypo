<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ include file="/jsp/PublicLink/PublicLink.jsp"  %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<link rel="shortcut icon" type="image/svg" href="${pathweb}/content/images/login.ico" media="screen" /> <!--网页小图标-->
<link rel="stylesheet" href="${pathweb}/layui/css/layui.css">
<link rel="stylesheet" href="${pathweb}/content/css/ResignAudit.css">
<script type="text/javascript" src="${pathweb}/content/script/jquery.2.1.4.min.js"></script>
<title>梅州市资源环境管理应用系统</title>
</head>
<body>
<!-- 头部区域 -->
<div id="top">
	<div id="top_title">
		<a href="Main.jsp"><img id="top_title_img" alt="logo" src="${pathweb}/content/images/login.png" /></a>
	</div>
	<div id="top_info">
		<a href="javascript:;">
			<img alt="图片" src="${pathweb}/content/images/avatar-default_b67b11e.png" id="userimg"/>
			<span id="username" style="margin-right: 18px;">李三</span>
			<span class="more"></span>
		</a>
		<div id="nav-child-bg">
			<dl class="nav-child">
		      <dd><a href="">基本资料</a></dd>
		      <dd><a href="">安全设置</a></dd>
		      <dd><a href="javascript:;">退出登录</a></dd>
		    </dl>
		</div>
	</div>
	<ul id="top_menu">
		<li title="资源核算"><a href="javascript:void(0)"><img alt="图片" src="${pathweb}/content/images/aliicons/map.png" /><span>资源核算</span></a></li>
		<li title="离任审计" class="menu_hover_bg"><a href="javascript:void(0)"><img alt="图片" src="${pathweb}/content/images/aliicons/audit.png" /><span>离任审计</span></a> </li>
		<li title="用户管理"><a href="javascript:void(0)"><img alt="图片" src="${pathweb}/content/images/aliicons/usermanage.png" /><span>用户管理</span></a> </li>
		<li title="数据管理"><a href="javascript:void(0)"><img alt="图片" src="${pathweb}/content/images/aliicons/datamanage.png" /><span>数据管理</span></a> </li>
		<li title="用户指南"><a href="javascript:void(0)"><img alt="图片" src="${pathweb}/content/images/aliicons/companion.png" /><span>用户指南</span></a></li>
	</ul>
</div>
<div id="body" style="display: -moz-box;display: -webkit-box;display: box;">
 <div id="left_body" style="width: 40px;background-color:#30A4D5;height:100%;display:inline-block">
        <ul style="float: left;">
            <li id="li_Explain" class="img_title">
                <img class="img" src="${pathweb}/content/images/ResignAudit/Explain.png" />
                <div style="background: red;z-index:99999">
                    <p>考核标准说明</p>
                    <span style="border-top-color:red;"></span>
                </div>
            </li>
            <li id="li_application">
                <img class="img" src="${pathweb}/content/images/ResignAudit/application.png" />
				<div style="background: #F60;">
                    <p>提交资料</p>
                    <span style="border-top-color:#F60;"></span>
                </div>
            </li>
            <li id="li_SubmissionOfRecords">
                <img class="img" src="${pathweb}/content/images/ResignAudit/SubmissionOfRecords.png" />
				<div style="background: #F60;">
                    <p>我的提交记录</p>
                    <span style="border-top-color:#F60;"></span>
                </div>
            </li>
            <li id="li_Auditing">
                <img class="img" src="${pathweb}/content/images/ResignAudit/Auditing.png" />
				<div style="background: #093;">
                    <p>审核清单</p>
                    <span style="border-top-color:#093;"></span>
                </div>
            </li>
            <li id="li_Contrast">
                <img class="img" src="${pathweb}/content/images/ResignAudit/Contrast.png" />
				<div style="background: #4682B4;">
                    <p>考核对比</p>
                    <span style="border-top-color:#4682B4;"></span>
                </div>
            </li>
            <li id="li_report">
                <img class="img" src="${pathweb}/content/images/ResignAudit/report.png" />
				<div style="background: #CDAD00;">
                    <p>考核报告</p>
                    <span style="border-top-color:#CDAD00;"></span>
                </div>
            </li>
            <li id="li_ReportManagement">
                <img class="img" class="img" src="${pathweb}/content/images/ResignAudit/ReportManagement.png" />
				<div style="background: #3CB371;">
                    <p>考核报告历史管理</p>
                    <span style="border-top-color:#3CB371;"></span>
                </div>
            </li>
        </ul>
    </div>
    <div id="load_content" style="-moz-box-flex: 1;box-flex: 1;overflow: auto;"></div>
</div>


<script type="text/javascript" src="${pathweb}/layui/layui.js"></script>
<script src="${pathweb}/content/js/ResignAudit.js" charset="utf-8"></script>
<script type="text/javascript">
var pathjsp="${pathjsp}";
var pathweb="${pathweb}";
$("#load_content").load("${pathweb}/pdfjs-1.9.426-dist/web/viewer.html?Time=" + (new Date()).getTime());

if (window.ActiveXObject || "ActiveXObject" in window){
	$("#load_content").css("-webkit-box-flex",1);
	$("#load_content").css("float","right");
	}else{
		
	}
</script>
</body>
</html>