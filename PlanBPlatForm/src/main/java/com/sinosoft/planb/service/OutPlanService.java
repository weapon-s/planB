package com.sinosoft.planb.service;

import com.sinosoft.planb.db.entity.OutPlan;

/**
 * Created by weapon on 2017/05/30.
 */
public interface OutPlanService {
    Object queryOutPlan(OutPlan outPlan,Integer pageNo);
}
