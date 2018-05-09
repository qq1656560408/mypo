package com.mz.service;

import com.mz.entity.CheckProveMaterialTable;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author 
 * @since 2018-04-16
 */
public interface ICheckProveMaterialTableService extends IService<CheckProveMaterialTable> {
	/**
	 * 根据指标ID查询证明材料信息
	 * @param checkID
	 * @return
	 */
	List<CheckProveMaterialTable> selectCheckProveMaterialBycheckID(Integer checkID);
	/**
	 * 修改证明材料信息
	 * @param checkProveMaterialTable
	 * @return
	 */
	int updateCheckProveMaterialByURL(List<CheckProveMaterialTable> list,String[] OriginalURL);
	/**
	 * 新增证明材料
	 * @param list
	 * @return
	 */
	int insertCheckProveMaterial(List<CheckProveMaterialTable> list);
	/**
	 *  删除证明材料信息（根据名称）
	 * @param ProveMaterialURL
	 * @return
	 */
	int deleteCheckProveMaterialByURL(String[] ProveMaterialURL);
}
