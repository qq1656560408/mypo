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
 * @since 2018-04-19
 */
@TableName("mine_phy_quantity_table")
public class MinePhyQuantityTable extends Model<MinePhyQuantityTable> {

    private static final long serialVersionUID = 1L;

    /**
     * 矿id
     */
	private Integer mineID;
	private Integer typeAndFeaturesID;
	private Double inventory;
	private String inventoryUnit;
	private String remark;


	public Integer getMineID() {
		return mineID;
	}

	public void setMineID(Integer mineID) {
		this.mineID = mineID;
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
		return this.mineID;
	}

}
