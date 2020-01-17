package com.raine.freetalk.mapper;

import com.raine.freetalk.domain.User;
import com.raine.freetalk.domain.base.EntityDao;
import org.apache.ibatis.annotations.Mapper;

/**
 * @author chenjun
 * @date 2020/1/16
 * @since V1.0.0
 */
public interface IUserMapper extends EntityDao<User, Integer> {

}
