# 1단계: Vite로 React 앱 빌드
FROM node:22-alpine AS builder

WORKDIR /app

# 패키지 캐싱을 위한 package.json 먼저 복사
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# 전체 소스 복사 및 빌드
COPY . .
RUN npm run build

# 2단계: Nginx에서 정적 파일 서빙
FROM nginx:1.25-alpine

# 빌드 결과물을 Nginx 정적 루트로 복사
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# (선택) Nginx 커스텀 설정이 있다면 여기에 복사
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
