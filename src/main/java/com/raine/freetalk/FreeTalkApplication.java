package com.raine.freetalk;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 用户表 查询对象
 *
 * @author chenjun
 * @date 2020-01-16
 */
@Data
@Slf4j
@MapperScan("com.raine.freetalk.mapper")
@SpringBootApplication
public class FreeTalkApplication {
	public static void main(String[] args) {
		SpringApplication.run(FreeTalkApplication.class, args);
		log.info("free talk started!");
	}
}