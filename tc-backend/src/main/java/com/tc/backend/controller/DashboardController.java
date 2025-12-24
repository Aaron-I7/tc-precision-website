package com.tc.backend.controller;

import com.tc.backend.common.Result;
import com.tc.backend.service.InquiryService;
import com.tc.backend.service.ProductService;
import com.tc.backend.service.VisitLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final ProductService productService;
    private final InquiryService inquiryService;
    private final VisitLogService visitLogService;

    @GetMapping("/stats")
    public Result<Map<String, Long>> getStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("productCount", productService.count());
        stats.put("inquiryCount", inquiryService.count());
        stats.put("visitCount", visitLogService.count());
        return Result.success(stats);
    }
}
