<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="path" value="${pageContext.request.contextPath}"></c:set>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>pdf查看</title>
<%-- <script src="${path}/web/js/jquery-1.8.2.min.js"></script>

<link rel="stylesheet" href="${path}/web/jsTree/themes/default/style.min.css" />
<script src="${path}/web/jsTree/jstree.min.js"></script> --%>
<style type="text/css">
.jstree-default .lastNode {
	background-image: url(/ResourceCheck/web/icon/file.png);
	background-position: center center;
	background-size: 20px;
}
</style>
</head>
<body>

	<div id="container"></div>
	<script type="text/javascript">
		$(function() {
			$('#container').jstree({
			    'core' : {
			      'data' : {
			        "url" : "${path}/processFileTable/selectProcessFile.do",
			        "dataType" : "json" 
			      }
			    }
			  });
			
			  $('#container').on("select_node.jstree", function (e, data) {
				
				 
				 var processUrl= data.node.original.processFileURL;
				 if(processUrl!=""&&processUrl!=null){
					  window.open("${path}/processFileTable/lookPdf.do?pdfPath="+processUrl);
				 } 
			  });
				$('#container').on("load_node.jstree",function(e,d){
		            var nodes=d.node.children_d;
		            setLastNode(nodes);
		        });
				
				function setLastNode(chaildreIds){
					for(var i=0;i<chaildreIds.length;i++){
						var tree=$('#container').jstree(true);
						var node=tree.get_node(chaildreIds[i]);
						if(node.children_d.length==0||node.children.length==0){
							tree.set_icon(node,"lastNode");
						}else {
							tree.set_icon(node, "");
						}
					}
				}

		})
	</script>
</body>
</html>