package com.tc.backend.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.tc.backend.entity.VisitLog;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

@Mapper
public interface VisitLogMapper extends BaseMapper<VisitLog> {

    @Select("SELECT location as name, COUNT(*) as value FROM visit_log WHERE location IS NOT NULL GROUP BY location ORDER BY value DESC")
    List<Map<String, Object>> selectGeoStats();

    @Select("SELECT DATE_FORMAT(create_time, '%Y-%m-%d') as date, COUNT(*) as count FROM visit_log WHERE create_time >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) GROUP BY date ORDER BY date ASC")
    List<Map<String, Object>> selectTrendStats();
}
