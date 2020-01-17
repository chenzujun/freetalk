package com.raine.freetalk.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.raine.freetalk.domain.User;
import com.raine.freetalk.service.IUserService;
import com.raine.freetalk.mapper.IUserMapper;
import com.raine.freetalk.domain.query.UserQuery;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

/**
 * 用户表 Service实现
 * 
 * @author chenjun
 * @date 2020-01-16
 */
@Service
@Transactional(rollbackFor = Exception.class)
public class UserServiceImpl implements IUserService {

    @Autowired
    private IUserMapper userMapper;

    @Override
    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public User getUserById(Integer id) {
        return userMapper.getById(id);
    }

    @Override
    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public List<User> searchUser(UserQuery query) {
        return userMapper.search(query);
    }

    @Override
    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public PageInfo<User> pageUser(UserQuery query) {
        PageHelper.startPage(query.getPageNo(), query.getPageSize());
        List<User> list = searchUser(query);
        PageInfo<User> page = new PageInfo<User>(list);
        return page;
    }

    @Override
    public int saveUser(User user) {
        return userMapper.save(user);
    }

    @Override
    public int saveUsers(List<User> users) {
        return userMapper.save(users);
    }

    @Override
    public int updatePartUser(User user) {
        return userMapper.updatePart(user);
    }

    @Override
    public int deleteUser(Integer id) {
        return userMapper.deleteByPk(id);
    }

    @Override
    public int deleteUsers(List<Integer> ids) {
        return userMapper.deleteBatchByPks(ids);
    }

}
