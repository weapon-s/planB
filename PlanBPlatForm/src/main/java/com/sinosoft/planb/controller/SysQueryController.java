package com.sinosoft.planb.controller;

import com.sinosoft.planb.service.SysQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by weapon on 2017/05/30.
 */
@RestController
@RequestMapping("api/sysQry")
public class SysQueryController {

    @Autowired
    private SysQueryService sysQueryService;

    @RequestMapping("yearQuery")
    public Object queryYear(String year){
        return sysQueryService.queryYear(year);
    }

    @RequestMapping("quarterQuery")
    public Object queryQuarter(){
        return sysQueryService.queryQuarter();
    }
}
