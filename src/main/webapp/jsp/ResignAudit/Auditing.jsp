<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ include file="/jsp/PublicLink/PublicLink.jsp"  %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>审核</title>
<link rel="stylesheet" href="${pathweb}/content/css/ResignAudit/Auditing.css">
</head>
<body>
<div style="margin-top:2%;">
	<table id="tab_Audtiting" class="layui-table" lay-skin="line">
		<thead>
			<tr id="thead_tr">
			    <th><input class="overall_cbo" type='checkbox'/></th>
				<th>序号</th>
				<th>指标项目名称名称</th>
				<th>提交日期</th>
				<th>详情</th>
			</tr>
		</thead>
		<tbody id="tab_tbody">
			<tr><td><input type="checkbox"/></td><td>1</td><td>1</td><td>1</td><td><div class="site-demo-button" id="layerDemo" style="margin-bottom: 0;">
                    					<button data-method="notice" class="layui-btn layui-btn-normal layui-btn-sm">
                    					<i class="layui-icon"></i></button></div></td></tr>
		</tbody>
	</table>
	</div>
	<div class="layui-table-page">
		<div id="layui-table-page1">
		<select class="sel_number" style="height:26px">
		   <option value="5">5</option>
		   <option value="10">10</option>
		   <option selected="selected" value="15">15</option>
		   <option value="20">20</option>
		   <option value="25">25</option>
		   <option value="30">30</option>
		</select>
			<div class="layui-box layui-laypage layui-laypage-default"
				id="layui-laypage-1">
				<span class="layui-laypage-limits">
				</span> <span class="layui-laypage-count">共 1页</span> <a
					href="javascript:;" class="layui-laypage-prev"
					data-page="0"> <i class="layui-icon"></i>
				</a> <span class="layui-laypage-curr" name="1"> <em
					class="layui-laypage-em"></em> <em>1</em>
				</span> <a href="javascript:;" class="layui-laypage-next" data-page="2">
					<i class="layui-icon"></i>
				</a> <span class="layui-laypage-skip">到第 <input id="inp_page" type="text"
					min="1" class="layui-input">页
					<button type="button" class="layui-laypage-btn">确定</button>
				</span>
			</div>
		</div>
	</div>
	<script type="text/javascript">
	var path="${path}";
	var pathjsp="${pathjsp}";
	</script>
	<script type="text/javascript" src="${pathweb}/content/js/ResignAudit/Auditing.js" charset="utf-8"></script>
</body>
</html>