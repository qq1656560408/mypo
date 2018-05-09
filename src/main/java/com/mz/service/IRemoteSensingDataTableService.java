package com.mz.service;

import com.mz.entity.RemoteSensingDataTable;
import com.mz.util.LayuiUploadResponse;
import com.mz.vo.ShowRemoteSensing;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import com.baomidou.mybatisplus.service.IService;

/**
 * <p>
 * 服务类
 * </p>
 *
 * @author
 * @since 2018-04-16
 */
public interface IRemoteSensingDataTableService extends IService<RemoteSensingDataTable> {
	List<ShowRemoteSensing> selectRemoteSensing(int parentId);

	int insertTopNode(String name, int parentId);

	LayuiUploadResponse updateFile(MultipartFile file, int id);

	int updateName(String name, int id);
	int updateParentsID(int parentsID,int id);

	int deleteByID(int id);
}
