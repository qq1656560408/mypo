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
@TableName("land_price_table")
public class LandPriceTable extends Model<LandPriceTable> {

    private static final long serialVersionUID = 1L;

    /**
     * 土地价格ID
     */
	private Integer landPriceID;
    /**
     * 类型价值ID
     */
	private Integer typeAndFeaturesID;
    /**
     * 价格
     */
	private Double price;
    /**
     * 系数
     */
	private Double coefficient;
    /**
     * 单位
     */
	private String unit;
    /**
     * 备注
     */
	private String remark;


	public Integer getLandPriceID() {
		return landPriceID;
	}

	public void setLandPriceID(Integer landPriceID) {
		this.landPriceID = landPriceID;
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
		return this.landPriceID;
	}

}
