package com.mz.mapper;

import com.mz.entity.AreaTable;

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
public interface AreaTableMapper extends BaseMapper<AreaTable> {
	List<AreaTable> selectAreaMessage(@Param("areaID")Integer areaID); 
}