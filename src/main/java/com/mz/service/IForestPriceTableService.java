package com.mz.service;

import com.mz.entity.ForestPriceTable;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.util.LayuiResponseData;
import com.mz.vo.ShowForestPrice;

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
public interface IForestPriceTableService extends IService<ForestPriceTable> {
	
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
	List<ShowForestPrice>  selectPriceTableLimit(int begin,int size);
	

	Boolean deleteByID( int waterPriceID);
	
	ShowForestPrice selectByID(int waterPriceID);

	Boolean updatePrice(ForestPriceTable forest);


	int insertPriceTable(WaterTypeandFeaturesTable water, ForestPriceTable forest);
}
