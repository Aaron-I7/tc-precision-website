package com.tc.backend.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tc.backend.common.Result;
import com.tc.backend.entity.CustomerCase;
import com.tc.backend.service.CustomerCaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/cases")
@RequiredArgsConstructor
public class CaseController {

    private final CustomerCaseService customerCaseService;

    @GetMapping
    public Result<Page<CustomerCase>> list(@RequestParam(defaultValue = "1") Integer page,
                                           @RequestParam(defaultValue = "10") Integer size) {
        Page<CustomerCase> pageParam = new Page<>(page, size);
        return Result.success(customerCaseService.page(pageParam, 
            new LambdaQueryWrapper<CustomerCase>().orderByDesc(CustomerCase::getCreateTime)));
    }

    @PostMapping
    public Result<Boolean> save(@RequestBody CustomerCase customerCase) {
        if (customerCase.getId() == null) {
            customerCase.setCreateTime(LocalDateTime.now());
            return Result.success(customerCaseService.save(customerCase));
        } else {
            return Result.success(customerCaseService.updateById(customerCase));
        }
    }

    @DeleteMapping("/{id}")
    public Result<Boolean> delete(@PathVariable Long id) {
        return Result.success(customerCaseService.removeById(id));
    }
}
