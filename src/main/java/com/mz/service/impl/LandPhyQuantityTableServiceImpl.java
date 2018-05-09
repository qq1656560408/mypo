package com.mz.service.impl;

import com.mz.entity.LandPhyQuantityTable;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.mapper.LandPhyQuantityTableMapper;
import com.mz.service.ILandPhyQuantityTableService;
import com.mz.service.IProcessFileTableService;
import com.mz.service.IWaterTypeandFeaturesTableService;
import com.mz.util.InitBaseData;
import com.mz.util.excel.Excel;
import com.mz.util.excel.impl.LangPhyQuantityExcel;
import com.mz.vo.ShowLangPhyQuantity;
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
public class LandPhyQuantityTableServiceImpl extends ServiceImpl<LandPhyQuantityTableMapper, LandPhyQuantityTable> implements ILandPhyQuantityTableService {
	
	@Autowired
	LandPhyQuantityTableMapper landPhyQuantityTableMapper;
	@Autowired
	InitBaseData initBaseData;
	@Autowired
	IWaterTypeandFeaturesTableService typeAndFeaturesService;

	@Autowired
	IProcessFileTableService processFileTableService;
	/**
	 * excel导入实物量
	 */
	@Override
	public Object insertExcelImport(MultipartFile excelFile) {
		try {
			String fileName=excelFile.getOriginalFilename();
			LangPhyQuantityExcel langPhyQuantityExcel = new LangPhyQuantityExcel(typeAndFeaturesService, initBaseData);
			Excel.daoru(fileName, excelFile.getInputStream(), langPhyQuantityExcel);
			List<LandPhyQuantityTable> list = langPhyQuantityExcel.getLandPhyQuantityTable();
			landPhyQuantityTableMapper.insertPhyQuantityExcel(list);
			
			return list;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 分页查询实物量
	 */
	@Override
	public List<ShowLangPhyQuantity> selectPhyQuantityLimit(int begin, int size) {
		return landPhyQuantityTableMapper.selectPhyQuantityLimit(begin, size);
	}

	/**
	 * 删除实物量
	 */
	@Override
	public Boolean deleteByID(int id) {
		int affect = landPhyQuantityTableMapper.deleteByID(id);
		if (affect > 0) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 修改实物量
	 */
	@Override
	public Boolean updatePhyQuantity(LandPhyQuantityTable lang) {
		int affect = landPhyQuantityTableMapper.updatePhyQuantity(lang);
		if (affect > 0) {
			return true;
		} else {
			return false;
		}

	}

	/**
	 * 新增实物量
	 */
	@Override
	public Boolean insertPhyQuantity(WaterTypeandFeaturesTable water, LandPhyQuantityTable lang) {
		water = typeAndFeaturesService.existDataNoInser(water);
		if (water != null && water.getWaterTypeAndFeaturesID() > 0) {
			lang.setTypeAndFeaturesID(water.getWaterTypeAndFeaturesID());
			landPhyQuantityTableMapper.insertPhyQuantity(lang);
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 根据id查询实物量
	 */
	@Override
	public ShowLangPhyQuantity selectByID(int id) {
		return landPhyQuantityTableMapper.selectByID(id);

	}
}
