package com.tc.backend.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tc.backend.entity.VisitLog;
import com.tc.backend.mapper.VisitLogMapper;
import com.tc.backend.service.VisitLogService;
import org.springframework.stereotype.Service;

@Service
public class VisitLogServiceImpl extends ServiceImpl<VisitLogMapper, VisitLog> implements VisitLogService {
}
