package com.mz.service;

import com.mz.entity.ModeuleActionTable;

import java.util.List;


import com.baomidou.mybatisplus.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author 
 * @since 2018-05-04
 */
public interface IModeuleActionTableService extends IService<ModeuleActionTable> {
	
	List<ModeuleActionTable> selectModuleAction(List<Integer> list);
	List<ModeuleActionTable> selectModuleActionAll();
}
