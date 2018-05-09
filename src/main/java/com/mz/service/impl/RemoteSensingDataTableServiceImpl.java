package com.mz.service.impl;

import com.mz.entity.RemoteSensingDataTable;
import com.mz.mapper.RemoteSensingDataTableMapper;
import com.mz.service.IRemoteSensingDataTableService;
import com.mz.util.FTP_Upload_Download;
import com.mz.util.LayuiUploadResponse;
import com.mz.util.TifConvert;
import com.mz.vo.ShowRemoteSensing;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author
 * @since 2018-04-16
 */
@Service
public class RemoteSensingDataTableServiceImpl extends ServiceImpl<RemoteSensingDataTableMapper, RemoteSensingDataTable>
		implements IRemoteSensingDataTableService {
	@Autowired
	RemoteSensingDataTableMapper remoteSensingDataTableMapper;

	@Autowired
	FTP_Upload_Download fTP_Upload_Download;

	@Override
	public List<ShowRemoteSensing> selectRemoteSensing(int parentId) {
		return getRemoteSensingData(parentId);
	}

	private List<ShowRemoteSensing> getRemoteSensingData(int parentId) {
		List<ShowRemoteSensing> list = remoteSensingDataTableMapper.selectRemoteSensing(parentId);
		for (ShowRemoteSensing rsdt : list) {
			parentId = rsdt.getId();
			rsdt.setChildren(getRemoteSensingData(parentId));
		}
		return list;
	}

	@Override
	public int insertTopNode(String name, int parentId) {
		RemoteSensingDataTable parent = new RemoteSensingDataTable();
		parent.setName(name);
		parent.setParentsID(parentId);
		remoteSensingDataTableMapper.insertTopNode(parent);
		return parent.getRemoteSensingDataID();
	}

	@Override
	public LayuiUploadResponse updateFile(MultipartFile file, int id) {
		LayuiUploadResponse layuiUploadResponse=new LayuiUploadResponse();
		String path = fTP_Upload_Download.getRemoteSensingFilePath();
		String fileName = file.getOriginalFilename();
		InputStream is = null;
		try {
			is = file.getInputStream();
			if (fileName.endsWith(".tif")||fileName.endsWith(".tiff")) {
				//如果是tif文件，转png
				is = TifConvert.tifToPng(is);
				fileName = fileName.split("\\.")[0] + ".png";
			}
			//ftp是否上传成功
			boolean b=fTP_Upload_Download.upload(fileName, is,path);
			if(!b){
				return layuiUploadResponse;
			}
			//新增数据是否成功
			int i=remoteSensingDataTableMapper.updateFile(path + fileName, id);
			if(i==0){
				return layuiUploadResponse;
			}
			layuiUploadResponse.setIntactPath(fTP_Upload_Download.getFtpLookUrl()+path +fileName);
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
		return remoteSensingDataTableMapper.updateName(name, id);
	}

	@Override
	public int deleteByID(int id) {
		return remoteSensingDataTableMapper.deleteByID(id);
	}

	@Override
	public int updateParentsID(int parentsID, int id) {
		return remoteSensingDataTableMapper.updateParentsID(parentsID, id);
	}
}
