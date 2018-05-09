<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ include file="/jsp/PublicLink/PublicLink.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>记录弹窗</title>
<!--   引入jQuery -->
<link rel="stylesheet" href="layui/css/layui.css" media="all">
<script src="js/jquery-3.3.1.min.js" type="text/javascript"></script>
<link rel="stylesheet"
	href="${pathweb}/content/css/ResignAudit/AuditingDetail.css">
</head>
<style>
#thead_file tr th{
text-align: center;
padding:5px 30px;
}
</style>
<body>
	<div>
		<table class="layui-table" lay-size="sm">
			<thead id="thead_file">
				<tr>
					<th>序号</th>
					<th>文件名称（点击查看）</th>
					<th>备注</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody id="tbody_file">

			</tbody>
		</table>
	</div>
	<script type="text/javascript">
    var path="${path}";
    <%String conId = request.getParameter("btn_id");%>
    var conId="<%=conId%>";
    <%String auditNo_status = request.getParameter("auditNo_status");%>
    var auditNo_status="<%=auditNo_status%>";
	</script>
	<script type="text/javascript" src="${pathweb}/content/js/ResignAudit/HasTable.js"></script>
	<script type="text/javascript"
		src="${pathweb}/content/js/ResignAudit/SubmissionOfRecordsDetail.js"></script>
</body>
</html>