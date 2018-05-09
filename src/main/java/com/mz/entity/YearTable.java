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
@TableName("year_table")
public class YearTable extends Model<YearTable> {

    private static final long serialVersionUID = 1L;

	private Integer yearID;
	private Integer yearMC;


	public Integer getYearID() {
		return yearID;
	}

	public void setYearID(Integer yearID) {
		this.yearID = yearID;
	}

	public Integer getYearMC() {
		return yearMC;
	}

	public void setYearMC(Integer yearMC) {
		this.yearMC = yearMC;
	}

	@Override
	protected Serializable pkVal() {
		return this.yearID;
	}

}
