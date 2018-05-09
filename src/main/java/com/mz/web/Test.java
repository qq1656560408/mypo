package com.mz.web;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/test")
public class Test {

	
	
	/**
	 * 
	 * @param username
	 * @param password
	 * @return
	 */
	@RequestMapping("login")
	public ModelAndView login(String username,String password){
		
		Subject subject=SecurityUtils.getSubject();
		AuthenticationToken token=new UsernamePasswordToken(username, password);
		//开始认证
		subject.login(token);
		//获取用户认证
		boolean bool=subject.isAuthenticated();
		System.out.println("认证成功："+bool);
		ModelAndView mv = new ModelAndView();
		if(bool){
			mv.setViewName("Main");
			mv.addObject("Result", "成功");
			return mv;
		} else {
			mv.addObject("Result", "用户名或密码错误");
			mv.setViewName("login");
			return mv;
		}
	}

}
