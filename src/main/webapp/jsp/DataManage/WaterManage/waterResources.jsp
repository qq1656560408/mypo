<%@page import="java.util.Calendar"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
	Calendar a = Calendar.getInstance();
	int year = a.get(Calendar.YEAR);
	request.setAttribute("currYear", year);
%>

<c:set var="path" value="${pageContext.request.contextPath}"></c:set>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<link rel="stylesheet" href="${path}/web/layui/css/layui.css" media="all">
<title>水资源</title>

<style type="text/css">
#mydiv, .layui-table-view {
	margin: 0px;
}

#mydiv, .layui-form, .layui-form-item {
	margin: 0px;
}

#mydiv, .layui-form, .layui-form-item, .layui-input-block {
	margin: 0px;
}

.layui-table td, .layui-table th {
	font-size: 11px;
	padding: 0px;
	text-align: center;
}

.layui-table-cell {
	padding: 0px;
}

#selectLayui_from .layui-form {
	width: 80px;
}
</style>
</head>
<body>

	<script type="text/javascript">
		function tem(a) {
			var button = "<button class='layui-btn layui-btn-xs layui-btn-normal'>明细</button>";
			return button;
		}
	</script>

	<div id="mydiv" style="max-width: 367px;">
		<div
			style="display: block; height: 38px; margin: auto; background: #f2f2f2; border: 1px solid #e6e6e6; border-bottom: 0px;">
			<div style="display: table; margin: 0px auto;">
				<div id="selectLayui_from" style="float: left; clear: right;">
					<div class="layui-form layui-inline layui-input-inline">
						<select name="interest" lay-filter="year">
							<c:forEach var="curr" begin="2005" end="${currYear}" step="1">
								<option value="${2005+currYear-curr}">${2005+currYear-curr}</option>
							</c:forEach>
						</select>
					</div>
				</div>
				<div style="line-height: 38px; font-size: 20px; float: left;">
					<span>年梅州市价值量</span>
				</div>
			</div>
		</div>

		<table lay-filter="allAreaTotal" class="layui-hide" id="allAreaTotal">
			<thead>
				<tr>
					<th lay-data="{field:'area_MC',width:60,event:'setSign'}">区县</th>
					<th lay-data="{field:'mineral',width:60,event:'setSign'}">矿</th>
					<th lay-data="{field:'water',width:60,event:'setSign'}">水</th>
					<th lay-data="{field:'forest',width:60,event:'setSign'}">林木</th>
					<th lay-data="{field:'land',width:60,event:'setSign'}">土地</th>
					<th lay-data="{field:'atmosphere',width:60,event:'setSign'}">大气</th>
				</tr>
			</thead>
		</table>


		<table class="layui-hide" id="areaTotal" lay-filter="areaTotal">
			<thead>
				<tr>
					<th lay-data="{field:'resource_MC',width:100}">资源类型</th>
					<th lay-data="{field:'amount_of_value',width:100}">总价值量</th>
					<th lay-data="{field:'physical_quantity',width:100}">总实物量</th>
					<th lay-data="{field:'id',width:60,templet:tem}">操作</th>
				</tr>
			</thead>
		</table>
	</div>

	<div id="main" style="width: 400px; height: 250px;"></div>



	<script src="${path}/web/layui/layui.js" charset="utf-8"></script>
	<script type="text/javascript" src="${path}/js/jquery-1.8.2.min.js" charset="utf-8"></script>
	<script type="text/javascript" src="${path}/js/echarts.js"></script>


	<script>
	var table;
	var form ;
	layui.use('table', function() {
		table = layui.table;
		table.init("allAreaTotal", {
			url : '${path}/resourceTotalValueTable/selectTotalValue.do'
		});

		table.on('tool(allAreaTotal)', function(obj) {
			var area_ID=obj.data.area_ID;
			initAreaTotal(area_ID);
		});
		
		function initAreaTotal(area_ID){
			table.init("areaTotal", {
				url : '${path}/resourceTotalValueTable/selectAreaResourceByAreaID.do',
				where:{area_ID:area_ID}
			}); 
		}
	});
	
	
	layui.use('form', function() {
		form = layui.form;
		form.on('select(year)', function(data){
			table.init("allAreaTotal", {
				url : '${path}/resourceTotalValueTable/selectTotalValue.do',
				where:{year:data.value}
			});
	   }); 
	});
	</script>


	<script type="text/javascript">
	areaRes();
	function areaRes(){
		var xAxisData=["铜矿","铁矿","铅矿","锌矿","银矿"];
		var seriesShiWuLiang=[10,25,30,10,20];
		var seriesJiaZhiLiang=[15,20,20,30,15];
		
		option = {
				color : [ '#003366', '#006699' ],
				tooltip : {
					trigger : 'axis',
					axisPointer : {
						type : 'shadow'
					}
				},
				legend : {
					data : [ '实物量', '价值量' ]
				},
				toolbox : {
					show : true,
					orient : 'vertical',
					left : 'right',
					top : 'center',
					feature : {
						mark : {
							show : true
						},
						dataView : {
							show : true,
							readOnly : false
						},
						magicType : {
							show : true,
							type : [ 'line', 'bar', 'stack', 'tiled' ]
						},
						restore : {
							show : true
						},
						saveAsImage : {
							show : true
						}
					}
				},
				calculable : true,
				xAxis : [ {
					type : 'category',
					axisTick : {
						show : false
					},
					data : xAxisData
				} ],
				yAxis : [ {
					type : 'value'
				} ],
				
				
				series : [ {
					name : '实物量',
					type : 'bar',
					barGap : 0,
					data : seriesShiWuLiang
				}, {
					name : '价值量',
					type : 'bar',
					data : seriesJiaZhiLiang
				}]
			};
		var myChart = echarts.init(document.getElementById('main'));
		myChart.setOption(option);
	}
	
	
		
	</script>

</body>
</html>