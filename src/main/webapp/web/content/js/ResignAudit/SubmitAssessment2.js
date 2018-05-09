        var index_page = 1;//页码
		var formData = new FormData();
		var file_sequence=1;
		var str="";
	    var load;
	    var number_XM;//有多少个考核项目
		layui.use([ 'form', 'carousel','upload','layedit', 'laydate', 'element' ],function() {
							var form = layui.form, layer = layui.layer, carousel = layui.carousel;
							var upload = layui.upload,layedit = layui.layedit, laydate = layui.laydate;
							var element = layui.element;
							carousel.render({
								elem : '#test1',
								autoplay : false,
								width : '100%' //设置容器宽度
								,arrow : 'none' //始终显示箭头
								,height : "100%",
								anim : 'fade' //切换动画方式
							});
							//垂直居中
							center();
							var page;
							var index=1;
							$.ajax({
								url:path+"/checkUnitMaterialTemTable/findMaterial.do",
								datatype:"json",
								async:true,
								type:"POST",
								success:function(data){
									number_XM=data.length;
									var str_index="";
									page=truncateNumber(data.length/10);
									for(var i=0;i<data.length;i++){
										if(i%10==0){
											if(i==0){
												str_index+='<div class="layui-this" id="index_'+index+'">';
											}else{
												str_index+='<div class="btn_next"><div class="layui-inline" style="float: left;"><div class="layui-input-inline">'+
												'<span class="layui-btn layui-btn-primary layui-btn-sm" lay-type="sub" name="Previou"><i class="layui-icon"></i>'+
												'</span><span class="span_index">'+(index-1)+'/'+page+'</span><span class="layui-btn layui-btn-primary layui-btn-sm"'+
												'lay-type="add" name="Next"><i class="layui-icon"></i></span></div></div><div class="layui-inline" style="">'+
												'<div class="layui-inline"><div class="layui-input-inline"><button class="layui-btn" lay-submit="" lay-filter="demo1">立即提交</button>'+
												'</div></div></div>'+
												'</div></div><div id="index_'+index+'">';
											}
											index=index+1;
										}
										str_index+='<div name="div_layui-inline" class="layui-inline"><div class="layui-inline">'+
											   '<label class="layui-form-label">指标项目</label><div class="layui-input-inline">'+
											   '<input value='+data[i].projectMC+' type="text" readonly="readonly" lay-verify="required" name="projectname_'+(i+1)+'" placeholder=""'+
												'autocomplete="off" class="layui-input"></div></div><div class="layui-inline">'+
											   '<label class="layui-form-label">要求</label><div class="layui-input-inline">'+
												'<input value='+data[i].checkDemand+' readonly="readonly" type="text" lay-verify="required" name="claim_'+(i+1)+'" placeholder=""'+
												'autocomplete="off" class="layui-input"></div></div><div class="layui-inline" style="margin-right: 0px">'+
												'<div id="'+(i+1)+'" class="layui-colla-item"><h2 class="layui-colla-title">证明材料列表 <i class="layui-icon layui-colla-icon"></i>'+
												'</h2></div></div><button type="button" class="layui-btn" id="fileList_'+(i+1)+'" name="btn_file"><i class="layui-icon"></i>上传文件'+
												'</button><span class="span_'+(i+1)+'" style="color: red;">*请选择文件</span><div name="file_tabulation" id="file_tabulation_'+(i+1)+'" class="layui-colla-content">'+
												'<table class="layui-table"><thead><tr><th>文件名</th><th>大小</th><th>状态</th><th>操作</th></tr></thead>'+
												'<tbody class="fileList_'+(i+1)+'"><tr><td class="td_none" colspan="4">目前还没有任何证明材料文件！！</td></tr>'+
												'</tbody></table></div></div>';
										if(i==data.length-1){
											str_index+='<div class="btn_next"><div class="layui-inline" style="float: left;"><div class="layui-input-inline">'+
											'<span class="layui-btn layui-btn-primary layui-btn-sm" name="Previou"><i class="layui-icon"></i>'+
											'</span><span class="span_index">'+(index-1)+'/'+page+'</span><span class="layui-btn layui-btn-primary layui-btn-sm"'+
											' name="Next"><i class="layui-icon"></i></span></div></div><div class="layui-inline" style="">'+
											'<div class="layui-inline"><div class="layui-input-inline"><button class="layui-btn" lay-submit="" lay-filter="demo1">立即提交</button>'+
											'</div></div></div>'+
											'</div>';
										}
									}
									$("#div_scope").html(str_index);
									
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
                                         
                                         var span_obj;
                                         btn_filename.click(function(){
                                        	span_obj=$(this).nextAll("span").attr("class");
                                         })
                                         
									//上传的文件
									uploadListIns = upload.render({
												elem : btn_filename,
												url : '/upload/',
												accept : 'file',
												multiple : true,
												auto : false,
												choose : function(obj) {
													var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
													$('.'+span_obj).css("color","#0000CD");
													$('.'+span_obj).text("*已 选 择 \v\v");
													//读取本地文件
													obj.preview(function(index,file, result) {
														formData.append("file_"+file_iden+"_"+file_sequence,file);//(标记，文件)
														str+="_"+file_iden+"_"+file_sequence+",";     
														var tr = $([
																		'<tr id="upload-'+ index +'">',
																		'<td>'+ file.name+ '</td>',
																		'<td>'+ (file.size / 1014).toFixed(1)+ 'kb</td>',
																		'<td>等待上传</td>',
																		'<td>',
																		'<button name="'+file_iden+"_"+file_sequence+'" id="file-delete" style="height:20px;margin-top:2px" class="layui-btn layui-btn-xs layui-btn-normal"><i class="layui-icon"></i> 删除</button>',
																		'</td>',
																		'</tr>' ]
																		.join(''));
														        //作为移除formdata的标记
														        file_sequence=file_sequence+1;
																tr.find('#file-delete').on('click',function() {
																					delete files[index]; //删除对应的文件
																					var tbody_class=$('.'+$(this).parents("tbody").attr("class"));
																					tr.remove();//移除对应的tr
																					//文件全部上菜后显示提示信息
																					if(tbody_class.children('tr').length==0){
																						tbody_class.append(tr_none);
																						tbody_class.parent("table").parent("div").prev().css("color","red");
																						tbody_class.parent("table").parent("div").prev().text("*请选择文件");
																					}
																					formData.delete('file_'+$(this).attr("name"));//移除文件
																					str=str.replace("_"+$(this).attr("name")+",","");
																					
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
									
									center();
									$('div[name="file_tabulation"]').css("width", $('div[name="div_layui-inline"]').width()-$(".span_1").width());

									$('div[name="file_tabulation"]').css("margin-buttom", "5px");

									$('div[name="div_layui-inline"]').css("margin-top", "5px");
									
									$(".layui-form").css("height",$("#load_content").height());
									
									$(".layui-carousel").css("height",$("#load_content").height());
									
									$(".btn_next").css("width",$(".layui-inline").width());
									//上一页
									$("span[name=Previou]").click(function() {
										if (index_page > 1) {
											index_page = index_page - 1;
											$("#index_" + index_page + "").attr("class", "layui-this");
											$("#index_" + index_page + "").next().attr("class", "");
										} else {
											alert("已经是首页了！")
										}

									})
                                    //下一页
									$("span[name=Next]").click(function() {
										if (index_page != page) {
											index_page = index_page + 1;
											$("#index_" + index_page + "").attr("class", "layui-this");
											$("#index_" + index_page + "").prev().attr("class", "");
										} else {
											alert("已经是尾页了！")
										}
									})
									
									//证明材料列表样式
									$(".layui-colla-item").click(
													function() {
														var suffix = $(this).attr("id");
														if ($('#file_tabulation_' + suffix).attr("class") == 'layui-colla-content layui-show') {
															$(this).html('<h2 class="layui-colla-title">证明材料列表  <i class="layui-icon layui-colla-icon"></i></h2>');
															$('#file_tabulation_' + suffix).removeClass(
																	"layui-colla-content" + " layui-show");
															$('#file_tabulation_' + suffix).addClass(
																	"layui-colla-content");
														} else {
															$(this).html('<h2 class="layui-colla-title">证明材料列表 <i class="layui-icon layui-colla-icon"></i></h2>');
															$('#file_tabulation_' + suffix).removeClass(
																	"layui-colla-content");
															$('#file_tabulation_' + suffix).addClass(
																	"layui-colla-content" + " layui-show");
														}
														if(($(".div_scope").height()-$(".layui-this").height())/2>0){
															center();
														}
													});
								}
							})
							           //监听提交
			                           form.on('submit(demo1)', function(data){
			                        	   if($(".td_none").length>0){
			                        		   alert("还有"+$(".td_none").length+"处文件信息没有选择，请检查！！！");
			                        	   }else{
			                        		   load=layer.msg('正在玩命上传中...', {
				                                   icon: 16,
				                                   shade: 0.4,
				                                   time:false //取消自动关闭
				                                 });
				                        	   TJ_POST(JSON.stringify(data.field));
			                        	   }
			                        	   
			                        	
			                        	   return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。 
											});
							form.render(); //更新全部
						});
		//垂直居中
		function center(){
			$("#div_scope").children().each(function(){
				$(this).css("margin-top",(parseInt($(window).height()-parseInt("60px")+"px")-$(".layui-this").height())/2);
			})
		}
		
		//表单提交
		function TJ_POST(data){
			formData.append("field", data);
			formData.append("str",str);
			formData.append("num_index",number_XM);//tr行数
			  $.ajax({
				  url:path+"/checkTable/insertCheck.do",
				  type:"POST",
				  data:formData,
				  async:false,
				  processData : false,  //必须false才会避开jQuery对 formdata 的默认处理   
			      contentType : false,  //必须false才会自动加上正确的Content-Type 
				  success:function(str){
					  layer.close(load);//手动关闭
						  alert("新增成功！！！");
						  $("#load_content").load(pathjsp+"/ResignAudit/SubmitAssessment2.jsp?Time=" + (new Date()).getTime());
				  }
			  })
		}
		
		//去除小数 +1
		function truncateNumber(n){ 
			var M=n|0;
          return M+1;
         } 