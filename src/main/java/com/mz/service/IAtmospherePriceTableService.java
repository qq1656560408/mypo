package com.mz.service;

import com.mz.entity.AtmospherePriceTable;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.util.LayuiResponseData;
import com.mz.vo.ShowAtmoshoherePrice;
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
public interface IAtmospherePriceTableService extends IService<AtmospherePriceTable> {
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
	List<ShowAtmoshoherePrice>  selectPriceTableLimit(int begin,int size);
	

	Boolean deleteByID( int id);
	
	ShowAtmoshoherePrice selectByID(int id);

	Boolean updatePrice(AtmospherePriceTable atmosphere);


	int insertPriceTable(WaterTypeandFeaturesTable water, AtmospherePriceTable atmosphere);
}
