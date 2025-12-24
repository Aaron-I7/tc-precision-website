package com.tc.backend;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.tc.backend.mapper")
public class TcBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(TcBackendApplication.class, args);
    }

}
