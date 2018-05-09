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
 * @since 2018-04-26
 */
@TableName("module_authority_table")
public class ModuleAuthorityTable extends Model<ModuleAuthorityTable> {

    private static final long serialVersionUID = 1L;

	private Integer moduleAuthorityID;
	private String moduleAuthority;
	private Integer assistantID;
	private String menuUrl;
	private String iconUrl;


	public Integer getModuleAuthorityID() {
		return moduleAuthorityID;
	}

	public void setModuleAuthorityID(Integer moduleAuthorityID) {
		this.moduleAuthorityID = moduleAuthorityID;
	}

	public String getModuleAuthority() {
		return moduleAuthority;
	}

	public void setModuleAuthority(String moduleAuthority) {
		this.moduleAuthority = moduleAuthority;
	}

	public Integer getAssistantID() {
		return assistantID;
	}

	public void setAssistantID(Integer assistantID) {
		this.assistantID = assistantID;
	}

	@Override
	protected Serializable pkVal() {
		return this.moduleAuthorityID;
	}

	public String getMenuUrl() {
		return menuUrl;
	}

	public void setMenuUrl(String menuUrl) {
		this.menuUrl = menuUrl;
	}

	public String getIconUrl() {
		return iconUrl;
	}

	public void setIconUrl(String iconUrl) {
		this.iconUrl = iconUrl;
	}

}
