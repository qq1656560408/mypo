package com.mz.service;

import com.mz.entity.AtmospherePhyQuantityTable;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.vo.ShowAtmoshpherePhyQuantity;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.baomidou.mybatisplus.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author 
 * @since 2018-04-21
 */
public interface IAtmospherePhyQuantityTableService extends IService<AtmospherePhyQuantityTable> {
	
	/**
	 * 批量新增excel
	 * @param atmosphere
	 */
	Object insertExcelImport(MultipartFile excelFile);
	
	/**
	 * 分页
	 * @param begin
	 * @param size
	 * @return
	 */
	List<ShowAtmoshpherePhyQuantity> selectPhyQuantityLimit(int begin,int size);

	/**
	 * 修改实物量
	 * @param mpqt
	 */
	int updatePhyQuantity(AtmospherePhyQuantityTable atmosphere);

	/**
	 * 根据id删除
	 * @param id
	 */
	int deleteByID(int id);

	/**
	 * 新增数据
	 * @param mpqt
	 */
	int insertPhyQuantity(WaterTypeandFeaturesTable water, AtmospherePhyQuantityTable atmosphere);

	/**
	 * 根据id查询
	 * @param id
	 * @return
	 */
	ShowAtmoshpherePhyQuantity selectByID(int id);


}
