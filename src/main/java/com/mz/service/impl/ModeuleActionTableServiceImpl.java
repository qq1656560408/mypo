package com.mz.service.impl;

import com.mz.entity.ModeuleActionTable;
import com.mz.mapper.ModeuleActionTableMapper;
import com.mz.service.IModeuleActionTableService;
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
 * @since 2018-05-04
 */
@Service
public class ModeuleActionTableServiceImpl extends ServiceImpl<ModeuleActionTableMapper, ModeuleActionTable> implements IModeuleActionTableService {

	@Autowired
	ModeuleActionTableMapper modeuleActionTableMapper;
	
	@Override
	public List<ModeuleActionTable> selectModuleAction(List<Integer> list) {
		return modeuleActionTableMapper.selectModuleAction(list);
	}

	@Override
	public List<ModeuleActionTable> selectModuleActionAll() {
		return modeuleActionTableMapper.selectModuleActionAll();
	}
	
}
