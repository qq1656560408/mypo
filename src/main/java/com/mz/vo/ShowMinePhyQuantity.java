package com.mz.vo;

public class ShowMinePhyQuantity {
	private String  yearMC, waterTypeMC ,waterFeatures, areaMC,  inventoryUnit, remark;
	private int mineID,typeAndFeaturesID;
	private double inventory;
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
	public String getInventoryUnit() {
		return inventoryUnit;
	}
	public void setInventoryUnit(String inventoryUnit) {
		this.inventoryUnit = inventoryUnit;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public int getMineID() {
		return mineID;
	}
	public void setMineID(int mineID) {
		this.mineID = mineID;
	}
	public int getTypeAndFeaturesID() {
		return typeAndFeaturesID;
	}
	public void setTypeAndFeaturesID(int typeAndFeaturesID) {
		this.typeAndFeaturesID = typeAndFeaturesID;
	}
	public double getInventory() {
		return inventory;
	}
	public void setInventory(double inventory) {
		this.inventory = inventory;
	}
	@Override
	public String toString() {
		return "ShowMinePhyQuantity [yearMC=" + yearMC + ", waterTypeMC=" + waterTypeMC + ", waterFeatures="
				+ waterFeatures + ", areaMC=" + areaMC + ", inventoryUnit=" + inventoryUnit + ", remark=" + remark
				+ ", mineID=" + mineID + ", typeAndFeaturesID=" + typeAndFeaturesID + ", inventory=" + inventory + "]";
	}
	
	
	
}
