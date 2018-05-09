package com.mz.util.excel;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.URL;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

public class ExcelToPdf {

	public PdfPTable getPdfTable(int column) {
		// 创建pdf表格
		PdfPTable table = new PdfPTable(column);
		return table;
	}

	public Font getFont() {
		Font font = null;
		try {
			// 字体设置
			/*
			 * 由于itext不支持中文，所以需要进行字体的设置，我这里让itext调用windows系统的中文字体，
			 * 找到文件后，打开属性，将文件名及所在路径作为字体名即可。
			 */
			// 创建BaseFont对象，指明字体，编码方式,是否嵌入

			URL url = this.getClass().getClassLoader().getResource("simkai.ttf");
			BaseFont bf = BaseFont.createFont(url.toString(), BaseFont.IDENTITY_H, false);

			// 创建Font对象，将基础字体对象，字体大小，字体风格
			font = new Font(bf, 13, Font.NORMAL);
		} catch (DocumentException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return font;
	}

	public ByteArrayInputStream toPdf(PdfPTable table) {
		Document document = new Document(PageSize.A2, 0, 0, 50, 0);
		ByteArrayOutputStream outputStream=new ByteArrayOutputStream();
		PdfWriter writer=null;
		try {
			writer=PdfWriter.getInstance(document, outputStream);
			document.open();
			document.add(table);
		} catch (DocumentException e) {
			e.printStackTrace();
		}  finally {
			if (document != null) {
				document.close();
			}
			if(writer!=null){
				writer.close();
			}
		}
		byte[] b=outputStream.toByteArray();
		ByteArrayInputStream bais =new ByteArrayInputStream(b);
		return bais;

	}

	/**
	 * 合并行
	 * 
	 * @param str
	 *            内容
	 * @param font
	 *            字体
	 * @param i
	 *            合并单元格数
	 * @return
	 */
	public PdfPCell mergeRow(String str, Font font, int i) {

		// 创建单元格对象，将内容及字体传入
		PdfPCell cell = new PdfPCell(new Paragraph(str, font));
		// 设置单元格内容居中
		cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
		// 将该单元格所在列包括该单元格在内的i行单元格合并为一个单元格
		cell.setRowspan(i);

		return cell;
	}

	/**
	 * 合并列
	 * 
	 * @param str
	 *            内容
	 * @param font
	 *            字体
	 * @param i
	 *            合并单元格数
	 * @return
	 */
	public PdfPCell mergeCol(String str, Font font, int i) {
		PdfPCell cell = new PdfPCell(new Paragraph(str, font));
		cell.setMinimumHeight(25);
		cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
		// 合并单元格数
		cell.setColspan(i);
		return cell;
	}

	/**
	 * 创建单元格并设置单元格内容和字体
	 * 
	 * @param string
	 * @param font
	 * @return
	 */
	public PdfPCell getPDFCell(String string, Font font) {
		// 创建单元格对象，将内容与字体放入段落中作为单元格内容
		PdfPCell cell = new PdfPCell(new Paragraph(string, font));

		cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		cell.setVerticalAlignment(Element.ALIGN_MIDDLE);

		// 设置最小单元格高度
		cell.setMinimumHeight(25);
		return cell;
	}
	
	public void test(){
		URL url=getClass().getClassLoader().getResource("");
		String path=url.toString();
		path=path.substring(6,path.length());
		System.out.println(path);
	}
	
	public static void main(String[] args) {
		ExcelToPdf excelToPdf=new ExcelToPdf();
		excelToPdf.test();
		
	}
}
