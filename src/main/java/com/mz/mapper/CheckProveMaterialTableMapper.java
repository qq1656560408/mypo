package com.mz.mapper;

import com.mz.entity.CheckProveMaterialTable;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.mapper.BaseMapper;

/**
 * <p>
  *  Mapper 接口
 * </p>
 *
 * @author 
 * @since 2018-04-16
 */
public interface CheckProveMaterialTableMapper extends BaseMapper<CheckProveMaterialTable> {
	/**
	 * 根据指标ID查询证明材料信息
	 * @param checkID
	 * @return
	 */
	List<CheckProveMaterialTable> selectCheckProveMaterialBycheckID(@Param("checkID")Integer checkID);
	/**
	 * 修改证明材料信息
	 * @param checkProveMaterialTable
	 * @return
	 */
	int updateCheckProveMaterialByURL(@Param("ProveMaterialURL")String ProveMaterialURL,@Param("OriginalMame")String OriginalMame,@Param("OriginalURL")String OriginalURL);
    /**
     * 删除证明材料信息（根据名称）
     * @param ProveMaterialURL
     * @return
     */
	int deleteCheckProveMaterialByURL(@Param("ProveMaterialURL")String ProveMaterialURL);
}