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
@TableName("area_table")
public class AreaTable extends Model<AreaTable> {

    private static final long serialVersionUID = 1L;
	private Integer areaID;
	private String areaMC;


	public Integer getAreaID() {
		return areaID;
	}

	public void setAreaID(Integer areaID) {
		this.areaID = areaID;
	}

	public String getAreaMC() {
		return areaMC;
	}

	public void setAreaMC(String areaMC) {
		this.areaMC = areaMC;
	}

	@Override
	protected Serializable pkVal() {
		return this.areaID;
	}

}
