package com.sinosoft.planb.shiro;


import com.sinosoft.planb.db.entity.User;
import com.sinosoft.planb.service.UserManageService;
import org.apache.shiro.authc.*;
import org.apache.shiro.realm.Realm;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class SystemRealm implements Realm {
	@Autowired
	private UserManageService userService;

	@Override
	public AuthenticationInfo getAuthenticationInfo(AuthenticationToken authenticationToken)
			throws AuthenticationException {
		UsernamePasswordToken token = (UsernamePasswordToken)authenticationToken;
		if(token.getPassword() == null){
			return null;
		}
		String password = new String(token.getPassword());
		List<User> userList = userService.validateUser(token.getUsername(), password);
		if(userList.size()>0){
			User user = userList.get(0);
			if(null != user){
				UserPrincipal p = new UserPrincipal(user.getUserId(),user.getUserName());
				return new SimpleAuthenticationInfo(p, user.getPassword(), user.getUserName());
			}else{
				throw new AuthenticationException("msg:用户名密码错误！");
			}
		}
		throw new AuthenticationException("msg:用户名密码错误！");
	}

	@Override
	public String getName() {
		return getClass().getName();
	}

	@Override
	public boolean supports(AuthenticationToken token) {
		return token instanceof UsernamePasswordToken;
	}
}
