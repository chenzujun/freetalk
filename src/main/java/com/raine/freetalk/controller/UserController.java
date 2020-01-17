package com.raine.freetalk.controller;

import com.github.pagehelper.PageInfo;
import com.raine.freetalk.domain.User;
import com.raine.freetalk.domain.query.UserQuery;
import com.raine.freetalk.service.IUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;

/**
 * @author chenjun
 * @date 2020/1/17
 * @since V1.0.0
 */
@Slf4j
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private IUserService userService;

    @GetMapping("/index")
    public ModelAndView main() {
        return new ModelAndView("freetalk/user");
    }

    @PostMapping("/query")
    public Map<String, Object> getList(UserQuery userQuery) {
        PageInfo<User> userPageInfo =
                userService.pageUser(userQuery);
        return viewData(userPageInfo);
    }

    @GetMapping("/detail/{userId}")
    public ModelAndView getDetail(@PathVariable("userId") Integer userId) {
        ModelAndView view = new ModelAndView("freetalk/user_detail");

        User user = userService.getUserById(userId);
        view.addObject("userInfo", user);
        return view;
    }


    /**
     * 设置分页查询参数
     *
     * @param page 分页数据
     * @return 带分页参数的map记录集
     */
    Map<String, Object> viewData(PageInfo<?> page) {
        Map<String, Object> data = new HashMap(6);
        data.put("data", page.getList());
        data.put("recordsTotal", page.getTotal());
        data.put("recordsFiltered", page.getTotal());
        return data;
    }
}
