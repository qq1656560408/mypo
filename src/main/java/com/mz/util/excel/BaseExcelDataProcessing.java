package com.mz.util.excel;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.FormulaEvaluator;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.NumberToTextConverter;


/**
 * 
 * @author admin
 *
 * @param <T> 
 */
public abstract class BaseExcelDataProcessing implements ExcelDataProcessing {


	/**
	 * 获取正数
	 * @param cell
	 * @return
	 */
	protected static int getInt(Cell cell) {
		
		if(cell.getCellType()==Cell.CELL_TYPE_BLANK){
			return 0;
		}
		return Integer.parseInt(NumberToTextConverter.toText(cell.getNumericCellValue()));
	}

	
	/**
	 * 获取double
	 * @param cell
	 * @return
	 */
	protected static double getDouble(Workbook wookbook,Cell cell) {
		double d = 0;
		switch (cell.getCellType()) {
		case Cell.CELL_TYPE_BLANK:
			//空白字符 返回0
			d = 0;
			break;
		case Cell.CELL_TYPE_FORMULA:
			//公式
			FormulaEvaluator formulaEval = wookbook.getCreationHelper().createFormulaEvaluator();
			d= formulaEval.evaluate(cell).getNumberValue();
			break;
		case Cell.CELL_TYPE_NUMERIC:
			//数字格式
			d= Double.parseDouble(NumberToTextConverter.toText(cell.getNumericCellValue()));
			break;
		default:
			d = 0;
			break;
		}
		return d;
		
	}

	

	/**
	 * 获取字符串
	 * @param cell
	 * @return
	 */
	protected static String getString(Cell cell) {
		if(cell.getCellType()==Cell.CELL_TYPE_BLANK){
			return "";
		}
		cell.setCellType(Cell.CELL_TYPE_STRING);
		return cell.getStringCellValue().toString();
	}



}
