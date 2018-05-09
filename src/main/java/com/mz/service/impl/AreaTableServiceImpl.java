package com.mz.service.impl;

import com.mz.entity.AreaTable;
import com.mz.mapper.AreaTableMapper;
import com.mz.service.IAreaTableService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author
 * @since 2018-04-16
 */
@Service
public class AreaTableServiceImpl extends ServiceImpl<AreaTableMapper, AreaTable> implements IAreaTableService {

	@Autowired
	AreaTableMapper areaTableMapper;
	
	@Override
	public List<AreaTable> selectAreaMessages(Integer areaID) {
		return areaTableMapper.selectAreaMessage(areaID);
	}
}
