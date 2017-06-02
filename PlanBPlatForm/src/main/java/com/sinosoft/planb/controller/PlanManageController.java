package com.sinosoft.planb.controller;

import com.sinosoft.planb.db.entity.OutPlan;
import com.sinosoft.planb.service.OutPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by weapon on 2017/05/30.
 */
@RestController
@RequestMapping("api/planManage")
public class PlanManageController {

    @Autowired
    private OutPlanService outPlanService;

    @RequestMapping("planQuery/{pageNo}")
    public Object queryOutSidePlan(@PathVariable("pageNo")Integer pageNo, OutPlan outPlan){
        return outPlanService.queryOutPlan(outPlan,pageNo);
    }
}
