/**
 * Create by 广信-zhoujie
 * Create Date 2018/3/29 16:19
 * Version 1.0
 */

//开启截图
var psnode;//截图节点
function startPrintps(node){
	psnode = node;
	if($("#psbg").length > 0){
		$("#psbg").css("display", "block");
	}else{
		//创建截图面板并添加到body节点最后面
		var printpsPanel = '<div id="psbg"><div id="printrange"><div id="printfull"><div id="printcontent"></div><ul id="printbtn"><li><a onclick="closeps(event)">关闭</a></li><li style="display: none;"><a id="downloadps" onclick="closeps(event)">下载图片</a></li><li><a onclick="resetps(event)">重置</a></li><li><a onclick="completeps(event)">完成</a></li></ul></div></div></div>';
		$(document.body).append(printpsPanel);
		//赋值样式
		var w = $(window).width();
		var h = $(window).height();
		$("#psbg").attr("style", "z-index: 19950529;display: block;width: "+(w-4)+"px;height: "+(h-4)+"px;background: transparent;overflow: hidden;position: absolute;top: 0px;left: 0px;border: 2px solid #0066FF;");
		$("#printrange").attr("style", "z-index: 19950529;width: 0px;height: 0px;box-shadow: rgba(59,59,59,0.5) 0 0 0 2017px;display: inline-block;position: absolute;left: 30%;top: 30%;cursor: move;border: 1px solid #CC0000;");
		$("#printfull").attr("style", "width: 100%;height: 100%;position: relative;");
		$("#printcontent").attr("style", "width: 100%;height: 100%;position: absolute;left: 0px;top: 0px;");
		$("#printbtn").attr("style", "display: none;z-index: 1004;font-size: 14px;position: absolute;top: 0px;left: 0px;background-color: #0066FF;");
		$("#printbtn li").attr("style", "display: block;float: left;padding:5px;width: 32px;");
		$("#printbtn li:nth-child(2)").css("display", "none");
		$("#printbtn li:nth-child(2)").css("width", "58px");
		$("#printbtn li a").attr("style", "cursor: pointer;color: #FFF;text-decoration: none;");
	}
	pointdrag(document.getElementById("printrange"));//注册截图事件
}
//完成截图
function completeps(e){
	isCanDrag = false;//禁止拖拽
	e.stopPropagation();//阻止冒泡
	removeEvent(document.getElementById("printrange"), 'onmousedown', drag);//注销事件
	//生成图片
	var prleft = $("#printrange").css("left");
	var prtop = $("#printrange").css("top");
	var startx = prleft.substring(0, prleft.length-2);
	var starty = prtop.substring(0, prtop.length-2);
	var imgw = $("#printrange").width();
	var imgh = $("#printrange").height();
	convertHtml2Canvas(startx, starty, imgw, imgh);
	//显示按钮				
	$.each($("#printbtn li"), function(index, obj){
		$(obj).css("display", "none");
	});
	$("#printbtn li:first-child").css("display", "block");
	$("#printbtn li:nth-child(2)").css("display", "block");
	$("#printbtn").css("left", ($("#printrange").width()-110) + "px");
}
//关闭截图
function closeps(e){
	isCanDrag = true;//允许拖拽
	e.stopPropagation();//阻止冒泡
	removeEvent(document.getElementById("printrange"), 'onmousedown', drag);//注销事件
	$("#printbtn").css("display", "none");
	//显示按钮				
	$.each($("#printbtn li"), function(index, obj){
		$(obj).css("display", "block");
	});
	$("#printbtn li:nth-child(2)").css("display", "none");
	$("#printbtn").css("left", ($("#printrange").width()-120) + "px");
	$("#printrange").css("width", "0px");
	$("#printrange").css("height", "0px");
	//还原背景
	$("#printcontent").css("background", "none");
	$("#psbg").css("background", "none");
	$("#psbg").css("display", "none");
}
//重置
function resetps(e){
	isCanDrag = true;//允许拖拽
	e.stopPropagation();//阻止冒泡
	removeEvent(document.getElementById("printrange"), 'onmousedown', drag);//注销事件
	$("#printbtn").css("display", "none");
	//显示按钮				
	$.each($("#printbtn li"), function(index, obj){
		$(obj).css("display", "block");
	});
	$("#printbtn li:nth-child(2)").css("display", "none");
	$("#printbtn").css("left", ($("#printrange").width()-120) + "px");
	$("#printrange").css("width", "0px");
	$("#printrange").css("height", "0px");
	//还原背景
	$("#printcontent").css("background", "none");
	$("#psbg").css("background", "none");
	//再重新注册事件
	pointdrag(document.getElementById("printrange"));
}
//Html转换Canvas
function convertHtml2Canvas(startx, starty, imgw, imgh) { 
	//$("#divpic")：自定义节点范围
	html2canvas($("#"+psnode), { allowTaint: false, taintTest: true }).then(function(canvas) {
    var img = convertCanvasToImage(canvas);//转换canvas得到img·这时img是$("#divpic")范围的
    $("#psbg").css("background", "url(" + img.src + ") no-repeat");
    $("#psbg").css("background-position", "-2px -2px");
    //img加载时···截取特定部分
    img.onload = function() {
	    img.onload = null;
	    canvas = convertImageToCanvas(img, Number(startx)+3, Number(starty)+3, imgw, imgh);//选定范围重新绘制canvas
    	img = convertCanvasToImage(canvas);//canvas再转换img···截取到特定部分的图片
    	var imgsrc = img.src;//获取img的src
    	$("#printcontent").css("background", "url(" + imgsrc + ") no-repeat");
    	$("#printcontent").css("background-position", "0px 0px");
    	//下载图片
			$('#downloadps').attr('href', imgsrc);
			$('#downloadps').attr('download', '截图.png');				    
    }
  });
}
//canvas转换图片，返回图片
function convertCanvasToImage(canvas) {
	var image = new Image();
	image.src = canvas.toDataURL("image/png", 0.1);
	return image;
}
//图片转换canvas，返回canvas
function convertImageToCanvas(image, startX, startY, width, height) {
	var canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	canvas.getContext("2d").drawImage(image, startX, startY, width, height, 0, 0, width, height);
	return canvas;
}
//创建拉框截图接口
function pointdrag(dragger){
	$("#psbg").on("mousedown", function(event){
		var w = $(window).width();
		var h = $(window).height();
		var clickX = event.pageX;
		var clickY = event.pageY;
		$(dragger).width("0px");
		$(dragger).height("0px");
		var draggerw = $(dragger).width();
		var draggerh = $(dragger).height();
		$(dragger).css("left", clickX + "px");
		$(dragger).css("top", clickY + "px");
		$("#psbg").on("mousemove", function(e){
			var mouseX = e.pageX;
			var mouseY = e.pageY;
			var difw = mouseX - clickX;//鼠标移动像素大小
			var difh = mouseY - clickY;
			if(difw<0 && difh<0){
				//向左上截图
				$(dragger).css("left", (clickX+difw) + "px");
				$(dragger).css("top", (clickY+difh) + "px");
			}else if(difw>0 && difh<0){
				//向右上截图
				$(dragger).css("top", (clickY+difh) + "px");
			}else if(difw<0 && difh>0){
				//向左下截图
				$(dragger).css("left", (clickX+difw) + "px");
			}else{
				//向右下截图
				$(dragger).css("left", clickX + "px");
				$(dragger).css("top", clickY + "px");
			}
			difw = Math.abs(difw); //取绝对值
			difh = Math.abs(difh);
			$(dragger).width(draggerw + difw + "px");
			$(dragger).height(draggerh + difh + "px");
		});
		$("#psbg").on("mouseup", function(ev){
			var mouseX = ev.pageX;
			var mouseY = ev.pageY;
			var difw = mouseX - clickX;//鼠标移动像素大小
			var difh = mouseY - clickY;
			//具体通过canvas截取img，直接赋值给dragger，然后就可以下载保存
			if(difw<0 && difh<0){
				//按钮位置
				$("#printbtn").css("left", ($(dragger).width()-127) + "px");
				$("#printbtn").css("top", ($(dragger).height()+1) + "px");
				if((mouseY + 4 + 28) > h){
					$("#printbtn").css("top", ($(dragger).height()-28) + "px");
				}
			}else if(difw>0 && difh<0){
				//按钮位置
				$("#printbtn").css("left", ($(dragger).width()-127) + "px");
				$("#printbtn").css("top", ($(dragger).height()+1) + "px");
				if((mouseY + 4 + 28) > h){
					$("#printbtn").css("top", ($(dragger).height()-28) + "px");
				}
			}else if(difw<0 && difh>0){
				//按钮位置
				$("#printbtn").css("left", ($(dragger).width()-127) + "px");
				$("#printbtn").css("top", ($(dragger).height()+1) + "px");
				if((mouseY + 4 + 28) > h){
					$("#printbtn").css("top", ($(dragger).height()-28) + "px");
				}
			}else{
				//按钮位置
				$("#printbtn").css("left", ($(dragger).width()-127) + "px");
				$("#printbtn").css("top", ($(dragger).height()+1) + "px");
				if((mouseY + 4 + 28) > h){
					$("#printbtn").css("top", ($(dragger).height()-28) + "px");
				}
			}
			$("#printbtn").css("display", "block");//按钮
			//移除截图事件
			$("#psbg").off("mousemove");
			$("#psbg").off("mousedown");
			$("#psbg").off("mouseup");
			//注册拖框事件
			dragElement(document.getElementById("printrange"));
		});
	});
}
//创建拖拽接口·js
var isCanDrag = true;//是否允许拖拉
var drag; //
function dragElement(dragger) {
	if(isCanDrag){
		var w = document.documentElement.clientWidth || document.body.clientWidth;
		var h = document.documentElement.clientHeight || document.body.clientHeight;
		drag = bindEvent(dragger, 'onmousedown', function(e) {
			var printrangew = $("#printrange").width();
			var printrangeh = $("#printrange").height();
			e = e || event;
			var mouseX = e.clientX || e.pageX;
			var mouseY = e.clientY || e.pageY;
			var objStyle = dragger.currentStyle || window.getComputedStyle(dragger, null);
			var objX = parseInt(objStyle.left) || 0;
			var objY = parseInt(objStyle.top) || 0;
			var limitX = mouseX - objX;
			var limitY = mouseY - objY;
			if(!dragger.onDrag) {
				dragger.onDrag = bindEvent(document, 'onmousemove', function(e) {
					e = e || event;
					dragger.style.left = ((e.clientX || e.pageX) - limitX) + 'px';
					dragger.style.top = ((e.clientY || e.pageY) - limitY) + 'px';
					if(h - ((e.clientY || e.pageY) - limitY + printrangeh + 6) < 28){
						$("#printbtn").css("top", ($(dragger).height()-28) + "px");
					}else{
						$("#printbtn").css("top", ($(dragger).height()+1) + "px");
					}
					if(parseInt(dragger.style.left) <= 2) {
						dragger.style.left = 2 + "px";
					}
					if(parseInt(dragger.style.left) >= (w - printrangew - 6)) {
						dragger.style.left = (w - printrangew - 6) + "px";
					}
					if(parseInt(dragger.style.top) >= (h - printrangeh - 6)) {
						dragger.style.top = (h - printrangeh - 6) + "px";
					}
					if(parseInt(dragger.style.top) <= 2) {
						dragger.style.top = 2 + "px";
					}
				});
				dragger.onDragEnd = bindEvent(document, 'onmouseup', function() {
					removeEvent(document, 'onmousemove', dragger.onDrag);
					removeEvent(document, 'onmouseup', dragger.onDragEnd);
					try {
						delete dragger.onDrag;
						delete dragger.onDragEnd;
					} catch(e) {
						dragger.removeAttribute('onDrag');
						dragger.removeAttribute('onDragEnd');
					}
				});
			}
		});
	}
}
//添加事件
function bindEvent(node, eventType, callback) {
	if(node.attachEvent) {
		if(eventType.indexOf('on')) { eventType = 'on' + eventType }
		node.attachEvent(eventType, callback);
	} else {
		if(!eventType.indexOf('on')) {
			eventType = eventType.substring(2, eventType.length);
		}
		node.addEventListener(eventType, callback, false);
	}
	return callback;
}
//移除事件
function removeEvent(node, eventType, callback) {
	if(node.detachEvent) {
		if(eventType.indexOf('on')) { eventType = 'on' + eventType }
		node.detachEvent(eventType, callback);
	} else {
		if(!eventType.indexOf('on')) {
			eventType = eventType.substring(2, eventType.length);
		}
		node.removeEventListener(eventType, callback, false);
	}
}


