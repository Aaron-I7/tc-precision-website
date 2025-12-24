package com.tc.backend.controller;

import cn.dev33.satoken.stp.StpUtil;
import cn.dev33.satoken.util.SaResult;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.tc.backend.common.Result;
import com.tc.backend.entity.SysUser;
import com.tc.backend.service.SysUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final SysUserService sysUserService;

    @PostMapping("/login")
    public Result<Map<String, Object>> login(@RequestBody Map<String, String> params) {
        String username = params.get("username");
        String password = params.get("password");

        SysUser user = sysUserService.getOne(new LambdaQueryWrapper<SysUser>()
                .eq(SysUser::getUsername, username));

        if (user == null || !user.getPassword().equals(password)) {
            return Result.error(401, "Invalid username or password");
        }

        StpUtil.login(user.getId());
        
        Map<String, Object> data = new HashMap<>();
        data.put("token", StpUtil.getTokenValue());
        data.put("user", user);
        
        return Result.success(data);
    }

    @PostMapping("/logout")
    public Result<Void> logout() {
        StpUtil.logout();
        return Result.success();
    }
    
    @GetMapping("/me")
    public Result<SysUser> me() {
        if (!StpUtil.isLogin()) {
            return Result.error(401, "Not logged in");
        }
        Long userId = StpUtil.getLoginIdAsLong();
        return Result.success(sysUserService.getById(userId));
    }
}
