package com.mz.mapper;

import com.mz.entity.ModeuleActionTable;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.mapper.BaseMapper;

/**
 * <p>
  *  Mapper 接口
 * </p>
 *
 * @author 
 * @since 2018-05-04
 */
public interface ModeuleActionTableMapper extends BaseMapper<ModeuleActionTable> {

	List<ModeuleActionTable> selectModuleAction(@Param("list")List<Integer> list);
	
	List<ModeuleActionTable> selectModuleActionAll();
}