package com.mz.service;

import com.mz.entity.RenewablePriceTable;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.util.LayuiResponseData;
import com.mz.vo.ShowRenewablePrice;
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
public interface IRenewablePriceTableService extends IService<RenewablePriceTable> {
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
	List<ShowRenewablePrice>  selectPriceTableLimit(int begin,int size);
	

	Boolean deleteByID( int id);
	
	ShowRenewablePrice selectByID(int id);

	Boolean updatePrice(RenewablePriceTable renewable);


	int insertPriceTable(WaterTypeandFeaturesTable water, RenewablePriceTable renewable);

}
