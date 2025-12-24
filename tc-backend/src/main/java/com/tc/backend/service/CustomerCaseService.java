package com.tc.backend.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tc.backend.entity.CustomerCase;
import com.tc.backend.mapper.CustomerCaseMapper;
import org.springframework.stereotype.Service;

@Service
public class CustomerCaseService extends ServiceImpl<CustomerCaseMapper, CustomerCase> {
}
