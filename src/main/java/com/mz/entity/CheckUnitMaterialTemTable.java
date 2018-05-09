package com.mz.entity;

import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableName;
import java.io.Serializable;

/**
 * <p>
 * 
 * </p>
 *
 * @author 
 * @since 2018-04-16
 */
@TableName("check_unit_material_tem_table")
public class CheckUnitMaterialTemTable extends Model<CheckUnitMaterialTemTable> {

    private static final long serialVersionUID = 1L;

    /**
     * 模板id
     */
	private Integer checkUnitMaterialTemID;
    /**
     * 考核单位ID
     */
	private Integer checkUnitID;
    /**
     * 项目名称
     */
	private String projectMC;
    /**
     * 考核要求
     */
	private String checkDemand;


	public Integer getCheckUnitMaterialTemID() {
		return checkUnitMaterialTemID;
	}

	public void setCheckUnitMaterialTemID(Integer checkUnitMaterialTemID) {
		this.checkUnitMaterialTemID = checkUnitMaterialTemID;
	}

	public Integer getCheckUnitID() {
		return checkUnitID;
	}

	public void setCheckUnitID(Integer checkUnitID) {
		this.checkUnitID = checkUnitID;
	}

	public String getProjectMC() {
		return projectMC;
	}

	public void setProjectMC(String projectMC) {
		this.projectMC = projectMC;
	}

	public String getCheckDemand() {
		return checkDemand;
	}

	public void setCheckDemand(String checkDemand) {
		this.checkDemand = checkDemand;
	}

	@Override
	protected Serializable pkVal() {
		return this.checkUnitMaterialTemID;
	}

}
