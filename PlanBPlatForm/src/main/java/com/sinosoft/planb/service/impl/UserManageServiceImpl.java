package com.sinosoft.planb.service.impl;

import com.github.pagehelper.PageInfo;
import com.sinosoft.planb.db.entity.User;
import com.sinosoft.planb.db.entity.UserExample;
import com.sinosoft.planb.db.mapper.UserMapper;
import com.sinosoft.planb.service.UserManageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by weapon on 2017/05/25.
 */
@Service
public class UserManageServiceImpl implements UserManageService{

    @Autowired
    private UserMapper userMapper;
    @Override
    public PageInfo<User> listAllUserForPage(Integer pageNo, User condition) {
        return null;
    }

    @Override
    public List<User> validateUser(String userCode, String password) {
        UserExample usere = new UserExample();
        UserExample.Criteria criteria = usere.createCriteria();
        criteria.andUserIdEqualTo(userCode);
        criteria.andPasswordEqualTo(password);
        List<User> users = userMapper.selectByExample(usere);
        return users;
    }

    @Override
    public Object insertUser(User tGdUser) {
        return null;
    }

    @Override
    public Object delUser(String tUserCode) {
        return null;
    }

    @Override
    public Object updateUser(User tGdUser) {
        return null;
    }
}
