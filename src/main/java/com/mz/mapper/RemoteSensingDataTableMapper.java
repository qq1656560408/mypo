package com.mz.mapper;

import com.mz.entity.RemoteSensingDataTable;
import com.mz.vo.ShowRemoteSensing;

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
public interface RemoteSensingDataTableMapper extends BaseMapper<RemoteSensingDataTable> {

	List<ShowRemoteSensing> selectRemoteSensing(@Param("parentId") int parentId);
	
	int insertTopNode(@Param("remoteSensingDataTable")RemoteSensingDataTable remoteSensingDataTable);
	
	
	int updateFile(@Param("url")String url,@Param("id")int id);
	
    int updateName(@Param("name")String name,@Param("id")int id);
    
    int updateParentsID(@Param("parentsID")int parentsID,@Param("id")int id);
    
    int deleteByID(@Param("id")int id);
}