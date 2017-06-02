package com.sinosoft.planb.util;

/**
 * 
 * @author Doney
 * @comment 系统常量定义表
 */
public class SysFieldUtil {

	public static final int PAGE_SIZE=10;
	
	//产品组合申请中 状态
	public static final String APPLY_ING="0";
	
	//产品组合待审核 状态
	public static final String WAIT_APPROVE="1";
	
	//产品组合审核中 状态
	public static final String APPROVE_ING="2";
	
	//产品组合审核通过 状态
	public static final String APPROVE_PASS="9";
	
	//产品组合审核不通过
	public static final String APPROVE_UNPASS="a";
	
	//产品组合申请
	public static final String PLAN_APPLY="0";
	
	//产品组合提交审核
	public static final String PLAN_APPROVE_CMMIT="1";
	
	//产品组合审核通过
	public static final String PLAN_APPROVE_PASS="9";
	
	
	//计划类别 0-固定计划 1-非固定计划 2-险种默认值 4-套餐计划
	public static final String PLANTYPE_COM="4";
	
}
