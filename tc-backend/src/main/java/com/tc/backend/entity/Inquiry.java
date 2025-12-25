package com.tc.backend.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@TableName("inquiry")
public class Inquiry {
    @TableId(type = IdType.AUTO)
    private Long id;
    private String name;
    private String phone;
    private String email;
    private String content;
    private String attachment; // URL to uploaded file
    private String status; // e.g., 'unread', 'read', 'processed'
    private LocalDateTime createTime;
}
