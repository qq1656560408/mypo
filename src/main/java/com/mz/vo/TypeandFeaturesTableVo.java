package com.mz.vo;

import com.mz.entity.WaterTypeandFeaturesTable;

public class TypeandFeaturesTableVo extends WaterTypeandFeaturesTable{
	
	/**
	 * 序列化
	 */
	private static final long serialVersionUID = 1L;
	
	private String areaMC;
	private double waterValue;
	private double landValue;
	private double forestValue;
	private double mineValue;
	private double renewableValue;
	private double atmosphereValue;
	
	public String getAreaMC() {
		return areaMC;
	}
	public void setAreaMC(String areaMC) {
		this.areaMC = areaMC;
	}
	public double getWaterValue() {
		return waterValue;
	}
	public void setWaterValue(double waterValue) {
		this.waterValue = waterValue;
	}
	public double getLandValue() {
		return landValue;
	}
	public void setLandValue(double landValue) {
		this.landValue = landValue;
	}
	public double getForestValue() {
		return forestValue;
	}
	public void setForestValue(double forestValue) {
		this.forestValue = forestValue;
	}
	public double getMineValue() {
		return mineValue;
	}
	public void setMineValue(double mineValue) {
		this.mineValue = mineValue;
	}
	public double getRenewableValue() {
		return renewableValue;
	}
	public void setRenewableValue(double renewableValue) {
		this.renewableValue = renewableValue;
	}
	public double getAtmosphereValue() {
		return atmosphereValue;
	}
	public void setAtmosphereValue(double atmosphereValue) {
		this.atmosphereValue = atmosphereValue;
	}
	
	public TypeandFeaturesTableVo(){
		super();
	}
	
	public TypeandFeaturesTableVo(String areaMC, double waterValue, double landValue, double forestValue, double mineValue, double renewableValue, double atmosphereValue) {
		super();
		this.areaMC = areaMC;
		this.waterValue = waterValue;
		this.landValue = landValue;
		this.forestValue = forestValue;
		this.mineValue = mineValue;
		this.renewableValue = renewableValue;
		this.atmosphereValue = atmosphereValue;
	}
	
}
