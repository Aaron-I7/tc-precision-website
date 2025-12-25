package com.tc.backend.util;

import lombok.extern.slf4j.Slf4j;
import org.lionsoul.ip2region.xdb.Searcher;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;

import jakarta.annotation.PostConstruct;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;

@Slf4j
@Component
public class IpUtil {

    private Searcher searcher;

    @PostConstruct
    public void init() {
        try {
            // Load ip2region.xdb from classpath to temp file
            ClassPathResource resource = new ClassPathResource("data/ip2region.xdb");
            if (!resource.exists()) {
                log.warn("ip2region.xdb not found in classpath");
                return;
            }

            File tempFile = File.createTempFile("ip2region", ".xdb");
            try (InputStream is = resource.getInputStream();
                 FileOutputStream os = new FileOutputStream(tempFile)) {
                FileCopyUtils.copy(is, os);
            }

            // Create searcher
            searcher = Searcher.newWithFileOnly(tempFile.getAbsolutePath());
            log.info("IpUtil initialized successfully");
        } catch (Exception e) {
            log.error("Failed to initialize IpUtil", e);
        }
    }

    public String getRegion(String ip) {
        if (searcher == null) return "Unknown";
        if ("0:0:0:0:0:0:0:1".equals(ip) || "127.0.0.1".equals(ip)) {
            return "本地访问";
        }
        try {
            // Region format: Country|Area|Province|City|ISP
            String region = searcher.search(ip);
            if (region == null) return "Unknown";
            
            // Return Province|City or just Province if City is 0
            String[] parts = region.split("\\|");
            if (parts.length >= 4) {
                String province = parts[2];
                String city = parts[3];
                if ("0".equals(city)) return province;
                return province + " " + city;
            }
            return region;
        } catch (Exception e) {
            log.warn("Failed to search IP: {}", ip, e);
            return "Unknown";
        }
    }
}