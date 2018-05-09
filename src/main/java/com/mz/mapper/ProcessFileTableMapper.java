package com.mz.mapper;

import com.mz.entity.ProcessFileTable;
import com.mz.vo.ShowProcessFile;
import java.util.List;
import org.apache.ibatis.annotations.Param;
import com.baomidou.mybatisplus.mapper.BaseMapper;

/**
 * <p>
  *  Mapper 接口
 * </p>
 *
 * @author 
 * @since 2018-04-24
 */
public interface ProcessFileTableMapper extends BaseMapper<ProcessFileTable> {


	List<ShowProcessFile> selectProcessFile(@Param("parentID") int parentID);

	int insertTopNode(@Param("processFileTable")ProcessFileTable processFileTable);
	
	int updateFile(@Param("url")String url,@Param("id")int id);
	
    int updateName(@Param("processFileMC")String name,@Param("id")int id);
    
    int updateParentsID(@Param("parentID")int parentID,@Param("id")int id);
    
    int deleteByID(@Param("id")int id);
}