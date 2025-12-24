package com.tc.backend.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("content_item")
public class ContentItem {
    @TableId(type = IdType.AUTO)
    private Long id;
    private String section;
    private String title;
    private String description;
    private String icon;
    private String image;
    private Integer sortOrder;
}
