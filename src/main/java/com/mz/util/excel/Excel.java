package com.mz.util.excel;

import java.io.IOException;
import java.io.InputStream;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;


public class Excel {

	/**
	 * 对excel 2003处理
	 */
	private static Workbook xls(InputStream is) {
		try {
			// 得到工作簿
			return new HSSFWorkbook(is);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 对excel 2007处理
	 */
	private static Workbook xlsx(InputStream is) {
		try {
			// 得到工作簿
			return new XSSFWorkbook(is);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 导入处理
	 * 
	 * @param sheetIndex
	 *            工作簿索引
	 * @param filename
	 *            文件名，带后缀
	 * @param is
	 *            excel文件输入流
	 * @param excelDataProcessing
	 *            接口，根据数据库需求，写入对应的
	 */
	public static void daoru(int sheetIndex, String filename, InputStream is, ExcelDataProcessing excelDataProcessing) {

		Workbook wookbook = null;

		if (filename.endsWith(".xls")) {
			wookbook = xls(is);
		} else if (filename.endsWith(".xlsx")) {
			wookbook = xlsx(is);
		} else {
			throw new RuntimeException("文件出错，非excel文件");
		}

		// 得到一个工作表
		Sheet sheet = wookbook.getSheetAt(sheetIndex);

		int rows = sheet.getLastRowNum() + 1;

		Row row;
		boolean end=false;
		for (int i = 0; i < rows; i++) {
			if(i==rows-1){
				end=true;
			}
			row = sheet.getRow(i);
			excelDataProcessing.handData(end,i,wookbook, row);
		}

		try {
			wookbook.close();
			is.close();
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	/**
	 * 导入处理 默认工作簿索引0
	 * 
	 * @param filename
	 *            文件名，带后缀
	 * @param is
	 *            excel文件输入流
	 * @param excelDataProcessing
	 *            接口，根据数据库需求，写入对应的
	 */
	public static void daoru(String filename, InputStream is, ExcelDataProcessing excelDataProcessing) {
		daoru(0, filename, is, excelDataProcessing);
	}
}
