package com.sinosoft.planb.service;

public class ServiceException extends RuntimeException {
	private static final long serialVersionUID = -8738526323271899198L;

	public ServiceException(String msg){
		super(msg);
	}
	
	public ServiceException(String msg, Throwable t){
		super(msg,t);
	}

	public static void assertNotNull(Object obj,String msg){
		if(null == obj){
			throw new ServiceException(msg);
		}
	}

	public static void assertTrue(boolean b,String msg){
		if(!b){
			throw new ServiceException(msg);
		}
	}

	public static void assertFalse(boolean b,String msg){
		if(b){
			throw new ServiceException(msg);
		}
	}
}
