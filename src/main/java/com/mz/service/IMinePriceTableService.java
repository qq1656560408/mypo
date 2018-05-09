package com.mz.service;

import com.mz.entity.MinePriceTable;
import com.mz.entity.WaterPriceTable;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.util.LayuiResponseData;
import com.mz.vo.ShowMinePrice;
import com.mz.vo.ShowWaterPrice;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.baomidou.mybatisplus.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author 
 * @since 2018-04-19
 */
public interface IMinePriceTableService extends IService<MinePriceTable> {
	
	/**
	 * excel 批量插入
	 * @param excelFile
	 * @return
	 */
	LayuiResponseData insertExcelImport(MultipartFile excelFile);
	

	/**
	 * 查询单价表
	 * @param begin
	 * @param size
	 * @return
	 */
	List<ShowMinePrice>  selectPriceTableLimit(int begin,int size);
	
	int insertPriceTable(WaterTypeandFeaturesTable water,MinePriceTable mine);

	Boolean deleteByID( int waterPriceID);
	
	ShowMinePrice selectByID(int waterPriceID);

	Boolean updatePrice(MinePriceTable mpt);
}
