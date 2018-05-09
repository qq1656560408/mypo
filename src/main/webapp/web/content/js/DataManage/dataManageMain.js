/**
 * 数据管理
 */
// ----------------------自定义js代码Start-----------------------
var REG_BODY = /<body[^>]*>([\s\S]*)<\/body>/;
/**
 * 获取html的body内容
 * @param content
 * @returns
 */
function getBody(html) {
	var result = REG_BODY.exec(html);
	if (result && result.length === 2)
		return result[1];
	return content;
}

/**
 * 加载jsp失败处理（无权限）
 * @param html html
 * @param status 状态（success、error）
 * @param obj 数据对象
 * @returns
 */
function loadFail(html, status, obj) {
	if (obj.status != 200) {
		console.log(obj);
		var content = getBody(html);
		$("#load_content")[0].innerHTML = content;
	}
}
/**
 * 加载菜单点击事件
 */
function loadMenuClick() {
	$("#ulClick li").click(
			function() {
				$(this).attr("class", "img_title");
				$(this).siblings().attr("class", "");

				var url = $(this).attr("url");
				$("#load_content").load(
						path + url + "?Time=" + (new Date()).getTime(),
						loadFail);
			});
	var fiUrl = $("#ulClick li").attr("url");
	$("#load_content").load(path + fiUrl + "?Time=" + (new Date()).getTime(),
			loadFail);
}
loadMenuClick();
/**
 * 创建菜单
 */ 
/*$.ajax({
	url : path + "/userTable/userMenu.do",
	data : {
		parentId : 5
	},
	dataType : "json",
	type : "post",
	success : function(res) {
		var menu = "";
		for (var i = 0; i < res.length; i++) {
			menu += "<li  url='" + res[i].menuUrl + "'>" + "<img src='"
					+ pathweb + res[i].iconUrl + "' />"
					+ "<div style='background: #F60;'>" + "<p>"
					+ res[i].moduleAuthority + "</p>"
					+ "<span style='border-top-color: #F60;'></span>"
					+ "</div>" + "</li>";
		}
		$("#ulClick")[0].innerHTML = menu;
		loadMenuClick();
	}
});*/
