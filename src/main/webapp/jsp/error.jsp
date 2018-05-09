<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ include file="/jsp/PublicLink/PublicLink.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<link rel="shortcut icon" type="image/svg" href="${pathweb}/content/images/login.ico" media="screen" /><!--网页小图标-->
<link rel="stylesheet" href="${pathweb}/content/css/error_all.css"><!--css样式-->
<script type="text/javascript" src="${pathweb}/content/script/jquery.2.1.4.min.js"></script><!-- jquery -->
<title>网页访问异常</title>
</head>
<body class="error-404">
  <div id="doc_main">
    <input type="hidden" id="openIndex" value="@Session["openIndex"]" /> 
    <section class="bd clearfix">
      <div class="module-error">
        <div class="error-main clearfix">
          <div class="label"></div>
          <div class="info">
              <h3 class="title">你所访问的页面异常</h3>
              <div class="reason">
                  <p>可能的原因：</p>
                  <p>1.账号异常。</p>
                  <p>2.网络异常。</p>
                  <p>3.服务器异常。</p>
              </div>
              <div class="oper">
                  <p><a href="javascript:history.go(-1);">返回上一级页面&gt;</a></p>
                  <p><a href="login.jsp" target="_parent">重新登录&gt;</a></p>
              </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</body>
</html>