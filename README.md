# Cloud Engineering Lab

AWS 기반 웹 서비스를 구축하고, 인프라 구성부터 배포 자동화, 모니터링, 장애 대응까지 단계적으로 구현하는 Cloud Engineering 프로젝트입니다.

본 프로젝트는 Cloud Resume Challenge의 구조를 참고하되, 단순 정적 웹사이트 배포를 넘어 **Infrastructure as Code, CI/CD, Observability, Incident Response**까지 확장하여 실제 Cloud / DevOps 환경에서 요구되는 운영 경험을 구현하는 것을 목표로 합니다.

---

## Overview

### Project Objective

클라우드 환경에서 서비스가 배포되고 운영되는 전체 흐름을 직접 구현합니다.

주요 목표는 다음과 같습니다.

- AWS 기반 서비스 아키텍처 설계 및 구축
- Linux 기반 서버 운영 및 트러블슈팅
- AWS 리소스 구성 및 권한 관리
- Terraform 기반 Infrastructure as Code 구현
- GitHub Actions 기반 CI/CD 자동화
- CloudWatch 기반 로그 및 메트릭 모니터링
- 장애 상황 재현 및 Incident Response 수행
- 운영 과정과 기술적 의사결정 문서화

---

## Architecture

최종적으로 아래와 같은 Serverless 기반 AWS 아키텍처를 구성합니다.

```text
                         Internet
                            │
                            ▼
                       CloudFront
                            │
                ┌───────────┴───────────┐
                │                       │
                ▼                       ▼
               S3                  API Gateway
                │                       │
                │                       ▼
        Static Web Application        Lambda
                                        │
                                        ▼
                                    DynamoDB


                ┌─────────────────────────────┐
                │                             │
                ▼                             ▼
           GitHub Actions                 Terraform
                │                             │
                ▼                             ▼
        CI/CD Automation             AWS Infrastructure


                            │
                            ▼
                        CloudWatch
                     Logs / Metrics / Alarms
```

---

## Architecture Evolution

프로젝트는 한 번에 모든 인프라를 구축하지 않고, 아래 단계로 점진적으로 확장합니다.

```text
Local Linux
     │
     ▼
Nginx Web Server
     │
     ▼
AWS S3
     │
     ▼
CloudFront
     │
     ▼
API Gateway
     │
     ▼
Lambda
     │
     ▼
DynamoDB
     │
     ▼
Terraform
     │
     ▼
GitHub Actions
     │
     ▼
CloudWatch
```

각 단계에서 정상 동작뿐 아니라 장애 상황을 재현하고, 원인 분석 및 복구 과정을 문서화합니다.

---

## Tech Stack

### Cloud

- AWS
- Amazon S3
- Amazon CloudFront
- Amazon API Gateway
- AWS Lambda
- Amazon DynamoDB
- Amazon CloudWatch
- AWS IAM

### Infrastructure

- Linux
- Ubuntu
- Nginx
- Terraform

### CI/CD

- GitHub Actions
- GitHub

### Backend

- Python
- AWS Lambda

### Monitoring

- CloudWatch Logs
- CloudWatch Metrics
- CloudWatch Alarms

---

## Key Implementations

### 1. Linux Web Server Operation

Ubuntu 환경에서 Nginx 기반 웹 서버를 구성하고 서비스 상태와 네트워크 연결을 직접 확인합니다.

주요 작업:

- Nginx 설치 및 서비스 관리
- HTTP 요청 처리 확인
- Listening Port 확인
- Process / Service 상태 점검
- 로그 기반 장애 원인 분석

사용한 주요 도구:

```bash
systemctl
ss
curl
journalctl
tail
```

---

### 2. Static Web Hosting on AWS

정적 웹 페이지를 Amazon S3에 배포하고 CloudFront를 통해 외부에 제공합니다.

구성:

```text
Client
   │
   ▼
CloudFront
   │
   ▼
S3
```

주요 고려사항:

- S3 직접 공개 최소화
- CloudFront를 통한 콘텐츠 전달
- HTTPS 적용
- Cache 활용

---

### 3. Serverless API

API Gateway와 Lambda를 사용해 간단한 Serverless Backend를 구성합니다.

```text
Client
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

예시 기능:

```http
GET /visitors
```

웹사이트 방문 횟수를 DynamoDB에 저장하고 조회합니다.

---

### 4. Infrastructure as Code

AWS Console에서 직접 생성한 인프라를 Terraform 코드로 전환합니다.

관리 대상:

- S3
- CloudFront
- API Gateway
- Lambda
- DynamoDB
- IAM

Terraform을 통해 동일한 인프라를 재현할 수 있도록 구성합니다.

```bash
terraform init
terraform validate
terraform plan
terraform apply
```

---

### 5. CI/CD Automation

GitHub Actions를 사용하여 코드 변경 이후 테스트와 배포를 자동화합니다.

```text
git push
   │
   ▼
GitHub Actions
   │
   ├── Test
   ├── Terraform Validate
   ├── Deploy
   └── Smoke Test
```

목표는 수동 배포 과정에서 발생할 수 있는 반복 작업과 실수를 줄이는 것입니다.

---

### 6. Monitoring & Observability

CloudWatch를 사용하여 서비스 상태를 관찰합니다.

주요 모니터링 대상:

- API Request
- Lambda Error
- Lambda Duration
- Application Logs
- Deployment Failure

향후 CloudWatch Alarm을 통해 주요 장애를 자동 탐지하도록 확장합니다.

---

## Incident Response

프로젝트에서는 정상적인 인프라 구축뿐 아니라 실제 운영 환경에서 발생할 수 있는 장애를 의도적으로 재현합니다.

각 장애는 아래 형식으로 기록합니다.

```text
Symptom
   ↓
Detection
   ↓
Investigation
   ↓
Root Cause
   ↓
Resolution
   ↓
Verification
   ↓
Prevention
```

예정된 Incident Scenario:

| ID      | Incident                          | 주요 확인 영역         |
| ------- | --------------------------------- | ---------------------- |
| INC-001 | Nginx Service Down                | Linux / Process / Port |
| INC-002 | CloudFront Access Denied          | S3 / CloudFront / IAM  |
| INC-003 | Lambda Permission Error           | IAM                    |
| INC-004 | API Gateway 5xx                   | API Gateway / Lambda   |
| INC-005 | Terraform Deployment Failure      | IaC                    |
| INC-006 | GitHub Actions Deployment Failure | CI/CD                  |

실제 장애 분석 기록은 [`docs/incidents`](./docs/incidents)에서 관리합니다.

---

## Troubleshooting Strategy

장애 발생 시 아래 순서로 문제를 분석합니다.

```text
1. 증상 확인
      │
      ▼
2. Service / Process 확인
      │
      ▼
3. Network / Port 확인
      │
      ▼
4. Logs / Metrics 확인
      │
      ▼
5. 가설 수립
      │
      ▼
6. Root Cause 확인
      │
      ▼
7. 수정 및 복구
      │
      ▼
8. 정상 동작 검증
      │
      ▼
9. 재발 방지
```

단순히 문제를 해결하는 것보다 **어떤 정보와 근거를 통해 원인을 좁혀갔는지**를 기록하는 것을 중요하게 다룹니다.

---

## Documentation

프로젝트 진행 과정은 다음 구조로 관리합니다.

```text
docs/
├── architecture/
│   └── 아키텍처 및 설계 변경 기록
│
├── incidents/
│   └── 장애 분석 및 복구 기록
│
├── runbooks/
│   └── 반복 가능한 운영 절차
│
└── worklogs/
    └── 구현 및 실습 기록
```

### Incident Report

각 장애는 다음 내용을 기록합니다.

- Symptom
- Detection
- Investigation
- Root Cause
- Resolution
- Verification
- Prevention

### Runbook

반복적으로 수행되는 운영 절차를 문서화합니다.

예:

- Deployment
- Service Recovery
- Incident Response

---

## Repository Structure

```text
cloud-engineering-lab/
│
├── frontend/
│
├── backend/
│
├── terraform/
│
├── docs/
│   ├── architecture/
│   ├── incidents/
│   ├── runbooks/
│   └── worklogs/
│
├── .github/
│   └── workflows/
│
├── README.md
└── .gitignore
```

---

## Current Status

### Phase 0 — Linux & Infrastructure

현재 Linux 기반 로컬 인프라 환경부터 단계적으로 구축하고 있습니다.

- [ ] Ubuntu 환경 구성
- [ ] Nginx 웹 서버 구축
- [ ] HTTP 통신 확인
- [ ] Process / Port / Log 확인
- [ ] Nginx 장애 재현
- [ ] Incident Report 작성

### Next

- [ ] S3 Static Website Hosting
- [ ] CloudFront 구성
- [ ] Serverless API 구축
- [ ] Terraform IaC 전환
- [ ] GitHub Actions CI/CD 구축
- [ ] CloudWatch Monitoring 구성

---

## What This Project Demonstrates

본 프로젝트를 통해 다음 역량을 실제 구현 결과와 문서로 증명하는 것을 목표로 합니다.

- Linux 기반 서비스 운영
- 기본적인 HTTP / Network 트러블슈팅
- AWS 서비스 구성 및 연동
- IAM 기반 권한 관리
- Infrastructure as Code
- CI/CD Pipeline 구축
- Cloud Monitoring
- 장애 분석 및 복구
- 기술적 의사결정 및 운영 문서 작성

---

## Reference

본 프로젝트는 다음 프로젝트에서 아이디어를 참고했습니다.

- Cloud Resume Challenge

원본 프로젝트를 그대로 구현하는 것이 아니라, Cloud / Infrastructure / DevOps 직무 경험에 맞도록 운영, 자동화, 모니터링, 장애 대응 영역을 추가하여 진행합니다.
