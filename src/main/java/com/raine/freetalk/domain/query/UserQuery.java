/*
 * Copyright (c) 2013, FPX and/or its affiliates. All rights reserved. Use, Copy is subject to authorized license.
 */
package com.raine.freetalk.domain.query;

import java.util.Date;
import com.raine.freetalk.domain.base.BaseQuery;
import lombok.Data;

/**
 * 用户表 查询对象
 * 
 * @author chenjun
 * @date 2020-01-16
 */
@Data
public class UserQuery extends BaseQuery {

    /**
     * 序列化版本号
     */
    private static final long serialVersionUID = 1L;

    /**
     * 创建时间
     */
    private Date createTimeBegin;

    /**
     * 创建时间
     */
    private Date createTimeEnd;

    /**
     * 创建人ID
     */
    private String creatorId;

    /**
     * 修改时间
     */
    private Date modifyTimeBegin;

    /**
     * 修改时间
     */
    private Date modifyTimeEnd;

    /**
     * 更新人ID
     */
    private String modifierId;

    /**
     * 是否删除 0 否 1 是
     */
    private Boolean deleted;

    /**
     * 用户唯一编码
     */
    private String userCode;

    /**
     * 登录名
     */
    private String userName;

    /**
     * 昵称
     */
    private String nickName;

    /**
     * 固定电话
     */
    private String telephone;

    /**
     * 移动电话
     */
    private String mobile;

    /**
     * 邮箱
     */
    private String email;

    /**
     * 派件员所在国家
     */
    private String country;

    /**
     * 派件员所在省-州
     */
    private String province;

    /**
     * 状态 ACTIVE/INACTIVE
     */
    private String status;



}
