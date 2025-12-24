package com.tc.backend.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tc.backend.common.Result;
import com.tc.backend.entity.Inquiry;
import com.tc.backend.service.InquiryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final InquiryService inquiryService;

    @PostMapping
    public Result<Boolean> submit(@RequestBody Inquiry message) {
        message.setCreateTime(LocalDateTime.now());
        message.setStatus("unread");
        return Result.success(inquiryService.save(message));
    }

    // Keep this for compatibility if needed, but Admin uses InquiryController directly
    @GetMapping
    public Result<Page<Inquiry>> list(@RequestParam(defaultValue = "1") Integer page,
                                             @RequestParam(defaultValue = "10") Integer size) {
        Page<Inquiry> pageParam = new Page<>(page, size);
        return Result.success(inquiryService.page(pageParam, 
            new LambdaQueryWrapper<Inquiry>().orderByDesc(Inquiry::getCreateTime)));
    }
}
