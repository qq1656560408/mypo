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
@TableName("mine_price_table")
public class MinePriceTable extends Model<MinePriceTable> {

    private static final long serialVersionUID = 1L;

	private Integer minePriceID;
	private Integer typeAndFeaturesID;
	private Double price;
	private Double coefficient;
	private String unit;
	private String remark;


	public Integer getMinePriceID() {
		return minePriceID;
	}

	public void setMinePriceID(Integer minePriceID) {
		this.minePriceID = minePriceID;
	}

	public Integer getTypeAndFeaturesID() {
		return typeAndFeaturesID;
	}

	public void setTypeAndFeaturesID(Integer typeAndFeaturesID) {
		this.typeAndFeaturesID = typeAndFeaturesID;
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

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Override
	protected Serializable pkVal() {
		return this.minePriceID;
	}

}
