# 第一阶段：构建阶段 (这一步其实在 GitHub Actions 里做了，但保留作为 Docker 独立构建能力)
# 为了配合 GitHub Actions 的 artifact 传输模式，我们直接使用 Nginx 镜像
# 并假设 dist 目录已经存在

FROM nginx:alpine

# 复制 Nginx 配置文件
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 复制构建好的静态文件到 Nginx 目录
# 注意：docker-compose 中上下文是 tc_frontend，所以 COPY dist/ 是指 tc_frontend/dist
COPY dist/ /usr/share/nginx/html/

# 暴露 80 端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
