package com.raine.freetalk.domain.base;

import lombok.Data;

import java.io.Serializable;

/**
 * @author chenjun
 * @date 2020/1/16
 * @since V1.0.0
 */
@Data
public class BaseEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer id;

}