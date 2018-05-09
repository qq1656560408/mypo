package com.mz.util.excel.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Workbook;
import com.mz.entity.ForestPhyQuantityTable;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.service.IWaterTypeandFeaturesTableService;
import com.mz.util.InitBaseData;
import com.mz.util.excel.BaseExcelDataProcessing;

public class ForestPhyQuantityExcel extends BaseExcelDataProcessing{

	InitBaseData initBaseData;
	IWaterTypeandFeaturesTableService typeAndFeaturesService;

	// 年
	Map<Object, Integer> year;
	// 区县
	Map<Object, Integer> area;

	// 类别
	Map<Object, Integer> waterTypeTables;

	List<ForestPhyQuantityTable> forestPhyQuantityTables = new ArrayList<>();
	
	
	
	public List<ForestPhyQuantityTable> getForestPhyQuantityTables() {
		return forestPhyQuantityTables;
	}

	public void setForestPhyQuantityTables(List<ForestPhyQuantityTable> forestPhyQuantityTables) {
		this.forestPhyQuantityTables = forestPhyQuantityTables;
	}

	public ForestPhyQuantityExcel(IWaterTypeandFeaturesTableService typeAndFeaturesService, InitBaseData initBaseData) {
		this.typeAndFeaturesService = typeAndFeaturesService;
		this.initBaseData = initBaseData;
		year = initBaseData.getValueKey("year");
		area = initBaseData.getValueKey("area");
		waterTypeTables = initBaseData.getValueKey("waterTypeTables");
	}

	public void setParam(int yearID, int typeID, String statisticalObject,String forestAge, String areaName, int cellStockIndex,Integer cellAcreageIndex, Workbook wookbook,
			Row row, String utilStr, String remarkStr) {
		// 设置功能价值表参数
		WaterTypeandFeaturesTable waterTypeandFeaturesTable = new WaterTypeandFeaturesTable();
		waterTypeandFeaturesTable.setYearID(yearID);
		waterTypeandFeaturesTable.setWaterTypeID(typeID);
		waterTypeandFeaturesTable.setWaterFeatures(statisticalObject);
		int areaID = area.get(areaName);
		waterTypeandFeaturesTable.setAreaID(areaID);
		waterTypeandFeaturesTable = typeAndFeaturesService.existDataNoInser(waterTypeandFeaturesTable);

		//储蓄量
		Cell cellStock = row.getCell(cellStockIndex);
		double valueStock = getDouble(wookbook, cellStock);
		
		//面积
		Cell cellAcreage = row.getCell(cellAcreageIndex);
		double valueAcreage = getDouble(wookbook, cellAcreage);


		ForestPhyQuantityTable forest = new ForestPhyQuantityTable();
		forest.setTypeAndFeaturesID(waterTypeandFeaturesTable.getWaterTypeAndFeaturesID());
		forest.setInventory(valueStock);
		forest.setAcreage(valueAcreage);
		forest.setForestAge(forestAge);
		forest.setInventoryUnit(utilStr);
		forest.setRemark(remarkStr);

		forestPhyQuantityTables.add(forest);
	}

	@Override
	public void handData(boolean end, Integer rowIndex, Workbook wookbook, Row row) {
		if (rowIndex == 0) {
			return;
		}

		// 年
		Cell c1 = row.getCell(1);
		int c1V = getInt(c1);
		int yearID = year.get(c1V);

		// 类别
		Cell c2 = row.getCell(2);
		String c2V = getString(c2);
		int typeID = waterTypeTables.get(c2V);

		// 统计对象
		Cell c3 = row.getCell(3);
		String statisticalObject = getString(c3);
		
		//林龄
		Cell c4=row.getCell(4);
		String forestAge=getString(c4);

		// 单位
		Cell util = row.getCell(23);
		String utilStr = getString(util);
		

		// 备注
		Cell remark = row.getCell(24);
		String remarkStr = getString(remark);
	

		setParam(yearID, typeID, statisticalObject,forestAge, "梅江区", 7,8, wookbook, row, utilStr, remarkStr);
		setParam(yearID, typeID, statisticalObject,forestAge, "兴宁市", 9,10, wookbook, row, utilStr, remarkStr);
		setParam(yearID, typeID, statisticalObject,forestAge, "梅县区", 11,12, wookbook, row, utilStr, remarkStr);
		setParam(yearID, typeID, statisticalObject,forestAge, "平远县", 13,14, wookbook, row, utilStr, remarkStr);
		setParam(yearID, typeID, statisticalObject,forestAge, "蕉岭县", 15,16, wookbook, row, utilStr, remarkStr);
		setParam(yearID, typeID, statisticalObject,forestAge, "大埔县", 17,18, wookbook, row, utilStr, remarkStr);
		setParam(yearID, typeID, statisticalObject,forestAge, "丰顺县", 19,20, wookbook, row, utilStr, remarkStr);
		setParam(yearID, typeID, statisticalObject,forestAge, "五华县", 21,22, wookbook, row, utilStr, remarkStr);
	}

}
