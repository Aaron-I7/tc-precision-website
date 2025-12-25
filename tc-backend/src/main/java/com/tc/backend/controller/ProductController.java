package com.tc.backend.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tc.backend.common.Result;
import com.tc.backend.entity.Product;
import com.tc.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public Result<Page<Product>> list(@RequestParam(defaultValue = "1") Integer page,
                                      @RequestParam(defaultValue = "10") Integer size,
                                      @RequestParam(required = false) String category,
                                      @RequestParam(required = false) String search,
                                      @RequestParam(required = false) Boolean featured,
                                      @RequestParam(required = false) String status) {
        
        Page<Product> pageParam = new Page<>(page, size);
        LambdaQueryWrapper<Product> wrapper = new LambdaQueryWrapper<>();
        
        if (StringUtils.hasText(category)) {
            wrapper.eq(Product::getCategory, category);
        }
        if (StringUtils.hasText(search)) {
            wrapper.like(Product::getName, search);
        }
        if (featured != null) {
            wrapper.eq(Product::getIsFeatured, featured);
        }
        if (StringUtils.hasText(status)) {
            wrapper.eq(Product::getStatus, status);
        }
        
        wrapper.orderByDesc(Product::getCreateTime);
        
        return Result.success(productService.page(pageParam, wrapper));
    }

    @GetMapping("/{id}")
    public Result<Product> getById(@PathVariable Long id) {
        return Result.success(productService.getById(id));
    }

    @PostMapping
    public Result<Boolean> save(@RequestBody Product product) {
        return Result.success(productService.saveOrUpdate(product));
    }

    @DeleteMapping("/{id}")
    public Result<Boolean> delete(@PathVariable Long id) {
        return Result.success(productService.removeById(id));
    }
}
