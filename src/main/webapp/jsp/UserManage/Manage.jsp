<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ include file="/jsp/PublicLink/PublicLink.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>审核</title>
<!-- <link rel="stylesheet" href="/ResourceCheck/web/layui/css/layui.css"> -->
<link id="layuicss-laydate" rel="stylesheet"
	href="http://localhost:8080/ResourceCheck/web/layui/css/modules/laydate/default/laydate.css?v=5.0.9"
	media="all">
<link rel="stylesheet"
	href="${pathweb}/content/css/ResignAudit/Auditing.css">
<script type="text/javascript" src="${pathweb}/content/js/UserManage/Manage.js" charset="utf-8"></script>
<title>用户管理</title>

<style type="text/css">
</style>
</head>
<body>
	<div style="width: 70%; margin: auto;">
		<div style="margin-left: 6%;">
			<div class="layui-inline" style="margin: 2% auto 0.5% auto">
				<label class="layui-form-label">用户名</label>
				<div class="layui-input-inline">
					<input type="text" lay-verify="required"  id="selectID"
			placeholder="请输入" autocomplete="off" class="layui-input">
				</div>
			</div>
			<button type="button" class="layui-btn"
				style="margin: 2% auto 0.5% auto" id="select" name="btn_file">
				<i class="layui-icon">&#xe615;</i>查询
			</button>
			<button type="button" class="layui-btn layui-btn-normal"
				style="margin: 2% auto 0.5% auto" id="layerDemo" name="btn_file" data-method="notice">
				<i class="layui-icon">&#xe61f;</i>新增
			</button>
		</div>
		<div >
			<table class="layui-hide" lay-filter="showWaterData">
				<thead>
					<tr>
						<th lay-data="{field:'userName', width:300}">用户名</th>
						<th lay-data="{field:'passwork', width:300}">用户密码</th>
						<th lay-data="{field:'creationTime', width:300,templet:'#createTime'}">创建时间</th>
						<th lay-data="{field:'edit',width:212,toolbar: '#editBarWater'}">编辑/删除</th>
					</tr>
				</thead>
			</table>
			<script type="text/html" id="editBarWater">
						<button  lay-event="update" type="button";
							class="layui-btn layui-btn-normal layui-btn-sm">
							<i id="layerd" class="layui-icon">&#xe642;</i>
						</button>
						<button  lay-event="delete"
							class="layui-btn layui-btn-normal layui-btn-sm">
							<i class="layui-icon">&#xe640;</i>
						</button>
             </script>
		</div>
	</div>

<script id="createTime" type="text/html">  
    {{createTime(d.creationTime)}}   
    </script> 
    
    <script type="text/javascript">  
function getDate(tm){   
    var tt=new Date(tm).toLocaleString();   
    return tt;   
}   
</script>  

<script type="text/javascript">  
function createTime(v){  
	var tt=new Date(v).toLocaleString();   
	return tt;   
    var date = new Date();  
    date.setTime(v.time);  
    var y = date.getFullYear();  
    var m = date.getMonth()+1;  
    m = m<10?'0'+m:m;  
    var d = date.getDate();  
    d = d<10?("0"+d):d;  
    var h = date.getHours();  
    h = h<10?("0"+h):h;  
    var M = date.getMinutes();  
    M = M<10?("0"+M):M;  
    var str = y+"-"+m+"-"+d+" "+h+":"+M;  
    return str;  
}  
</script>  


	<script type="text/javascript">
	var path="${path}";
		var waterUpload;
		function initWaterTable(input) {
			waterTable.init('showWaterData', {
				height : 480,//设置高度
				page : true,
				where:{name:input},
				url : '${path}/userTable/selectUserTablesall.do'
			});
		}
		var waterTable;
		layui.use('table', function() {
			waterTable = layui.table;
			initWaterTable(null);
			
			waterTable.on('tool(showWaterData)', function(obj) {
				var contentStr,title;
			    if(obj.event=="update"){
			    	var id=obj.data.userID;
			    	contentStr=["${path}/userTable/updatetManage.do?id="+id]
					title="修改数据";
					showLayer(contentStr,title);
				}else if(obj.event=="delete"){
					deleteWaterData(obj);
				}
			});
		});

		function deleteWaterData(obj){
			var id=obj.data.userID;
			$.ajax({
				url:"${path}/userTable/deletebyuserID.do",
				data:{userID:id},
				dataType:"json",
				type:"post",
				success:function(result){
					if(result.success){
						obj.del();
						msg("删除成功");
						
					}else{
						msg("删除失败");
					}
				}
			});
		}
		
		//获取用户框
	$("#select").click(function(){
		var selectID=$("#selectID").val();
		initWaterTable(selectID) ;
	})

		
		function msg(showmsg) {
			//配置一个透明的询问框
			layui.use("layer", function() {
				layer.msg(showmsg, {
					time : 1000
				});
			})
		}
		
		function showLayer(contentStr,title){
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
