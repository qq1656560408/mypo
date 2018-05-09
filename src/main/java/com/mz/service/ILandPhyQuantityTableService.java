package com.mz.service;

import com.mz.entity.LandPhyQuantityTable;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.vo.ShowLangPhyQuantity;

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
public interface ILandPhyQuantityTableService extends IService<LandPhyQuantityTable> {
	
	/**
	 * excel导入
	 * @param excelFile
	 * @return
	 */
	Object insertExcelImport(MultipartFile excelFile);

	/**
	 * 分页
	 * @param begin
	 * @param size
	 * @return
	 */
	List<ShowLangPhyQuantity> selectPhyQuantityLimit(int begin, int size);

	/**
	 * 根据id删除
	 * @param id
	 * @return
	 */
	Boolean deleteByID(int id);

	/**
	 * 新增
	 * @param water
	 * @param lang
	 * @return
	 */
	Boolean insertPhyQuantity(WaterTypeandFeaturesTable water, LandPhyQuantityTable lang);

	/**
	 * 根据id查询
	 * @param id
	 * @return
	 */
	ShowLangPhyQuantity selectByID(int id);

	/**
	 * 修改
	 * @param lang
	 * @return
	 */
	Boolean updatePhyQuantity(LandPhyQuantityTable lang);
}
