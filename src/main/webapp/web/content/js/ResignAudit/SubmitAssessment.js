//绑定考核单位下拉框
$.ajax({
	url:path+"/checkUnitTable/findUnit.do",
	type:"POSt",
	dataType:"json",
	async : false,
	success:function(data){
		var str_modules='<option value="">考核单位名称</option>';
		for(var s=0;s<data.length;s++){
			str_modules+='<option value='+data[s].checkUnitID+'>'+data[s].checkUnitMC+'</option>'
		}
		$("#sel_modules").html(str_modules);
	}
})

var formData = new FormData();
		layui.use([ 'form', 'layedit', 'laydate', 'element', 'layer','upload' ],
						function() {
							var form = layui.form, layer = layui.layer, layedit = layui.layedit, laydate = layui.laydate;
							var element = layui.element;
							var layer = layui.layer;
							var upload = layui.upload;
							
							form.on('select(modules)', function(data){
								$.ajax({
									url:path+"/checkUnitMaterialTemTable/findMaterial.do",
									datatype:"json",
									data:{id:data.value},
									async:false,
									type:"POST",
									success:function(data){
										var str_div_Content="";
										for(var s=0;s<data.length;s++){
											str_div_Content+='<div class="layui-form-item"><div class="layui-inline"><label class="layui-form-label">指标项目</label>'+
											'<div class="layui-input-inline"><input value='+data[s].projectMC+' type="text" readonly="readonly" lay-verify="required" name="projectname_'+(s+1)+'"'+
											'placeholder="请输入" autocomplete="off" class="layui-input"></div></div><div class="layui-inline">'+
											'<label class="layui-form-label">要求</label><div class="layui-input-inline"><input value='+data[s].checkDemand+' readonly="readonly" type="text" lay-verify="required" name="claim_'+(s+1)+'"'+
											'placeholder="请输入" autocomplete="off" class="layui-input"></div></div><div class="layui-inline">'+
											'<label class="layui-form-label">自评得分</label><div class="layui-input-inline" id="inp_num"><input type="text" name="pricemin_'+(s+1)+'" placeholder="请输入"'+
											'autocomplete="off" lay-verify="required" class="layui-input"></div></div><div class="layui-inline" style="margin-right: 0px">'+
											'<div id="'+(s+1)+'" class="layui-colla-item"><h2 class="layui-colla-title">证明材料列表  <i class="layui-icon layui-colla-icon"></i></h2>'+
											'</div></div><button type="button" class="layui-btn" id="fileList_'+(s+1)+'" name="btn_file"><i class="layui-icon"></i>上传文件</button>'+
											'</div><div id="file_tabulation_'+(s+1)+'" class="layui-colla-content"><table class="layui-table"><thead><tr>'+
											'<th>文件名</th><th>大小</th><th>状态</th><th>操作</th></tr></thead><tbody class="fileList_'+(s+1)+'"><tr>'+
											'<td class="td_none" colspan="4">目前还没有任何证明材料文件！！</td></tr></tbody></table></div>';
										}
										str_div_Content+="<div class='layui-form-item' style='margin-top: 20px'><div class='layui-inline'>"+
													"<button class='layui-btn' id='TJ' lay-submit='' lay-filter='demo1'>立即提交</button>"+
													"<button type='reset' class='layui-btn layui-btn-primary'>重置</button></div></div>";
										$("#div_templet").html(str_div_Content);
										
										 //证明材料列表样式
										$(".layui-colla-item").click(function(){
											var suffix=$(this).attr("id");
											if($('#file_tabulation_'+suffix).attr("class")=='layui-colla-content layui-show'){
												$(this).html('<h2 class="layui-colla-title">证明材料列表  <i class="layui-icon layui-colla-icon"></i></h2>');
												$('#file_tabulation_'+suffix).removeClass("layui-colla-content"+" layui-show");
												$('#file_tabulation_'+suffix).addClass("layui-colla-content");
											}else{
												$(this).html('<h2 class="layui-colla-title">证明材料列表 <i class="layui-icon layui-colla-icon"></i></h2>');
												$('#file_tabulation_'+suffix).removeClass("layui-colla-content");
												$('#file_tabulation_'+suffix).addClass("layui-colla-content"+" layui-show");
											}});
										
										var btn_filename=$("button[name='btn_file']");//获取全部name为btn_file的按钮
										//点击文件上传按钮，获取id做为提交文件的表示
										var file_iden;
										btn_filename.click(function(){
											var strs= new Array();
											strs=this.id.split("_");
											file_iden=strs[1];
										})
										
										var tr_none='<tr><td class="td_none" colspan="4">目前还没有任何证明材料文件！！</td></tr>';
	                                        $(".layui-btn").click(function(){
		                                          fileListView=$('.'+$(this).attr("id"));//获取与当前点击按钮的id值相同的class的标签,
	                                         })
										
										//上传的文件
										uploadListIns = upload.render({
													elem : btn_filename,
													url : '/upload/',
													accept : 'file',
													multiple : true,
													auto : false,
													//accept: 'file' //允许上传的文件类型
												    //size: 50 //最大允许上传的文件大小
													choose : function(obj) {
														var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
														//读取本地文件
														obj.preview(function(index,file, result) {
															formData.append("file_"+file_iden,file);
															        var tr = $([
																			'<tr id="upload-'+ index +'">',
																			'<td>'+ file.name+ '</td>',
																			'<td>'+ (file.size / 1014).toFixed(1)+ 'kb</td>',
																			'<td>等待上传</td>',
																			'<td>',
																			'<button  id="file-delete" style="height:20px;margin-top:2px" class="layui-btn layui-btn-xs layui-btn-normal"><i class="layui-icon"></i> 删除</button>',
																			'</td>',
																			'</tr>' ]
																			.join(''));
																	tr.find('#file-delete').on('click',function() {
																						delete files[index]; //删除对应的文件
																						var tbody_class=$('.'+$(this).parents("tbody").attr("class"));
																						tr.remove();//移除对应的tr
																						//文件全部上菜后显示提示信息
																						if(tbody_class.children('tr').length==0){
																							tbody_class.append(tr_none);
																						}
																						uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
																					});
																	//判断是否存在“目前还没有任何证明材料文件！！”文件提示
																	if(fileListView.children().children(".td_none").length==1){
																		fileListView.html("");//清空
																	}
																	fileListView.append(tr);//追加一行
														});
													}
										});
									}
								})
								});
							
							
							form.on('submit(demo1)', function(data){
								TJ_POST(JSON.stringify(data.field));
								  return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
								});
							form.render();
						});
	   
		//表单提交
		function TJ_POST(data){
			formData.append("field", data);
			formData.append("num_index",$(".layui-form-item").length-2);//tr行数
			  $.ajax({
				  url:path+"/checkTable/insertCheck.do",
				  type:"POST",
				  data:formData,
				  async:false,
				  processData : false,  //必须false才会避开jQuery对 formdata 的默认处理   
			      contentType : false,  //必须false才会自动加上正确的Content-Type 
				  success:function(str){
						  alert("新增成功！！！");
						  $("#load_content").load(pathjsp+"/ResignAudit/SubmitAssessment.jsp?Time=" + (new Date()).getTime());
				  }
			  })
		}
		
		//考核单位选择监听
		function change_modules(id){
			
		}
		
		 