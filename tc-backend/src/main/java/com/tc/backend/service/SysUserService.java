package com.tc.backend.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tc.backend.entity.SysUser;
import com.tc.backend.mapper.SysUserMapper;
import org.springframework.stereotype.Service;

@Service
public class SysUserService extends ServiceImpl<SysUserMapper, SysUser> {
}
