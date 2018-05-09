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
@TableName("water_typeand_features_table")
public class WaterTypeandFeaturesTable extends Model<WaterTypeandFeaturesTable> {

    private static final long serialVersionUID = 1L;

    /**
     * 类别价值id
     */
	private Integer waterTypeAndFeaturesID;
    /**
     * 区县id
     */
	private Integer areaID;
    /**
     * 年份ID
     */
	private Integer yearID;
    /**
     * 水资源类别ID
     */
	private Integer waterTypeID;
    /**
     * 功能价值
     */
	private String waterFeatures;


	public Integer getWaterTypeAndFeaturesID() {
		return waterTypeAndFeaturesID;
	}

	public void setWaterTypeAndFeaturesID(Integer waterTypeAndFeaturesID) {
		this.waterTypeAndFeaturesID = waterTypeAndFeaturesID;
	}

	public Integer getAreaID() {
		return areaID;
	}

	public void setAreaID(Integer areaID) {
		this.areaID = areaID;
	}

	public Integer getYearID() {
		return yearID;
	}

	public void setYearID(Integer yearID) {
		this.yearID = yearID;
	}

	public Integer getWaterTypeID() {
		return waterTypeID;
	}

	public void setWaterTypeID(Integer waterTypeID) {
		this.waterTypeID = waterTypeID;
	}



	public String getWaterFeatures() {
		return waterFeatures;
	}

	public void setWaterFeatures(String waterFeatures) {
		this.waterFeatures = waterFeatures;
	}

	@Override
	protected Serializable pkVal() {
		return this.waterTypeAndFeaturesID;
	}

}
