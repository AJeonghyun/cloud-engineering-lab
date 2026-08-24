# Cloud Engineering Lab Roadmap

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
5. 다음 Phase는 현재 Phase의 Exit Criteria를 만족한 뒤 시작한다.

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

핵심 로드맵 완료 후 필요에 따라 진행한다.

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

- 완료: Ubuntu VM 생성 및 시스템 기준선 확인
- 문서화 중: `docs/worklogs/day01-linux-nginx.md`
- 다음 Task: Linux 파일시스템과 권한 실습
