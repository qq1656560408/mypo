package com.mz.service.impl;

import com.mz.entity.AtmospherePriceTable;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.mapper.AtmospherePriceTableMapper;
import com.mz.service.IAtmospherePriceTableService;
import com.mz.service.IProcessFileTableService;
import com.mz.service.IWaterTypeandFeaturesTableService;
import com.mz.util.InitBaseData;
import com.mz.util.LayuiResponseData;
import com.mz.util.excel.Excel;
import com.mz.util.excel.impl.AtmospherePriceExcel;
import com.mz.vo.ShowAtmoshoherePrice;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author 
 * @since 2018-04-21
 */
@Service
public class AtmospherePriceTableServiceImpl extends ServiceImpl<AtmospherePriceTableMapper, AtmospherePriceTable> implements IAtmospherePriceTableService {

	@Autowired
	AtmospherePriceTableMapper atmospherePriceTableMapper;

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
			AtmospherePriceExcel atmospherePriceExcel = new AtmospherePriceExcel(typeAndFeaturesService, initBaseData);
			Excel.daoru(excelFile.getOriginalFilename(), excelFile.getInputStream(), atmospherePriceExcel);
			List<AtmospherePriceTable> list = atmospherePriceExcel.getAtmospherePriceTables();
			// 新增价格
			atmospherePriceTableMapper.insertByExcle(list);
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
	public List<ShowAtmoshoherePrice> selectPriceTableLimit(int begin, int size) {
		return atmospherePriceTableMapper.selectPriceTableLimit(begin, size);
	}

	/**
	 * 新增价格
	 * @return 
	 */
	@Override
	public int insertPriceTable(WaterTypeandFeaturesTable water,AtmospherePriceTable atmosphere) {
		water = typeAndFeaturesService.existDataNoInser(water);
		if (water != null && water.getWaterTypeAndFeaturesID() > 0) {
			atmosphere.setTypeAndFeaturesID(water.getWaterTypeAndFeaturesID());
			return atmospherePriceTableMapper.insertPriceTable(atmosphere);
		} else {
			return 0;
		}
	}

	/**
	 * 删除价格
	 */
	@Override
	public Boolean deleteByID(int waterPriceID) {
		int affect = atmospherePriceTableMapper.deleteByID(waterPriceID);
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
	public ShowAtmoshoherePrice selectByID(int waterPriceID) {
		return atmospherePriceTableMapper.selectByID(waterPriceID);
	}

	/**
	 * 修改价格
	 */
	@Override
	public Boolean updatePrice(AtmospherePriceTable atmosphere) {
		int affect = atmospherePriceTableMapper.updatePrice(atmosphere);
		if (affect > 0) {
			return true;
		} else {
			return false;
		}
	}

}
