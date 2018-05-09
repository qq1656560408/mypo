package com.mz.service.impl;

import com.mz.entity.ProcessFileTable;
import com.mz.mapper.ProcessFileTableMapper;
import com.mz.service.IProcessFileTableService;
import com.mz.util.FTP_Upload_Download;
import com.mz.util.LayuiUploadResponse;
import com.mz.vo.ShowProcessFile;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author 
 * @since 2018-04-24
 */
@Service
public class ProcessFileTableServiceImpl extends ServiceImpl<ProcessFileTableMapper, ProcessFileTable> implements IProcessFileTableService {
	@Autowired
	ProcessFileTableMapper processFileTableMapper;
	
	@Autowired
	FTP_Upload_Download upload;
	

	


	@Override
	public List<ShowProcessFile> selectProcessFile(int parentID) {
		return treeJson(parentID);
	}
	
	private List<ShowProcessFile> treeJson(int parentID){
		List<ShowProcessFile> list=processFileTableMapper.selectProcessFile(parentID);
		int id;
		for(ShowProcessFile showProcessFile:list){
			id=showProcessFile.getId();
			showProcessFile.setChildren(treeJson(id));
		}
		return list;
	}
	
	

	@Override
	public int insertTopNode(String name, int parentId) {
		ProcessFileTable parent = new ProcessFileTable();
		parent.setProcessFileMC(name);
		parent.setParentID(parentId);
		processFileTableMapper.insertTopNode(parent);
		return parent.getProcessFileID();
	}

	@Override
	public LayuiUploadResponse updateFile(MultipartFile file, int id) {
		LayuiUploadResponse layuiUploadResponse=new LayuiUploadResponse();
		String path = upload.getProcessFilePath();
		String fileName =System.currentTimeMillis()+".pdf";
		InputStream is = null;
		try {
			is = file.getInputStream();
		
			//ftp是否上传成功
			boolean b=upload.upload(fileName, is,path);
			if(!b){
				return layuiUploadResponse;
			}
			//新增数据是否成功
			int i=processFileTableMapper.updateFile(path + fileName, id);
			if(i==0){
				return layuiUploadResponse;
			}
			layuiUploadResponse.setIntactPath(upload.getFtpLookUrl()+path +fileName);
			layuiUploadResponse.setPath(path + fileName);
			layuiUploadResponse.setFileName(fileName);
			return layuiUploadResponse;
		} catch (IOException e) {
			e.printStackTrace();
			return layuiUploadResponse;
		} finally {
			if (is != null) {
				try {
					is.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}

	@Override
	public int updateName(String name, int id) {
		return processFileTableMapper.updateName(name, id);
	}

	@Override
	public int deleteByID(int id) {
		return processFileTableMapper.deleteByID(id);
	}

	@Override
	public int updateParentsID(int parentsID, int id) {
		return processFileTableMapper.updateParentsID(parentsID, id);
	}
}
