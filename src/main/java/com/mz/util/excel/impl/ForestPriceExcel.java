package com.mz.util.excel.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Workbook;
import com.mz.entity.ForestPriceTable;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.service.IWaterTypeandFeaturesTableService;
import com.mz.util.InitBaseData;
import com.mz.util.excel.BaseExcelDataProcessing;

public class ForestPriceExcel extends BaseExcelDataProcessing {

	InitBaseData initBaseData;
	IWaterTypeandFeaturesTableService typeAndFeaturesService;

	// 年
	Map<Object, Integer> year;
	// 区县
	Map<Object, Integer> area;

	// 类别
	Map<Object, Integer> waterTypeTables;


	public ForestPriceExcel(IWaterTypeandFeaturesTableService typeAndFeaturesService, InitBaseData initBaseData) {
		this.typeAndFeaturesService = typeAndFeaturesService;
		this.initBaseData = initBaseData;
		year = initBaseData.getValueKey("year");
		area = initBaseData.getValueKey("area");
		waterTypeTables = initBaseData.getValueKey("waterTypeTables");
	}

	List<ForestPriceTable> forestPriceTables = new ArrayList<>();

	public List<ForestPriceTable> getForestPriceTables() {
		return forestPriceTables;
	}

	public void setForestPriceTables(List<ForestPriceTable> forestPriceTables) {
		this.forestPriceTables = forestPriceTables;
	}

	/**
	 * 设置价格表参数
	 * 
	 * @param waterTypeandFeaturesTable
	 * @param areaName
	 * @param cellIndex
	 * @param wookbook
	 * @param row
	 * @param utilStr
	 * @param remarkStr
	 * @param coefficientDou
	 */
	public void setParam(int yearID, int typeID, String features,String forestAge, String areaName, int cellIndex, Workbook wookbook,
			Row row, String utilStr, String remarkStr, double coefficientDou) {
		// 设置功能价值表参数
		WaterTypeandFeaturesTable waterTypeandFeaturesTable = new WaterTypeandFeaturesTable();
		waterTypeandFeaturesTable.setYearID(yearID);
		waterTypeandFeaturesTable.setWaterTypeID(typeID);
		waterTypeandFeaturesTable.setWaterFeatures(features);
		int areaID = area.get(areaName);
		waterTypeandFeaturesTable.setAreaID(areaID);
		waterTypeandFeaturesTable = typeAndFeaturesService.existDataNoInser(waterTypeandFeaturesTable);

		// 获取excel单元格
		Cell cell = row.getCell(cellIndex);
		double value = getDouble(wookbook, cell);


		// 价格表参数
		ForestPriceTable forest = new ForestPriceTable();
		forest.setTypeAndFeaturesID(waterTypeandFeaturesTable.getWaterTypeAndFeaturesID());
		forest.setForestAge(forestAge);
		forest.setPrice(value);
		forest.setUnit(utilStr);
		forest.setRemark(remarkStr);
		forest.setCoefficient(coefficientDou);
		forestPriceTables.add(forest);

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
		String features = getString(c3);
		
		//林龄
		Cell c4 = row.getCell(3);
		String forestAge = getString(c3);

		// 单位
		Cell util = row.getCell(14);
		String utilStr = getString(util);
		

		// 系数
	/*	Cell coefficient = row.getCell(14);
		Double coefficientDou = getDouble(wookbook, coefficient);*/
		Double coefficientDou =1.0;

		// 备注
		Cell remark = row.getCell(15);
		String remarkStr = getString(remark);
	
		setParam(yearID, typeID, features,forestAge, "梅江区", 5, wookbook, row, utilStr, remarkStr, coefficientDou);
		setParam(yearID, typeID, features,forestAge, "兴宁市", 6, wookbook, row, utilStr, remarkStr, coefficientDou);
		setParam(yearID, typeID, features,forestAge, "梅县区", 7, wookbook, row, utilStr, remarkStr, coefficientDou);
		setParam(yearID, typeID, features,forestAge, "平远县", 8, wookbook, row, utilStr, remarkStr, coefficientDou);
		setParam(yearID, typeID, features,forestAge, "蕉岭县", 9, wookbook, row, utilStr, remarkStr, coefficientDou);
		setParam(yearID, typeID, features,forestAge, "大埔县", 10, wookbook, row, utilStr, remarkStr, coefficientDou);
		setParam(yearID, typeID, features,forestAge, "丰顺县", 11, wookbook, row, utilStr, remarkStr, coefficientDou);
		setParam(yearID, typeID, features,forestAge, "五华县", 12, wookbook, row, utilStr, remarkStr, coefficientDou);
	}

}
