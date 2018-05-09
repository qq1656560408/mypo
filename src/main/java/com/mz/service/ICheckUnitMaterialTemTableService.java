package com.mz.service;

import com.mz.entity.CheckUnitMaterialTemTable;
import java.util.List;
import com.baomidou.mybatisplus.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author 
 * @since 2018-04-16
 */
public interface ICheckUnitMaterialTemTableService extends IService<CheckUnitMaterialTemTable> {
	/**
	 * 根据考核单位查询指标项目、要求
	 * @param checkUnitID
	 * @return
	 */
	List<CheckUnitMaterialTemTable> selectUnitMaterial();
}
