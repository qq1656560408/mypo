package com.mz.service.impl;

import com.mz.entity.LandPriceTable;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.mapper.LandPriceTableMapper;
import com.mz.service.ILandPriceTableService;
import com.mz.service.IProcessFileTableService;
import com.mz.service.IWaterTypeandFeaturesTableService;
import com.mz.util.InitBaseData;
import com.mz.util.LayuiResponseData;
import com.mz.util.excel.Excel;
import com.mz.util.excel.impl.LandPriceExcel;
import com.mz.vo.ShowLandPrice;
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
public class LandPriceTableServiceImpl extends ServiceImpl<LandPriceTableMapper, LandPriceTable> implements ILandPriceTableService {
	
	@Autowired
	LandPriceTableMapper landPriceTableMapper;

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
			LandPriceExcel landPriceExcel = new LandPriceExcel(typeAndFeaturesService, initBaseData);
			Excel.daoru(fileName, excelFile.getInputStream(), landPriceExcel);
			List<LandPriceTable> list = landPriceExcel.getLandPriceTables();
			// 新增价格
			landPriceTableMapper.insertByExcle(list);
			
		
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
	public List<ShowLandPrice> selectPriceTableLimit(int begin, int size) {
		return landPriceTableMapper.selectPriceTableLimit(begin, size);
	}

	/**
	 * 新增价格
	 * @return 
	 */
	@Override
	public int insertPriceTable(WaterTypeandFeaturesTable water,LandPriceTable land) {
		water = typeAndFeaturesService.existDataNoInser(water);
		if (water != null && water.getWaterTypeAndFeaturesID() > 0) {
			land.setTypeAndFeaturesID(water.getWaterTypeAndFeaturesID());
			return landPriceTableMapper.insertPriceTable(land);
		} else {
			return 0;
		}
	}

	/**
	 * 删除价格
	 */
	@Override
	public Boolean deleteByID(int waterPriceID) {
		int affect = landPriceTableMapper.deleteByID(waterPriceID);
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
	public ShowLandPrice selectByID(int waterPriceID) {
		return landPriceTableMapper.selectByID(waterPriceID);
	}

	/**
	 * 修改价格
	 */
	@Override
	public Boolean updatePrice(LandPriceTable mpt) {
		int affect = landPriceTableMapper.updatePrice(mpt);
		if (affect > 0) {
			return true;
		} else {
			return false;
		}
	}
}
