package com.mz.vo;

public class ShowWaterPrice {

	private int waterPriceID;
	private String yearMC, waterTypeMC, waterFeatures, areaMC, unit, remark;
	private double price, coefficient;
	
	
	public int getWaterPriceID() {
		return waterPriceID;
	}
	public void setWaterPriceID(int waterPriceID) {
		this.waterPriceID = waterPriceID;
	}
	public String getYearMC() {
		return yearMC;
	}
	public void setYearMC(String yearMC) {
		this.yearMC = yearMC;
	}
	public String getWaterTypeMC() {
		return waterTypeMC;
	}
	public void setWaterTypeMC(String waterTypeMC) {
		this.waterTypeMC = waterTypeMC;
	}
 
	public String getWaterFeatures() {
		return waterFeatures;
	}
	public void setWaterFeatures(String waterFeatures) {
		this.waterFeatures = waterFeatures;
	}
	public String getAreaMC() {
		return areaMC;
	}
	public void setAreaMC(String areaMC) {
		this.areaMC = areaMC;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public double getCoefficient() {
		return coefficient;
	}
	public void setCoefficient(double coefficient) {
		this.coefficient = coefficient;
	}
	@Override
	public String toString() {
		return "ShowWaterPrice [waterPriceID=" + waterPriceID + ", yearMC=" + yearMC + ", waterTypeMC=" + waterTypeMC
				+ ", waterFeatures=" + waterFeatures + ", areaMC=" + areaMC + ", unit=" + unit + ", remark=" + remark
				+ ", price=" + price + ", coefficient=" + coefficient + "]";
	}
	
	
}
