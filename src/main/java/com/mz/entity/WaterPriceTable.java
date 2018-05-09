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
@TableName("water_price_table")
public class WaterPriceTable extends Model<WaterPriceTable> {

	private static final long serialVersionUID = 1L;

	/**
	 * 水资源价格id
	 */
	private Integer waterPriceID;
	/**
	 * 类别价值id
	 */
	private Integer waterTypeAndFeaturesID;
	/**
	 * 价格
	 */
	private Double price;
	/**
	 * 系数
	 */
	private Double coefficient;
	/**
	 * 备注
	 */
	private String remark;

	private String unit;

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public Integer getWaterPriceID() {
		return waterPriceID;
	}

	public void setWaterPriceID(Integer waterPriceID) {
		this.waterPriceID = waterPriceID;
	}

	public Integer getWaterTypeAndFeaturesID() {
		return waterTypeAndFeaturesID;
	}

	public void setWaterTypeAndFeaturesID(Integer waterTypeAndFeaturesID) {
		this.waterTypeAndFeaturesID = waterTypeAndFeaturesID;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Double getCoefficient() {
		return coefficient;
	}

	public void setCoefficient(Double coefficient) {
		this.coefficient = coefficient;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Override
	protected Serializable pkVal() {
		return this.waterPriceID;
	}

}
