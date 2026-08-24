# Cloud Engineering Lab

클라우드 엔지니어 직무를 직접 체험하기 위해 진행하는 실습형 프로젝트입니다.

단순히 AWS 서비스를 한 번씩 사용해보는 것이 아니라, 실제 서비스를 **배포하고, 자동화하고, 모니터링하고, 장애를 진단하고 복구하는 과정**을 직접 경험하는 것을 목표로 합니다.

이 프로젝트는 **Cloud Resume Challenge**를 참고하되, 단순 포트폴리오 웹사이트 구축보다 **Cloud / Infrastructure / DevOps / SRE 기초 실무 경험**에 더 초점을 맞춰 확장합니다.

---

## 프로젝트 목표

이 프로젝트의 목적은 복잡한 애플리케이션을 만드는 것이 아닙니다.

하나의 서비스가 실제로 어떻게:

- 서버에 올라가는지
- 사용자 요청을 받는지
- 클라우드에 배포되는지
- 반복 작업을 자동화하는지
- 상태를 모니터링하는지
- 장애가 발생했을 때 어떻게 원인을 찾는지
- 어떻게 복구하는지
- 문제 해결 과정을 어떻게 문서화하는지

를 직접 경험하는 것이 핵심입니다.

로컬 Linux 환경에서 시작해 AWS 기반 클라우드 환경까지 단계적으로 확장합니다.

---

## 학습 범위

프로젝트를 진행하며 다음 영역을 학습합니다.

- Linux 서버 운영
- 네트워크 및 HTTP 기초
- Nginx
- AWS
- S3
- CloudFront
- IAM
- API Gateway
- Lambda
- DynamoDB
- Infrastructure as Code
- Terraform
- CI/CD
- GitHub Actions
- 모니터링 및 로깅
- CloudWatch
- 장애 대응
- 트러블슈팅
- Runbook 및 Incident Report 작성

---

## 목표 아키텍처

프로젝트는 최종적으로 아래와 같은 구조까지 확장하는 것을 목표로 합니다.

```text
                        Internet
                           │
                           ▼
                      CloudFront
                           │
                ┌──────────┴──────────┐
                │                     │
                ▼                     ▼
               S3                API Gateway
                │                     │
                │                     ▼
        Portfolio Website          Lambda
                                      │
                                      ▼
                                  DynamoDB


GitHub
   │
   ▼
GitHub Actions
   │
   ├── Test
   └── Deploy


Terraform
   │
   └── AWS Infrastructure


CloudWatch
   │
   ├── Logs
   ├── Metrics
   └── Alerts
```

위 구조를 처음부터 한 번에 구현하지 않고, 각 단계를 직접 이해하면서 점진적으로 확장합니다.

---

## 프로젝트 로드맵

### Phase 0 — Linux 및 인프라 기초

클라우드로 넘어가기 전에 로컬 서버 환경에서 기본적인 서버 운영을 경험합니다.

주요 학습 내용:

- Ubuntu
- Linux Process
- systemd
- Port
- HTTP
- Nginx
- Log
- 기본적인 장애 진단

실습할 장애 예시:

- Nginx 서비스 중지
- Port Listener 없음
- Nginx 설정 오류
- HTTP 연결 실패

---

### Phase 1 — AWS 정적 웹사이트 배포

AWS를 사용해 간단한 포트폴리오 웹사이트를 배포합니다.

```text
Browser
   │
   ▼
CloudFront
   │
   ▼
S3
```

주요 학습 내용:

- S3
- CloudFront
- Static Website Hosting
- CDN
- Cache
- HTTPS
- Origin

---

### Phase 2 — Serverless Backend 구축

간단한 Backend API를 추가합니다.

```text
Browser
   │
   ▼
API Gateway
   │
   ▼
Lambda
   │
   ▼
DynamoDB
```

초기 기능 예시:

```text
GET /visitors
```

웹사이트 방문자 수를 조회하거나 증가시키는 간단한 API를 구현합니다.

주요 학습 내용:

- API Gateway
- AWS Lambda
- Python
- DynamoDB
- IAM Permission

---

### Phase 3 — Infrastructure as Code

AWS Console에서 생성했던 리소스를 Terraform으로 관리합니다.

```text
Terraform
   │
   ▼
AWS Infrastructure
```

주요 학습 내용:

- Terraform
- Provider
- Resource
- Variable
- Output
- State
- Infrastructure Lifecycle

직접 만든 인프라를 코드로 재현할 수 있는 상태를 목표로 합니다.

---

### Phase 4 — CI/CD

GitHub Actions를 사용해 테스트와 배포를 자동화합니다.

```text
git push
   │
   ▼
GitHub Actions
   │
   ├── Test
   ├── Validate
   ├── Deploy
   └── Smoke Test
```

주요 학습 내용:

- CI/CD
- GitHub Actions
- 자동 배포
- 배포 검증
- 실패 시 Pipeline 중단

---

### Phase 5 — Monitoring & Observability

서비스와 인프라의 상태를 관찰할 수 있도록 모니터링을 추가합니다.

초기 모니터링 항목:

- Request Count
- Error Count
- Lambda Error
- Lambda Duration
- API Error
- Deployment Failure

사용 도구:

- Amazon CloudWatch
- CloudWatch Logs
- CloudWatch Metrics
- CloudWatch Alarms

---

### Phase 6 — Incident Response

일부러 장애를 발생시키고 직접 원인을 분석합니다.

예상 Incident:

```text
INC-001 Nginx Service Down
INC-002 CloudFront Access Denied
INC-003 Lambda Permission Error
INC-004 API Gateway 5xx Error
INC-005 Terraform Deployment Failure
INC-006 GitHub Actions Deployment Failure
```

각 Incident는 다음 형식으로 기록합니다.

- 증상
- 탐지 방법
- 조사 과정
- Root Cause
- 해결 방법
- 복구 확인
- 재발 방지 / 개선 방법

---

## Repository 구조

프로젝트는 아래와 같은 구조로 관리합니다.

```text
cloud-engineering-lab/
│
├── docs/
│   ├── architecture/
│   │
│   ├── incidents/
│   │
│   ├── runbooks/
│   │
│   └── worklogs/
│
├── frontend/
│
├── backend/
│
├── terraform/
│
├── .github/
│   └── workflows/
│
├── README.md
└── .gitignore
```

프로젝트를 진행하면서 필요한 디렉터리를 단계적으로 추가합니다.

---

## 기록 방식

이 프로젝트에서는 최종 결과물뿐 아니라 **문제를 해결해 나가는 과정 자체를 중요하게 기록합니다.**

### Worklog

매일 진행한 작업과 학습 내용을 아래 디렉터리에 기록합니다.

```text
docs/worklogs/
```

예시:

```text
day01-linux-nginx.md
day02-aws-s3.md
day03-cloudfront.md
```

각 Worklog에는 다음 내용을 기록합니다.

- 오늘의 목표
- 구현한 내용
- 사용한 명령어 및 설정
- 발생한 문제
- 문제를 확인한 과정
- 해결 방법
- 배운 점
- 다음 작업

---

## Incident Report

장애와 트러블슈팅 과정은 아래 디렉터리에 기록합니다.

```text
docs/incidents/
```

기본 형식:

```markdown
# INC-001: Nginx Service Down

## 증상

## 탐지

## 조사 과정

## Root Cause

## 해결

## 복구 확인

## 재발 방지 / 개선
```

단순히 오류 메시지만 기록하지 않고, **어떤 순서로 문제를 확인했고 어떤 근거로 원인을 판단했는지**를 남기는 것을 목표로 합니다.

---

## Architecture 기록

아키텍처 변화와 주요 설계 결정은 아래 디렉터리에 기록합니다.

```text
docs/architecture/
```

프로젝트가 발전하면서 아키텍처 다이어그램도 함께 업데이트합니다.

예:

```text
v1-local-nginx.md
v2-s3-cloudfront.md
v3-serverless-backend.md
```

---

## Runbook

반복적으로 수행할 수 있는 운영 절차는 아래 디렉터리에 기록합니다.

```text
docs/runbooks/
```

예:

```text
service-recovery.md
deployment.md
incident-response.md
```

누군가 같은 장애를 다시 만났을 때 문서만 보고 대응할 수 있는 수준으로 작성하는 것을 목표로 합니다.

---

## 현재 진행 상황

### Day 01 — Linux & Nginx

- [ ] Ubuntu 서버 환경 구성
- [ ] Linux 기본 명령어 확인
- [ ] Nginx 설치
- [ ] 정적 페이지 배포
- [ ] HTTP 연결 확인
- [ ] Listening Port 확인
- [ ] Nginx 서비스 의도적으로 중지
- [ ] Service / Port / Log 기반으로 장애 진단
- [ ] 서비스 복구
- [ ] Incident Report 작성
- [ ] Worklog 작성

---

## Troubleshooting 기본 흐름

프로젝트 전반에서 아래 순서로 장애를 확인하는 습관을 익히는 것을 목표로 합니다.

```text
Incident 발생
   │
   ▼
증상 확인
   │
   ▼
Service / Process 확인
   │
   ▼
Network / Port 확인
   │
   ▼
Logs / Metrics 확인
   │
   ▼
가설 수립
   │
   ▼
Root Cause 확인
   │
   ▼
수정
   │
   ▼
복구 검증
   │
   ▼
재발 방지 문서화
```

---

## AI 사용 원칙

AI는 프로젝트를 대신 구현하는 용도가 아니라 학습과 문제 해결을 보조하는 도구로 사용합니다.

AI를 활용하는 영역:

- 개념 설명
- 디버깅 힌트
- 작성한 설정 리뷰
- 코드 리뷰
- 아키텍처 리뷰
- 놓친 Edge Case 확인
- 면접 질문 및 복습

가능하면 AI에게 맡기지 않는 영역:

- Terraform 전체 코드 자동 생성
- CI/CD Workflow 전체 생성
- Nginx 설정 전체 생성
- 발생한 장애의 즉시 해결
- README 및 Incident Report 전체 자동 작성

핵심 인프라 설정은 먼저 직접 작성하고 이해한 뒤 AI에게 리뷰를 요청하는 방식으로 진행합니다.

---

## 이 프로젝트를 통해 확인하고 싶은 것

프로젝트가 끝났을 때 다음 질문에 직접 답할 수 있는 상태를 목표로 합니다.

- 사용자의 HTTP 요청은 어떤 과정을 거쳐 서비스에 도달하는가?
- Linux에서 Process와 Service는 어떻게 관리되는가?
- Port는 어떤 역할을 하는가?
- Nginx는 어떤 역할을 하는가?
- AWS의 각 리소스는 어떻게 연결되는가?
- IAM Permission이 잘못되면 어떤 문제가 발생하는가?
- 왜 Infrastructure as Code를 사용하는가?
- CI/CD는 어떤 반복 작업을 줄여주는가?
- 서비스 장애를 어떻게 감지할 수 있는가?
- 로그와 Metric을 이용해 어떻게 장애 원인을 찾는가?
- 장애가 발생했을 때 어떤 순서로 대응해야 하는가?
- 같은 장애가 다시 발생하지 않도록 어떻게 개선할 수 있는가?

최종적으로 이 프로젝트를 통해 **Cloud / Infrastructure / DevOps 직무가 나에게 맞는지 직접 경험하고 판단하는 것**을 목표로 합니다.
