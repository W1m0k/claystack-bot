FROM node:14-alpine
RUN apk add --no-cache bash
WORKDIR /claystack
COPY package.json package.json
RUN npm install && npm install -g pm2
COPY . .

# Configure pm2 log to be in GMT+7 timezone
ENV TZ=Asia/Bangkok
ENV CRON_TZ=Asia/Bangkok
RUN chmod +x scripts/*.sh
RUN /usr/bin/crontab crontab.txt
RUN pm2 start /claystack/claystack-pm2.config.js --only "healthcheck"

ENTRYPOINT ["./scripts/entrypoint.sh"]
