package com.mz.service.impl;

import com.mz.entity.RenewablePriceTable;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.mapper.RenewablePriceTableMapper;
import com.mz.service.IProcessFileTableService;
import com.mz.service.IRenewablePriceTableService;
import com.mz.service.IWaterTypeandFeaturesTableService;
import com.mz.util.InitBaseData;
import com.mz.util.LayuiResponseData;
import com.mz.util.excel.Excel;
import com.mz.util.excel.impl.RenewablePriceExcel;
import com.mz.vo.ShowRenewablePrice;
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
public class RenewablePriceTableServiceImpl extends ServiceImpl<RenewablePriceTableMapper, RenewablePriceTable> implements IRenewablePriceTableService {

	@Autowired
	RenewablePriceTableMapper renewablePriceTableMapper;

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
			RenewablePriceExcel renewablePriceExcel = new RenewablePriceExcel(typeAndFeaturesService, initBaseData);
			Excel.daoru(fileName, excelFile.getInputStream(), renewablePriceExcel);
			List<RenewablePriceTable> list = renewablePriceExcel.getRenewablePriceTables();
			// 新增价格
			renewablePriceTableMapper.insertByExcle(list);
			
			
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
	public List<ShowRenewablePrice> selectPriceTableLimit(int begin, int size) {
		return renewablePriceTableMapper.selectPriceTableLimit(begin, size);
	}

	/**
	 * 新增价格
	 * @return 
	 */
	@Override
	public int insertPriceTable(WaterTypeandFeaturesTable water,RenewablePriceTable renewable) {
		water = typeAndFeaturesService.existDataNoInser(water);
		if (water != null && water.getWaterTypeAndFeaturesID() > 0) {
			renewable.setTypeAndFeaturesID(water.getWaterTypeAndFeaturesID());
			return renewablePriceTableMapper.insertPriceTable(renewable);
		} else {
			return 0;
		}
	}

	/**
	 * 删除价格
	 */
	@Override
	public Boolean deleteByID(int waterPriceID) {
		int affect = renewablePriceTableMapper.deleteByID(waterPriceID);
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
	public ShowRenewablePrice selectByID(int waterPriceID) {
		return renewablePriceTableMapper.selectByID(waterPriceID);
	}

	/**
	 * 修改价格
	 */
	@Override
	public Boolean updatePrice(RenewablePriceTable renewable) {
		int affect = renewablePriceTableMapper.updatePrice(renewable);
		if (affect > 0) {
			return true;
		} else {
			return false;
		}
	}
}
