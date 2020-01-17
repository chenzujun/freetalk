package com.raine.freetalk.service;

import java.util.List;

import com.raine.freetalk.domain.User;
import com.raine.freetalk.domain.query.UserQuery;
import com.github.pagehelper.PageInfo;

/**
 * 用户表 Service
 * 
 * @author chenjun
 * @date 2020-01-16
 */
public interface IUserService {

    /**
     * 根据id查询用户表
     * 
     * @param id 主键编号
     * @return 用户表
     */
    User getUserById(Integer id);

    /**
     * 根据组合条件查询用户表
     *
     * @param query 用户表查询对象
     * @return 用户表集合,如果不存在,返回Empty List
     */
    List<User> searchUser(UserQuery query);

    /**
     * 分页查询用户表
     * 
     * @param query 用户表查询对象
     * @return 分页结果,如果不存在,结果集为Empty List
     */
     PageInfo<User> pageUser(UserQuery query);

    /**
     * 保存用户表
     * 
     * @param user 用户表
     * @return 操作影响行数
     */
    int saveUser(User user);

    /**
     * 批量保存用户表
     * 
     * @param users 用户表
     * @return 操作影响行数
     */
    int saveUsers(List<User> users);

    /**
     * 局部更新用户表
     *
     * @param user 用户表
     * @return 操作影响行数
     */
    int updatePartUser(User user);

    /**
     * 根据编号删除用户表
     *
     * @param id 编号
     * @return 操作影响行数
     */
    int deleteUser(Integer id);

    /**
     * 根据id集合批量删除用户表
     *
     * @param ids id主键集合
     * @return 操作影响行数
     */
    int deleteUsers(List<Integer> ids);
}
