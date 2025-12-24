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
@RequestMapping("/api/inquiries")
@RequiredArgsConstructor
public class InquiryController {

    private final InquiryService inquiryService;

    @GetMapping
    public Result<Page<Inquiry>> list(@RequestParam(defaultValue = "1") Integer page,
                                      @RequestParam(defaultValue = "10") Integer size) {
        Page<Inquiry> pageParam = new Page<>(page, size);
        return Result.success(inquiryService.page(pageParam, 
            new LambdaQueryWrapper<Inquiry>().orderByDesc(Inquiry::getCreateTime)));
    }

    @PostMapping
    public Result<Boolean> save(@RequestBody Inquiry inquiry) {
        if (inquiry.getId() == null) {
            inquiry.setCreateTime(LocalDateTime.now());
            if (inquiry.getStatus() == null) {
                inquiry.setStatus("unread");
            }
            return Result.success(inquiryService.save(inquiry));
        } else {
            return Result.success(inquiryService.updateById(inquiry));
        }
    }

    @DeleteMapping("/{id}")
    public Result<Boolean> delete(@PathVariable Long id) {
        return Result.success(inquiryService.removeById(id));
    }
}
