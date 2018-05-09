package com.mz.web;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import com.alibaba.fastjson.JSONArray;
import com.mz.entity.UserTable;
import com.mz.service.IModuleAuthorityTableService;
import com.mz.service.IUserTableService;
import com.mz.util.LayuiResponseData;
import com.mz.util.shiro.ShiroEncryption;
import com.mz.vo.SelectModuleAuthority;
import com.mz.vo.SelectUserTable;
import com.mz.web.base.BaseControl;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author
 * @since 2018-04-16
 */
@Controller
@RequestMapping("/userTable")
public class UserTableController extends BaseControl {
	@Autowired
	private IUserTableService UserTableService;

	@Autowired
	private IModuleAuthorityTableService moduleAuthorityTableService;

	/**
	 * 登录 （无需配置数据库）
	 * 
	 * @param userName
	 * @param passwork
	 * @return
	 */
	@RequestMapping("selectdenglu")
	public ModelAndView login(String userName, String passwork) {
		Subject subject = SecurityUtils.getSubject();
		AuthenticationToken token = new UsernamePasswordToken(userName, passwork);
		// 开始认证
		subject.login(token);
		// 获取用户认证
		boolean bool = subject.isAuthenticated();
		System.out.println("认证成功：" + bool);
		ModelAndView mv = new ModelAndView();
		if (bool) {
			mv.setViewName("Main");
			mv.addObject("Result", "成功");
			return mv;
		} else {
			mv.addObject("Result", "用户名或密码错误");
			mv.setViewName("login");
			return mv;
		}
	}

	
	public ModelAndView selectdenglu(String userName, String passwork) {
		ModelAndView mv = new ModelAndView();
		if (userName == null || userName.equals("") || passwork == null || passwork.equals("")) {
			mv.addObject("Result", "用户名或密码错误");
			mv.setViewName("login");
			return mv;
		}
		passwork = ShiroEncryption.encryption(passwork);
		List<UserTable> userTables = UserTableService.selectUserTables(userName, passwork);
		// UserTable userTable=userTables.get(0);
		if (userTables != null && userTables.size() > 0) {
			mv.setViewName("Main");
			mv.addObject("Result", "成功");
			return mv;
		} else {
			mv.addObject("Result", "用户名或密码错误");
			mv.setViewName("login");
			return mv;
		}
	}

	@RequestMapping("loginOut")
	public ModelAndView loginOut() {
		Subject subject = SecurityUtils.getSubject();
		subject.logout();
		ModelAndView mv=new ModelAndView();
		mv.setViewName("login");
		return mv;
	}

	/**
	 * 查询所有用户
	 * 
	 * @param name
	 * @return
	 */
	@RequestMapping("selectUserTablesall")
	@ResponseBody
	public Object selectUserTablesall(String name) {
		if (name == null || name.equals("")) {
			name = null;
		}
		Map<String, Object> columnMap = new HashMap<String, Object>();
		columnMap.put("userName", name);
		List<UserTable> userTableall = UserTableService.selectByMap(columnMap);
		LayuiResponseData layers = new LayuiResponseData(userTableall.size(), userTableall);
		return layers;
	}

	/**
	 * 删除用户
	 * 
	 * @param userID
	 * @return
	 */
	@RequestMapping("deletebyuserID")
	@ResponseBody
	public Object deletebyuserID(Integer userID) {
		Boolean deletebyuserID = UserTableService.deletebyuserID(userID);
		return "{\"success\":" + deletebyuserID + "}";
	}

	/**
	 * 新增用户
	 * 
	 * @param y
	 *            用户
	 * @return
	 */
	@RequestMapping("insertUser")
	@ResponseBody
	public Object insertUser(UserTable y) {
		String passwork = ShiroEncryption.encryption(y.getPasswork());
		y.setPasswork(passwork);
		Date time = new Date();
		y.setCreationTime(time);
		int insertUserTable = UserTableService.insertUser(y);
		return insertUserTable;
	}

	/**
	 * 弹出框
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping("updatetManage")
	public ModelAndView updatetManage(Integer id) {
		SelectUserTable spq = UserTableService.selectUpdate(id);
		List<SelectModuleAuthority> list = moduleAuthorityTableService.selectModuleAuthorities(0);
		String str = JSONArray.toJSONString(list);
		ModelAndView mv = loadBase("UserManage/updatetManage");
		mv.addObject("userID", id);
		mv.addObject("spq", spq);
		mv.addObject("json", str);
		return mv;
	}

	/**
	 * 修改用户
	 * 
	 * @param y
	 * @return
	 */
	@RequestMapping("updateUserimfo")
	@ResponseBody
	public Object updateUserimfo(UserTable y) {
		String passwork = ShiroEncryption.encryption(y.getPasswork());
		y.setPasswork(passwork);
		int updateUser = UserTableService.updateUserimfo(y);
		return updateUser;
	}

	/**
	 * 查询用户菜单
	 * 
	 * @param parentId
	 * @return
	 */
	@RequestMapping("userMenu")
	@ResponseBody
	public Object userMenu(int parentId) {
		return moduleAuthorityTableService.selectMenu(parentId);
	}
}
