package com.sinosoft.planb.service;

import com.sinosoft.planb.db.entity.Menu;
import com.sinosoft.planb.vo.MenuVo;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by weapon on 2017/05/29.
 */
public interface MenuManageSercice {
    /**
     * 模块菜单列表
     */
    List<Menu> listModuleMenus();
    MenuVo childMenuQuery(Integer menuId);
}
