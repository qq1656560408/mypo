package com.mz.service.impl;

import com.mz.entity.ModuleAuthorityTable;
import com.mz.mapper.ModuleAuthorityTableMapper;
import com.mz.service.IModuleAuthorityTableService;
import com.mz.util.session.UserSession;
import com.mz.vo.SelectModuleAuthority;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author 
 * @since 2018-04-26
 */
@Service
public class ModuleAuthorityTableServiceImpl extends ServiceImpl<ModuleAuthorityTableMapper, ModuleAuthorityTable> implements IModuleAuthorityTableService {
	
	@Autowired
	ModuleAuthorityTableMapper moduleAuthorityTableMapper;
	
	public List<SelectModuleAuthority> getRemoteSensingData(int assistantID){
		List<SelectModuleAuthority> list=moduleAuthorityTableMapper.selectTree(assistantID);
		for(SelectModuleAuthority rsdt:list){
			assistantID=rsdt.getId();
			rsdt.setChildren(getRemoteSensingData(assistantID));
		}
	
		return list;
	}

	//覆盖类
	@Override
	public List<SelectModuleAuthority> selectModuleAuthorities(int assistantID) {
		return getRemoteSensingData(assistantID);
	}

	@Override
	public List<ModuleAuthorityTable> selectAllModule(String[] assistantIDs) {
		return moduleAuthorityTableMapper.selectAllModule(assistantIDs);
	}

	@Override
	public List<ModuleAuthorityTable> selectAllModuleAll() {
		return moduleAuthorityTableMapper.selectAllModuleAll();
	}


	@Override
	public List<ModuleAuthorityTable> selectMenu( int parentId) {
		String[] moduleAuthorityIDs=UserSession.getAssistantIDs();
		return moduleAuthorityTableMapper.selectMenu(moduleAuthorityIDs, parentId);
	}



}
