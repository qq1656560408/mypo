 $(function () {
	 var number_XM;//有多少个考核项目
	 var index_page = 1;//页码
	 var page=1;
	 var index=1;
	     layui.use(['carousel'], function(){
	    	 var carousel = layui.carousel;
	    	 //轮播容器
	    	 carousel.render({
					elem : '#div_AuditingDetail',
					autoplay : false,
					width : '100%' //设置容器宽度
					,arrow : 'none' //始终显示箭头				
					,indicator:"none"
					,height:"100%"
					,anim : 'fade' //切换动画方式
				});	    	 	    		    	 
	    	 });	 
	 
        $.ajax({
        	url:path+"/checkTable/selectApplicationDetail.do",
        	type:"post",
        	data:{"checkID":conId},
        	async:false,
        	success:function(data){
        		number_XM=data.length;
				page=truncateNumber(data.length/10);
        		var str_tr="";
        		for(var i=0;i<data.length;i++){
        			var reviewScore="";
        			var disab="";
        			//10条一个轮播页
        			if(i%10==0){
						if(i==0){//第一页
							str_tr+='<div class="layui-this" id="index_'+index+'"><table class="tab_AuditingDetail"><tbody>';
						}else{//中间也（含结束）
							str_tr+='</tbody><tfoot><tr><td><span class="layui-btn layui-btn-primary layui-btn-sm" lay-type="sub" name="Previou"><i class="layui-icon"></i>'+
							'</span></td><td colspan="3" style="text-align: center;"><button name="submit_applications" class="layui-btn layui-btn-sm layui-btn-normal">提交</button>'+
							'<button name="cancel" class="layui-btn layui-btn-primary layui-btn-sm">取消</button></td><td><span class="layui-btn layui-btn-primary layui-btn-sm" lay-type="add" name="Next"><i class="layui-icon"></i></span></td>'+
							'</tfoot></table></div><div id="index_'+index+'"><table class="tab_AuditingDetail"><tbody>';
						}
						index=index+1;
					}
        			
        			if(data[i].reviewScore==null){
        				
        			}else{
        				reviewScore=data[i].reviewScore;
        			}
        			
        			disab='<input type="text" style="width: 90px;" id="'+data[i].checkID+'" name="price_min" lay-verify="required" value="'+reviewScore+'" placeholder="请输入(数字)" autocomplete="off" class="layui-input">';
        			
        			str_tr+='<tr class="parent"> <td><div class="layui-inline"><label class="layui-form-label">指标项目</label>'+
                    '<div class="layui-input-inline"> <input type="text" lay-verify="required" disabled="disabled" name="projectname" style="background: #F8F8F8;" value="'+data[i].projectMC+'"'+
                    'autocomplete="off" class="layui-input"></div></div></td><td><div class="layui-inline"><label class="layui-form-label">要求</label>'+
                   '<div class="layui-input-inline"> <input type="text" lay-verify="required" disabled="disabled" name="claim" style="background: #F8F8F8;" value="'+data[i].checkDemand+'" autocomplete="off"'+
                  'class="layui-input"></div></div></td><td><div class="layui-inline"><label class="layui-form-label">申请时间</label><div class="layui-input-inline">'+
                   '<input type="text" name="price_min" disabled="disabled" value="'+data[i].checkTime+'" style="background: #F8F8F8;" autocomplete="off" class="layui-input">'+
                   '</div></div></td> <td><div class="layui-inline"><div id="row_'+data[i].checkID+'" class="layui-colla-item"> <h2 class="layui-colla-title">'+
                    ' 证明材料列表<i class="layui-icon layui-colla-icon"></i> </h2> </div></div></td><td>'+
                    '<div class="layui-inline"><label class="layui-form-label">审核得分</label><div class="layui-input-inline">'+disab+''+
                   '</div></div></td></tr>'+
                  '<tr class="child_row_'+data[i].checkID+'"><td colspan="5"><table class="layui-table"><thead>'+
                  '<tr><th>序号</th> <th>文件名(点击查看)</th><th>备注</th> </tr>'+
                  '</thead><tbody class="fileList_row_'+data[i].checkID+'"><tr><td colspan="3">没有任何证明材料！</td></tr></tbody></table></td></tr>';
        		
        			if(i==data.length-1){//最后结束
        				str_tr+='</tbody><tfoot><tr><td><span class="layui-btn layui-btn-primary layui-btn-sm" lay-type="sub" name="Previou"><i class="layui-icon"></i>'+
						'</span></td><td colspan="3" style="text-align: center;"><button name="submit_applications" class="layui-btn layui-btn-sm layui-btn-normal">提交</button>'+
						'<button name="cancel" class="layui-btn layui-btn-primary layui-btn-sm">取消</button></td><td><span class="layui-btn layui-btn-primary layui-btn-sm" lay-type="add" name="Next"><i class="layui-icon"></i></span></td>'+
						'</tfoot></table>';
					}       		
        		}
        		$(".div_scope").html(str_tr);      
        		
        		
        		$('tr.parent .layui-colla-item').click(function () { // 获取所谓的父行  
                    $(this).parent().parent().parent("tr")
                        .toggleClass("selected") // 添加/删除高亮  
                        .siblings('.child_' + $(this).attr("id")).toggle(); // 隐藏/显示所谓的子行  
                    
                         var row_id=$(this).attr("id");
                    	 $.ajax({
     						url:path+"/checkProveMaterialTable/selectCheckProveMaterialBycheckID.do",
     						type:"post",
     						async:true,
     						data:{"checkID":split(row_id)},
     						success:function(data){
     							if(data.length!=0){
     								var td_table="";
         							for(var i=0;i<data.length;i++){
         								td_table+='<tr><td>'+(i+1)+'</td> <td>'+
         			                     '<a href="'+data[i].proveMaterialURL+'" target="view_window">'+data[i].originalMame+'</a> </td>'+
         			                    '<td></td> </tr>';
         							}
         							$(".fileList_"+row_id).html(td_table);
     							}
     						}
     					})
     					
     				$(".layui-layer").css("max-height",(parseInt($(".layui-layer-shade").height())-parseInt("50px"))+"px");
                    $("#LAY_layuiW").css("max-height",parseInt($(".layui-layer-shade").height())-parseInt($(".layui-layer-title").height())-parseInt($(".layui-layer-btn").height())-parseInt("50px")+"px");
                  
                  //证明材料列表样式
                    	var suffix=$(this).attr("id");
                    	if($('.child_'+suffix).css("display")=='table-row'){
                    		$(this).html('<h2 class="layui-colla-title">'+
                    				'证明材料列表 <i class="layui-icon layui-colla-icon"></i>'+
                    			'</h2>');
                    	}else{
                    		$(this).html('<h2 class="layui-colla-title">'+
                    				'证明材料列表  <i class="layui-icon layui-colla-icon"></i>'+
                    			'</h2>');
                    	}
                       WH_center();
                }).click();
        	}
        })
        
        //居中显示
        function WH_center(){
        	//计算width  居中 
			var window_left=($(document).width()-$(".layui-layer").width())/2;
			$(".layui-layer").css("left",window_left);
			
			//计算heigth  居中
			var window_top=($(document.body).height()-$(".layui-layer").height())/2;
			$(".layui-layer").css("top",window_top);
        }
        
        //截取图片连接中的图片名称
        function TP_substring(path){
        	var filename;
        	if(path.indexOf("/")>0)//如果包含有"/"号 从最后一个"/"号+1的位置开始截取字符串
        	{
        	    filename=path.substring(path.lastIndexOf("/")+1,path.length);
        	}
        	else
        	{
        	    filename=path;
        	}
        	return filename;
        }
        
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
		
		 //点击取消按钮关闭弹窗
   		$("button[name=cancel]").click(function(){
   			parent.layer.closeAll();
   			 })
		//点击提交按钮，提交审核
   		$("button[name=submit_applications]").click(function(){
   			var price_min=document.getElementsByName("price_min");
					var str_arr="";
					for(var u=0;u<price_min.length;u++){
						if(price_min[u].id!=""&&price_min[u].value!=""){
							str_arr+=""+price_min[u].id+","+price_min[u].value+";";
						}  													
					}
					$.ajax({
							url:path+"/checkTable/updateWaitExamine.do",
							type:"post",
							async:false,
							data:{"str_arr":str_arr},
							success:function(data){
								if(data!=0){
									alert("审核成功！");
								}else{
									alert("审核失败,请检查页面信息是否完整！");
								}
							parent.layer.closeAll();
								}
							})
   		})
   			 
		//证明材料列表点击事件
		$(".layui-colla-item").click(function() {			
			
		})       
		
        //截取界面的参数内包含的id
        function split(str){
             	var btn_id=str.split("_");
	            return btn_id[1];
        }
      //去除小数 +1
		function truncateNumber(n){ 
			var M=n|0;
          return M+1;
         }
    })