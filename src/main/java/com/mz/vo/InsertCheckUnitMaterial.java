package com.mz.vo;

import java.util.List;

public class InsertCheckUnitMaterial {
	public String projectMC;
	public String checkDemand;
	public List<String> list;
	public List<String> list_original;
	public InsertCheckUnitMaterial(String projectMC,String checkDemand,List<String> list,List<String> list_original) {
		this.projectMC=projectMC;
		this.checkDemand=checkDemand;
		this.list=list;
		this.list_original=list_original;
	}
}
