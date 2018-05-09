package com.mz.service;

import com.mz.entity.WaterPriceTable;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.util.LayuiResponseData;
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
 * @since 2018-04-16
 */
public interface IWaterPriceTableService extends IService<WaterPriceTable> {
	
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
	List<ShowWaterPrice>  selectPriceTableLimit(int begin,int size);
	
	void insertWaterPriceTable(WaterTypeandFeaturesTable water,WaterPriceTable wpt);

	Boolean deleteByID( int waterPriceID);
	
	ShowWaterPrice selectByID(int waterPriceID);

	Boolean updatePrice(WaterPriceTable wpt);
}
