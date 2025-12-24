package com.tc.backend.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tc.backend.entity.Product;
import com.tc.backend.mapper.ProductMapper;
import org.springframework.stereotype.Service;

@Service
public class ProductService extends ServiceImpl<ProductMapper, Product> {
}
