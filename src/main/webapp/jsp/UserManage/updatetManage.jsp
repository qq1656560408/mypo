<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="path" value="${pageContext.request.contextPath}"></c:set>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Update title here</title>
<link rel="stylesheet" href="${path}/web/layui/css/layui.css"
	media="all">
<script src="${path}//web/layui/layui.js" charset="utf-8"></script>
<link rel="stylesheet"
	href="${path}/web/jsTree/themes/default/style.min.css" />
<script src="${path}/web/js/jquery-1.8.2.min.js"></script>
<script src="${path}/web/jsTree/jstree.min.js"></script>

</head>
<body>
	<div id="containerupdate"></div>
	<div  class="layui-form" style="padding: 0px;">
		<div class="layui-form-item">
			<div class="layui-inline">
				<label class="layui-form-label">用户名</label>
				<div class="layui-input-inline">
					<input type="text" name="userName"  id="userName"
						autocomplete="off" value="${spq.userName}" class="layui-input">
				</div>
			</div>
			<div class="layui-inline">
				<label class="layui-form-label">密码</label>
				<div class="layui-input-inline">
					<input type="text" value="${spq.passwork}" name="passwork" id="passwork"
						autocomplete="off" class="layui-input">
				</div>
			</div>
		</div>
		<div class="layui-form-item">
			<div class="layui-input-block">
				<button class="layui-btn" 
				  onclick="updateUser()">立即提交</button>
			</div>
		</div>
	</div>


	<script>
		$(function() {
			var bear = "${bear}";
			console.log(bear);
			var list = eval('(' + '${json}' + ')');
				var treeJson = {
					'core' : {
						'data' : list
					},
					"plugins" : [ "wholerow", "checkbox" ]
				};

				$('#containerupdate').jstree(treeJson);
				
				$('#containerupdate').bind("loaded.jstree",function(e,data){
					var jstree = "${spq.moduleAuthorityID}";
					var st = jstree.split(",");
					var tree=	$('#containerupdate').jstree();
					var array = [];
					var node;
					for (var i = 0; i < st.length; i++) {
					 	node = tree.get_node(st[i]);
						array.push(node); 
					}
				 	tree.select_node(array, true, true);
				})	
		})
		
		
		//修改用户
function updateUser() {
	var userName = $("#userName").val();
	var passwork = $("#passwork").val();
	var userid= "${userID}";
	var treeCheck =$('#containerupdate').jstree(true).get_checked(); 
	treeCheck=treeCheck.join(',');
	if (userName !="" && passwork!="" && treeCheck !="" && userid !=""){
		$.ajax({
			url : "${path}/userTable/updateUserimfo.do",
			dataType : "json",
			data : {
				userID:userid,
				userName : userName,
				passwork : passwork,
				moduleAuthorityID :treeCheck
			},
			type : "post",
			success : function(result) {
				console.log(result);
				if(result==1){
					msg("修改成功");
					parent.initWaterTable(null);
				}else{
					msg("修改失败");
				}
			}
		})
	}else{
		msg("请填写完整");
	}
}
		
		
		function msg(showmsg) {
			//配置一个透明的询问框
			layui.use("layer", function() {
				layer.msg(showmsg, {
					time : 1000
				});
			})
		}
		
	</script>
</body>
</html>