package com.mz.service.impl;

import com.mz.entity.CheckUnitMaterialTemTable;
import com.mz.mapper.CheckUnitMaterialTemTableMapper;
import com.mz.service.ICheckUnitMaterialTemTableService;
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
 * @since 2018-04-16
 */
@Service
public class CheckUnitMaterialTemTableServiceImpl extends ServiceImpl<CheckUnitMaterialTemTableMapper, CheckUnitMaterialTemTable> implements ICheckUnitMaterialTemTableService {
@Autowired
private CheckUnitMaterialTemTableMapper checkUnitMaterialTemTableMapper;
	@Override
	public List<CheckUnitMaterialTemTable> selectUnitMaterial() {
		return checkUnitMaterialTemTableMapper.selectUnitMaterial();
	}
	
}
