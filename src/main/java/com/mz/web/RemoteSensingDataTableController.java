package com.mz.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.mz.service.IRemoteSensingDataTableService;
import com.mz.util.FTP_Upload_Download;
import com.mz.util.LayuiUploadResponse;
import com.mz.vo.ShowRemoteSensing;
import com.mz.web.base.BaseControl;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author
 * @since 2018-04-16
 */
@Controller
@RequestMapping("/remoteSensingDataTable")
public class RemoteSensingDataTableController extends BaseControl {
	@Autowired
	IRemoteSensingDataTableService remoteSensingDataTableService;

	@Autowired
	FTP_Upload_Download ftp;

	@RequestMapping("showRemoteSensingData")
	@ResponseBody
	public Object showRemoteSensingData() {
		List<ShowRemoteSensing> list = remoteSensingDataTableService.selectRemoteSensing(0);
		return list;
	}

	@RequestMapping("getFtpLookUrl")
	@ResponseBody
	public Object getFtpLookUrl() {
		return ftp.getFtpLookUrl(); 
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
		int id = remoteSensingDataTableService.insertTopNode(name, paranID);
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
		LayuiUploadResponse layuiUploadResponse=remoteSensingDataTableService.updateFile(file,id);
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
		int i = remoteSensingDataTableService.updateName(name, id);
		return isSuccess(i);
	}
	
	@RequestMapping("updateParentsID")
	@ResponseBody
	public Object updateParentsID(Integer parentsID,Integer id){
		int i = remoteSensingDataTableService.updateParentsID(parentsID, id);
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
		int i = remoteSensingDataTableService.deleteByID(id);
		return isSuccess(i);
	}
	
	

}
