package com.mz.vo;

public class SelectAreaMessage {
         private int areaID;
         private String res;
         private double amountValue;
         private String yearMC;
		public int getAreaID() {
			return areaID;
		}
		public void setAreaID(int areaID) {
			this.areaID = areaID;
		}
		public String getRes() {
			return res;
		}
		public void setRes(String res) {
			this.res = res;
		}
		public double getAmountValue() {
			return amountValue;
		}
		public void setAmountValue(double amountValue) {
			this.amountValue = amountValue;
		}
		public String getYearMC() {
			return yearMC;
		}
		public void setYearMC(String yearMC) {
			this.yearMC = yearMC;
		}
		@Override
		public String toString() {
			return "SelectAreaMessage [areaID=" + areaID + ", res=" + res + ", amountValue=" + amountValue + ", yearMC="
					+ yearMC + ", getAreaID()=" + getAreaID() + ", getRes()=" + getRes() + ", getAmountValue()="
					+ getAmountValue() + ", getYearMC()=" + getYearMC() + ", getClass()=" + getClass() + ", hashCode()="
					+ hashCode() + ", toString()=" + super.toString() + "]";
		}
}
