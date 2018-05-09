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
@TableName("check_unit_table")
public class CheckUnitTable extends Model<CheckUnitTable> {

    private static final long serialVersionUID = 1L;

    /**
     * 考核单位ID
     */
	private Integer checkUnitID;
    /**
     * 考核单位名称
     */
	private String checkUnitMC;


	public Integer getCheckUnitID() {
		return checkUnitID;
	}

	public void setCheckUnitID(Integer checkUnitID) {
		this.checkUnitID = checkUnitID;
	}

	public String getCheckUnitMC() {
		return checkUnitMC;
	}

	public void setCheckUnitMC(String checkUnitMC) {
		this.checkUnitMC = checkUnitMC;
	}

	@Override
	protected Serializable pkVal() {
		return this.checkUnitID;
	}

}
