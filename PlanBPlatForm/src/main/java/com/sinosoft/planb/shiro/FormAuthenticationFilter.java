package com.sinosoft.planb.shiro;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationToken;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

public class FormAuthenticationFilter extends
		org.apache.shiro.web.filter.authc.FormAuthenticationFilter {
	@Override
	protected boolean onLoginFailure(AuthenticationToken token,
			AuthenticationException e, ServletRequest request,
			ServletResponse response) {
		String msg = e.getMessage();
		if(msg.startsWith("msg:")){
			request.setAttribute("errorMsg", msg.substring(4));
		}
		return true;
	}
}
