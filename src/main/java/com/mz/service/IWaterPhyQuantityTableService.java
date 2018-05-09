package com.mz.service;

import com.mz.entity.WaterPhyQuantityTable;
import com.mz.entity.WaterPriceTable;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.vo.ShowPhyQuantity;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.baomidou.mybatisplus.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author 
 * @since 2018-04-16
 */
public interface IWaterPhyQuantityTableService extends IService<WaterPhyQuantityTable> {

	Object insertExcelImport(MultipartFile excelFile);
	
	List<ShowPhyQuantity> selectPhyQuantityLimit(int begin,int size);

	Boolean deleteByID(int id);

	Boolean insertPhyQuantity(WaterTypeandFeaturesTable water, WaterPhyQuantityTable wpt);

	ShowPhyQuantity selectByID(int id);

	Boolean updatePhyQuantity(WaterPhyQuantityTable wapq);

}
