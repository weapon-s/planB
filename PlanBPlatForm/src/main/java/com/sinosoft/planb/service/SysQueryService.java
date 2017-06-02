package com.sinosoft.planb.service;

import java.util.List;
import java.util.Map;

/**
 * Created by weapon on 2017/05/30.
 */
public interface SysQueryService {
    List<Map<String,Object>> queryYear(String year);

    List<Map<String,Object>> queryQuarter();
}
