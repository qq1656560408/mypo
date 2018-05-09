<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="path" value="${pageContext.request.contextPath}"></c:set>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>实物量</title>
<%-- <link rel="stylesheet" href="${path}/web/layui/css/layui.css" media="all">
<script src="${path}/web/layui/layui.js" charset="utf-8"></script>
<script src="${path}/web/js/jquery-1.8.2.min.js"></script> --%>
<script type="text/javascript">
	
</script>

</head>
<body>
	<div style="padding: 10px; width: 80%; margin: auto;">
		<div class="layui-upload" style="display: block;">
		    <button  type="button" class="layui-btn" id="insertAtmosphereShiWu">新增</button>
			<button type="button" class="layui-btn layui-btn-normal" id="atmosphereFile">选择文件</button>
			<button type="button" class="layui-btn" id="beginAtmosphereUpload">开始上传</button>
		</div>
		<div style="width: 1000px;">
			<table class="layui-hide" lay-filter="showAtmosphereData" lay-data="page:true,limit:10">
				<thead>
					<tr>
						<th lay-data="{field:'yearMC', width:80}">年份</th>
						<th lay-data="{field:'waterTypeMC', width:110}">类别</th>
						<th lay-data="{field:'waterFeatures', width:120}">功能价值</th>
						<th lay-data="{field:'areaMC', width:80}">区域</th>
						<th lay-data="{field:'inventory', width:80}">实物量</th>
						<th lay-data="{field:'inventoryUnit', width:110}">单位</th>
						<th lay-data="{field:'remark',width:160}">备注</th>
						<th lay-data="{field:'edit',width:170,toolbar: '#editBar'}">新增/编辑/删除</th>
					</tr>
				</thead>
			</table>
			<script type="text/html" id="editBar">
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
		var uploadAtmosphere;

		layui.use('upload', function() {
			uploadAtmosphere = layui.upload;
			//选完文件后不自动上传  
			uploadAtmosphere.render({
				elem : '#atmosphereFile',
				url : '${path}/atmospherePhyQuantityTable/excelImprot.do',
				auto : false,
				bindAction : '#beginAtmosphereUpload',
				accept : 'file',
				exts : "xlsx|xls",
				field : "excelFile",
				done : function(res) {
					console.log(res)
				}
			});
		});
		
		function initAtmosphereTable(){
			showAtmosphereData.init('showAtmosphereData', {
				height : 480,//设置高度
				page : true,
				url : '${path}/atmospherePhyQuantityTable/selectPhyQuantity.do'
			});
		}
		var tableAtmosphere ;
		layui.use('table', function() {
			showAtmosphereData= layui.table;
			initAtmosphereTable();
		
			showAtmosphereData.on('tool(showAtmosphereData)', function(obj) {
				var contentStr,title;
				if(obj.event=="update"){
					var id=obj.data.atmosphereID;
					contentStr=["${path}/atmospherePhyQuantityTable/bingUpdateBaseData.do?id="+id,"no"];
					title="修改实物量";
					showAtmosphereLayer(contentStr,title);
				}else if(obj.event=="delete"){
					deleteAtmosphereData(obj);
				}
			});
		});
		
		function msg(showmsg) {
			//配置一个透明的询问框
			layui.use("layer", function() {
				layer.msg(showmsg, {
					time : 1000
				});
			})
		}
		
		function deleteAtmosphereData(obj){
			var id=obj.data.atmosphereID;
			
			console.log(obj);
			$.ajax({
				url:"${path}/atmospherePhyQuantityTable/deletePhyQuantity.do",
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
		
		
		$("#insertAtmosphereShiWu").click(function(){
			contentStr=["${path}/atmospherePhyQuantityTable/bingInsertBaseData.do","no"];
			title="新增实物量";
			showAtmosphereLayer(contentStr,title);
		});
		
		function showAtmosphereLayer(contentStr,title){
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