package com.sinosoft.planb.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.sinosoft.planb.db.entity.OutPlan;
import com.sinosoft.planb.db.entity.OutPlanExample;
import com.sinosoft.planb.db.mapper.OutPlanMapper;
import com.sinosoft.planb.service.OutPlanService;
import com.sinosoft.planb.util.SysFieldUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


/**
 * Created by weapon on 2017/05/30.
 */
@Service
public class OutPlanServiceImpl implements OutPlanService {

    @Autowired
    private OutPlanMapper outPlanMapper;

    @Override
    public Object queryOutPlan(OutPlan outPlan, Integer pageNo) {
        OutPlanExample outPlanExample = new OutPlanExample();
        if(outPlan!=null && (outPlan.getYear() != null && !"".equals(outPlan.getYear()))){
            outPlanExample.createCriteria().andYearEqualTo(outPlan.getYear());
        }
        if(outPlan!=null && (outPlan.getQuarter() != null && !"".equals(outPlan.getQuarter()))){
            outPlanExample.createCriteria().andQuarterEqualTo(outPlan.getQuarter());
        }
        if(outPlan!=null && (outPlan.getModular() != null && !"".equals(outPlan.getModular()))){
            outPlanExample.createCriteria().andModularEqualTo(outPlan.getModular());
        }
        if(outPlan!=null && (outPlan.getOa() != null && !"".equals(outPlan.getOa()))){
            outPlanExample.createCriteria().andOaEqualTo(outPlan.getOa());
        }
        if(outPlan!=null && (outPlan.getSeq() != null && !"".equals(outPlan.getSeq()))){
            outPlanExample.createCriteria().andSeqEqualTo(outPlan.getSeq());
        }
        if(outPlan!=null && (outPlan.getAnalyst() != null && !"".equals(outPlan.getAnalyst()))){
            outPlanExample.createCriteria().andAnalystEqualTo(outPlan.getAnalyst());
        }
        if(outPlan!=null && (outPlan.getYear() != null && !"".equals(outPlan.getYear()))){
            outPlanExample.createCriteria().andYearEqualTo(outPlan.getYear());
        }
        PageHelper.startPage(pageNo, SysFieldUtil.PAGE_SIZE);
        List<OutPlan> outPlans = outPlanMapper.selectByExample(outPlanExample);
        PageInfo<OutPlan> pageInfo = new PageInfo<OutPlan>(outPlans);
        return pageInfo;
    }
}
