package com.mz.service.impl;

import com.mz.entity.WaterPriceTable;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.mapper.WaterPhyQuantityTableMapper;
import com.mz.mapper.WaterPriceTableMapper;
import com.mz.service.IProcessFileTableService;
import com.mz.service.IWaterPriceTableService;
import com.mz.service.IWaterTypeandFeaturesTableService;
import com.mz.service.IWaterValueTableService;
import com.mz.util.InitBaseData;
import com.mz.util.LayuiResponseData;
import com.mz.util.excel.Excel;
import com.mz.util.excel.impl.WaterPriceExcel;
import com.mz.vo.ShowWaterPrice;
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
 * @since 2018-04-16
 */
@Service
public class WaterPriceTableServiceImpl extends ServiceImpl<WaterPriceTableMapper, WaterPriceTable>
		implements IWaterPriceTableService {

	@Autowired
	WaterPriceTableMapper waterPriceTableMapper;

	@Autowired
	IWaterValueTableService waterValueTableService;

	@Autowired
	IWaterTypeandFeaturesTableService typeAndFeaturesService;

	@Autowired
	WaterPhyQuantityTableMapper waterPhyQuantityTableMapper;

	@Autowired
	InitBaseData initBaseData;
	
	@Autowired
	IProcessFileTableService processFileTableService;

	// excel导入
	@Override
	public LayuiResponseData insertExcelImport(MultipartFile excelFile) {

		try {
			String fileName=excelFile.getOriginalFilename();
			WaterPriceExcel waterPriceExcel = new WaterPriceExcel(typeAndFeaturesService, initBaseData);
			Excel.daoru(fileName, excelFile.getInputStream(), waterPriceExcel);
			
			List<WaterPriceTable> list = waterPriceExcel.getPriceTables();
			// 新增价格
			waterPriceTableMapper.insertByExcle(list);
		
			return new LayuiResponseData(list.size(), list);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 分页
	 */
	@Override
	public List<ShowWaterPrice> selectPriceTableLimit(int begin, int size) {
		return waterPriceTableMapper.selectPriceTableLimit(begin, size);
	}

	/**
	 * 新增
	 */
	@Override
	public void insertWaterPriceTable(WaterTypeandFeaturesTable water, WaterPriceTable wpt) {
		water = typeAndFeaturesService.existDataNoInser(water);
		if (water != null && water.getWaterTypeAndFeaturesID() > 0) {
			wpt.setWaterTypeAndFeaturesID(water.getWaterTypeAndFeaturesID());
			waterPriceTableMapper.insert(wpt);
		}
	}

	/**
	 * 删除
	 */
	@Override
	public Boolean deleteByID(int waterPriceID) {

		int affect = waterPriceTableMapper.deleteByID(waterPriceID);
		if (affect > 0) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 通过id查询
	 */
	@Override
	public ShowWaterPrice selectByID(int waterPriceID) {
		return waterPriceTableMapper.selectByID(waterPriceID);
	}

	@Override
	public Boolean updatePrice(WaterPriceTable wpt) {
		int affect = waterPriceTableMapper.updatePrice(wpt);
		if (affect > 0) {
			return true;
		} else {
			return false;
		}
	}

}
