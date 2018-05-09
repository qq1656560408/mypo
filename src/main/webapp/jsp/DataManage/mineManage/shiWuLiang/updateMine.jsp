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
${spq}
	<form class="layui-form" style="padding: 10px;">
		<input name="mineID" type="hidden" value="${spq.mineID}">
		<div class="layui-form-item">
			<div class="layui-inline">
				<label class="layui-form-label">年份</label>
				<div class="layui-input-inline">
					<input type="text" name="year" class="layui-input" value="${spq.yearMC}" readonly="readonly">
				</div>
			</div>
			<div class="layui-inline">
				<label class="layui-form-label">类别</label>
				<div class="layui-input-inline">
					<input type="text" class="layui-input" value="${spq.waterTypeMC}" readonly="readonly">
				</div>
			</div>
		</div>


		<div class="layui-form-item">
			<div class="layui-inline">
				<label class="layui-form-label">功能价值</label>
				<div class="layui-input-inline">
					<input type="text" name="waterFeatures" value="${spq.waterFeatures}" class="layui-input"
						readonly="readonly">
				</div>
			</div>
			<div class="layui-inline">
				<label class="layui-form-label">区县</label>
				<div class="layui-input-inline">
					<input type="text" value="${spq.areaMC}" class="layui-input" readonly="readonly">
				</div>
			</div>
		</div>

		<div class="layui-form-item">
			<div class="layui-inline">
				<label class="layui-form-label">实物量</label>
				<div class="layui-input-inline">
					<input type="text" name="inventory" lay-verify="required|number" autocomplete="off"
						class="layui-input" value="${spq.inventory}">
				</div>
			</div>
			<div class="layui-inline">
				<label class="layui-form-label">单位</label>
				<div class="layui-input-inline">
					<input type="text" name="inventoryUnit" autocomplete="off" class="layui-input"
						value="${spq.inventoryUnit}">
				</div>
			</div>
		</div>
		<div class="layui-form-item">

			<div class="layui-inline">
				<label class="layui-form-label">备注</label>
				<div class="layui-input-inline">
					<input type="text" name="remark" class="layui-input" value="${spq.remark}">
				</div>
			</div>
		</div>
		<div class="layui-form-item">
			<div class="layui-input-block">
				<button class="layui-btn" lay-submit lay-filter="*">立即提交</button>
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

			form.on('submit(*)', function(getData) {
				var data = getData.field; //当前容器的全部表单字段，名值对形式：{name: value}
				$.ajax({
					url : "${path}/minePhyQuantityTable/updatePhyQuantity.do",
					data : data,
					dataType : "json",
					type : "post",
					success : function(returnData) {
						if (returnData.success) {
							msg("修改成功")
							//调用父窗体方法更新数据
							parent.initMineTable();
						} else {
							msg("修改失败")
						}
					}
				});
				return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
			});
		});
	</script>
</body>
</html>