package com.sinosoft.planb.shiro;

import com.sinosoft.planb.db.entity.User;

import java.io.Serializable;

/**
 * Shiro 中的用户凭证信息
 * @author 韩朝祥
 *
 */
public class UserPrincipal implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private String userCode;
	private String userName;
	private String manageCom;
	private User gdUser;
	public UserPrincipal(String userCode, String manageCom, String userName, User gdUser) {
		this.userCode = userCode;
		this.manageCom = manageCom;
		this.userName = userName;
		this.gdUser = gdUser;
	}

	public UserPrincipal(String userCode, String userName) {
		this.userCode = userCode;
		this.userName = userName;

	}
	public String getManageCom() {
		return manageCom;
	}

	public void setManageCom(String manageCom) {
		this.manageCom = manageCom;
	}




//	public UserPrincipal(String userCode, String userName) {
//		this.userCode = userCode;
//		this.userName = userName;
//	}

	public static long getSerialVersionUID() {
		return serialVersionUID;
	}

	public String getUserCode() {
		return userCode;
	}

	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	public User getGdUser(){
		return gdUser;
	}
}
