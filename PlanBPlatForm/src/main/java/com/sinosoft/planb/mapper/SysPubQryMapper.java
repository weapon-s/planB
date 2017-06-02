package com.sinosoft.planb.mapper;

import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * 
 * @author Doney
 * @comemnt 系统公共查询类
 */
public interface SysPubQryMapper {
	
	//查询年份
	List<Map<String,Object>> queryYear(@Param(value = "year") String year);

	//查询季度
	List<Map<String,Object>> queryQuarter();
}
