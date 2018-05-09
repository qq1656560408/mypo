package com.mz.entity;

import com.baomidou.mybatisplus.enums.IdType;

import java.util.Date;
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
 * @since 2018-04-27
 */
@TableName("user_table")
public class UserTable extends Model<UserTable> {

    private static final long serialVersionUID = 1L;
	private Integer userID;
	private String userName;
	private String passwork;
	private String moduleAuthorityID;
	private Date creationTime;


	public Integer getUserID() {
		return userID;
	}

	public void setUserID(Integer userID) {
		this.userID = userID;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPasswork() {
		return passwork;
	}

	public void setPasswork(String passwork) {
		this.passwork = passwork;
	}

	public String getModuleAuthorityID() {
		return moduleAuthorityID;
	}

	public void setModuleAuthorityID(String moduleAuthorityID) {
		this.moduleAuthorityID = moduleAuthorityID;
	}

	public Date getCreationTime() {
		return creationTime;
	}

	public void setCreationTime(Date creationTime) {
		this.creationTime = creationTime;
	}

	@Override
	protected Serializable pkVal() {
		return this.userID;
	}

}
