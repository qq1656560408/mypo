<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ include file="/jsp/PublicLink/PublicLink.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="${path}/web/jsTree/themes/default/style.min.css" />
<script src="${path}/web/jsTree/jstree.min.js"></script>
<title>用户详细信息</title>
<style>
.tab_AuditingDetail {
	border: 0;
	border-collapse: collapse;
}

td {
	font: normal 12px/17px Arial;
	padding: 2px;
}

th {
	font: bold 12px/17px Arial;
	text-align: left;
	padding: 4px;
	border-bottom: 1px solid #333;
}

.parent {
	cursor: pointer;
}
/* 偶数行样式*/
.odd {
	background: #FFFFEE; 
}
/* 奇数行样式*/
.parent .layui-form-label {
	background: #f2f2f2;
	width: auto;
}

.parent .layui-inline {
	margin: 5px;
}

.parent .layui-colla-title {
	height: 32px;
	line-height: 32px;
}

.layui-inline input {
	height: 32px;
}

.layui-inline .layui-form-label {
	padding: 6px 10px;
}

.parent .layui-colla-title {
	font-size: 13px;
}

.tab_AuditingDetail .layui-table {
	margin: 0px 7px !important;
	width: 97% !important;
}

.tab_AuditingDetail .layui-table th, .layui-table td {
	font-size: 13px !important;
	/* padding: 2px 15px; */
	text-align: center !important;
}

#row_00 .layui-inline {
	float: left;
}
</style>
<!--   引入jQuery -->
<link rel="stylesheet" href="layui/css/layui.css" media="all">
<script src="js/jquery-3.3.1.min.js" type="text/javascript"></script>
<script type="text/javascript">
</script>
</head>
<body>
	<table class="tab_AuditingDetail">
		<tr class="parent" id="row_00">
			<td colspan="2">
				<div class="layui-inline">
					<label class="layui-form-label">用户名</label>
					<div class="layui-input-inline">
						<input type="text" lay-verify="required" name="projectname"
						 id="userName"	style="background: #F8F8F8; width: 100%;" placeholder="输入用户名"
							autocomplete="off" class="layui-input" value="">
					</div>

				</div>
				<div class="layui-inline" style="">
					<label class="layui-form-label">密码</label>
					<div class="layui-input-inline">
						<input type="password" lay-verify="required" name="projectname"
						id="passwork"	style="background: #F8F8F8; width: 100%;" placeholder="输入密码"
							autocomplete="off" class="layui-input" value="">
					</div>

				</div>
			</td>
		</tr>

		<tr class="parent">
			<div
				style=" border: 1px solid #ddd;">
				<div id="container"></div>
			</div>
		</tr>

		<script>
		
		var treeJson = {
				'core' : {
					'data' : {
						"url" : "${path}/moduleAuthorityTable/selectTree.do",
						"dataType" : "json"
					}
				},
				"plugins" : [ "wholerow","checkbox" ]
			};

			$('#container').jstree(treeJson);
			
			$('#container').bind("activate_node.jstree", function (obj, e) {
			    // 处理代码
			    // 获取当前节点
			     currentNode = e.node;
			});
			
			
	</script>
</body>
</html>