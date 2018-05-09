<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="path" value="${pageContext.request.contextPath}"></c:set>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<%-- <link rel="stylesheet" href="${path}/web/layui/css/layui.css" media="all">
<script src="${path}/web/layui/layui.js" charset="utf-8"></script> --%>
<%-- <script type="text/javascript" src="${path}/web/js/jquery-1.8.2.min.js" charset="utf-8"></script> --%>
<%-- <link rel="stylesheet" href="${path}/web/jsTree/themes/default/style.min.css" />
<script src="${path}/web/jsTree/jstree.min.js"></script> --%>
<style type="text/css">
.layui-tree li i {
	color: #EDCA50;
}

.jstree-default .lastNode {
	background-image: url(/ResourceCheck/web/icon/file.png);
	background-position: center center;
	background-size: 20px;
}
</style>

</head>
<body>
	<div style="display: inline-block; width: 100%; height: 100%; overflow: auto;">
		<div id="containerRemoteSensing"></div>
	</div>
	<script>
	
		
		$(function() {
			var treeJson = {
				'core' : {
					'data' : {
						"url" : "${path}/remoteSensingDataTable/showRemoteSensingData.do",
						"dataType" : "json"
					}
				}
			};

			$('#containerRemoteSensing').jstree(treeJson);
			
			$('#containerRemoteSensing').on("load_node.jstree",function(e,d){
	            var nodes=d.node.children_d;
	            setLastNode(nodes);
	        });
			
			function setLastNode(chaildreIds){
				for(var i=0;i<chaildreIds.length;i++){
					var tree=$('#containerRemoteSensing').jstree(true);
					var node=tree.get_node(chaildreIds[i]);
					if(node.children_d.length==0||node.children.length==0){
						tree.set_icon(node,"lastNode");
					}else {
						tree.set_icon(node, "");
					}
				}
			}

			$('#containerRemoteSensing').on("select_node.jstree", function(e, data) {
				var url = data.node.original.url;
				var txt=data.node.text;
				if (url != "" && url != null) {
					$.ajax({
						url : "${path}/remoteSensingDataTable/getFtpLookUrl.do",
						type : "post",
						success : function(data) {
							show(data +url, txt);
						}
					});
					
				}
			});

		})

	
		
		function show(url, title) {
			var contentStr = "<img src='"+url+"' style='height:560px;width:360px;'>";
			layui.use("layer", function() {
				var layer = layui.layer;
				layer.open({
					type : 1,
					content : contentStr,
					title : title,
					offset : 'auto'
				})
			})
		}
	</script>
</body>
</html>