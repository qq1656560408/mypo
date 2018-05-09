<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="path" value="${pageContext.request.contextPath}"></c:set>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<%-- <link rel="stylesheet" href="${path}/web/layui/css/layui.css" media="all">
<script src="${path}/web/layui/layui.js" charset="utf-8"></script>
<script type="text/javascript" src="${path}/web/js/jquery-1.8.2.min.js" charset="utf-8"></script> --%>
<link rel="stylesheet" href="${path}/web/jsTree/themes/default/style.min.css" />
<script src="${path}/web/jsTree/jstree.min.js"></script>
<style type="text/css">
.layui-tree li i {
	color: #EDCA50;
}

.layui-btn {
	height: 28px;
	line-height: 28px;
	padding: 0 10px;
}

.jstree-default .lastNode {
	background-image: url(/ResourceCheck/web/icon/file.png);
	background-position: center center;
	background-size: 20px;
}
</style>

<script type="text/javascript">
	
</script>

</head>
<body>
	<div style="padding: 10px; margin: auto; width: 920px;">
		<div style="height: 500px; width: 920px; padding-top: 10px;">
			<div
				style="width: 200px; height: 100%; float: left; border: 1px solid #ccc; margin-right: 10px; overflow: auto;">
				<div id="container" style="height: 100%;"></div>
			</div>
			<div style="width: 700px; height: 100%; overflow: hidden; border: 1px solid #ccc;">
				<div>
					<div style="display: block;">
						<h3 id="title" style="text-align: center;"></h3>
					</div>
					<img id="showImage" style="height: 430px; margin: auto; display: block;">
					<form class="layui-form" style="padding: 10px;">
						<div class="layui-upload" style="display: block;">
							<button type="button" class="layui-btn layui-btn-normal" id="file">选择文件</button>
							<button type="button" class="layui-btn" id="begin">开始上传</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>




	<script>
		layui.use('upload', function() {
			waterUpload = layui.upload;
			//选完文件后不自动上传  
			waterUpload.render({
				elem : '#file',
				url : '${path}/remoteSensingDataTable/updateFile.do',
				auto : false,
				bindAction : '#begin',
				accept : 'file',
				exts : "tif|png|jpg|tiff",
				field : "file",
				before : function(obj) {
					layer.load(); //上传loading
					var tree = $('#container').jstree(true);
					var node = tree.get_selected(true)[0];
					this.data = {
						id : node.id
					};
				},
				done : function(res) {
					layer.closeAll('loading'); //关闭loading
					if (res.path == "") {
						msg("上传失败");
					} else {
						var name = res.fileName.split(".")[0];
						$("#title").text(name);
						$("#showImage").attr("src", res.intactPath);
						var tree = $('#container').jstree(true);
						var node = tree.get_selected(true)[0];
						$(node)[0].original.url = res.path;
					}

				},
				error : function(index, upload) {
					layer.closeAll('loading'); //关闭loading
				}
			});
		});

		$(function() {

			function check_callback(operation, node, parent, position, more) {
				if (operation === "create_node" || operation === "move_node"
						|| operation === "edit" || operation === "delete_node"
						|| operation === "rename_node") {
					return true;
				}
				return false;
			}

			//创建节点
			function createMenu(data) {
				var inst = $.jstree.reference(data.reference);
				var obj = inst.get_node(data.reference);
				//父节点 节点json 添加位置 回调
				inst.create_node(obj, {}, "last", function(new_node) {
					try {
						inst.deselect_all();
						inst.select_node(new_node, true, true);
						new_node.text = "请输入节点名称";
						inst.edit(new_node);
					} catch (ex) {
						setTimeout(function() {
							inst.edit(new_node);
						}, 0);
					}
				});
			}

			//创建顶级菜单
			function createTopMenu(data) {
				var inst = $.jstree.reference(data.reference);
				var obj = inst.get_node(data.reference);
				//父节点 节点json 添加位置 回调
				inst.create_node("#", {}, "last", function(new_node) {
					try {
						inst.deselect_all();
						inst.select_node(new_node, true, true);
						new_node.text = "请输入节点名称";
						inst.edit(new_node);
					} catch (ex) {
						setTimeout(function() {
							inst.edit(new_node);
						}, 0);
					}
				});
			}

			//修改菜单
			function updateMenu(data) {
				var inst = $.jstree.reference(data.reference);
				var obj = inst.get_node(data.reference);
				inst.edit(obj);
			}

			//删除提示信息
			function deleteMsg(message,inst, node) {
				layer.msg(message, {
					time : 0,
					shade : 0.3,
					btn : [ '是', '否' ],
					btn1 : function(index, layero) {
						deleteData(inst,node);
						//关闭窗口
						layer.close(index);
					}
				});
			}

			//删除菜单
			function deleteMenu(data) {
				var inst = $.jstree.reference(data.reference);
				var node = inst.get_node(data.reference);
				if (node.children_d.length > 0) {
					deleteMsg("是否删除当前节点，以及子下所有节点？", inst,node);
				} else {
					deleteMsg("是否删除改节点?", inst,node);
				}
			}
			
			//删除数据
			function deleteData(inst,node) {
				$
						.ajax({
							url : "${path}/remoteSensingDataTable/deleteRemoteSensing.do",
							data : {
								id : node.id
							},
							dataType : "json",
							type : "post",
							success : function(result) {
								if (result.success) {
									inst.delete_node(node);
									var parentID = node.parent;
									var parentNode = inst.get_node(parentID);
									if (parentNode) {
										var nodes = parentNode.children_d;
										if(nodes.length==0||parentNode.children.length==0){
											inst.set_icon(parentNode,"lastNode");
										}else{
											setLastNode(nodes);
										}
									}
								} else {
									msg("删除失败");
								}
							}
						});
			}

			//树形配置
			var treeJson = {
				'core' : {
					'data' : {
						"url" : "${path}/remoteSensingDataTable/showRemoteSensingData.do",
						"dataType" : "json"
					},
					"check_callback" : check_callback,
					"multiple" : false
				//单选
				},
				"contextmenu" : {
					select_node : false,
					show_at_node : true,
					items : {
						"新建子节点" : {
							"label" : "子节点",
							"icon" : "glyphicon glyphicon-plus",
							"action" : createMenu
						},
						"新建顶级节点" : {
							"label" : "新建顶级节点",
							"icon" : "glyphicon glyphicon-plus",
							"action" : createTopMenu
						},
						"修改节点" : {
							"separator_before" : false,
							"separator_after" : false,
							"_disabled" : false,
							"label" : "修改节点",
							"shortcut_label" : 'F2',
							"icon" : "glyphicon glyphicon-leaf",
							"action" : updateMenu
						},
						"删除节点" : {
							"separator_before" : false,
							"icon" : false,
							"separator_after" : false,
							"_disabled" : false,
							"label" : "删除节点",
							"icon" : "glyphicon glyphicon-remove",
							"action" : deleteMenu
						}
					}
				},
				"plugins" : [ "contextmenu", "wholerow", "dnd" ]
			};

			//初始化树形
			$('#container').jstree(treeJson);

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
			
			//选择节点触发
			$('#container').on("select_node.jstree", function(e, data) {
				console.log(data);
				var node = data.node;
				//最低级节点
				var url = node.original.url;
				//查看影像
				$("#title").text(node.text);
				if (url == "" || url == null || url == undefined) {
					$("#showImage").attr("src", "");
					return;
				}
				look(url);

			});

			//更改完名字时触发
			$('#container').on("rename_node.jstree", function(e, data) {
				if (data.old != data.text) {
					var node = data.node;
					var id = node.id;
					//说明节点更新
					$.ajax({
						url : "${path}/remoteSensingDataTable/updateName.do",
						data : {
							name : data.text,
							id : id
						},
						dataType : "json",
						type : "post",
						success : function(result) {
							if (!result.success) {
								var tree = $('#container').jstree(true);
								tree.set_text(node, data.old);
								msg("修改失败");
							} else {
								$("#title").text(data.text);
							}
						}
					});
				}
			});

			//移动节点触发
			$('#container').on("move_node.jstree", function(e, data) {
				var parentsID = data.parent;
				if (parentsID == "#") {
					parentsID = 0;
				}
				var id = data.node.id;

				$.ajax({
					url : "${path}/remoteSensingDataTable/updateParentsID.do",
					data : {
						parentsID : parentsID,
						id : id
					},
					dataType : "json",
					type : "post",
					success : function(res) {
						if (!res.success) {
							msg("移动节点失败");
							$('#container').jstree(treeJson);
						}else {
							var tree = $('#container').jstree(true);
							var newParentNode = tree.get_node(parentsID);
							if (newParentNode) {
								var nodes = newParentNode.children_d;
								nodes.push(parentsID);
								setLastNode(nodes);
							}
						}
					}
				});
			})
			
			//创建节点时触发
		$('#container').on("create_node.jstree", function(e, data) {
			var name = "请输入节点名称";
			if (data.parent == "#") {
				//创建顶级节点
				saveNode(data.node, name, 0);
			} else {
				//创建子节点
				var parentID = data.parent;
				saveNode(data.node, name, parentID);
			}
		})

		//创建节点，保存到数据库
		function saveNode(node, name, paranID) {
			$.ajax({
				url : "${path}/remoteSensingDataTable/insertTopNode.do",
				data : {
					name : name,
					paranID : paranID
				},
				dataType : "json",
				type : "post",
				success : function(resultID) {
					if (resultID == 0) {
						//删除节点
						var ref = $('#container').jstree(true);
						ref.delete_node(node);
						msg("创建节点失败");
					} else {
						//修改节点id
						var ref = $('#container').jstree(true);
						ref.set_id(node, resultID);
						var newParentNode = ref.get_node(paranID);
						if (newParentNode) {
							var nodes = newParentNode.children_d;
							nodes.push(paranID);
							setLastNode(nodes);
						} else {
							ref.set_icon(node, "lastNode");
						}
					}
				}
			});
		}

		//查看图片
		function look(url) {
			$.ajax({
				url : "${path}/remoteSensingDataTable/getFtpLookUrl.do",
				type : "post",
				success : function(data) {
					$("#showImage").attr("src", data + url);
				}
			});
		}

		//消息提示
		function msg(showmsg) {
			//配置一个透明的询问框
			layer.msg(showmsg, {
				time : 1000
			});
		}

		})
		
	</script>


</body>
</html>