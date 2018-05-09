package com.mz.entity;

import com.baomidou.mybatisplus.enums.IdType;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableName;
import java.io.Serializable;

/**
 * <p>
 * 
 * </p>
 *
 * @author 
 * @since 2018-05-04
 */
@TableName("modeule_action_table")
public class ModeuleActionTable extends Model<ModeuleActionTable> {

    private static final long serialVersionUID = 1L;

    /**
     * 模块actionID
     */
	private Integer modeuleActionID;
    /**
     * 模块id
     */
	private Integer moduleAuthorityID;
    /**
     * 链接
     */
	private String actionUrl;
    /**
     * 链接备注
     */
	private String remark;


	public Integer getModeuleActionID() {
		return modeuleActionID;
	}

	public void setModeuleActionID(Integer modeuleActionID) {
		this.modeuleActionID = modeuleActionID;
	}

	public Integer getModuleAuthorityID() {
		return moduleAuthorityID;
	}

	public void setModuleAuthorityID(Integer moduleAuthorityID) {
		this.moduleAuthorityID = moduleAuthorityID;
	}

	public String getActionUrl() {
		return actionUrl;
	}

	public void setActionUrl(String actionUrl) {
		this.actionUrl = actionUrl;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Override
	protected Serializable pkVal() {
		return this.modeuleActionID;
	}

}
