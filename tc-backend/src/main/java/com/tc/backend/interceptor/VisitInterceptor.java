package com.tc.backend.interceptor;

import com.tc.backend.entity.VisitLog;
import com.tc.backend.service.VisitLogService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.time.LocalDateTime;

@Slf4j
@Component
@RequiredArgsConstructor
public class VisitInterceptor implements HandlerInterceptor {

    private final VisitLogService visitLogService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // Only log GET requests to avoid logging static resources if possible (though Spring might handle static resources differently)
        // Also skip /api/dashboard/stats to avoid self-loop if the dashboard polls frequently
        String path = request.getRequestURI();
        
        if (!"GET".equalsIgnoreCase(request.getMethod())) {
            return true;
        }
        
        // Filter out static resources and admin APIs
        if (path.startsWith("/api/auth") || path.startsWith("/api/dashboard") || path.contains(".")) {
            return true;
        }

        try {
            VisitLog log = new VisitLog();
            log.setIp(getClientIp(request));
            log.setPath(path);
            log.setMethod(request.getMethod());
            log.setUserAgent(request.getHeader("User-Agent"));
            log.setCreateTime(LocalDateTime.now());
            
            visitLogService.save(log);
        } catch (Exception e) {
            // Ignore logging errors to not affect main business logic
            log.error("Failed to save visit log", e);
        }
        
        return true;
    }

    private String getClientIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }
}
