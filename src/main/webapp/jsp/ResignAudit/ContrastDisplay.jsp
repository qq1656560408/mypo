<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ include file="/jsp/PublicLink/PublicLink.jsp"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1">
<title>对比展示</title>
<link rel="stylesheet"
	href="${pathweb}/content/css/ResignAudit/ContrastDisplay.css">
<script type="text/javascript">
		var path = "${path}";
	</script>
</head>
<body>
	<div class="div_contrast" style="margin-top:20px">
		<form class="layui-form layui-form-pane" action="">
			<table class="tab_until">
				<tr>
					<td>
						<div class="layui-inline">
							<label class="layui-form-label">对比时间</label>
							<div class="layui-input-inline">
								<input type="text" name="date" id="date_starttime"
									class="layui-input" id="" placeholder="年">
							</div>
						</div>
						<div class="layui-inline">
							<label id="until" class="layui-form-label">至</label>
							<div class="layui-input-inline">
								<input type="text" name="date" class="layui-input"
									id="date_finishtime" placeholder="年">
							</div>
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<div class="layui-inline">
							<label class="layui-form-label">对比区域</label>
							<div class="layui-input-inline">
								<select lay-filter="place_k" id="place" lay-search="">
									<option value="">请选择区域</option>
									
								</select>
							</div>
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<div class="layui-inline">
							<label class="layui-form-label">资源类型</label>
							<div class="layui-input-inline">
								<select lay-filter="place_k" id="resource" lay-search="">
									<option value="水" selected="selected">水</option>
									<option value="林木">林木</option>
									<option value="耕地">耕地</option>
									<option value="矿产">矿产</option>
								</select>
							</div>
						</div>
					</td>
				</tr>
			</table>
			<!-- 为ECharts准备一个具备大小（宽高）的Dom -->
			<div id="main" style="width: 750px; height: 400px;"></div>
		</form>
	</div>


	<script type="text/javascript"
		src="${pathweb}/content/script/echarts.min.js"></script>
	<script type="text/javascript"
		src="${pathweb}/content/js/ResignAudit/ContrastDisplay.js"></script>
</body>
</html>