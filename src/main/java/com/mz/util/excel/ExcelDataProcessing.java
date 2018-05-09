package com.mz.util.excel;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Workbook;

//接口
public interface ExcelDataProcessing {

	void handData(boolean end, Integer rowIndex,Workbook wookbook, Row row);
}
