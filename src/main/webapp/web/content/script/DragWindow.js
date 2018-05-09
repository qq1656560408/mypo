/**
 * 自定义拖拽窗体工具
 * Create by 广信-zhoujie
 * Create Date 2018/3/29 16:19
 * Version 1.0
 */

var drag;
//创建调用接口
function dragWin(rangeid,dragid) {
	var range = document.getElementById(rangeid);
	var dragger = document.getElementById(dragid);
	drag = bindEvent(dragger, 'onmousedown', function(e) {
		e = e || event;
		var mouseX = e.clientX || e.pageX;
		var mouseY = e.clientY || e.pageY;
		var objStyle = dragger.currentStyle || window.getComputedStyle(dragger, null);
		var objX = parseInt(objStyle.left) || 0;
		var objY = parseInt(objStyle.top) || 0;
		var limitX = mouseX - objX;
		var limitY = mouseY - objY;
		var draggerw = parseInt(objStyle.width) || 0;
		var draggerh = parseInt(objStyle.height) || 0;
		var objStyle2 = dragger.currentStyle || window.getComputedStyle(range, null);
		var rangew = parseInt(objStyle2.width) || 0;
		var rangeh = parseInt(objStyle2.height) || 0;
		if(!dragger.onDrag) {
			dragger.onDrag = bindEvent(document, 'onmousemove', function(e) {
				e = e || event;
				dragger.style.left = (e.clientX || e.pageX) - limitX + 'px';
				dragger.style.top = (e.clientY || e.pageY) - limitY + 'px';
				if(parseInt(dragger.style.left) < 0) {
					dragger.style.left = 0 + "px";
				}
				if(parseInt(dragger.style.left) > (rangew - draggerw)) {
					dragger.style.left = (rangew - draggerw) + "px";
				}
				if(parseInt(dragger.style.top) > (rangeh - draggerh)) {
					dragger.style.top = (rangeh - draggerh) + "px";
				}
				if(parseInt(dragger.style.top) < 0) {
					dragger.style.top = 0 + "px";
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
//创建调用接口
function dragWinByTop(rangeid,dragwinid,dragid) {
	var range = document.getElementById(rangeid);
	var dragwin = document.getElementById(dragwinid);
	var dragger = document.getElementById(dragid);
	drag = bindEvent(dragger, 'onmousedown', function(e) {
		e = e || event;
		var mouseX = e.clientX || e.pageX;
		var mouseY = e.clientY || e.pageY;
		var objStyle = dragger.currentStyle || window.getComputedStyle(dragger, null);
		var objStyle1 = dragwin.currentStyle || window.getComputedStyle(dragwin, null);
		var dragwinw = parseInt(objStyle1.width) || 0;
		var dragwinh = parseInt(objStyle1.height) || 0;
		var objX = parseInt(objStyle1.left) || 0;
		var objY = parseInt(objStyle1.top) || 0;
		var limitX = mouseX - objX;
		var limitY = mouseY - objY;
		var objStyle2 = range.currentStyle || window.getComputedStyle(range, null);
		var rangew = parseInt(objStyle2.width) || 0;
		var rangeh = parseInt(objStyle2.height) || 0;
		if(!dragger.onDrag) {
			dragger.onDrag = bindEvent(document, 'onmousemove', function(e) {
				e = e || event;
				dragwin.style.left = (e.clientX || e.pageX) - limitX + 'px';
				dragwin.style.top = (e.clientY || e.pageY) - limitY + 'px';
				if(parseInt(dragwin.style.left) < 0) {
					dragwin.style.left = 0 + "px";
				}
				if(parseInt(dragwin.style.left) > (rangew - dragwinw)) {
					dragwin.style.left = (rangew - dragwinw) + "px";
				}
				if(parseInt(dragwin.style.top) > (rangeh - dragwinh)) {
					dragwin.style.top = (rangeh - dragwinh) + "px";
				}
				if(parseInt(dragwin.style.top) < 0) {
					dragwin.style.top = 0 + "px";
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
//注销接口
function removeDrag(dragid){
	var dv = document.getElementById(dragid);
	removeEvent(dv, "onmousedown", drag);
}

function bindEvent(node, eventType, callback) {
	if(node.attachEvent) {
		if(eventType.indexOf('on')) { eventType = 'on' + eventType }
		node.attachEvent(eventType, callback);
	} else {
		if(!eventType.indexOf('on')) {
			eventType = eventType.substring(2, eventType.length)
		}
		node.addEventListener(eventType, callback, false);
	}
	return callback;
}
//创建移除事件接口
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