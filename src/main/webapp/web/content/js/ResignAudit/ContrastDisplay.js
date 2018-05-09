        // 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('main'));

		var contrast_one;
		var contrast_two;
		var resource="水";
		var date_starttime;//开始时间（不一定安装日期先后）
		var date_finishtime;//结束时间
		var contrast_one_data;
		var contrast_two_data;
		var arr_date_difference = [timeStamp2String(new Date().getTime())];
		//加载区县数据
		$.ajax({
			url:path+"/areaTable/findArea.do",
			type:"POSt",
			dataType:"json",
			async : false,
			success:function(data){
				var str_place='';
				for(var i=0;i<data.length;i++){
					if(i==0){
						str_place+='<option selected="selected" value='+data[i].areaMC+'>'+data[i].areaMC+'</option>';
					}
					else{
						str_place+='<option value='+data[i].areaMC+'>'+data[i].areaMC+'</option>';
					}
				}
				$("#place").html(str_place);
				contrast_one=$("#place").val();
			}
		})
		
		layui.use([ 'form', 'layedit', 'laydate' ],
						function() {
							var form = layui.form, layer = layui.layer, layedit = layui.layedit, laydate = layui.laydate, $ = layui.jquery;
							//日期
							laydate.render({
										elem : '#date_starttime',
										type : 'year',
										btns:['confirm'],
										value : timeStamp2String(new Date()
												.getTime()),
										done : function(value, date, endDate) {
											var year_two = $("#date_finishtime").val();
											if (year_two != "") {
												arr_date_difference = [];
												var year_difference = parseInt(year_two)- parseInt(value);
												if (year_difference != 0) {
													var year;
													if (year_difference > 0) {
														year = value;
													} else {
														year = year_two;
													}
													for (var s = 0; s < Math.abs(year_difference) + 1; s++) {
														arr_date_difference.push(year);
														year++;
													}
												} else {
													arr_date_difference.push(value);
												}
											}
											else{
												arr_date_difference.push($("#date_starttime").val());
											}
											load();

										}
									});
							//年月选择器
							laydate.render({
										elem : '#date_finishtime',
										type : 'year',
										btns:['confirm'],
										done : function(value, date, endDate) {
											var year_one = $("#date_starttime").val();
											if (year_one != "") {
												arr_date_difference = [];
												var year_difference = parseInt(value)- parseInt(year_one);
												if (year_difference != 0) {
													var year;
													if (year_difference > 0) {
														year = year_one;
													} else {
														year = value;
													}
													for (var s = 0; s < Math.abs(year_difference) + 1; s++) {
														arr_date_difference.push(year);
														year++;
													}
												} else {
													arr_date_difference.push(value);
												}
											}
											else{
												arr_date_difference.push($("#date_finishtime").val());
											}
											load();
										}
									});
							
							//监听select选择
							form.on('select()', function(data) {
								if (data.elem.id == "place") {
									contrast_one = data.value;
								}
								if (data.elem.id == "place_s") {
									contrast_two = data.value;
								}
								if (data.elem.id == "resource") {
									resource = data.value;
								}
								load();
							})
							//时间控件选择事件
							form.render();
						});

		load();
		function load() {
			// 指定图表的配置项和数据
			option = {
				title : {
					text : resource+"资源对比",
					subtext : ''
				},
				tooltip : {
					trigger : 'axis'
				},
				legend : {
					data : [ contrast_one]
				},
				toolbox : {
					show : true,
					feature : {
						dataZoom : {
							yAxisIndex : 'none'
						},
						dataView : {
							readOnly : false
						},
						magicType : {
							type : [ 'line', 'bar' ]
						},
						restore : {},
						saveAsImage : {}
					}
				},
				xAxis : {
					type : 'category',
					boundaryGap : false,
					data : arr_date_difference
				},
				yAxis : {
					type : 'value',
					axisLabel : {
						formatter : '{value}' /* {value} °C */
					}
				},

				series : [ {
					name : contrast_one,
					type : 'line',
					data : [ 5, 8, 4, 3, 10, 13, 10 ],
					markPoint : {
						data : [ {
							type : 'max',
							name : '最大值'
						} ]
					}
				} ]
			};
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);
			
			//计算heigth  居中
			/*var window_top=($("#load_content").height()-$(".layui-form").height())/2;
			$(".layui-form").css("margin-top",window_top);*/
		}
		
		//时间转换
		function timeStamp2String(time) {
			var datetime = new Date();
			datetime.setTime(time);
			var year = datetime.getFullYear();
			var month = datetime.getMonth() + 1 < 10 ? "0"
					+ (datetime.getMonth() + 1) : datetime.getMonth() + 1;
			var date = datetime.getDate() < 10 ? "0" + datetime.getDate()
					: datetime.getDate();
			var hour = datetime.getHours() < 10 ? "0" + datetime.getHours()
					: datetime.getHours();
			var minute = datetime.getMinutes() < 10 ? "0"
					+ datetime.getMinutes() : datetime.getMinutes();
			var second = datetime.getSeconds() < 10 ? "0"
					+ datetime.getSeconds() : datetime.getSeconds();
			return year;
		}