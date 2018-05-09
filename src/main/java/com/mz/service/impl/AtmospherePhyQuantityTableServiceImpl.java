package com.mz.service.impl;

import com.mz.entity.AtmospherePhyQuantityTable;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.mapper.AtmospherePhyQuantityTableMapper;
import com.mz.service.IAtmospherePhyQuantityTableService;
import com.mz.service.IProcessFileTableService;
import com.mz.service.IWaterTypeandFeaturesTableService;
import com.mz.util.InitBaseData;
import com.mz.util.excel.Excel;
import com.mz.util.excel.impl.AtmospherePhyQuantityExcel;
import com.mz.vo.ShowAtmoshpherePhyQuantity;
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
public class AtmospherePhyQuantityTableServiceImpl extends ServiceImpl<AtmospherePhyQuantityTableMapper, AtmospherePhyQuantityTable> implements IAtmospherePhyQuantityTableService {
	@Autowired
	AtmospherePhyQuantityTableMapper atmospherePhyQuantityTableMapper;
	
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
			AtmospherePhyQuantityExcel atmospherePhyQuantityExcel = new AtmospherePhyQuantityExcel(typeAndFeaturesService, initBaseData);
			Excel.daoru(fileName, excelFile.getInputStream(), atmospherePhyQuantityExcel);
			List<AtmospherePhyQuantityTable> list = atmospherePhyQuantityExcel.getAtmospherePhyQuantityTables();
			//新增实物量
			atmospherePhyQuantityTableMapper.insertPhyQuantityExcel(list);
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
	public List<ShowAtmoshpherePhyQuantity> selectPhyQuantityLimit(int begin, int size) {
		return atmospherePhyQuantityTableMapper.selectPhyQuantityLimit(begin, size);
	}

	/**
	 * 删除实物量
	 */
	@Override
	public int deleteByID(int id) {
		return atmospherePhyQuantityTableMapper.deleteByID(id);
	}

	/**
	 * 修改实物量
	 */
	@Override
	public int updatePhyQuantity(AtmospherePhyQuantityTable atmosphere) {
		return atmospherePhyQuantityTableMapper.updatePhyQuantity(atmosphere);
	}

	/**
	 * 新增实物量
	 */
	@Override
	public int insertPhyQuantity(WaterTypeandFeaturesTable water, AtmospherePhyQuantityTable atmosphere) {
		water = typeAndFeaturesService.existDataNoInser(water);
		if (water != null && water.getWaterTypeAndFeaturesID() > 0) {
			atmosphere.setTypeAndFeaturesID(water.getWaterTypeAndFeaturesID());
			return atmospherePhyQuantityTableMapper.insertPhyQuantity(atmosphere);
		} else {
			return 0;
		}
	}

	/**
	 * 根据id查询实物量
	 */
	@Override
	public ShowAtmoshpherePhyQuantity selectByID(int id) {
		return atmospherePhyQuantityTableMapper.selectByID(id);

	}
}
