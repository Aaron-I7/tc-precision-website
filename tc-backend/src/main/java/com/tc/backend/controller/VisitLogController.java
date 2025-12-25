package com.tc.backend.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tc.backend.common.Result;
import com.tc.backend.entity.VisitLog;
import com.tc.backend.service.VisitLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/visit-logs")
@RequiredArgsConstructor
public class VisitLogController {

    private final VisitLogService visitLogService;

    @GetMapping
    public Result<Page<VisitLog>> list(@RequestParam(defaultValue = "1") Integer page,
                                     @RequestParam(defaultValue = "10") Integer size) {
        return Result.success(visitLogService.page(new Page<>(page, size), 
            new QueryWrapper<VisitLog>().orderByDesc("create_time")));
    }

    @GetMapping("/stats/geo")
    public Result<List<Map<String, Object>>> getGeoStats() {
        return Result.success(visitLogService.getGeoStats());
    }

    @GetMapping("/stats/trend")
    public Result<List<Map<String, Object>>> getTrendStats() {
        return Result.success(visitLogService.getTrendStats());
    }
}