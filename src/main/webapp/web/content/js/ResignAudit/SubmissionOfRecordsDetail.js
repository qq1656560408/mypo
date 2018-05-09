var artworkmaster = "";// 记录原图连接
var btn_file;// 上传按钮
var url_replace;
var url_id;// 记录上传按钮id
var data_fileNUM = 0;
var btn_status = "";
var del_index=-1;//移除的是那个位置的file（-1表示数据库中存在的，不包含在fileArr中）
var proveMaterialURL="";//获取一个数据库存在的文件连接
var hashtable = new HashTable();//创建hashtable
var str_key="";//记录最新的key
var key_arr=[];//记录hashtable的key
var formdata = new FormData();
formdata.append("checkID", conId);
$.ajax({
			url : path+ "/checkProveMaterialTable/selectCheckProveMaterialBycheckID.do",
			type : "post",
			async : true,
			data : {"checkID" : conId},
			success : function(data) {
				if (data.length != 0) {
					data_fileNUM = data.length;
					var td_table = "";

					for (var i = 0; i < data.length; i++) {
						proveMaterialURL=TP_substring(data[i].proveMaterialURL);
						tab_btn();
                        //table的主体内容
						td_table += '<tr><td>' + (i + 1)
								+ '</td> <td class="td_file_img">'
								+ '<a name="file_img" href="'
								+ data[i].proveMaterialURL
								+ '" target="view_window">'
								+ data[i].originalMame + '</a> </td>'
								+ '<td></td><td>' + btn_status + '</td> </tr>';
					}
					$("#tbody_file").html(td_table);

					// 点击提交按钮提交审核
					$('.layui-layer-btn0').click(function() {
						for(var i=0;i<key_arr.length;i++){
							formdata.append("insTab", hashtable.get(key_arr[i]));
						}
										formdata.append("artworkmaster",artworkmaster);
										if (auditNo_status == 0) {
											$.ajax({
														url : path+ "/checkProveMaterialTable/updatefile.do",
														type : "POST",
														data : formdata,
														async : false,
														processData : false, // 必须false才会避开jQuery对
																				// formdata
																				// 的默认处理
														contentType : false, // 必须false才会自动加上正确的Content-Type
														success : function(str) {
															if (str == 1) {
																alert("修改成功！");
															} else {
																alert("修改失败！");
															}
														}
													})
										}
									})
				}

				// 上传按钮点击
				$("button[name=btn_file]").click(
						function() {
							url_replace = $(this).parent("div").parent("td").prevAll(".td_file_img");
							url_id = $(this).attr("id");
						})

			}
		})
//限制table的最大高度
$(".layui-layer").css("max-height",(parseInt($(".layui-layer-shade").height()) - parseInt("50px")) + "px");
$("#LAY_layuipro").css("max-height",parseInt($(".layui-layer-shade").height())
				- parseInt($(".layui-layer-title").height())
				- parseInt($(".layui-layer-btn").height()) - parseInt("50px")
				+ "px");

// 计算width 居中
var window_left = ($(document.body).width() - $(".layui-layer").width()) / 2;
$(".layui-layer").css("left", window_left);

// 计算heigth 居中
var window_top = ($(document.body).height() - $(".layui-layer").height()) / 2;
$(".layui-layer").css("top", window_top);

// 证明材料列表样式
var suffix = $(this).attr("id");

//为table表格添加 增，修，删 按钮
function tab_btn(){
	if (auditNo_status == 1) {// 已审核按钮
		btn_status = '<button class="layui-btn layui-btn-normal layui-btn-sm layui-btn-disabled"><i class="layui-icon"></i>修改</button>';
	}
	if (auditNo_status == 0) {// 未审核按钮
		btn_status = '<div class="layui-btn-group"><button id="insert_file" onclick="insertFile(this)" name="btn_file" class="layui-btn layui-btn-sm"><i class="layui-icon"></i>增加</button>'
				+ '<input class="layui-upload-file" display="none" onchange="IhandleFiles(this.files)" type="file" name="file" multiple="">'
				+ '<button name="btn_file" id="'
				+ proveMaterialURL
				+ '" onclick="updateFile(this)" class="layui-btn layui-btn-sm"><i class="layui-icon"></i>修改</button>'
				+ '<input class="layui-upload-file" display="none" onchange="UhandleFiles(this.files)" type="file" name="file" multiple="">'
				+ '<button onclick="deleteFile(this)" id='+del_index+' name="delete_file" class="layui-btn layui-btn-sm"><i class="layui-icon"></i>删除</button></div>';
	}
}

// 增加按钮点击事件（触发file）
function insertFile(obj) {
	$(obj).next().click();
	
}
// 当file内容发生改变时触发（change）
function IhandleFiles(file) {
	del_index=parseInt(del_index)+1;
	tab_btn();
	var insert_tab_table = '<tr><td>' + (data_fileNUM + 1)
			+ '</td> <td class="td_file_img">' + '' + file[0].name + '</td>'
			+ '<td></td><td>' + btn_status + '</td> </tr>';
	$("#tbody_file").append(insert_tab_table);
	key_arr.push(del_index);
	hashtable.put(del_index,file[0]);
}
// 修改按钮点击事件
function updateFile(obj) {
	$(obj).next().click();
}
// 点击修改按钮后，当file内容发生改变时触发（change）
function UhandleFiles(file) {
	if (url_replace.children("a").attr("href") != undefined) {
		artworkmaster += TP_substring(url_replace.children("a").attr("href"))+ ",";
	}
	formdata.append(url_id, file[0]);
	url_replace.html(file[0].name);
}

// 点击删除按钮，移除一行
function deleteFile(obj) {
	$(obj).parent().parent().parent().remove();
	if(obj.id!="-1"){
		key_arr.remove(obj.id);
		Hashtable.remove(obj.id);
	}else{
		formdata.append("del_URL",TP_substring($(obj).parent("div").parent("td").prevAll(".td_file_img").children("a").attr("href")));
	}
}

// 截取图片连接中的图片名称
function TP_substring(path) {
	var filename;
	if (path.indexOf("/") > 0)// 如果包含有"/"号 从最后一个"/"号+1的位置开始截取字符串
	{
		filename = path.substring(path.lastIndexOf("/") + 1, path.length);
	} else {
		filename = path;
	}
	return filename;
}
//根据内容找到位置
Array.prototype.indexOf = function(val) {
	for (var i = 0; i < this.length; i++) {
	if (this[i] == val) return i;
	}
	return -1;
	};
	//移除数组指定项
Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if (index > -1) {
	this.splice(index, 1);
	}
	};
