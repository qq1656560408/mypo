var currentNode;
layui.use('layer', function() { // 独立版的layer无需执行这一句
	var $ = layui.jquery, layer = layui.layer; // 独立版的layer无需执行这一句
	// 触发事件
	var active = {
		notice : function() {
			// 示范一个公告层
			layer.open({
				type : 1,
				title : "新增用户" // 不显示标题栏
				,
				closeBtn : false,
				shade : 0.8,
				id : 'LAY_layuipro' // 设定一个id，防止重复弹出
				,
				btn : [ '提交', '取消' ],
				btnAlign : 'c',
				moveType : 1 // 拖拽模式，0或者1 background-color: #393D49; color:
								// #fff;
				,
				content : '',
				success : function(layero) {
					$("#LAY_layuipro")
							.load(
									"../jsp/UserManage/UserDetail.jsp",
									function() {
										// 计算width 居中
										var window_left = ($(document.body)
												.width() - $(".layui-layer")
												.width()) / 2;
										$(".layui-layer").css("left",
												window_left);
										// 计算heigth 居中
										var window_top = ($(document.body)
												.height() - $(".layui-layer")
												.height()) / 2;
										$(".layui-layer")
												.css("top", window_top);
									});
					var btn = layero.find('.layui-layer-btn');
					btn.find('.layui-layer-btn0').attr({
						target : '_blank'
					});
					btn.find('.layui-layer-btn0').click(function() {
						insertUser();
					})
				}
			});
		}
	};
	$('#layerDemo').on('click', function() {
		var othis = $(this), method = othis.data('method');
		active[method] ? active[method].call(this, othis) : '';
	});
});


 

//新增用户
function insertUser() {
	var userName = $("#userName").val();
	var passwork = $("#passwork").val();
	var treeCheck =$('#container').jstree(true).get_checked(); 
	
	
	
	treeCheck=treeCheck.join(',');
	if (userName !="" && passwork!="" && currentNode.id!="" ){
		$.ajax({
			url : path+"/userTable/insertUser.do",
			dataType : "json",
			data : {
				userName : userName,
				passwork : passwork,
				moduleAuthorityID :treeCheck
			},
			type : "post",
			success : function(result) {
				if(result ==1){
					msg("新增成功");
					initWaterTable("");
				}else{
					msg("新增失败");
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
