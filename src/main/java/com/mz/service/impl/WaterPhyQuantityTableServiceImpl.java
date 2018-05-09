package com.mz.service.impl;

import com.mz.entity.WaterPhyQuantityTable;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.mapper.WaterPhyQuantityTableMapper;
import com.mz.service.IProcessFileTableService;
import com.mz.service.IWaterPhyQuantityTableService;
import com.mz.service.IWaterTypeandFeaturesTableService;
import com.mz.util.InitBaseData;
import com.mz.util.excel.Excel;
import com.mz.util.excel.impl.WaterPhyQuantityExcel;
import com.mz.vo.ShowPhyQuantity;
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
public class WaterPhyQuantityTableServiceImpl extends ServiceImpl<WaterPhyQuantityTableMapper, WaterPhyQuantityTable>
		implements IWaterPhyQuantityTableService {

	@Autowired
	WaterPhyQuantityTableMapper waterPhyQuantityTableMapper;
	@Autowired
	InitBaseData initBaseData;
	@Autowired
	IWaterTypeandFeaturesTableService typeAndFeaturesService;
	@Autowired
	IProcessFileTableService processFileTableService;
	/**
	 * 导入excel
	 */
	@Override
	public Object insertExcelImport(MultipartFile excelFile) {
		try {
			String fileName=excelFile.getOriginalFilename();
			WaterPhyQuantityExcel waterPhyQuantityExcel = new WaterPhyQuantityExcel(typeAndFeaturesService,
					initBaseData);
			Excel.daoru(fileName, excelFile.getInputStream(), waterPhyQuantityExcel);
			List<WaterPhyQuantityTable> list = waterPhyQuantityExcel.getWaterPhyQuantityTables();
			waterPhyQuantityTableMapper.insertPhyQuantityExcel(list);
			
			return list;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 分页查询
	 */
	@Override
	public List<ShowPhyQuantity> selectPhyQuantityLimit(int begin, int size) {
		return waterPhyQuantityTableMapper.selectPhyQuantityLimit(begin, size);
	}

	/**
	 * 删除
	 */
	@Override
	public Boolean deleteByID(int id) {
		int affect = waterPhyQuantityTableMapper.deleteByID(id);
		if (affect > 0) {
			return true;
		} else {
			return false;
		}

	}

	/**
	 * 
	 */
	@Override
	public Boolean updatePhyQuantity(WaterPhyQuantityTable wapq) {
		int affect = waterPhyQuantityTableMapper.updatePhyQuantity(wapq);
		if (affect > 0) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 新增
	 */
	@Override
	public Boolean insertPhyQuantity(WaterTypeandFeaturesTable water, WaterPhyQuantityTable wapq) {
		water = typeAndFeaturesService.existDataNoInser(water);
		if (water != null && water.getWaterTypeAndFeaturesID() > 0) {
			wapq.setWaterTypeAndFeaturesID(water.getWaterTypeAndFeaturesID());
			waterPhyQuantityTableMapper.insertPhyQuantity(wapq);
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 通过id查询
	 */
	@Override
	public ShowPhyQuantity selectByID(int id) {
		return waterPhyQuantityTableMapper.selectByID(id);

	}

}
