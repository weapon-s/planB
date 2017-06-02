package com.sinosoft.planb.vo;

import com.sinosoft.planb.db.entity.Menu;

import java.util.LinkedList;
import java.util.List;


public class MenuVo {
	private Menu menu;
	private List<MenuVo> childMenus=new LinkedList<MenuVo>();
	public Menu getMenu() {
		return menu;
	}
	public void setMenu(Menu menu) {
		this.menu = menu;
	}
	public List<MenuVo> getChildMenus() {
		return childMenus;
	}
	public void setChildMenus(List<MenuVo> childMenus) {
		this.childMenus = childMenus;
	}
	
}