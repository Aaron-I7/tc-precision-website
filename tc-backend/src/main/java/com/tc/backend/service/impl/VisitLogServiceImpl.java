package com.tc.backend.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tc.backend.entity.VisitLog;
import com.tc.backend.mapper.VisitLogMapper;
import com.tc.backend.service.VisitLogService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class VisitLogServiceImpl extends ServiceImpl<VisitLogMapper, VisitLog> implements VisitLogService {

    @Override
    public List<Map<String, Object>> getGeoStats() {
        return baseMapper.selectGeoStats();
    }

    @Override
    public List<Map<String, Object>> getTrendStats() {
        return baseMapper.selectTrendStats();
    }
}
