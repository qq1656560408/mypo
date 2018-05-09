package com.mz.service.impl;

import com.mz.entity.ForestPriceTable;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.mapper.ForestPriceTableMapper;
import com.mz.service.IForestPriceTableService;
import com.mz.service.IProcessFileTableService;
import com.mz.service.IWaterTypeandFeaturesTableService;
import com.mz.util.InitBaseData;
import com.mz.util.LayuiResponseData;
import com.mz.util.excel.Excel;
import com.mz.util.excel.impl.ForestPriceExcel;
import com.mz.vo.ShowForestPrice;
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
public class ForestPriceTableServiceImpl extends ServiceImpl<ForestPriceTableMapper, ForestPriceTable> implements IForestPriceTableService {
	@Autowired
	ForestPriceTableMapper forestPriceTableMapper;

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
			String fileName=excelFile.getOriginalFilename();
			ForestPriceExcel forestPriceExcel = new ForestPriceExcel(typeAndFeaturesService, initBaseData);
			Excel.daoru(fileName, excelFile.getInputStream(), forestPriceExcel);
			List<ForestPriceTable> list = forestPriceExcel.getForestPriceTables();
			// 新增价格
			forestPriceTableMapper.insertByExcle(list);
		
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
	public List<ShowForestPrice> selectPriceTableLimit(int begin, int size) {
		return forestPriceTableMapper.selectPriceTableLimit(begin, size);
	}

	/**
	 * 新增价格
	 * @return 
	 */
	@Override
	public int insertPriceTable(WaterTypeandFeaturesTable water,ForestPriceTable forest) {
		water = typeAndFeaturesService.existDataNoInser(water);
		if (water != null && water.getWaterTypeAndFeaturesID() > 0) {
			forest.setTypeAndFeaturesID(water.getWaterTypeAndFeaturesID());
			return forestPriceTableMapper.insertPriceTable(forest);
		} else {
			return 0;
		}
	}

	/**
	 * 删除价格
	 */
	@Override
	public Boolean deleteByID(int waterPriceID) {
		int affect = forestPriceTableMapper.deleteByID(waterPriceID);
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
	public ShowForestPrice selectByID(int waterPriceID) {
		return forestPriceTableMapper.selectByID(waterPriceID);
	}

	/**
	 * 修改价格
	 */
	@Override
	public Boolean updatePrice(ForestPriceTable forest) {
		int affect = forestPriceTableMapper.updatePrice(forest);
		if (affect > 0) {
			return true;
		} else {
			return false;
		}
	}
}
