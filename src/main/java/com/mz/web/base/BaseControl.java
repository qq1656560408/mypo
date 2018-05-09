package com.mz.web.base;


import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.ModelAndView;

import com.mz.util.InitBaseData;

public class BaseControl {
	
	@Autowired
	protected InitBaseData initBaseData;
	
	

	public ModelAndView loadBase(String jsp){
		ModelAndView modelAndView=new ModelAndView(jsp);
		modelAndView.addObject("year", initBaseData.getList("year"));
		modelAndView.addObject("area", initBaseData.getList("area"));
		modelAndView.addObject("waterTypeTables", initBaseData.getList("waterTypeTables"));
		return modelAndView;
	}
	
	public Object isSuccess(int i){
		if (i > 0) {
			return "{\"success\":true}";
		} else {
			return "{\"success\":false}";
		}
	}
	
	public static void main(String[] args) throws IOException {
		HttpURLConnection urlConnection=null;
		InputStream in=null;
		FileOutputStream filterOutputStream=null;
		try {
			URL url = new URL("http://192.168.2.164:8083/meiZhou/ProcessFile/a.pdf");
			urlConnection = (HttpURLConnection) url.openConnection();
			urlConnection.setDoInput(true);
			urlConnection.setRequestProperty("content-type", "application/pdf");
			urlConnection.setRequestMethod("GET") ;  
			in = urlConnection.getInputStream();
			filterOutputStream=new FileOutputStream(new File("D:/test.pdf"));
			byte[] b = new byte[2048];
			int i=0;
			while ((i=in.read(b)) != -1) {
				filterOutputStream.write(b,0,i);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			
			 if(filterOutputStream!=null){
				 filterOutputStream.flush();
				 filterOutputStream.close();
			}
			if (in != null) {
				in.close();
			}
		
			if (urlConnection != null) {
				urlConnection.disconnect();
			} 
		}
	}
}
