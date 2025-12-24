package com.tc.backend.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tc.backend.entity.Inquiry;
import com.tc.backend.mapper.InquiryMapper;
import com.tc.backend.service.InquiryService;
import org.springframework.stereotype.Service;

@Service
public class InquiryServiceImpl extends ServiceImpl<InquiryMapper, Inquiry> implements InquiryService {
}
