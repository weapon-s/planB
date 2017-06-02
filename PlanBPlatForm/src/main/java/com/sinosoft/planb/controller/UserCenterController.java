package com.sinosoft.planb.controller;

import com.sinosoft.planb.shiro.ShiroUtils;
import com.sinosoft.planb.shiro.UserPrincipal;
import com.sinosoft.planb.vo.Vo;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by weapon on 2017/05/25.
 */
@RestController
@RequestMapping("api/userCenter")
public class UserCenterController {

    @RequestMapping(value = "currentUser",method = RequestMethod.GET)
    public Object currentUser(){
        UserPrincipal userPrincipal = ShiroUtils.getCurrentUserPrincipal();
        if(userPrincipal != null){
            return Vo.succ(userPrincipal);
        }else{
            return Vo.fail("未登入");
        }
    }

    @RequestMapping(value = "login",method = RequestMethod.POST)
    public Object login(@RequestParam("usercode") String usercode,@RequestParam("password") String password){
        Subject subject = SecurityUtils.getSubject();
        UsernamePasswordToken token = new UsernamePasswordToken(usercode,password);
        try{
            subject.login(token);
        }catch (Exception ex){
            ex.printStackTrace();
            return Vo.fail("用户名密码错误");
        }
        return Vo.succ("登入成功");
    }

    @RequestMapping(value = "logout",method = RequestMethod.GET)
    public Object logout(){
        Subject subject = SecurityUtils.getSubject();
        subject.logout();
        return Vo.succ();
    }
}
