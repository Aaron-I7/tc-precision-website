package com.tc.backend.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@TableName("customer_case")
public class CustomerCase {
    @TableId(type = IdType.AUTO)
    private Long id;
    private String title;
    private String industry;
    private String description;
    private String image;
    private LocalDateTime createTime;
}
