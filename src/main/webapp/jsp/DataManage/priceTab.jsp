<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="path" value="${pageContext.request.contextPath}"></c:set>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<%-- <link rel="stylesheet" href="${path}/web/layui/css/layui.css" media="all">
<script src="${path}/web/layui/layui.js" charset="utf-8"></script> 
<script src="${path}/web/js/jquery-1.8.2.min.js"></script>--%>

<style type="text/css">
.layui-tab {
	margin: 0px 0;
	text-align: left !important;
}

.layui-table-page {
	position: absolute;
	bottom: 0px;
}
</style>

</head>
<body>
	<div class="layui-tab layui-tab-card" style="height: 100%;" lay-filter="priceTab">
		<ul class="layui-tab-title" id="tabNav">
			<li class="layui-this">水</li>
			<li>矿产</li>
			<li>大气</li>
			<li>土地</li>
			<li>可再生能源</li>
			<li>林木</li>
		</ul>
		<div class="layui-tab-content" style="height: 100px;" id="tabContent">
			<div class="layui-tab-item layui-show" id="water">
				<c:import url="/jsp/DataManage/WaterManage/jiaGe/waterPrice.jsp"></c:import>
			</div>
			<div class="layui-tab-item" id="mine">
				<c:import url="/jsp/DataManage/mineManage/jiaGe/minePriceManage.jsp"></c:import>
			</div>
			<div class="layui-tab-item">
				<c:import url="/jsp/DataManage/atmosphereManage/jiaGe/atmospherePriceManage.jsp"></c:import>
			</div>
			<div class="layui-tab-item">
				<c:import url="/jsp/DataManage/langManage/jiaGe/langPriceManage.jsp"></c:import>
			</div>
			<div class="layui-tab-item">
			<c:import url="/jsp/DataManage/RenewableManage/jiaGe/renewablePriceManage.jsp"></c:import>
			</div>
			<div class="layui-tab-item">
			<c:import url="/jsp/DataManage/ForestManage/jiaGe/forestPriceManage.jsp"></c:import>
			</div>
		</div>
	</div>

	<script type="text/javascript">
		layui.use('element', function() {
			var element = layui.element;

		});
	</script>
</body>
</html>