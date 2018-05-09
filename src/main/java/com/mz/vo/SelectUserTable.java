package com.mz.vo;

import java.sql.Date;
import java.util.List;

public class SelectUserTable {
       private int userID;
       private String userName;
       private String passwork;
       private int assistantID;
       private String moduleAuthorityID;
       private List<SelectUserTable> children;
       private Date  creationTime;
       private String moduleAuthority;
   

	public Date getCreationTime() {
		return creationTime;
	}
	public void setCreationTime(Date creationTime) {
		this.creationTime = creationTime;
	}
	public String getModuleAuthority() {
		return moduleAuthority;
	}
	public void setModuleAuthority(String moduleAuthority) {
		this.moduleAuthority = moduleAuthority;
	}

	public int getAssistantID() {
		return assistantID;
	}
	public void setAssistantID(int assistantID) {
		this.assistantID = assistantID;
	}

	public String getModuleAuthorityID() {
		return moduleAuthorityID;
	}
	public void setModuleAuthorityID(String moduleAuthorityID) {
		this.moduleAuthorityID = moduleAuthorityID;
	}
	public int getUserID() {
		return userID;
	}
	public void setUserID(int userID) {
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
    public List<SelectUserTable> getChildren() {
		return children;
	}
	public void setChildren(List<SelectUserTable> children) {
		this.children = children;
	}
	
	@Override
	public String toString() {
		return "SelectUserTable [userID=" + userID + ", userName=" + userName + ", passwork=" + passwork
				+ ", assistantID=" + assistantID + ", moduleAuthorityID=" + moduleAuthorityID + ", children=" + children
				+ ", creationTime=" + creationTime + ", moduleAuthority=" + moduleAuthority + "]";
	}
}
