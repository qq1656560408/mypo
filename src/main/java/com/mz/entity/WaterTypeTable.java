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
@TableName("water_type_table")
public class WaterTypeTable extends Model<WaterTypeTable> {

    private static final long serialVersionUID = 1L;

    /**
     * 水资源类别id
     */
	private Integer waterTypeID;
    /**
     * 水资源类别MC(经济价值、生态价值)
     */
	private String waterTypeMC;


	public Integer getWaterTypeID() {
		return waterTypeID;
	}

	public void setWaterTypeID(Integer waterTypeID) {
		this.waterTypeID = waterTypeID;
	}

	public String getWaterTypeMC() {
		return waterTypeMC;
	}

	public void setWaterTypeMC(String waterTypeMC) {
		this.waterTypeMC = waterTypeMC;
	}

	@Override
	protected Serializable pkVal() {
		return this.waterTypeID;
	}

}
