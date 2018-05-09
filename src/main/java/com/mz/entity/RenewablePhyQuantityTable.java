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
 * @since 2018-04-21
 */
@TableName("renewable_phy_quantity_table")
public class RenewablePhyQuantityTable extends Model<RenewablePhyQuantityTable> {

    private static final long serialVersionUID = 1L;

    /**
     * 可再生能源实物量id
     */
	private Integer renewableID;
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
    /**
     * 备注
     */
	private String remark;


	public Integer getRenewableID() {
		return renewableID;
	}

	public void setRenewableID(Integer renewableID) {
		this.renewableID = renewableID;
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

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Override
	protected Serializable pkVal() {
		return this.renewableID;
	}

}
