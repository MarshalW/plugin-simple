FROM registry.cn-shanghai.aliyuncs.com/nocobase/nocobase:1.9.32-full

# 1. 设置工作目录（官方镜像已是 /app）
WORKDIR /simple-app

# 2. 配置 npm 指向内网 verdaccio
# 推荐用 build-arg，避免写死
ARG NPM_REGISTRY=http://verdaccio

RUN echo "registry=${NPM_REGISTRY}" > .npmrc \
  && echo "strict-ssl=false" >> .npmrc

# 3. 安装你的私有插件
ARG APP_VERSION
RUN yarn add @marshal/plugin-simple-service@${APP_VERSION}

RUN yarn add @marshal/plugin-snapshot

# 使用自定义的启动脚本
COPY ./scripts/start.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

WORKDIR /app


