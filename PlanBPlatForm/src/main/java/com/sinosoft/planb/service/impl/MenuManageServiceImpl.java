package com.sinosoft.planb.service.impl;

import com.sinosoft.planb.db.entity.Menu;
import com.sinosoft.planb.db.entity.MenuExample;
import com.sinosoft.planb.db.mapper.MenuMapper;
import com.sinosoft.planb.service.MenuManageSercice;
import com.sinosoft.planb.service.ServiceException;
import com.sinosoft.planb.vo.MenuVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by weapon on 2017/05/29.
 */
@Service
public class MenuManageServiceImpl implements MenuManageSercice {

    @Autowired
    private MenuMapper mapper ;

    @Override
    public List<Menu> listModuleMenus() {
        MenuExample e = new MenuExample();
        e.createCriteria().andParentIdIsNull();
        return mapper.selectByExample(e);
    }

    @Override
    public MenuVo childMenuQuery(Integer menuId) {
        Menu tRootMenu = mapper.selectByPrimaryKey(menuId);
        ServiceException.assertNotNull(tRootMenu,"未查询到对应菜单信息");

        return makeMenuVo(tRootMenu,getChildMenus(tRootMenu.getId()));
    }

    private List<Menu> getChildMenus(Integer menuId){
        MenuExample e = new MenuExample();
        e.createCriteria().andParentIdEqualTo(menuId);
        return mapper.selectByExample(e);
    }

    private MenuVo makeMenuVo(Menu gdMenu, List<Menu> childMenus){
        MenuVo menuVo = new MenuVo();
        menuVo.setMenu(gdMenu);
        if(null == childMenus){
            menuVo.setChildMenus(Collections.<MenuVo>emptyList());
        }
        List<MenuVo> childMenuVos = new LinkedList<>();
        for(Menu childMenu : childMenus){
            childMenuVos.add(makeMenuVo(childMenu,getChildMenus(childMenu.getId())));
        }
        menuVo.setChildMenus(childMenuVos);

        return menuVo;
    }
}
