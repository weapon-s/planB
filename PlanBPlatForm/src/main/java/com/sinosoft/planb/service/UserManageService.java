package com.sinosoft.planb.service;

import com.github.pagehelper.PageInfo;
import com.sinosoft.planb.db.entity.User;

import java.util.List;

/**
 * Created by weapon on 2017/05/25.
 */
public interface UserManageService {
    /**
     * 用户列表查询
     * @param condition 查询条件
     */
    PageInfo<User> listAllUserForPage(Integer pageNo, User condition);

    List<User> validateUser(String userCode, String password);

    Object insertUser(User tGdUser);

    Object delUser(String tUserCode);

    Object updateUser(User tGdUser);
}
