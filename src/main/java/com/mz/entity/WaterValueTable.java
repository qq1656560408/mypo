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
@TableName("water_value_table")
public class WaterValueTable extends Model<WaterValueTable> {

    private static final long serialVersionUID = 1L;

    /**
     * 水资源价值量id
     */
	private Integer waterValueID;
    /**
     * 类别价值id
     */
	private Integer waterTypeAndFeaturesID;
    /**
     * 价值量
     */
	private Double AmountOfValue;
    /**
     * 单位
     */
	private String unti;
    /**
     * 备注
     */
	private String remark;


	public Integer getWaterValueID() {
		return waterValueID;
	}

	public void setWaterValueID(Integer waterValueID) {
		this.waterValueID = waterValueID;
	}

	public Integer getWaterTypeAndFeaturesID() {
		return waterTypeAndFeaturesID;
	}

	public void setWaterTypeAndFeaturesID(Integer waterTypeAndFeaturesID) {
		this.waterTypeAndFeaturesID = waterTypeAndFeaturesID;
	}

	public Double getAmountOfValue() {
		return AmountOfValue;
	}

	public void setAmountOfValue(Double AmountOfValue) {
		this.AmountOfValue = AmountOfValue;
	}

	public String getUnti() {
		return unti;
	}

	public void setUnti(String unti) {
		this.unti = unti;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Override
	protected Serializable pkVal() {
		return this.waterValueID;
	}

}
