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
 * @since 2018-05-09
 */
@TableName("forest_phy_quantity_table")
public class ForestPhyQuantityTable extends Model<ForestPhyQuantityTable> {

    private static final long serialVersionUID = 1L;

    /**
     * 林木实物量id
     */
	private Integer forestID;
    /**
     * 类型价值id
     */
	private Integer typeAndFeaturesID;
    /**
     * 实物量
     */
	private Double inventory;
    /**
     * 单位
     */
	private String inventoryUnit;
	private String forestAge;
    /**
     * 面积
     */
	private Double acreage;
    /**
     * 备注
     */
	private String remark;


	public Integer getForestID() {
		return forestID;
	}

	public void setForestID(Integer forestID) {
		this.forestID = forestID;
	}

	public Integer getTypeAndFeaturesID() {
		return typeAndFeaturesID;
	}

	public void setTypeAndFeaturesID(Integer typeAndFeaturesID) {
		this.typeAndFeaturesID = typeAndFeaturesID;
	}

	public Double getInventory() {
		return inventory;
	}

	public void setInventory(Double inventory) {
		this.inventory = inventory;
	}

	public String getInventoryUnit() {
		return inventoryUnit;
	}

	public void setInventoryUnit(String inventoryUnit) {
		this.inventoryUnit = inventoryUnit;
	}

	public String getForestAge() {
		return forestAge;
	}

	public void setForestAge(String forestAge) {
		this.forestAge = forestAge;
	}

	public Double getAcreage() {
		return acreage;
	}

	public void setAcreage(Double acreage) {
		this.acreage = acreage;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Override
	protected Serializable pkVal() {
		return this.forestID;
	}

}
