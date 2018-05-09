package com.mz.service;

import com.mz.entity.MinePhyQuantityTable;
import com.mz.entity.WaterPhyQuantityTable;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.vo.ShowMinePhyQuantity;
import com.mz.vo.ShowPhyQuantity;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.baomidou.mybatisplus.service.IService;

/**
 * <p>
 * 服务类
 * </p>
 *
 * @author
 * @since 2018-04-19
 */
public interface IMinePhyQuantityTableService extends IService<MinePhyQuantityTable> {
	Object insertExcelImport(MultipartFile excelFile);

	List<ShowMinePhyQuantity> selectPhyQuantityLimit(int begin, int size);

	Boolean deleteByID(int id);

	Boolean insertPhyQuantity(WaterTypeandFeaturesTable water, MinePhyQuantityTable mpqt);

	ShowMinePhyQuantity selectByID(int id);

	Boolean updatePhyQuantity(MinePhyQuantityTable mpqt);
}
