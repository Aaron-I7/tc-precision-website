package com.tc.backend.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.tc.backend.common.Result;
import com.tc.backend.entity.ContentItem;
import com.tc.backend.service.ContentItemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/content")
@RequiredArgsConstructor
public class ContentController {

    private final ContentItemService contentItemService;

    @GetMapping("/{section}")
    public Result<List<ContentItem>> getBySection(@PathVariable String section) {
        return Result.success(contentItemService.list(new LambdaQueryWrapper<ContentItem>()
                .eq(ContentItem::getSection, section)
                .orderByAsc(ContentItem::getSortOrder)));
    }

    @GetMapping("/all")
    public Result<List<ContentItem>> getAll() {
        List<ContentItem> list = contentItemService.list(new LambdaQueryWrapper<ContentItem>()
                .orderByAsc(ContentItem::getSection)
                .orderByAsc(ContentItem::getSortOrder));
        log.info("Fetching all content items, count: {}", list.size());
        return Result.success(list);
    }

    @PostMapping
    public Result<Boolean> update(@RequestBody ContentItem contentItem) {
        return Result.success(contentItemService.updateById(contentItem));
    }
}
