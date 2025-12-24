package com.tc.backend.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.tc.backend.entity.Category;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CategoryMapper extends BaseMapper<Category> {
}
