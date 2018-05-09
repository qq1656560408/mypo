package com.mz.vo;

import com.mz.entity.WaterTypeandFeaturesTable;

/**
* @ClassName: WaterTypeandFeaturesTableVo 
* @Description: 核算查询数据实体类
* @author zhoujie 
* @date 2018年4月19日 上午11:36:31 
* @version V1.0
 */
public class WaterTypeandFeaturesTableVo extends WaterTypeandFeaturesTable{
	
	/**
	 * 序列化
	 */
	private static final long serialVersionUID = 1L;
	
	private String yearMC; //年份
	private String inventoryUnit; //单位
	private double inventory1; //梅江区
	private double inventory2; //梅县区
	private double inventory3; //兴宁市
	private double inventory4; //平远县
	private double inventory5; //蕉岭县
	private double inventory6; //大埔县
	private double inventory7; //丰顺县
	private double inventory8; //五华县
	
	public String getYearMC() {
		return yearMC;
	}
	public void setYearMC(String yearMC) {
		this.yearMC = yearMC;
	}
	public String getInventoryUnit() {
		return inventoryUnit;
	}
	public void setInventoryUnit(String inventoryUnit) {
		this.inventoryUnit = inventoryUnit;
	}
	public double getInventory1() {
		return inventory1;
	}
	public void setInventory1(double inventory1) {
		this.inventory1 = inventory1;
	}
	public double getInventory2() {
		return inventory2;
	}
	public void setInventory2(double inventory2) {
		this.inventory2 = inventory2;
	}
	public double getInventory3() {
		return inventory3;
	}
	public void setInventory3(double inventory3) {
		this.inventory3 = inventory3;
	}
	public double getInventory4() {
		return inventory4;
	}
	public void setInventory4(double inventory4) {
		this.inventory4 = inventory4;
	}
	public double getInventory5() {
		return inventory5;
	}
	public void setInventory5(double inventory5) {
		this.inventory5 = inventory5;
	}
	public double getInventory6() {
		return inventory6;
	}
	public void setInventory6(double inventory6) {
		this.inventory6 = inventory6;
	}
	public double getInventory7() {
		return inventory7;
	}
	public void setInventory7(double inventory7) {
		this.inventory7 = inventory7;
	}
	public double getInventory8() {
		return inventory8;
	}
	public void setInventory8(double inventory8) {
		this.inventory8 = inventory8;
	}
	
	public WaterTypeandFeaturesTableVo(){
		super();
	}
	public WaterTypeandFeaturesTableVo(String yearMC, String inventoryUnit, double inventory1, double inventory2, double inventory3, double inventory4, double inventory5, double inventory6,
			double inventory7, double inventory8) {
		super();
		this.yearMC = yearMC;
		this.inventoryUnit = inventoryUnit;
		this.inventory1 = inventory1;
		this.inventory2 = inventory2;
		this.inventory3 = inventory3;
		this.inventory4 = inventory4;
		this.inventory5 = inventory5;
		this.inventory6 = inventory6;
		this.inventory7 = inventory7;
		this.inventory8 = inventory8;
	}
	
}
