<%@page import="java.net.HttpURLConnection"%>
<%@ page import="java.net.URLConnection"%>
<%@ page import="java.net.URL"%>
<%@ page import="java.net.URLEncoder"%>

<%@ page language="java" import="java.util.*,java.io.*" pageEncoding="UTF-8"%>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>pdf查看</title>
<base href="<%=basePath%>">

</head>
 <%

	out.clear();
	out = pageContext.pushBody();
	response.setContentType("application/pdf");
	InputStream in = null;
	DataOutputStream temps = null;
	HttpURLConnection urlConnection = null;
	ServletOutputStream sos=null;
	try {
		request.setCharacterEncoding("UTF-8");
		String strPdfPath = request.getAttribute("pdfPath").toString();
		
		String qianzui=strPdfPath.substring(0, strPdfPath.lastIndexOf("/")+1);
		String houzui=strPdfPath.substring(strPdfPath.lastIndexOf("."),strPdfPath.length());
		String fileName=strPdfPath.substring(strPdfPath.lastIndexOf("/")+1,strPdfPath.lastIndexOf("."));
		String encode=URLEncoder.encode(fileName,"UTF-8");
		
		URL url = new URL(qianzui+encode+houzui);
		urlConnection = (HttpURLConnection) url.openConnection();
		urlConnection.setDoInput(true);
		in = urlConnection.getInputStream();
		sos=response.getOutputStream();
		byte[] b = new byte[2048];
		int i=0;
		while ((i=in.read(b)) != -1) {
			sos.write(b,0,i);
		}
	} catch (Exception e) {
		out.println(e.getMessage());
	} finally {
		
		 if(sos!=null){
			sos.flush();
			sos.close();
		}
		if (in != null) {
			in.close();
		}
	
		if (urlConnection != null) {
			urlConnection.disconnect();
		} 
	}
%> 
<body>
	<br>
</body>
</html>