package com.mz.util;

import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.annotation.Resource;

import org.apache.commons.fileupload.disk.DiskFileItem;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

@Component
public class Upload {
	@Resource
	private FTP_Upload_Download ftp_upload;

	public String upload(MultipartFile multipartFile) throws IOException {
		String fileName = multipartFile.getOriginalFilename(); //获取文件名
        String suffix = fileName.substring(fileName.lastIndexOf(".") + 1);  //获取文件后缀名
        SimpleDateFormat df=new SimpleDateFormat("yyyymmddhhMMssSSS");
        String fileDate=df.format(new Date());
      /*把MultipartFile转为file*/
        CommonsMultipartFile cf = (CommonsMultipartFile)multipartFile;   
        DiskFileItem fi = (DiskFileItem) cf.getFileItem(); 
        InputStream input = fi.getInputStream();
        ftp_upload.upload(fileDate+"."+suffix, input,ftp_upload.folderName);
        return fileDate+"."+suffix;
	}
	
}
