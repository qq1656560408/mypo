                   var btn_id;
                   var arr_id="";
                   load(1,15);//页面打开加载
                   var overall_page;
                   //加载  待考核单位信息
                   function load(page,sel_num){
                	   $(".overall_cbo").prop("checked", false);
                	   $.ajax({
                       	url:path+"/checkTable/selectApplication.do",
                       	dataType : 'json',
                       	async:false,
                       	data:{"page":page,"num":sel_num},
                       	type:"post",
                       	success:function(data){
                       		var num=(page*sel_num)-(sel_num-1);
                       		var str_body="";
                       		var str_thead="";
                       			str_thead="<th><input class='overall_cbo' type='checkbox'/></th><th>序号</th><th>申请人</th>"+
				                 "<th>申请日期</th><th>审核进度</th><th>详情</th>";
                       		$("#thead_tr").html(str_thead);
                       		if(data.list.length!=0){
                       				for(var s=0;s<data.list.length;s++){
                       					var applicant="";
                       					if(data.list[s].applicant==undefined){
                       						
                       					}else{
                       						applicant=data.list[s].applicant;
                       					}
                               			str_body+='<tr><td><input id="'+data.list[s].checkID+'" name="checkbox" type="checkbox"/></td><td>'+num+'</td><td>'+applicant+'</td><td>'+data.list[s].checkTime+'</td>'+
                               					'<td>'+data.list[s].auditingNum+'/'+data.list[s].z_sum+'</td><td><div class="site-demo-button" id="layerDemo" style="margin-bottom: 0;">'+
                               					'<button data-method="notice" id="btn_'+data.list[s].checkID+'" class="layui-btn layui-btn-normal layui-btn-sm">'+
                               					'<i class="layui-icon"></i></button></div></td></tr>';
                               			num=num+1;
                               		}
                       		}else{
                       			str_body="<tr><td colspan='4'>暂时还没有任何待审核信息！！！</td></tr>"
                       		}
                       		overall_page=data.mun
                       		$(".layui-laypage-count").text("共"+data.mun+"页");
                       		$("#tab_tbody").html(str_body);
                       		
                       	   //点击行的checkbox
                            $("input[name=checkbox]").click(function(){
                         	   if($(this).prop("checked")==false){
                         		   arr_id=arr_id.replace(this.id+",","");
                         	   }else{
                         		   arr_id+=this.id+",";
                         	   }
                            })
                            
                       	}
                       })
                       
                    //点击详情
   					$('#tab_tbody .layui-btn').on('click',function() {
   						      if($("#"+split($(this).attr("id"))).prop("checked")==true){
   						    	  btn_id=arr_id;
   						      }else{
   						    	  btn_id=split($(this).attr("id"));
   						      }
   						      
   						   layer.open({
   						      type: 2,
   						      title: '审核',
   						      maxmin: true,
   						      shadeClose: false, //点击遮罩关闭层
   						      area : ['1055px' , '550px'],
   						      content: '../jsp/ResignAudit/AuditingDetail.jsp?btn_id='+btn_id+"&forbiddenIF=0",
   						      end:function(){
   						    	load(1,15);
   						      }
   						   });   						  								
   							});
   					
   				 //选择全部的行(或全部不选)
                    $(".overall_cbo").change(function(){
                 	   arr_id="";
                 	   if($(".overall_cbo").prop("checked")==true){
                 		   $("input[name=checkbox]").each(function(){
                 			   this.checked=true;
                 			   arr_id+=this.id+",";
                 		   })
                 	   }else{
                 		   $("input[name=checkbox]").each(function(){
                 			   this.checked=false;
                 		   }) 
                 	   }
                    })
                   }
                   
                   //每页显示条数选择
                   $(".sel_number").change(function(){
                	   $(".layui-laypage-curr").attr("name","1");
                	   $(".layui-laypage-curr").html('<em class="layui-laypage-em"></em> <em>'+$(".layui-laypage-curr").attr("name")+'</em>'); 
                	   $("#inp_page").val('');
                	   load(1,$(".sel_number").val());
                   })

                 layui.use(['layer','form'],function() { //独立版的layer无需执行这一句
							var $ = layui.jquery, 
							layer = layui.layer,form = layui.form; //独立版的layer无需执行这一句
							//考核与待考核的切换
							form.on('select(sel_examine)', function(data){
								arr_id="";
								load(1,$(".sel_number").val());
								 var sel_scope=$("#layui-form-type").html();
								if($("select[name='sel_examine']").val()==1){
									$("#sel_fraction").css("display","block");
								}else{
									$("#sel_fraction").css("display","none");
								}
							});
							//分数段的选择
							form.on('select(sel_scope)', function(data){
								arr_id="";
								if($("select[name='sel_examine']").val()==1){
									load(1,$(".sel_number").val());
								}else{
									alert("非法操作！");
									$("#sel_fraction").css("display","none");
									$("select[name=sel_scope]").find("option[value = '100']").attr("selected","selected");
									$("#sel_fraction").children("div").children("div").children("input").val("100~0分");
								}
							});
							form.render('select'); //刷新select选择框渲染
						});
                   
                   //截取界面的参数内包含的id
                  function split(str){
                       	var btn_id=str.split("_");
        	            return btn_id[1];
                  }
                   
                   //上一页
                   $(".layui-laypage-prev").click(function(){
                	   if(parseInt($(".layui-laypage-curr").attr("name"))>1){
                		   load(parseInt($(".layui-laypage-curr").attr("name"))-1,$(".sel_number").val());
                    	   $(".layui-laypage-curr").attr("name",parseInt($(".layui-laypage-curr").attr("name"))-1);
                    	   $(".layui-laypage-curr").html('<em class="layui-laypage-em"></em> <em>'+$(".layui-laypage-curr").attr("name")+'</em>'); 
                	   }else{
                		   alert("已经是首页了！");
                	   }
                	   
                   })
                   
                   //下一页
                   $(".layui-laypage-next").click(function(){
                	   if(parseInt($(".layui-laypage-curr").attr("name"))<overall_page){
                		   load(parseInt($(".layui-laypage-curr").attr("name"))+1,$(".sel_number").val());
                    	   $(".layui-laypage-curr").attr("name",parseInt($(".layui-laypage-curr").attr("name"))+1);
                    	   $(".layui-laypage-curr").html('<em class="layui-laypage-em"></em> <em>'+$(".layui-laypage-curr").attr("name")+'</em>'); 
                	   }else{
                		   alert("已经是尾页了！");
                	   }
                   })
                   
                   //检查分页输入框，输入数据是否符合要求
                   $("#inp_page").change(function(){
                	   if($("#inp_page").val()>0){
                		   if($("#inp_page").val()>overall_page){
                			   alert("超出范围！");
                			   $("#inp_page").val('');
                		   }
                	   }else{
                		   alert("输入内容不符合,请重新输入！");
                		   $("#inp_page").val('');
                	   }
                   })
                   
                   //分页确认按钮 layui-input
                   $(".layui-laypage-btn").click(function(){
                	   load($("#inp_page").val(),$(".sel_number").val());
                	   $(".layui-laypage-curr").attr("name",$("#inp_page").val());
                	   $(".layui-laypage-curr").html('<em class="layui-laypage-em"></em> <em>'+$(".layui-laypage-curr").attr("name")+'</em>'); 
                   })
                   
                     