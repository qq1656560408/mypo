<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ include file="/jsp/PublicLink/PublicLink.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>提交考核资料</title>
<style>
html, body {
	width: 100%;
	height: 100%;
}
</style>
<link rel="stylesheet" href="${pathweb}/content/css/ResignAudit/SubmitAssessment2.css">
</head>
<body>
	<form class="layui-form layui-form-pane" style="min-height: 350px;" method="post" action="">
		<div class="layui-carousel" id="test1">
			<div id="div_scope" class="div_scope" style="overflow: auto" carousel-item>
			
			</div>
		</div>
	</form>
	<script type="text/javascript">
	var path="${path}";
	var pathjsp="${pathjsp}";
	</script>
	<script src="${pathweb}/content/js/ResignAudit/SubmitAssessment2.js"
		charset="utf-8"></script>
</body>
</html>