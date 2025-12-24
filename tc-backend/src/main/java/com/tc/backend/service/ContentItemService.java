package com.tc.backend.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tc.backend.entity.ContentItem;
import com.tc.backend.mapper.ContentItemMapper;
import org.springframework.stereotype.Service;

@Service
public class ContentItemService extends ServiceImpl<ContentItemMapper, ContentItem> {
}
