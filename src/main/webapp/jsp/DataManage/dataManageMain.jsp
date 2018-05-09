<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ include file="/jsp/PublicLink/PublicLink.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link rel="shortcut icon" type="image/svg" href="${pathweb}/content/images/logo.ico" media="screen" />
<!--网页小图标-->

<link rel="stylesheet" href="${pathweb}/content/css/DataManage/dataManage.css">
<script type="text/javascript" src="${pathweb}/content/script/jquery.2.1.4.min.js"></script>

</head>
<body>
	<div style="width: 40px; background-color: #30A4D5;height:100%;float:left;" id="leftNav">
		<ul style="float: left;" id="ulClick">
			<li  class="img_title" url="/jsp/DataManage/priceTab.jsp">
				<img src="${pathweb}/icon/price.png" />
				<div style="background: red;">
					<p>价格表</p>
					<span style="border-top-color: red;"></span>
				</div>
			</li>
			
			<li  url="/jsp/DataManage/shiWuLiangTab.jsp">
				<img src="${pathweb}/icon/shiWuLiang.png" />
				<div style="background: #F60;">
					<p>实物量</p>
					<span style="border-top-color: #F60;"></span>
				</div>
			</li>
			
			<li  url="/jsp/DataManage/RemoteSensingData/RemoteSensing.jsp">
				<img src="${pathweb}/icon/remoteSensing.png" />
				<div style="background: #F60;">
					<p>遥感影像</p>
					<span style="border-top-color: #F60;"></span>
				</div>
			</li>
			
			<li  url="/jsp/DataManage/pdfUpload/pdfUpload.jsp">
				<img src="${pathweb}/icon/PDF.png" />
				<div style="background: #F60;">
					<p>pdf文件上传</p>
					<span style="border-top-color: #F60;"></span>
				</div>
			</li>
		</ul>
	</div>
	<div id="load_content" style="overflow: auto;width: auto;height:100%;position:relative;"></div>

	<script src="${pathweb}/content/js/DataManage/dataManageMain.js" charset="utf-8"></script>
</body>




</html>