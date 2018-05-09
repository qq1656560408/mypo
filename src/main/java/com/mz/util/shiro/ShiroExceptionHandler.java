package com.mz.util.shiro;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authz.HostUnauthorizedException;
import org.apache.shiro.authz.UnauthorizedException;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

public class ShiroExceptionHandler implements HandlerExceptionResolver {

	@Override
	public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object object,
			Exception ex) {
		ex.printStackTrace();
		
		if(ex instanceof UnauthorizedException) {  
			//没有认证
            return new ModelAndView("login");  
        }else if(ex instanceof UnknownAccountException||ex instanceof AuthenticationException) {  
        	//账号密码错误  跳回登录页面
        	ModelAndView mv=new ModelAndView();  
    		mv.addObject("Result", "用户名或密码错误");
			mv.setViewName("login");
			return mv;
        } else if(ex instanceof HostUnauthorizedException){
        	  return new ModelAndView("exception/noPermission");  
        }
		return null;  
	}

}
