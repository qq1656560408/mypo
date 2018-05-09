package com.mz.service.impl;

import com.mz.entity.MinePhyQuantityTable;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.mapper.MinePhyQuantityTableMapper;
import com.mz.service.IMinePhyQuantityTableService;
import com.mz.service.IProcessFileTableService;
import com.mz.service.IWaterTypeandFeaturesTableService;
import com.mz.util.InitBaseData;
import com.mz.util.excel.Excel;
import com.mz.util.excel.impl.MinePhyQuantityExcel;
import com.mz.vo.ShowMinePhyQuantity;
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
public class MinePhyQuantityTableServiceImpl extends ServiceImpl<MinePhyQuantityTableMapper, MinePhyQuantityTable>
		implements IMinePhyQuantityTableService {
	@Autowired
	MinePhyQuantityTableMapper minePhyQuantityTableMapper;
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
			MinePhyQuantityExcel minePhyQuantityExcel = new MinePhyQuantityExcel(typeAndFeaturesService, initBaseData);
			Excel.daoru(fileName, excelFile.getInputStream(), minePhyQuantityExcel);
			List<MinePhyQuantityTable> list = minePhyQuantityExcel.getMinePhyQuantityTables();
			minePhyQuantityTableMapper.insertPhyQuantityExcel(list);
			
			
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
	public List<ShowMinePhyQuantity> selectPhyQuantityLimit(int begin, int size) {
		return minePhyQuantityTableMapper.selectPhyQuantityLimit(begin, size);
	}

	/**
	 * 删除实物量
	 */
	@Override
	public Boolean deleteByID(int id) {
		int affect = minePhyQuantityTableMapper.deleteByID(id);
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
	public Boolean updatePhyQuantity(MinePhyQuantityTable mpqt) {
		int affect = minePhyQuantityTableMapper.updatePhyQuantity(mpqt);
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
	public Boolean insertPhyQuantity(WaterTypeandFeaturesTable water, MinePhyQuantityTable mpqt) {
		water = typeAndFeaturesService.existDataNoInser(water);
		if (water != null && water.getWaterTypeAndFeaturesID() > 0) {
			mpqt.setTypeAndFeaturesID(water.getWaterTypeAndFeaturesID());
			minePhyQuantityTableMapper.insertPhyQuantity(mpqt);
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 根据id查询实物量
	 */
	@Override
	public ShowMinePhyQuantity selectByID(int id) {
		return minePhyQuantityTableMapper.selectByID(id);

	}

}
