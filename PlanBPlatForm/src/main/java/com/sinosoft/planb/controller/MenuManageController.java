package com.sinosoft.planb.controller;

import com.sinosoft.planb.service.MenuManageSercice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.AliasFor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

/**
 * Created by weapon on 2017/05/25.
 */
@RestController
@RequestMapping("api/menuManage")
public class MenuManageController {

    @Autowired
    private MenuManageSercice menuManageSercice;

    @RequestMapping(value = "modules",method = RequestMethod.GET)
    public Object modules(){
        return menuManageSercice.listModuleMenus();
    }

    @RequestMapping(value = "module/{moduleId}/menus",method = RequestMethod.GET)
    public Object moduleMenus(@PathVariable("moduleId")Integer moduleId){
        return menuManageSercice.childMenuQuery(moduleId);
    }
}
