package com.mz.web;

import com.mz.entity.CheckProveMaterialTable;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import com.mz.service.ICheckProveMaterialTableService;
import com.mz.util.FTP_Upload_Download;
import com.mz.util.Upload;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author 
 * @since 2018-04-16
 */
@Controller
@RequestMapping("/checkProveMaterialTable")
public class CheckProveMaterialTableController {
	@Resource
	private Upload upload;
	@Resource
	private FTP_Upload_Download ftp_upload;
	
	@Autowired
	private ICheckProveMaterialTableService checkProveMaterialTableService;
	
	@RequestMapping("selectCheckProveMaterialBycheckID")
	@ResponseBody
	public List<CheckProveMaterialTable> selectCheckProveMaterialBycheckID(Integer checkID){
		List<CheckProveMaterialTable> list_url=checkProveMaterialTableService.selectCheckProveMaterialBycheckID(checkID);
		for(int i=0;i<list_url.size();i++) {
			list_url.get(i).setProveMaterialURL(ftp_upload.getFtpLookUrl()+ftp_upload.getFolderName()+list_url.get(i).getProveMaterialURL());
		}
		return list_url;
	}
	 /**
     * 修改文件资料
     * @param artworkmaster
     * @return
     * @throws IOException 
     */
	@RequestMapping("updatefile")
	@ResponseBody
	public int updatefile(HttpServletRequest request,String artworkmaster,MultipartHttpServletRequest filereq,Integer checkID) throws IOException {
		int k=0;
    	List<MultipartFile> list_file=new ArrayList<>();
    	List<MultipartFile> list_insert=filereq.getFiles("insTab");
    	String[] str_delURL=request.getParameterValues("del_URL");
    	//新增
    	if(list_insert.size()!=0) {
    		List<CheckProveMaterialTable> CPM_lisert=new ArrayList<>();
    		for (MultipartFile multfile:list_insert) {
	            String fileName = multfile.getOriginalFilename(); //获取文件名
	            String strurl=upload.upload(multfile);
	            CheckProveMaterialTable CPM=new CheckProveMaterialTable();
	            CPM.setCheckID(checkID);
	            CPM.setOriginalMame(fileName);
	            CPM.setProveMaterialURL(strurl);
	            CPM_lisert.add(CPM);
	        }
    		k=checkProveMaterialTableService.insertCheckProveMaterial(CPM_lisert);
    	}
        //修改
    	if(!"".equals(artworkmaster)) {
    	String[] arr_url=artworkmaster.split(",");
    		List<CheckProveMaterialTable> CPM_update=new ArrayList<>();
        	for(int i=0;i<arr_url.length;i++) {
        		 list_file=filereq.getFiles(arr_url[i]);
        		 String fileName = list_file.get((list_file.size())-1).getOriginalFilename(); //获取文件名
        		 String strurl=upload.upload(list_file.get((list_file.size())-1));
                 CheckProveMaterialTable checkProveMaterialTable=new CheckProveMaterialTable();
                 checkProveMaterialTable.setProveMaterialURL(strurl);
                 checkProveMaterialTable.setOriginalMame(fileName);
                 CPM_update.add(checkProveMaterialTable);
        	}
        	k=checkProveMaterialTableService.updateCheckProveMaterialByURL(CPM_update, arr_url);
    	}
    	//删除
    	if(str_delURL.length>0) {
    		k=checkProveMaterialTableService.deleteCheckProveMaterialByURL(str_delURL);
    	}
    	return k;
    }
}
