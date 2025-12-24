# --- 构建阶段 ---
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# 1. 优化依赖缓存：先只复制 pom.xml 下载依赖
COPY pom.xml .
# 配置阿里云 Maven 镜像加速 (可选，为了国内服务器构建速度)
RUN echo '<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" \
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" \
    xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 https://maven.apache.org/xsd/settings-1.0.0.xsd"> \
    <mirrors> \
        <mirror> \
            <id>aliyunmaven</id> \
            <mirrorOf>*</mirrorOf> \
            <name>阿里云公共仓库</name> \
            <url>https://maven.aliyun.com/repository/public</url> \
        </mirror> \
    </mirrors> \
</settings>' > /usr/share/maven/conf/settings.xml

# 下载依赖 (利用 Docker 缓存)
RUN mvn dependency:go-offline -B

# 2. 复制源码并构建
COPY src ./src
RUN mvn clean package -DskipTests

# --- 运行阶段 ---
FROM openjdk:17-jdk-slim
WORKDIR /app

# 从构建阶段复制 jar 包
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar", "--spring.profiles.active=prod"]
