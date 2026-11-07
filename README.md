# Cloud Engineering Lab

> **진행 중인 학습 프로젝트** · 목표: 신입 클라우드 엔지니어가 설명할 수 있는 AWS 서버 구축·운영 사례 만들기

## 현재 확인된 실습

- Ubuntu VM 생성과 OS·네트워크·시스템 기준선 확인: [작업 기록](./docs/worklogs/day01-linux-nginx.md)
- 같은 로컬 작업 기록에 파일 권한, 패키지·프로세스·자원 관찰, cron 서비스 상태 확인이 기록되어 있습니다. 각 항목의 완료 여부는 기존 과제의 검증 조건을 확인한 후 판단합니다.
- cron 중지·복구, Nginx 서비스 운영 및 AWS 인프라 구축은 이 기록에서 완료를 확인하지 못했습니다.
- 아래 아키텍처, AWS 구성과 자동화는 **계획**이며 실제로 구축했다는 뜻이 아닙니다. 완료 상태는 실행 결과와 기록으로 갱신합니다.

## 첫 번째 목표: AWS 웹 서비스 운영 MVP

Ubuntu VM에서 Nginx를 이해한 뒤 EC2에서 작은 웹 서비스를 실행하고, 접속 경로와 상태를 확인하며 중단·복구 과정을 기록합니다.

```text
브라우저 → 인터넷 → AWS VPC / 라우팅 / 보안 그룹 → EC2 Ubuntu → Nginx
                                                    ↓
                                      서비스 로그 · CloudWatch 지표
```

**완료 기준**

- [ ] 로컬 Ubuntu에서 Nginx 응답과 서비스 상태를 확인하고 중단·복구를 기록한다.
- [ ] AWS 계정 보안 및 비용을 검토하고 VPC·서브넷·라우팅·보안 그룹과 EC2를 구성한다.
- [ ] EC2의 Nginx에 접속하고, 요청 경로와 필요한 접근 규칙을 설명한다.
- [ ] CloudWatch 지표를 확인하고 알림 동작을 시험한다.
- [ ] 실제 수행한 장애 한 건의 증상·확인·원인·조치·복구 검증을 기록한다.
- [ ] 실습 리소스와 비용을 확인하고 사용 후 정리한다.

상태 점검 스크립트, Terraform, CI/CD는 MVP의 필수가 아닙니다. MVP를 이해하고 재현할 수 있게 된 후 추가합니다. 정적 사이트·서버리스 API는 별도 선택 심화입니다.

## 4주 집중 계획

일주일에 한 목표씩 진행합니다. 하루 30~60분씩 1~2블록으로 나누고, 시간이 부족하면 과제를 다음 날로 미룹니다. 주차는 추정이며 실행·확인한 결과만 완료로 표시합니다.

| 주차 | 목표 | 주간 완료 기준 |
|---|---|---|
| 1 | 로컬 Ubuntu·Nginx 운영 | 서비스 응답 확인 및 중단·복구 기록 |
| 2 | 네트워크와 AWS 준비 | HTTP 요청 경로 설명, 계정 보안·비용·정리 계획 |
| 3 | AWS EC2 웹 서버 | VPC·보안 그룹 경로를 이해하고 EC2 Nginx 응답 확인 |
| 4 | 상태 확인과 장애 기록 | 지표 확인, 장애 한 건과 복구 검증, 실습 리소스 정리 |

[상세 학습 로드맵](./docs/roadmap/cloud-engineering-roadmap.md) · [기존 진행도 대시보드](./frontend/)

대시보드는 기존 11개 Phase·66개 Task의 장기 목록을 그대로 표시합니다. 브라우저에서 수동으로 체크하는 개인 기록이며 실습 결과를 자동 검증하지 않습니다. 현재 우선순위는 위 4주 계획을 따릅니다.

## 장기 비전과 기존 계획

아래의 서버리스 아키텍처와 기술 목록은 **선택 심화 계획**입니다. 첫 번째 AWS 운영 MVP를 마친 뒤 필요할 때 선택하며, 아직 구축된 결과물이 아닙니다.


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
Network / HTTP
     │
     ▼
AWS IAM / VPC / EC2
     │
     ▼
S3 / CloudFront / DNS
     │
     ▼
API Gateway / Lambda / DynamoDB
     │
     ▼
Docker / Compose
     │
     ▼
Terraform
     │
     ▼
GitHub Actions
     │
     ▼
CloudWatch / Incident Response
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
- Amazon VPC
- Amazon EC2
- Docker
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

## 계획된 구현 항목 (미완료)

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

## 장기 계획상 저장소 구조 (현재 존재하지 않는 항목 포함)

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

## 기존 장기 계획의 현재 상태 (참고)

전체 과정은 부트캠프 공통 역량을 반영한 11개 Phase, 66개 Task로 관리합니다.

- [상세 학습 로드맵](./docs/roadmap/cloud-engineering-roadmap.md)
- 개인 진행도 대시보드: `frontend/`

### Phase 01 — Linux · OS Foundations

현재 Linux 기반 로컬 인프라 환경부터 단계적으로 구축하고 있습니다.

- [x] Ubuntu VM과 시스템 기준선 확인
- [ ] 파일시스템과 권한 실습
- [ ] 패키지·프로세스·자원 관찰
- [ ] systemd 서비스 수명주기 확인
- [ ] Nginx 정적 페이지와 HTTP 검증
- [ ] Nginx 중지 장애 진단과 복구

로컬 작업 기록에 권한 및 자원 관찰이 추가되어 있으므로 세부 과제별 증거를 확인합니다. 집중 계획의 다음 목표는 로컬 Nginx 확인과 장애 복구입니다.

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
