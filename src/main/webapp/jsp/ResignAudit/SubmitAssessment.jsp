<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ include file="/jsp/PublicLink/PublicLink.jsp"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="Content-Type" content="multipart/form-data; charset=utf-8" />
<link rel="stylesheet"
	href="${pathweb}/content/css/ResignAudit/SubmitAssessment.css">
	<script type="text/javascript">
	var path="${path}";
	</script>
<title>提交考核资料</title>
</head>
<body>
	<form class="layui-form layui-form-pane" style="min-height: 350px" method="post" action="">
		<div class="layui-row">
				<div class="layui-card-body">
					<div class="div_Content">
						<div class="layui-form-item">
							<div class="layui-inline" style="width: 1120px">
								<label class="layui-form-label">考核单位名称</label>
								<div class="layui-input-inline">
									<select id="sel_modules" name="modules" lay-verify="required" lay-filter="modules" lay-search="">
										<option value="">考核单位名称</option>
									</select>
								</div>
							</div>
						</div>
						<div id="div_templet">
						请选择考核单位
						</div>
				</div>
			</div>
		</div>
	</form>
	<script type="text/javascript">
	var path="${path}";
	var pathjsp="${pathjsp}";
	</script>
	<script src="${pathweb}/content/js/ResignAudit/SubmitAssessment.js"
		charset="utf-8"></script>
</body>
</html>