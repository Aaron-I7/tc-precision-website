package com.tc.backend.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.tc.backend.entity.VisitLog;
import java.util.List;
import java.util.Map;

public interface VisitLogService extends IService<VisitLog> {
    List<Map<String, Object>> getGeoStats();
    List<Map<String, Object>> getTrendStats();
}
