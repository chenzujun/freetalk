package com.raine.freetalk.controller;


import com.raine.freetalk.domain.User;
import com.raine.freetalk.service.IUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
public class IndexController {

	@Autowired
	private IUserService userService;

	/**
	 * 欢迎页面
	 */
	@RequestMapping(value = "/welcome", method = RequestMethod.GET)
	public String welcome() {
		User user = userService.getUserById(1);
		System.out.println(user.toString());
		return "welcome";
	}


}


