package com.mz.service.impl;

import com.mz.entity.MinePriceTable;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.mapper.MinePriceTableMapper;
import com.mz.service.IMinePriceTableService;
import com.mz.service.IProcessFileTableService;
import com.mz.service.IWaterTypeandFeaturesTableService;
import com.mz.util.InitBaseData;
import com.mz.util.LayuiResponseData;
import com.mz.util.excel.Excel;
import com.mz.util.excel.impl.MinePriceExcel;
import com.mz.vo.ShowMinePrice;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author
 * @since 2018-04-19
 */
@Service
public class MinePriceTableServiceImpl extends ServiceImpl<MinePriceTableMapper, MinePriceTable>
		implements IMinePriceTableService {

	@Autowired
	MinePriceTableMapper minePriceTableMapper;

	@Autowired
	IWaterTypeandFeaturesTableService typeAndFeaturesService;

	@Autowired
	InitBaseData initBaseData;
	@Autowired
	IProcessFileTableService processFileTableService;

	// excel导入
	@Override
	public LayuiResponseData insertExcelImport(MultipartFile excelFile) {

		try {
			MinePriceExcel minePriceExcel = new MinePriceExcel(typeAndFeaturesService, initBaseData);
			Excel.daoru(excelFile.getOriginalFilename(), excelFile.getInputStream(), minePriceExcel);
			List<MinePriceTable> list = minePriceExcel.getPriceTables();
			// 新增价格
			minePriceTableMapper.insertByExcle(list);
			
			
			return new LayuiResponseData(list.size(), list);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 分页查询价格
	 */
	@Override
	public List<ShowMinePrice> selectPriceTableLimit(int begin, int size) {
		return minePriceTableMapper.selectPriceTableLimit(begin, size);
	}

	/**
	 * 新增价格
	 */
	@Override
	public int insertPriceTable(WaterTypeandFeaturesTable water,MinePriceTable mine) {
		water = typeAndFeaturesService.existDataNoInser(water);
		if (water != null && water.getWaterTypeAndFeaturesID() > 0) {
			mine.setTypeAndFeaturesID(water.getWaterTypeAndFeaturesID());
			return minePriceTableMapper.insert(mine);
		} else {
			return 0;
		}
		
	}

	/**
	 * 删除价格
	 */
	@Override
	public Boolean deleteByID(int waterPriceID) {
		int affect = minePriceTableMapper.deleteByID(waterPriceID);
		if (affect > 0) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 通过id查询价格
	 */
	@Override
	public ShowMinePrice selectByID(int waterPriceID) {
		return minePriceTableMapper.selectByID(waterPriceID);
	}

	/**
	 * 修改价格
	 */
	@Override
	public Boolean updatePrice(MinePriceTable mpt) {
		int affect = minePriceTableMapper.updatePrice(mpt);
		if (affect > 0) {
			return true;
		} else {
			return false;
		}
	}

}
