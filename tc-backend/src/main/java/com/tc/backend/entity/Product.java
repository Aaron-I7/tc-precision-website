package com.tc.backend.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Map;

@Data
@TableName(value = "product", autoResultMap = true)
public class Product {
    @TableId(type = IdType.AUTO)
    private Long id;
    private String name;
    private String sku;
    private String category;
    private BigDecimal price;
    private String status;
    private String image;
    private String description;
    
    @TableField(typeHandler = JacksonTypeHandler.class)
    private Map<String, String> specs;
    
    private Boolean isFeatured;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
