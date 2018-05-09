package com.mz.mapper;

import com.mz.entity.ModuleAuthorityTable;
import com.mz.vo.SelectModuleAuthority;
import java.util.List;
import org.apache.ibatis.annotations.Param;
import com.baomidou.mybatisplus.mapper.BaseMapper;

/**
 * <p>
  *  Mapper 接口
 * </p>
 *
 * @author 
 * @since 2018-04-26
 */
public interface ModuleAuthorityTableMapper extends BaseMapper<ModuleAuthorityTable> {
           
	List<SelectModuleAuthority> selectTree(@Param("assistantID") int assistantID);
	
	List<ModuleAuthorityTable> selectAllModule(@Param("assistantIDs") String[] assistantIDs);
	
	List<ModuleAuthorityTable> selectAllModuleAll();
	
	/**
	 * 查询权限菜单
	 * @param moduleAuthorityIDs 权限id集合
	 * @param parentId 父id
	 * @return
	 */
	List<ModuleAuthorityTable> selectMenu(@Param("moduleAuthorityIDs")String[] moduleAuthorityIDs,@Param("parentId")int parentId);
}