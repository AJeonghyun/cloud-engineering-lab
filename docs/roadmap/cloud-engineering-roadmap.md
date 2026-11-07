# Cloud Engineering Lab Roadmap

## 우선 목표: 클라우드 운영 MVP

신입 클라우드 엔지니어 취업 준비를 위해 Linux → 네트워크 → AWS EC2 → 모니터링·장애 대응을 먼저 연결한다. 기존 11개 Phase는 장기 학습 목록으로 보존하며, **66개를 모두 마쳐야 첫 프로젝트가 완성되는 것은 아니다.** 서버리스·컨테이너·IaC·CI/CD는 MVP 이후 선택한다.

현재 로컬 worklog에는 VM 기준선 외에 권한, 자원 관찰, cron 상태 확인이 기록되어 있다. 세부 완료 판단은 각 Task의 증거 조건에 따라 하며, cron 중지·복구는 기록상 예정 상태다. 대시보드는 기존 장기 과제를 수동 체크하므로 이 집중 계획의 자동 검증 도구는 아니다.

## 4주 집중 계획

매주 결과 하나를 완성한다. 하루 30~60분 블록 1~2개로 나누고, 이전 실습 기록이 있다면 결과를 검토한 뒤 필요한 부분만 진행한다. 기간은 추정이며 일정이 밀리면 나눠서 진행한다.

| 주차 | 목표 | 주간 완료 기준 |
|---|---|---|
| 1 | 로컬 Ubuntu·Nginx 운영 | 서비스 응답 확인 및 중단·복구 기록 |
| 2 | 네트워크와 AWS 준비 | HTTP 요청 경로 설명, 계정 보안·비용·정리 계획 |
| 3 | AWS EC2 웹 서버 | VPC·보안 그룹 경로를 이해하고 EC2 Nginx 응답 확인 |
| 4 | 상태 확인과 장애 기록 | 지표 확인, 장애 한 건과 복구 검증, 실습 리소스 정리 |

### 주차별 작은 과제

1. **1주:** VM 상태와 서비스 로그 확인 → Nginx 설치와 HTTP 확인 → 테스트 VM에서 중단·진단·복구 → 결과 기록.
2. **2주:** DNS·포트·HTTP 경로 정리 → AWS 계정 보안 확인 → 예상 요금과 예산 알림 검토 → 사용할 리소스와 정리 방법 기록.
3. **3주:** VPC·서브넷·라우팅과 보안 그룹 확인 → EC2 생성 → SSH 관리 접근 제한 → Nginx 응답 및 요청 경로 검증. 여유가 없으면 AWS 설정을 여러 블록으로 나눈다.
4. **4주:** CloudWatch 지표 확인 → 장애 하나 재현 및 복구 기록 → README의 실제 결과 갱신 → 리소스와 요금 정리. 알림·점검 스크립트는 여유가 있을 때 선택한다.

예산 알림은 비용을 자동으로 차단하지 않는다. AWS 리소스는 요금이 발생할 수 있으며 실습 후 인스턴스 외 디스크·IP 등도 확인한다.

## 학습 및 기록 원칙

- 한 번에 작은 과제 하나를 수행한다. 핵심 설정과 명령은 학습자가 먼저 시도하고, AI에는 설명·힌트·리뷰를 요청한다.
- 정상 상태를 먼저 관찰하고, 의도적 장애는 테스트 환경에서 한 번에 하나만 만든다.
- 완료는 실행 결과와 검증 증거를 남긴 경우에만 표시한다. 계획이나 대시보드 체크만으로 구현을 주장하지 않는다.
- 장애는 증상 → 조사 → 원인 → 조치 → 검증 → 개선 순으로 기록한다.
- 신입 공고 지원은 학습과 병행한다.

## 기존 장기 로드맵 (보존)

아래는 기존 대시보드와 연결된 11개 Phase·66개 Task다. 순서와 과제는 기존 기록을 보존하기 위한 것으로, 집중 계획에서 05–09를 모두 마칠 때까지 모니터링이나 장애 대응을 미룰 필요는 없다.


## 목적

Cloud Resume Challenge의 점진적 배포 흐름에 국내 클라우드 부트캠프와
AWS re/Start의 공통 기초 역량을 결합한다.

기술을 한 번씩 사용하는 것이 아니라 하나의 서비스를 반복해서 구축하고,
고장 내고, 진단하고, 복구하고, 그 근거를 문서화하는 것이 완료 기준이다.

## 학습 원칙

1. 한 번에 하나의 Task만 수행한다.
2. 핵심 설정은 학습자가 먼저 작성하고 리뷰를 요청한다.
3. 장애 발생 시 수정 전에 service, network, log 등 관찰 가능한 상태를 수집한다.
4. Task 완료는 실행 결과가 아니라 검증 증거까지 남겼을 때 인정한다.
5. 각 과제는 해당 과제의 검증 조건을 확인한다. 집중 계획에서는 필요한 선행 지식을 확인한 뒤 관련 Phase를 병행할 수 있다.

## Core Roadmap

| Phase | 영역 | 핵심 결과 | Task 수 |
|---:|---|---|---:|
| 01 | Linux · OS Foundations | Ubuntu에서 Nginx를 운영하고 service · port · log 순서로 장애를 진단한다. | 6 |
| 02 | Network · HTTP | DNS · TCP · HTTP · firewall 중 통신 실패 구간을 구분한다. | 6 |
| 03 | AWS · Core & Security | 안전한 계정 기준선에서 AWS 리소스와 최소 권한을 설명한다. | 6 |
| 04 | AWS · Network & Compute | VPC의 EC2 Nginx까지 요청이 도달하는 경로와 통제 지점을 설명한다. | 6 |
| 05 | Storage · CDN · DNS | private S3 origin을 CloudFront, DNS, HTTPS로 서비스한다. | 6 |
| 06 | Serverless · Data | API Gateway, Lambda, DynamoDB의 요청 · 실행 · 저장 · 로그 흐름을 운영한다. | 6 |
| 07 | Containers · Docker | 동일한 image의 실행 · network · data · log를 일관되게 관리한다. | 6 |
| 08 | Terraform · IaC | plan과 state를 이해하고 동일 인프라를 안전하게 재현한다. | 6 |
| 09 | CI/CD · Delivery | 검증된 변경만 배포하고 실패 시 중단 · 복구한다. | 6 |
| 10 | Observability · SRE | 로그 · 메트릭 · 알람으로 장애를 탐지하고 원인을 좁힌다. | 6 |
| 11 | Reliability · Incidents | 탐지부터 postmortem까지 반복 가능한 incident lifecycle을 수행한다. | 6 |

총 11개 Phase, 66개 Task로 구성한다. 세부 Task와 예상 증거는 진행도
대시보드 및 `frontend/app/roadmap.ts`에서 관리한다.

## 반복 운영 루프

```text
Build → Break → Diagnose → Recover → Document
```

- Build: 직접 구축하고 정상 상태의 기준선을 확보한다.
- Break: 한 번에 하나의 원인만 의도적으로 발생시킨다.
- Diagnose: 증상에서 시작해 계층별 상태와 로그를 확인한다.
- Recover: 최소 변경으로 복구하고 사용자 관점에서 검증한다.
- Document: 판단 근거, root cause, 개선점을 worklog 또는 incident에 기록한다.

## 선택 심화 과정

운영 MVP 완료 후 목표 공고와 학습 여건에 따라 선택한다.

- Ansible: EC2의 반복적인 설치와 설정을 configuration management로 전환
- ECS: Docker image를 AWS managed container service에서 운영
- Kubernetes: Pod, Service, Deployment, self-healing 및 autoscaling 실습

Kubernetes는 Linux, network, Docker 기반 없이 먼저 진행하지 않는다.

## 참고한 커리큘럼

- [AWS re/Start](https://aws.amazon.com/training/restart/)
- [카카오테크 부트캠프 클라우드 커리큘럼](https://kakaotechbootcamp.com/source/curriculum/ktb_curriculum_cloud_26.2.12.pdf)
- [더존 Cloud DX Academy](https://allforyoung-homepage-maycan.s3.ap-northeast-2.amazonaws.com/uploads/post_files/2024/12/11/%EB%8D%94%EC%A1%B4%EB%B9%84%EC%A6%88%EC%98%A8Cloud_DX_Academy_%EC%84%A0%EB%8F%84%EA%B8%B0%EC%97%85%EC%95%84%EC%B9%B4%EB%8D%B0%EB%AF%B8.pdf)
- [퍼블릭 클라우드 기반 DevSecOps 융합 인재 양성 과정](https://allforyoung-homepage-maycan.s3.ap-northeast-2.amazonaws.com/uploads/post_files/2025/01/09/K-%EB%94%94%EC%A7%80%ED%84%B8_%ED%9B%88%EB%A0%A8%EA%B3%BC%EC%A0%95_%ED%8D%BC%EB%B8%94%EB%A6%AD_%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C_%EA%B8%B0%EB%B0%98_DevSecOps_%EC%9C%B5%ED%95%A9_%EC%9D%B8%EC%9E%AC_%EC%96%91%EC%84%B1_%EA%B3%BC%EC%A0%95.pdf)

## 현재 상태

- 확인된 기록: Ubuntu VM 기준선, 파일 권한, 패키지·프로세스·자원 관찰, cron 상태 확인 (`docs/worklogs/day01-linux-nginx.md`)
- 기록상 예정: cron 중지·복구. 기존 과제의 완료 여부는 검증 조건과 대조한다.
- 다음 목표: 로컬 Nginx 상태·응답 확인과 중단·복구 실습
