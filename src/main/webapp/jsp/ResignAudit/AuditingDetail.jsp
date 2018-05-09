<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ include file="/jsp/PublicLink/PublicLink.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>审核明细</title>
<!--   引入jQuery -->
<link rel="stylesheet" href="${pathweb}/layui/css/layui.css" media="all">
<script src="${pathweb}/js/jquery-3.3.1.min.js" type="text/javascript"></script>
<link rel="stylesheet"
	href="${pathweb}/content/css/ResignAudit/AuditingDetail.css">
</head>
<body>
	<div class="layui-carousel" id="div_AuditingDetail">
		<div id="div_scope" class="div_scope" style="overflow: auto;" carousel-item>
			
		</div>
	</div>
	<script type="text/javascript">
    var path="${path}";
    <%String conId = request.getParameter("btn_id");%>
    var conId="<%=conId%>";
    <%String forbiddenIF = request.getParameter("forbiddenIF");%>
    var forbiddenIF="<%=forbiddenIF%>";
	</script>
	<script type="text/javascript" src="${pathweb}/layui/layui.js"></script>
	<script type="text/javascript" src="${pathweb}/js/jquery-1.8.2.min.js"></script>
	<script type="text/javascript"
		src="${pathweb}/content/js/ResignAudit/AuditingDetail.js"></script>
</body>
</html>