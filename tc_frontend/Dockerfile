# --- 构建阶段 ---
FROM node:18 AS build
WORKDIR /app

# 1. 优化依赖缓存
COPY package*.json ./
# 配置淘宝/阿里云 NPM 镜像加速
RUN npm config set registry https://registry.npmmirror.com
RUN npm install

# 2. 复制源码并构建
COPY . .
RUN npm run build

# --- 运行阶段 ---
FROM nginx:alpine

# 复制 Nginx 配置文件
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 从构建阶段复制构建产物
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
