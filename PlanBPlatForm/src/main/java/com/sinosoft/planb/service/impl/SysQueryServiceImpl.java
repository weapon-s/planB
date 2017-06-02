package com.sinosoft.planb.service.impl;

import com.sinosoft.planb.mapper.SysPubQryMapper;
import com.sinosoft.planb.service.SysQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by weapon on 2017/05/30.
 */
@Service
public class SysQueryServiceImpl implements SysQueryService{

    @Autowired
    private SysPubQryMapper sysPubQryMapper;

    @Override
    public List<Map<String, Object>> queryYear(String year) {
        return sysPubQryMapper.queryYear(year);
    }

    @Override
    public List<Map<String, Object>> queryQuarter() {
        return sysPubQryMapper.queryQuarter();
    }
}
