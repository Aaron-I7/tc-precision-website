# 使用 OpenJDK 17 作为基础镜像
FROM openjdk:17-jdk-slim

# 设置工作目录
WORKDIR /app

# 复制编译好的 jar 包到容器中
# 注意：这里假设 GitHub Actions 已经编译好了 jar 包并传到了同级目录
COPY target/*.jar app.jar

# 暴露端口
EXPOSE 8080

# 启动命令
# 增加 JVM 参数以适应容器环境
ENTRYPOINT ["java", "-jar", "/app/app.jar", "--spring.profiles.active=prod"]
