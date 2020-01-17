/*
 * Copyright (c) 2015 4PX Information Technology Co.,Ltd. All rights reserved.
 */
package com.raine.freetalk.common.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

/**
 * EnvironmentConfig 获取consul k-v值工具类
 */
@Component
public class EnvironmentConfig {
    @Autowired
    private Environment environment;

    public String getProperty(final String key) {
        return environment.getProperty(key);
    }
}
