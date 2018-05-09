package com.mz.service;

import com.mz.entity.RenewablePhyQuantityTable;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.vo.ShowRenewablePhyQuantity;

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
public interface IRenewablePhyQuantityTableService extends IService<RenewablePhyQuantityTable> {
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
	List<ShowRenewablePhyQuantity> selectPhyQuantityLimit(int begin,int size);

	/**
	 * 修改实物量
	 * @param mpqt
	 */
	int updatePhyQuantity(RenewablePhyQuantityTable atmosphere);

	/**
	 * 根据id删除
	 * @param id
	 */
	int deleteByID(int id);

	/**
	 * 新增数据
	 * @param mpqt
	 */
	int insertPhyQuantity(WaterTypeandFeaturesTable water, RenewablePhyQuantityTable atmosphere);

	/**
	 * 根据id查询
	 * @param id
	 * @return
	 */
	ShowRenewablePhyQuantity selectByID(int id);

}
