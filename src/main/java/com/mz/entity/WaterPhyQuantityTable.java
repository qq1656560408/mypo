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
@TableName("water_phy_quantity_table")
public class WaterPhyQuantityTable extends Model<WaterPhyQuantityTable> {

    private static final long serialVersionUID = 1L;

    /**
     * 水资源实物量id
     */
	private Integer waterPhyQuantityID;
    /**
     * 类别价值id
     */
	private Integer waterTypeAndFeaturesID;
    /**
     * 存量
     */
	private Double inventory;
    /**
     * 存量单位
     */
	private String inventoryUnit;
    /**
     * 备注
     */
	private String remark;


	public Integer getWaterPhyQuantityID() {
		return waterPhyQuantityID;
	}

	public void setWaterPhyQuantityID(Integer waterPhyQuantityID) {
		this.waterPhyQuantityID = waterPhyQuantityID;
	}

	public Integer getWaterTypeAndFeaturesID() {
		return waterTypeAndFeaturesID;
	}

	public void setWaterTypeAndFeaturesID(Integer waterTypeAndFeaturesID) {
		this.waterTypeAndFeaturesID = waterTypeAndFeaturesID;
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

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Override
	protected Serializable pkVal() {
		return this.waterPhyQuantityID;
	}

	@Override
	public String toString() {
		return "WaterPhyQuantityTable [waterPhyQuantityID=" + waterPhyQuantityID + ", waterTypeAndFeaturesID="
				+ waterTypeAndFeaturesID + ", inventory=" + inventory + ", inventoryUnit=" + inventoryUnit + ", remark="
				+ remark + "]";
	}

	
}
