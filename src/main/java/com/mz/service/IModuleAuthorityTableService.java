package com.mz.service;

import com.mz.entity.ModuleAuthorityTable;
import com.mz.vo.SelectModuleAuthority;
import java.util.List;
import com.baomidou.mybatisplus.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author 
 * @since 2018-04-26
 */
public interface IModuleAuthorityTableService extends IService<ModuleAuthorityTable> {
	List<SelectModuleAuthority> selectModuleAuthorities(int assistantID);
	
	List<ModuleAuthorityTable> selectAllModule(String[] assistantIDs);
	
	List<ModuleAuthorityTable> selectAllModuleAll();
	

	/**
	 * 获取权限菜单
	 * @param parentId 父id
	 * @return 
	 */
	List<ModuleAuthorityTable> selectMenu(int parentId);
}
