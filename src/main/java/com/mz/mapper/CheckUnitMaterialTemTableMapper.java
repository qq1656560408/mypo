package com.mz.mapper;

import com.mz.entity.CheckUnitMaterialTemTable;

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
public interface CheckUnitMaterialTemTableMapper extends BaseMapper<CheckUnitMaterialTemTable> {
	/**
	 * 查询考核指标、要素
	 * @param checkUnitID
	 * @return
	 */
  List<CheckUnitMaterialTemTable> selectUnitMaterial();
}