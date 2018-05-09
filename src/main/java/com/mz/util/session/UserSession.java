package com.mz.util.session;

import org.apache.shiro.SecurityUtils;

import com.mz.util.shiro.UserAuthority;

public class UserSession {
	
	public static String sessionKey="userAuthority";

	/**
	 * 获取UserAuthority（保存用户数据，权限数据）
	 * @return
	 */
	public static UserAuthority getSession(){
		return (UserAuthority) SecurityUtils.getSubject().getSession().getAttribute(sessionKey);
	}
	
	/**
	 * 获取用户id
	 * @return
	 */
	public static int  getUserID(){
		return 1;
	}
	
	
	/**
	 * 获取模块权限id
	 * @return
	 */
	public static String[] getAssistantIDs(){
		return getSession().getActionIDs();
	}
	

	public static String getSessionKey() {
		return sessionKey;
	}

	public static void setSessionKey(String sessionKey) {
		UserSession.sessionKey = sessionKey;
	}
	
	
}
