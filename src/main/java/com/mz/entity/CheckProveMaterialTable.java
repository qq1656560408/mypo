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
@TableName("check_prove_material_table")
public class CheckProveMaterialTable extends Model<CheckProveMaterialTable> {

    private static final long serialVersionUID = 1L;

    /**
     * 考核证明材料ID
     */
	private Integer checkProveMaterialID;
    /**
     * 单位考核ID
     */
	private Integer checkID;
	/**
	 * 原名称
	 */
	private String OriginalMame;
    /**
     * 证明材料路径
     */
	private String ProveMaterialURL;
    /**
     * 备注
     */
	private String remarks;


	public Integer getCheckProveMaterialID() {
		return checkProveMaterialID;
	}

	public void setCheckProveMaterialID(Integer checkProveMaterialID) {
		this.checkProveMaterialID = checkProveMaterialID;
	}

	public Integer getCheckID() {
		return checkID;
	}

	public void setCheckID(Integer checkID) {
		this.checkID = checkID;
	}

	public String getProveMaterialURL() {
		return ProveMaterialURL;
	}

	public void setProveMaterialURL(String ProveMaterialURL) {
		this.ProveMaterialURL = ProveMaterialURL;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	@Override
	protected Serializable pkVal() {
		return this.checkProveMaterialID;
	}

	public String getOriginalMame() {
		return OriginalMame;
	}

	public void setOriginalMame(String originalMame) {
		OriginalMame = originalMame;
	}

}
