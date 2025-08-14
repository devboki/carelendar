.PHONY: dev build down logs

# 개발용 실행 (dev compose)
dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build

# 개발용 빌드만 (container를 띄우진 않음)
build:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml build

# 컨테이너 종료 및 정리
down:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml down

# 로그 보기
logs:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml logs -f

debug:
	docker compose -f docker-compose.yml -f docker-compose.debug.yml down
	docker compose -f docker-compose.yml -f docker-compose.debug.yml up --build
