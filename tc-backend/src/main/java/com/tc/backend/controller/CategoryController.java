package com.tc.backend.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.tc.backend.common.Result;
import com.tc.backend.entity.Category;
import com.tc.backend.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public Result<List<Category>> list() {
        return Result.success(categoryService.list(
            new LambdaQueryWrapper<Category>().orderByAsc(Category::getSortOrder)
        ));
    }

    @PostMapping
    public Result<Boolean> save(@RequestBody Category category) {
        if (category.getId() == null) {
            category.setCreateTime(LocalDateTime.now());
            return Result.success(categoryService.save(category));
        } else {
            return Result.success(categoryService.updateById(category));
        }
    }

    @DeleteMapping("/{id}")
    public Result<Boolean> delete(@PathVariable Long id) {
        return Result.success(categoryService.removeById(id));
    }
}
