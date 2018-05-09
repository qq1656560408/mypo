/**
 * 离任审计
 */
//load加载
$(document).ready(function() {
	resizeView();//初始化适应屏幕
	modelSelectClick();
});

//模块菜单选择点击事件
function modelSelectClick(){
  $.each($("#top_menu li"), function(index, obj){
    $(obj).on("click", function(event){
      var index = $(this).index();
      switch(index){
        case 0:
          window.location.href = "/ResourceCheck/jsp/Main.jsp"; 
          break;
        case 1:
          window.location.href = "/ResourceCheck/jsp/ResignAudit.jsp"; 
          break;
        case 2:
          window.location.href = "/ResourceCheck/jsp/UserManage.jsp"; 
          break;
        case 3:
          window.location.href = "/ResourceCheck/jsp/DataManage.jsp"; 
          break;
        case 4:
          window.location.href = "/ResourceCheck/jsp/UserGuide.jsp"; 
          break;
        default:
          window.location.href = "/ResourceCheck/jsp/error.jsp"; 
          break;
      }
    });
  });
}

//初始化适应屏幕
function resizeView(){
	var w = document.documentElement.clientWidth || document.body.clientWidth;
	var h = document.documentElement.clientHeight || document.body.clientHeight;
	var top_height = $("#top").height();
	if(w >= 930){
		$("#top").width(w + "px");
		$("#body").width(w + "px");
	}else{
		$("#top").width("930px");
		$("#body").width("930px");
	}
	if(h >= 450){
		$("#body").height((h - top_height) + "px");
	}else{
		$("#body").height("450px");
	}
}

//页面大小调整
$(window).resize(function(){
	resizeView();
});

//----------------------自定义js代码Start-----------------------
var html_url;
$("#load_content").css("width",$(document.body).width()-$("#left_body").width());
//监测窗口大小是否变化
window.onresize = function(){
	$("#load_content").css("width",$(document.body).width()-$("#left_body").width());
}

$("#body div ul li").click(function () {
    $(this).attr("class", "img_title");
    $(this).siblings().attr("class", "");
    
    if($(this).attr("id")=="li_Explain"){
    	$("#load_content").load(pathweb+"/pdfjs-1.9.426-dist/web/viewer.html?Time=" + (new Date()).getTime());
    }else{
    	    if($(this).attr("id")=="li_application"){
    	    	html_url="/ResignAudit/SubmitAssessment2.jsp"
    	    }
    	    if($(this).attr("id")=="li_Auditing"){
    	    	html_url="/ResignAudit/Auditing.jsp"
    	    }
    	    if($(this).attr("id")=="li_Contrast"){
    	    	html_url="/ResignAudit/ContrastDisplay.jsp"
    	    }
    	    if($(this).attr("id")=="li_SubmissionOfRecords"){
    	    	html_url="/ResignAudit/SubmissionOfRecords.jsp"
    	    }
    	    $("#load_content").load(pathjsp+html_url+"?Time=" + (new Date()).getTime());
    }
   
})