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
@TableName("atmosphere_phy_quantity_table")
public class AtmospherePhyQuantityTable extends Model<AtmospherePhyQuantityTable> {

    private static final long serialVersionUID = 1L;

    /**
     * 大气实物量id
     */
	private Integer atmosphereID;
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


	public Integer getAtmosphereID() {
		return atmosphereID;
	}

	public void setAtmosphereID(Integer atmosphereID) {
		this.atmosphereID = atmosphereID;
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
		return this.atmosphereID;
	}

}
