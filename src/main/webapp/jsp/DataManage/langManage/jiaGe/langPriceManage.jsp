<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="path" value="${pageContext.request.contextPath}"></c:set>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>价格表</title>
<%-- <link rel="stylesheet" href="${path}/web/layui/css/layui.css" media="all">
<script src="${path}/web/layui/layui.js" charset="utf-8"></script>
<script src="${path}/web/js/jquery-1.8.2.min.js"></script> --%>
<script type="text/javascript">
	
</script>

</head>
<body>
	<div style=" width: 80%; margin: auto;">
		<div class="layui-upload" style="display: block;">
		  <button  type="button" class="layui-btn" id="insertLangPrice">新增</button>
			<button type="button" class="layui-btn layui-btn-normal" id="langFile">选择文件</button>
			<button type="button" class="layui-btn" id="beginUploadLang">开始上传</button>
		</div>
		<div style="width: 1000px;">
			<table class="layui-hide" lay-filter="showLangData" lay-data="page:true,limit:10">
				<thead>
					<tr>
						<th lay-data="{field:'yearMC', width:80}">年份</th>
						<th lay-data="{field:'waterTypeMC', width:110}">类别</th>
						<th lay-data="{field:'waterFeatures', width:120}">功能价值</th>
						<th lay-data="{field:'areaMC', width:80}">区域</th>
						<th lay-data="{field:'price', width:80}">价格</th>
						<th lay-data="{field:'unit', width:110}">单位</th>
						<th lay-data="{field:'coefficient', width:80}">系数</th>
						<th lay-data="{field:'remark',width:160}">备注</th>
						<th lay-data="{field:'edit',width:170,toolbar: '#editLangBar'}">编辑/删除</th>
					</tr>
				</thead>
			</table>
			<script type="text/html" id="editLangBar">
						<button  lay-event="update"
							class="layui-btn layui-btn-normal layui-btn-sm">
							<i class="layui-icon">&#xe642;</i>
						</button>
						<button  lay-event="delete"
							class="layui-btn layui-btn-normal layui-btn-sm">
							<i class="layui-icon">&#xe640;</i>
						</button>
             </script>
		</div>
	</div>


	<script type="text/javascript">
		var uploadLang;

		layui.use('upload', function() {
			uploadLang = layui.upload;
			//选完文件后不自动上传  
			uploadLang.render({
				elem : '#langFile',
				url : '${path}/landPriceTable/excelImprot.do',
				auto : false,
				bindAction : '#beginUploadLang',
				accept : 'file',
				exts : "xlsx|xls",
				field : "excelFile",
				done : function(res) {
					console.log(res)
				}
			});
		});
		
		function initLangTable(){
			tableLang.init('showLangData', {
				height : 480,//设置高度
				page : true,
				url : '${path}/landPriceTable/selectPriceTable.do'
			});
		}
		var tableLang;
		layui.use('table', function() {
			tableLang = layui.table;

			initLangTable();
			tableLang.on('tool(showLangData)', function(obj) {
				console.log(obj)
				var contentStr,title;
			    if(obj.event=="update"){
			    	var id=obj.data.landPriceID;
					contentStr=["${path}/landPriceTable/bingUpdateBaseData.do?id="+id,"no"];
					title="修改价格";
					showLangLayer(contentStr,title);
				}else if(obj.event=="delete"){
					deleteLangData(obj);
				}
				
			});

		});
		
	
		function deleteLangData(obj){
			var id=obj.data.landPriceID;
			$.ajax({
				url:"${path}/landPriceTable/deletePrice.do",
				data:{id:id},
				dataType:"json",
				type:"post",
				success:function(result){
					if(result.success){
						msg("删除成功");
						obj.del();
					}else{
						msg("删除失败");
					}
				}
			});
		}
		
		function msg(showmsg) {
			//配置一个透明的询问框
			layui.use("layer", function() {
				layer.msg(showmsg, {
					time : 1000
				});
			})
		}
		
		
		$("#insertLangPrice").click(function(){
			contentStr=["${path}/landPriceTable/bingInsertBaseData.do","no"];
			title="新增价格";
			showLangLayer(contentStr,title);
		});
		
		function showLangLayer(contentStr,title){
			layui.use("layer", function() {
				var layer = layui.layer;
				layer.open({
					type : 2,
					content : contentStr,
					title : title,
					offset : 'auto',
					area: ['700px', '450px']
				})
			})
		}
	</script>

</body>
</html>