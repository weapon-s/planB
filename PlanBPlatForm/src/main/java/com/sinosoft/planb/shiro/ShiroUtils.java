package com.sinosoft.planb.shiro;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;

public abstract class ShiroUtils {
    /**
     * 获取当前用户的 Principal
     */
    public static UserPrincipal getCurrentUserPrincipal(){
        Subject subject = SecurityUtils.getSubject();
        return (UserPrincipal)subject.getPrincipal();
    }
}