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
    private final com.tc.backend.util.IpUtil ipUtil;
    // LocalCache to store IP -> LastVisitTime (Epoch Milli)
    private final java.util.concurrent.ConcurrentHashMap<String, Long> ipCache = new java.util.concurrent.ConcurrentHashMap<>();
    private static final long COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes

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
            String ip = getClientIp(request);
            long now = System.currentTimeMillis();
            
            // Check cache
            Long lastVisit = ipCache.get(ip);
            if (lastVisit != null && (now - lastVisit) < COOLDOWN_MS) {
                // Skip logging if within cooldown
                return true;
            }
            
            // Update cache and log
            ipCache.put(ip, now);

            VisitLog log = new VisitLog();
            log.setIp(ip);
            log.setPath(path);
            log.setMethod(request.getMethod());
            log.setUserAgent(request.getHeader("User-Agent"));
            log.setLocation(ipUtil.getRegion(ip)); // Set location
            log.setCreateTime(LocalDateTime.now());
            
            visitLogService.save(log);
            
            // Optional: Clean up cache periodically or if too large (omitted for simplicity as per requirement)
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
