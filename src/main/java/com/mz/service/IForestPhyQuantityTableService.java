package com.mz.service;

import com.mz.entity.ForestPhyQuantityTable;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.vo.ShowForestPhyQuantity;

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
public interface IForestPhyQuantityTableService extends IService<ForestPhyQuantityTable> {
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
	List<ShowForestPhyQuantity> selectPhyQuantityLimit(int begin, int size);

	/**
	 * 根据id删除
	 * @param id
	 * @return
	 */
	Boolean deleteByID(int id);

	/**
	 * 新增
	 * @param water
	 * @param forest
	 * @return
	 */
	Boolean insertPhyQuantity(WaterTypeandFeaturesTable water, ForestPhyQuantityTable forest);

	/**
	 * 根据id查询
	 * @param id
	 * @return
	 */
	ShowForestPhyQuantity selectByID(int id);

	/**
	 * 修改
	 * @param forest
	 * @return
	 */
	Boolean updatePhyQuantity(ForestPhyQuantityTable forest);
}
