<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ include file="/jsp/PublicLink/PublicLink.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<link rel="shortcut icon" type="image/svg" href="${pathweb}/content/images/login.ico" media="screen" /> <!--网页小图标-->
<link rel="stylesheet" href="${pathweb}/layui/css/layui.css">
<link rel="stylesheet" href="${pathweb}/content/css/UserManage.css">
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
		<li title="离任审计"><a href="javascript:void(0)"><img alt="图片" src="${pathweb}/content/images/aliicons/audit.png" /><span>离任审计</span></a> </li>
		<li title="用户管理" class="menu_hover_bg"><a href="javascript:void(0)"><img alt="图片" src="${pathweb}/content/images/aliicons/usermanage.png" /><span>用户管理</span></a> </li>
		<li title="数据管理"><a href="javascript:void(0)"><img alt="图片" src="${pathweb}/content/images/aliicons/datamanage.png" /><span>数据管理</span></a> </li>
		<li title="用户指南"><a href="javascript:void(0)"><img alt="图片" src="${pathweb}/content/images/aliicons/companion.png" /><span>用户指南</span></a></li>
	</ul>
</div>
<div id="body">
 	<!-- 自定义html代码--或load加载jsp -->
 	
 	
</div>


<script type="text/javascript" src="${pathweb}/layui/layui.js"></script> <!-- layui -->
<script src="${pathweb}/content/js/UserManage.js" charset="utf-8"></script>
<script type="text/javascript">
 	  $("#body").load("${path}/jsp/UserManage/Manage.jsp");
 	</script>
</body>
</html>