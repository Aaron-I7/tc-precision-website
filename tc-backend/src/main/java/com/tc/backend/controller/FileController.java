package com.tc.backend.controller;

import com.tc.backend.common.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/file")
public class FileController {

    private static final String UPLOAD_DIR = "uploads/";

    @PostMapping("/upload")
    public Result<String> upload(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return Result.error(400, "File is empty");
        }

        // Create upload directory if it doesn't exist
        File dir = new File(UPLOAD_DIR);
        if (!dir.exists()) {
            dir.mkdirs();
        }

        try {
            // Generate unique filename
            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename != null && originalFilename.contains(".") 
                    ? originalFilename.substring(originalFilename.lastIndexOf(".")) 
                    : "";
            String filename = UUID.randomUUID().toString() + extension;
            
            // Save file
            File dest = new File(dir.getAbsolutePath() + File.separator + filename);
            file.transferTo(dest);
            
            // Return Relative URL (Handled by Frontend Proxy or Nginx)
            String url = "/uploads/" + filename;
            return Result.success(url);
        } catch (IOException e) {
            log.error("File upload failed", e);
            return Result.error(500, "Upload failed: " + e.getMessage());
        }
    }
}
