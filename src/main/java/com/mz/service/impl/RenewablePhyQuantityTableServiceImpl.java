package com.mz.service.impl;

import com.mz.entity.RenewablePhyQuantityTable;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.mapper.RenewablePhyQuantityTableMapper;
import com.mz.service.IProcessFileTableService;
import com.mz.service.IRenewablePhyQuantityTableService;
import com.mz.service.IWaterTypeandFeaturesTableService;
import com.mz.util.InitBaseData;
import com.mz.util.excel.Excel;
import com.mz.util.excel.impl.RenewablePhyQuantityExcel;
import com.mz.vo.ShowRenewablePhyQuantity;
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
public class RenewablePhyQuantityTableServiceImpl extends ServiceImpl<RenewablePhyQuantityTableMapper, RenewablePhyQuantityTable> implements IRenewablePhyQuantityTableService {
	@Autowired
	RenewablePhyQuantityTableMapper renewablePhyQuantityTableMapper;
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
			RenewablePhyQuantityExcel renewablePhyQuantityExcel = new RenewablePhyQuantityExcel(typeAndFeaturesService, initBaseData);
			Excel.daoru(fileName, excelFile.getInputStream(), renewablePhyQuantityExcel);
			List<RenewablePhyQuantityTable> list = renewablePhyQuantityExcel.getRenewablePhyQuantityTables();
			renewablePhyQuantityTableMapper.insertPhyQuantityExcel(list);
			
			
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
	public List<ShowRenewablePhyQuantity> selectPhyQuantityLimit(int begin, int size) {
		return renewablePhyQuantityTableMapper.selectPhyQuantityLimit(begin, size);
	}

	/**
	 * 删除实物量
	 */
	@Override
	public int deleteByID(int id) {
		return renewablePhyQuantityTableMapper.deleteByID(id);
	}

	/**
	 * 修改实物量
	 */
	@Override
	public int updatePhyQuantity(RenewablePhyQuantityTable renewable) {
		return renewablePhyQuantityTableMapper.updatePhyQuantity(renewable);
	}

	/**
	 * 新增实物量
	 */
	@Override
	public int insertPhyQuantity(WaterTypeandFeaturesTable water, RenewablePhyQuantityTable renewable) {
		water = typeAndFeaturesService.existDataNoInser(water);
		if (water != null && water.getWaterTypeAndFeaturesID() > 0) {
			renewable.setTypeAndFeaturesID(water.getWaterTypeAndFeaturesID());
			return renewablePhyQuantityTableMapper.insertPhyQuantity(renewable);
		} else {
			return 0;
		}
	}

	/**
	 * 根据id查询实物量
	 */
	@Override
	public ShowRenewablePhyQuantity selectByID(int id) {
		return renewablePhyQuantityTableMapper.selectByID(id);

	}
}
