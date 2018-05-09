package com.mz.util.shiro;

import java.util.List;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;
import com.alibaba.druid.util.StringUtils;
import com.mz.entity.UserTable;
import com.mz.service.IModeuleActionTableService;
import com.mz.service.IModuleAuthorityTableService;
import com.mz.service.IUserTableService;
import com.mz.util.session.UserSession;

public class UserAuthorizingRealm extends AuthorizingRealm {

	@Autowired
	IUserTableService userTableService;
	@Autowired
	IModuleAuthorityTableService moduleAuthorityTableService;
	@Autowired
	IModeuleActionTableService modeuleActionTableService;

	/**
	 * 获取授权信息
	 */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection pCollection) {
		System.out.println("授权");
		String userName = SecurityUtils.getSubject().getPrincipal().toString();
		if (!StringUtils.isEmpty(userName)) {
			UserAuthority userAuthority = UserSession.getSession();
			String [] actionList=userAuthority.getActionIDs();
			SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
			for (String str : actionList) {
				//添加权限字符串
				info.addStringPermission(str);
			}
			//返回权限信息
			return info;
		}
		return null;
	}

	/**
	 * 获取验证信息
	 */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
		System.out.println("登录认证");
		UsernamePasswordToken uPasswordToken = (UsernamePasswordToken) token;
		String userName = uPasswordToken.getUsername();
		char[] c = uPasswordToken.getPassword();
		if (userName == null || userName.equals("") || c == null ||c.length==0) {
			return null;
		}
		String passwork = new String(c, 0, c.length);
		//加密
		passwork=ShiroEncryption.encryption(passwork);
		
		List<UserTable> userTables = userTableService.selectUserTables(userName, passwork);
		if (userTables != null && userTables.size() > 0) {
			// 登录成功
			UserTable userTable = userTables.get(0);
			String allModuleID = userTable.getModuleAuthorityID();
			String[] assistantIDs = allModuleID.split(",");
			// 当验证都通过后，把用户信息放在session里
			Session session = SecurityUtils.getSubject().getSession();
			UserAuthority userAuthority = new UserAuthority();
			userAuthority.setUserName(userName);
			userAuthority.setUserID(userTable.getUserID());
			userAuthority.setPassword(passwork);
			userAuthority.setActionIDs(assistantIDs);
			
			session.setAttribute(UserSession.getSessionKey(), userAuthority);
			SimpleAuthenticationInfo simpleAuthenticationInfo = new SimpleAuthenticationInfo(userAuthority, passwork,getName());
			return simpleAuthenticationInfo;
		}

		return null;
	}

	
	
	
}
