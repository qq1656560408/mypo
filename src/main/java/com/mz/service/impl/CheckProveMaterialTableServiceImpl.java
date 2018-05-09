package com.mz.service.impl;

import com.mz.entity.CheckProveMaterialTable;
import com.mz.mapper.CheckProveMaterialTableMapper;
import com.mz.service.ICheckProveMaterialTableService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author
 * @since 2018-04-16
 */
@Service
public class CheckProveMaterialTableServiceImpl extends
		ServiceImpl<CheckProveMaterialTableMapper, CheckProveMaterialTable> implements ICheckProveMaterialTableService {
	@Autowired
	private CheckProveMaterialTableMapper checkProveMaterialTableMapper;

	/**
	 * 根据checkID查询证明材料文件
	 */
	@Override
	public List<CheckProveMaterialTable> selectCheckProveMaterialBycheckID(Integer checkID) {
		return checkProveMaterialTableMapper.selectCheckProveMaterialBycheckID(checkID);
	}

	/**
	 * 修改证明材料信息
	 */
	@Override
	public int updateCheckProveMaterialByURL(List<CheckProveMaterialTable> list, String[] OriginalURL) {
		int k = 0;
		for (int i = 0; i < list.size(); i++) {
			k = checkProveMaterialTableMapper.updateCheckProveMaterialByURL(list.get(i).getProveMaterialURL(),
					list.get(i).getOriginalMame(), OriginalURL[i]);
		}
		return k;
	}

	/**
	 * 新增文件
	 */
	@Override
	public int insertCheckProveMaterial(List<CheckProveMaterialTable> list) {
		int k = 0;
		for (int i = 0; i < list.size(); i++) {
			k = checkProveMaterialTableMapper.insert(list.get(i));
		}
		return k;
	}

	/**
	 * 删除证明材料信息（根据名称）
	 */
	@Override
	public int deleteCheckProveMaterialByURL(String[] ProveMaterialURL) {
		int k=0;
		for(int i=0;i<ProveMaterialURL.length;i++) {
			k=checkProveMaterialTableMapper.deleteCheckProveMaterialByURL(ProveMaterialURL[i]);
		}
		return k;
	}

}
