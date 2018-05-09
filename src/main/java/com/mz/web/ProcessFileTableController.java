package com.mz.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import com.mz.service.IProcessFileTableService;
import com.mz.util.FTP_Upload_Download;
import com.mz.util.LayuiUploadResponse;
import com.mz.vo.ShowProcessFile;
import com.mz.web.base.BaseControl;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author 
 * @since 2018-04-24
 */
@Controller
@RequestMapping("/processFileTable")
public class ProcessFileTableController extends BaseControl{
	
	@Autowired
	IProcessFileTableService processFileTableService;
	

	@Autowired
	FTP_Upload_Download ftp;

	
	@RequestMapping("selectProcessFile")
	@ResponseBody
	public Object selectProcessFile(){
		List<ShowProcessFile> list=processFileTableService.selectProcessFile(0);
		return list;
	}
	
	@RequestMapping("lookPdf")
	public ModelAndView lookPdf(String pdfPath){
		ModelAndView modelAndView=new ModelAndView();
		String ftpLookUrl=ftp.getFtpLookUrl();
		modelAndView.addObject("pdfPath",ftpLookUrl +pdfPath);
		modelAndView.setViewName("pdfLook/pdfLook");
		return modelAndView;
	}
	

	/**
	 * 
	 * @return
	 */
	@RequestMapping("insertTopNode")
	@ResponseBody
	public Object insertTopNode(String name, Integer paranID) {
		if (paranID == null) {
			return 0;
		}
		int id = processFileTableService.insertTopNode(name, paranID);
		return id;
	}

	/**
	 * 修改文件
	 * 
	 * @param excelFile
	 * @param id
	 * @return
	 */
	@RequestMapping("updateFile")
	@ResponseBody
	public Object updateFile(MultipartFile file, Integer id) {
		LayuiUploadResponse layuiUploadResponse=processFileTableService.updateFile(file,id);
		return layuiUploadResponse;
	}

	/**
	 * 修改名称
	 * 
	 * @param name
	 * @param id
	 * @return
	 */
	@RequestMapping("updateName")
	@ResponseBody
	public Object updateName(String name, Integer id) {
		int i = processFileTableService.updateName(name, id);
		return isSuccess(i);
	}
	
	@RequestMapping("updateParentsID")
	@ResponseBody
	public Object updateParentsID(Integer parentsID,Integer id){
		int i = processFileTableService.updateParentsID(parentsID, id);
		return isSuccess(i);
	}

	/**
	 * 删除
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping("deleteRemoteSensing")
	@ResponseBody
	public Object deleteRemoteSensing(Integer id) {
		int i = processFileTableService.deleteByID(id);
		return isSuccess(i);
	}
	
	
}
