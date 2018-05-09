package com.mz.service.impl;

import com.mz.entity.ForestPhyQuantityTable;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.mapper.ForestPhyQuantityTableMapper;
import com.mz.service.IForestPhyQuantityTableService;
import com.mz.service.IWaterTypeandFeaturesTableService;
import com.mz.util.InitBaseData;
import com.mz.util.excel.Excel;
import com.mz.util.excel.impl.ForestPhyQuantityExcel;
import com.mz.vo.ShowForestPhyQuantity;
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
public class ForestPhyQuantityTableServiceImpl extends ServiceImpl<ForestPhyQuantityTableMapper, ForestPhyQuantityTable> implements IForestPhyQuantityTableService {
	@Autowired
	ForestPhyQuantityTableMapper forestPhyQuantityTableMapper;
	@Autowired
	InitBaseData initBaseData;
	@Autowired
	IWaterTypeandFeaturesTableService typeAndFeaturesService;

	/**
	 * excel导入实物量
	 */
	@Override
	public Object insertExcelImport(MultipartFile excelFile) {
		try {
			String fileName=excelFile.getOriginalFilename();
			ForestPhyQuantityExcel forestPhyQuantityExcel = new ForestPhyQuantityExcel(typeAndFeaturesService, initBaseData);
			Excel.daoru(fileName, excelFile.getInputStream(), forestPhyQuantityExcel);
			List<ForestPhyQuantityTable> list = forestPhyQuantityExcel.getForestPhyQuantityTables();
			forestPhyQuantityTableMapper.insertPhyQuantityExcel(list);
			
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
	public List<ShowForestPhyQuantity> selectPhyQuantityLimit(int begin, int size) {
		return forestPhyQuantityTableMapper.selectPhyQuantityLimit(begin, size);
	}

	/**
	 * 删除实物量
	 */
	@Override
	public Boolean deleteByID(int id) {
		int affect = forestPhyQuantityTableMapper.deleteByID(id);
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
	public Boolean updatePhyQuantity(ForestPhyQuantityTable forest) {
		int affect = forestPhyQuantityTableMapper.updatePhyQuantity(forest);
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
	public Boolean insertPhyQuantity(WaterTypeandFeaturesTable water, ForestPhyQuantityTable forest) {
		water = typeAndFeaturesService.existDataNoInser(water);
		if (water != null && water.getWaterTypeAndFeaturesID() > 0) {
			forest.setTypeAndFeaturesID(water.getWaterTypeAndFeaturesID());
			forestPhyQuantityTableMapper.insertPhyQuantity(forest);
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 根据id查询实物量
	 */
	@Override
	public ShowForestPhyQuantity selectByID(int id) {
		return forestPhyQuantityTableMapper.selectByID(id);

	}
}
