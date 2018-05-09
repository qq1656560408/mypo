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
@TableName("mine_value_table")
public class MineValueTable extends Model<MineValueTable> {

    private static final long serialVersionUID = 1L;

    /**
     * 矿产价值id
     */
	private Integer mineValueID;
    /**
     * 类别功能id
     */
	private Integer typeAndFeaturesID;
    /**
     * 总价值
     */
	private double amountOfValue;
    /**
     * 单位
     */
	private String unti;
    /**
     * 备注
     */
	private String remark;


	public Integer getMineValueID() {
		return mineValueID;
	}

	public void setMineValueID(Integer mineValueID) {
		this.mineValueID = mineValueID;
	}

	public Integer getTypeAndFeaturesID() {
		return typeAndFeaturesID;
	}

	public void setTypeAndFeaturesID(Integer typeAndFeaturesID) {
		this.typeAndFeaturesID = typeAndFeaturesID;
	}



	public double getAmountOfValue() {
		return amountOfValue;
	}

	public void setAmountOfValue(double amountOfValue) {
		this.amountOfValue = amountOfValue;
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
		return this.mineValueID;
	}

}
