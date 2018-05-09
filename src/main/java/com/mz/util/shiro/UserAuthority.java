package com.mz.util.shiro;


public class UserAuthority {
	int userID;
	String userName;
	String password;
	String[] actionIDs;

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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}


	public String[] getActionIDs() {
		return actionIDs;
	}

	public void setActionIDs(String[] actionIDs) {
		this.actionIDs = actionIDs;
	}
}