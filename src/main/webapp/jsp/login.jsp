<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/jsp/PublicLink/PublicLink.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1">
<link rel="shortcut icon" type="image/svg"
	href="${pathweb}/content/images/login.ico" media="screen" />
<!--网页小图标-->

<link rel="stylesheet" href="${pathweb}/content/loginAssets/css/supersized.css">
<link rel="stylesheet" href="${pathweb}/content/loginAssets/css/login.css">
<link rel="stylesheet" href="${pathweb}/content/loginAssets/css/bootstrap.min.css">




<title>梅州市资源环境管理应用系统登录</title>

<script type="text/javascript">

            var a="${Result}"
            if(a !=null && a !=""){
            	 alert(a);
            }
    </script>
    <style>
          body {
            margin: 0;
            padding: 0;
            background:url(../web/content/loginAssets/images/backgrounds/4.jpg);
            background-attachment: fixed !important;
            background-size: 100% 100% !important;
        }
    </style>
</head>
<body>

<div class="page-container">
	<div class="main_box">
		<div class="login_box">
			<div class="login_logo">
				<img src="${pathweb}/content/images/logo.png" >
			</div>
			<div class="login_form">
				<form action="${path}/userTable/selectdenglu.do"  method="post">
					<div class="form-group">
						<label for="j_username" class="t">用　户：</label> 
						<input id="userName" placeholder="请输入账号"  name="userName" type="text" class="form-control x319 in" 
						autocomplete="off">
					</div>
					<div class="form-group">
						<label for="j_password" class="t">密　码：</label> 
						<input id="passwork" placeholder="请输入密码"  name="passwork" type="password" 
						class=" form-control x319 in">
					</div>
					<div class="form-group space">
						<label class="t"></label>　　　
						<button type="submit"
						class="btn btn-primary btn-lg">&nbsp;登&nbsp;录&nbsp; </button>
						<input type="reset" value="&nbsp;重&nbsp;置&nbsp;" class="btn btn-default btn-lg">
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<!-- Javascript -->

</body>
</html>