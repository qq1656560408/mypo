package com.mz.util.excel.impl;

import java.io.ByteArrayInputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Workbook;

import com.itextpdf.text.Font;
import com.itextpdf.text.pdf.PdfPTable;
import com.mz.entity.AtmospherePhyQuantityTable;
import com.mz.entity.WaterTypeandFeaturesTable;
import com.mz.service.IWaterTypeandFeaturesTableService;
import com.mz.util.InitBaseData;
import com.mz.util.excel.BaseExcelDataProcessing;
import com.mz.util.excel.ExcelToPdf;

public class AtmospherePhyQuantityExcel extends BaseExcelDataProcessing {

	InitBaseData initBaseData;
	IWaterTypeandFeaturesTableService typeAndFeaturesService;

	// 年
	Map<Object, Integer> year;
	// 区县
	Map<Object, Integer> area;

	// 类别
	Map<Object, Integer> waterTypeTables;

	List<AtmospherePhyQuantityTable> atmospherePhyQuantityTables = new ArrayList<>();
	
	ByteArrayInputStream bais;
	public ByteArrayInputStream getBais() {
		return bais;
	}

	public void setBais(ByteArrayInputStream bais) {
		this.bais = bais;
	}

	public List<AtmospherePhyQuantityTable> getAtmospherePhyQuantityTables() {
		return atmospherePhyQuantityTables;
	}

	public void setAtmospherePhyQuantityTables(List<AtmospherePhyQuantityTable> atmospherePhyQuantityTables) {
		this.atmospherePhyQuantityTables = atmospherePhyQuantityTables;
	}

	
	
	
	

	public AtmospherePhyQuantityExcel(IWaterTypeandFeaturesTableService typeAndFeaturesService,
			InitBaseData initBaseData) {
		this.typeAndFeaturesService = typeAndFeaturesService;
		this.initBaseData = initBaseData;
		year = initBaseData.getValueKey("year");
		area = initBaseData.getValueKey("area");
		waterTypeTables = initBaseData.getValueKey("waterTypeTables");
	}

	public void setParam(int yearID, int typeID, String features, String areaName, int cellIndex, Workbook wookbook,
			Row row, String utilStr, String remarkStr) {
		// 设置功能价值表参数
		WaterTypeandFeaturesTable waterTypeandFeaturesTable = new WaterTypeandFeaturesTable();
		waterTypeandFeaturesTable.setYearID(yearID);
		waterTypeandFeaturesTable.setWaterTypeID(typeID);
		waterTypeandFeaturesTable.setWaterFeatures(features);
		int areaID = area.get(areaName);
		waterTypeandFeaturesTable.setAreaID(areaID);
		waterTypeandFeaturesTable = typeAndFeaturesService.existDataNoInser(waterTypeandFeaturesTable);

		Cell cell = row.getCell(cellIndex);
		double value = getDouble(wookbook, cell);


		AtmospherePhyQuantityTable atmospherePhyQuantityTable = new AtmospherePhyQuantityTable();
		atmospherePhyQuantityTable.setTypeAndFeaturesID(waterTypeandFeaturesTable.getWaterTypeAndFeaturesID());
		atmospherePhyQuantityTable.setInventory(value);
		atmospherePhyQuantityTable.setInventoryUnit(utilStr);
		atmospherePhyQuantityTable.setRemark(remarkStr);

		atmospherePhyQuantityTables.add(atmospherePhyQuantityTable);
	}

	@Override
	public void handData(boolean end, Integer rowIndex, Workbook wookbook, Row row) {
		if (rowIndex == 0) {
			return;
		}

		Cell c0 = row.getCell(0);
		String c0v = getString(c0);

		// 年
		Cell c1 = row.getCell(1);
		int c1V = getInt(c1);
		int yearID = year.get(c1V);

		// 类别
		Cell c2 = row.getCell(2);
		String c2V = getString(c2);
		int typeID = waterTypeTables.get(c2V);

		// 功能价值
		Cell c3 = row.getCell(3);
		String features = getString(c3);
		
		//梅州市
		Cell c4 = row.getCell(4);
		String meizhoushi = getString(c4);

		// 单位
		Cell util = row.getCell(13);
		String utilStr = getString(util);
		

		// 备注
		Cell remark = row.getCell(14);
		String remarkStr = getString(remark);
	

		setParam(yearID, typeID, features, "梅江区", 5, wookbook, row, utilStr, remarkStr);
		setParam(yearID, typeID, features, "兴宁市", 6, wookbook, row, utilStr, remarkStr);
		setParam(yearID, typeID, features, "梅县区", 7, wookbook, row, utilStr, remarkStr);
		setParam(yearID, typeID, features, "平远县", 8, wookbook, row, utilStr, remarkStr);
		setParam(yearID, typeID, features, "蕉岭县", 9, wookbook, row, utilStr, remarkStr);
		setParam(yearID, typeID, features, "大埔县", 10, wookbook, row, utilStr, remarkStr);
		setParam(yearID, typeID, features, "丰顺县", 11, wookbook, row, utilStr, remarkStr);
		setParam(yearID, typeID, features, "五华县", 12, wookbook, row, utilStr, remarkStr);

	}



}
