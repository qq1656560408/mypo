<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="path" value="${pageContext.request.contextPath}"></c:set>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="${path}/web/layui/css/layui.css" media="all">
<script src="${path}//web/layui/layui.js" charset="utf-8"></script>
<script src="${path}/web/js/jquery-1.8.2.min.js"></script>
</head>
<body>
	<form class="layui-form" style="padding: 10px;" >
		<div class="layui-form-item">
			<div class="layui-inline">
				<label class="layui-form-label">年份</label>
				<div class="layui-input-inline">
					<input type="text" name="year" class="layui-input" id="yearRenewable">
				</div>
			</div>
			<div class="layui-inline">
				<label class="layui-form-label">类别</label>
				<div class="layui-input-inline">
					<select name="waterTypeID" lay-verify="required" lay-search="">
						<option value="">直接选择或搜索选择</option>
						<c:forEach var="wtt" items="${waterTypeTables}">
							<option value="${wtt.waterTypeID}">${wtt.waterTypeMC}</option>
						</c:forEach>
					</select>
				</div>
			</div>
		</div>


		<div class="layui-form-item">
			<div class="layui-inline">
				<label class="layui-form-label">功能价值</label>
				<div class="layui-input-inline">
					 <input type="text" name="waterFeatures" class="layui-input" >
				</div>
			</div>
			<div class="layui-inline">
				<label class="layui-form-label">区县</label>
				<div class="layui-input-inline">
					<select name="areaID" lay-verify="required" lay-search="">
						<option value="">直接选择或搜索选择</option>
						<c:forEach var="a" items="${area}">
							<option value="${a.areaID}">${a.areaMC}</option>
						</c:forEach>
					</select>
				</div>
			</div>
		</div>

		<div class="layui-form-item">
			<div class="layui-inline">
				<label class="layui-form-label">实物量</label>
				<div class="layui-input-inline">
					<input type="text" name="inventory" lay-verify="required|number" autocomplete="off"
						class="layui-input">
				</div>
			</div>
			<div class="layui-inline">
				<label class="layui-form-label">单位</label>
				<div class="layui-input-inline">
					<input type="text" name="inventoryUnit" autocomplete="off" class="layui-input">
				</div>
			</div>
		</div>
		<div class="layui-form-item">
			<div class="layui-inline">
				<label class="layui-form-label">备注</label>
				<div class="layui-input-inline">
					<input type="text" name="remark" class="layui-input">
				</div>
			</div>
		</div>
		<div class="layui-form-item">
			<div class="layui-input-block">
				<button class="layui-btn" lay-submit lay-filter="renewableShiWuLiang">立即提交</button>
			</div>
		</div>
	</form>
	<script type="text/javascript">
		function msg(showmsg) {
			//配置一个透明的询问框
			layui.use("layer", function() {
				layer.msg(showmsg, {
					time : 1000
				});
			})
		}

		layui.use('form', function() {
			var form = layui.form;

			form.on('submit(renewableShiWuLiang)', function(getData) {
				var data = getData.field; //当前容器的全部表单字段，名值对形式：{name: value}
				$.ajax({
					url : "${path}/renewablePhyQuantityTable/insertPhyQuantity.do",
					data : data,
					dataType : "json",
					type : "post",
					success : function(returnData) {
						if (returnData.success) {
							msg("新增成功")
							//调用父窗体方法更新数据
							parent.initRenewableTable();
						} else {
							msg("新增失败")
						}
					}
				});
				return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
			});
		});

		layui.use('laydate', function() {
			var laydate = layui.laydate;
			//年选择器
			laydate.render({
				elem : '#yearRenewable',
				type : 'year',
				max : 0
			//设置不能大于今年
			});
		})
	</script>
</body>
</html>