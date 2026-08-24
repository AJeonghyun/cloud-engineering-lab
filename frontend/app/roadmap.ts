export type Task = {
  id: string;
  title: string;
  intent: string;
  evidence: string;
};

export type Phase = {
  id: string;
  label: string;
  title: string;
  description: string;
  outcome: string;
  skills: string[];
  tasks: Task[];
};

export const phases: Phase[] = [
  {
    id: 'linux', label: '01', title: 'Linux · OS Foundations',
    description: '서버가 실행되고 실패하고 복구되는 과정을 운영체제 수준에서 이해합니다.',
    outcome: 'Ubuntu에서 Nginx를 운영하고 service · port · log 순서로 장애를 진단한다.',
    skills: ['Ubuntu', 'filesystem', 'permissions', 'process', 'systemd', 'Nginx'],
    tasks: [
      { id: 'linux-01', title: 'Ubuntu VM과 시스템 기준선 확인', intent: '독립된 Linux 서버 환경과 OS·커널·사용자·네트워크 상태를 구분한다.', evidence: 'docs/worklogs/day01-linux-nginx.md' },
      { id: 'linux-02', title: '파일시스템과 권한 실습', intent: '경로, 소유자, 그룹, rwx 권한이 서버 운영에 미치는 영향을 확인한다.', evidence: '권한 변경 전후 ls -l 기록' },
      { id: 'linux-03', title: '패키지·프로세스·자원 관찰', intent: 'apt, ps, top, free, df로 실행 중인 프로그램과 자원 상태를 읽는다.', evidence: '프로세스 PID와 자원 상태 해석' },
      { id: 'linux-04', title: 'systemd 서비스 수명주기 확인', intent: 'service와 process의 차이, start·stop·restart·enable 상태를 이해한다.', evidence: 'systemctl status와 journalctl 관찰 기록' },
      { id: 'linux-05', title: 'Nginx 정적 페이지와 HTTP 검증', intent: '웹 서버를 설치하고 요청이 파일과 응답으로 이어지는 흐름을 확인한다.', evidence: 'curl 응답과 listening port 증거' },
      { id: 'linux-06', title: 'Nginx 중지 장애 진단과 복구', intent: '서비스 중단을 증상→service→port→log→복구 순서로 처리한다.', evidence: 'docs/incidents/INC-001-nginx-service-down.md' },
    ],
  },
  {
    id: 'network', label: '02', title: 'Network · HTTP',
    description: '요청이 어디로, 어떤 규칙을 따라 이동하는지 계층별로 추적합니다.',
    outcome: 'DNS·TCP·HTTP·방화벽 중 어느 구간에서 통신이 실패했는지 설명한다.',
    skills: ['TCP/IP', 'CIDR', 'DNS', 'HTTP', 'socket', 'firewall'],
    tasks: [
      { id: 'network-01', title: 'TCP/IP와 HTTP 요청 흐름 그리기', intent: '브라우저 요청이 DNS, TCP 연결, HTTP 응답으로 이어지는 순서를 이해한다.', evidence: 'docs/architecture/v1-http-request-flow.md' },
      { id: 'network-02', title: 'IP·subnet·CIDR 계산 실습', intent: '주소, network, host 범위를 구분하고 사설 IP의 의미를 설명한다.', evidence: 'CIDR 계산 예제와 해석' },
      { id: 'network-03', title: 'DNS 조회 과정 관찰', intent: '도메인과 IP의 관계를 dig 또는 nslookup 결과로 확인한다.', evidence: '조회 결과의 answer·TTL 해석' },
      { id: 'network-04', title: 'socket과 listening port 관찰', intent: '프로세스, 주소, port listener의 연결 관계를 ss로 확인한다.', evidence: 'ss 출력에서 Nginx listener 식별' },
      { id: 'network-05', title: 'curl로 HTTP 계층 진단', intent: 'status, header, redirect, timeout을 구분해 응답 문제를 좁힌다.', evidence: 'curl -v 또는 -I 진단 기록' },
      { id: 'network-06', title: '방화벽 차단 장애 대응', intent: '서비스 정상·포트 정상인데 외부 연결이 실패하는 상황을 진단한다.', evidence: 'docs/incidents/INC-002-firewall-block.md' },
    ],
  },
  {
    id: 'aws-core', label: '03', title: 'AWS · Core & Security',
    description: '클라우드의 책임, 비용, 인증 경계를 먼저 세운 뒤 서비스를 사용합니다.',
    outcome: '안전한 계정 기준선에서 AWS 리소스와 권한 결정을 설명한다.',
    skills: ['IAM', 'AWS CLI', 'MFA', 'Budgets', 'CloudTrail', 'least privilege'],
    tasks: [
      { id: 'aws-01', title: '계정 보안과 비용 가드레일 설정', intent: 'root MFA, 일반 관리자 접근, Budget 알림으로 실습 안전선을 만든다.', evidence: '비밀값 없는 설정 체크리스트' },
      { id: 'aws-02', title: '리전·AZ·책임 공유 모델 정리', intent: 'AWS와 사용자가 각각 책임지는 영역을 리소스별로 구분한다.', evidence: 'docs/worklogs/aws-foundations.md' },
      { id: 'aws-03', title: 'AWS CLI 인증과 호출 확인', intent: 'profile과 credential 저장 위치를 이해하고 호출 주체를 확인한다.', evidence: 'sts get-caller-identity 결과(계정값 마스킹)' },
      { id: 'aws-04', title: 'IAM user·role·policy 비교', intent: '장기 자격증명과 임시 자격증명, identity와 permission의 차이를 이해한다.', evidence: 'IAM 관계도와 최소 권한 예제' },
      { id: 'aws-05', title: '최소 권한 실패 실습', intent: 'AccessDenied를 정책 평가 흐름에 따라 조사하고 필요한 권한만 추가한다.', evidence: 'docs/incidents/INC-003-iam-access-denied.md' },
      { id: 'aws-06', title: 'CloudTrail로 API 변경 추적', intent: '누가 언제 어떤 리소스를 변경했는지 이벤트 기록에서 찾는다.', evidence: '민감정보를 제거한 이벤트 해석' },
    ],
  },
  {
    id: 'compute', label: '04', title: 'AWS · Network & Compute',
    description: '직접 운영한 Linux 서버를 AWS 네트워크와 EC2 위로 옮깁니다.',
    outcome: 'VPC 안의 EC2 Nginx에 요청이 도달하는 모든 경로와 통제 지점을 설명한다.',
    skills: ['VPC', 'subnet', 'route', 'security group', 'EC2', 'EBS'],
    tasks: [
      { id: 'compute-01', title: 'VPC와 subnet 주소 설계', intent: 'public·private 경계와 확장 가능한 CIDR 범위를 직접 정한다.', evidence: 'docs/architecture/v2-vpc-address-plan.md' },
      { id: 'compute-02', title: 'route table과 Internet Gateway 연결', intent: 'public subnet이 인터넷과 통신할 수 있는 조건을 확인한다.', evidence: '요청·응답 경로 다이어그램' },
      { id: 'compute-03', title: 'Security Group과 NACL 비교', intent: 'stateful·stateless 필터와 inbound·outbound 규칙을 구분한다.', evidence: '허용 규칙과 선택 이유' },
      { id: 'compute-04', title: 'EC2·EBS·IAM role 구성', intent: 'compute, block storage, workload identity의 수명주기를 구분한다.', evidence: '인스턴스 기준선과 비용 기록' },
      { id: 'compute-05', title: 'EC2에 Nginx 서비스 배포', intent: '로컬에서 익힌 운영 절차를 클라우드 서버에서 재현한다.', evidence: 'public HTTP 응답과 service 상태' },
      { id: 'compute-06', title: 'EC2 연결 장애 진단', intent: 'instance, route, SG, service, port를 순서대로 확인해 실패 구간을 찾는다.', evidence: 'docs/incidents/INC-004-ec2-connectivity.md' },
    ],
  },
  {
    id: 'edge', label: '05', title: 'Storage · CDN · DNS',
    description: '정적 콘텐츠를 서버에서 분리하고 안전하게 전 세계에 전달합니다.',
    outcome: 'private S3 origin을 CloudFront, DNS, HTTPS로 서비스하고 cache 동작을 검증한다.',
    skills: ['S3', 'CloudFront', 'OAC', 'Route 53', 'ACM', 'cache'],
    tasks: [
      { id: 'edge-01', title: '정적 사이트 산출물 준비', intent: '브라우저가 요청할 파일과 배포 산출물의 경계를 이해한다.', evidence: 'frontend build 결과와 파일 구조' },
      { id: 'edge-02', title: 'private S3 bucket에 배포', intent: 'object storage와 public access 차단 원칙을 적용한다.', evidence: 'bucket 정책과 public 차단 확인' },
      { id: 'edge-03', title: 'CloudFront OAC 연결', intent: '사용자는 CDN에 접근하고 CDN만 origin에 접근하도록 구성한다.', evidence: 'S3·CloudFront 접근 비교' },
      { id: 'edge-04', title: '도메인과 HTTPS 연결', intent: 'Route 53 alias와 ACM 인증서가 TLS 요청에 참여하는 흐름을 이해한다.', evidence: 'DNS·인증서·HTTPS 검증' },
      { id: 'edge-05', title: 'cache와 invalidation 검증', intent: 'TTL, cache hit, 새 배포 반영 시점의 관계를 관찰한다.', evidence: '응답 header 비교 기록' },
      { id: 'edge-06', title: 'CloudFront AccessDenied 대응', intent: 'viewer, distribution, OAC, bucket policy 경계를 따라 403 원인을 찾는다.', evidence: 'docs/incidents/INC-005-cloudfront-403.md' },
    ],
  },
  {
    id: 'serverless', label: '06', title: 'Serverless · Data',
    description: '서버 관리 없이 API와 상태 저장소를 연결하고 권한 경계를 운영합니다.',
    outcome: '방문자 API의 요청·실행·저장·로그 흐름과 실패 지점을 설명한다.',
    skills: ['API Gateway', 'Lambda', 'Python', 'DynamoDB', 'IAM', 'CloudWatch Logs'],
    tasks: [
      { id: 'serverless-01', title: '방문자 API 계약 정의', intent: 'method, path, request, response, error를 구현 전에 명시한다.', evidence: 'docs/architecture/v3-api-contract.md' },
      { id: 'serverless-02', title: 'Lambda 함수 로컬 검증', intent: 'handler의 입력·출력과 예외 처리를 작은 테스트로 확인한다.', evidence: '테스트 결과와 실패 케이스' },
      { id: 'serverless-03', title: 'DynamoDB 데이터 모델 설계', intent: 'partition key와 atomic update가 방문자 수에 적합한 이유를 설명한다.', evidence: '테이블 스키마와 접근 패턴' },
      { id: 'serverless-04', title: 'API Gateway와 Lambda 연결', intent: '외부 HTTP 요청을 함수 호출로 변환하고 응답을 검증한다.', evidence: 'API 호출과 상태 코드' },
      { id: 'serverless-05', title: '실행 role과 로그 최소화', intent: '함수에 필요한 DynamoDB·로그 권한만 부여한다.', evidence: '허용·거부 동작 비교' },
      { id: 'serverless-06', title: 'Serverless 5xx 장애 대응', intent: 'API 로그, Lambda 로그, IAM, 데이터 오류를 순서대로 조사한다.', evidence: 'docs/incidents/INC-006-serverless-5xx.md' },
    ],
  },
  {
    id: 'containers', label: '07', title: 'Containers · Docker',
    description: '실행 환경을 이미지로 고정하고 애플리케이션 운영 단위를 컨테이너로 바꿉니다.',
    outcome: '동일한 이미지의 실행·네트워크·데이터·로그를 일관되게 관리한다.',
    skills: ['Docker', 'Dockerfile', 'registry', 'volume', 'Compose', 'healthcheck'],
    tasks: [
      { id: 'container-01', title: 'image와 container 수명주기 실습', intent: '불변 이미지와 실행 인스턴스의 차이를 명령으로 관찰한다.', evidence: 'image·container 상태 비교' },
      { id: 'container-02', title: '직접 Dockerfile 작성', intent: 'base image, layer, copy, command를 이해하고 최소 이미지를 만든다.', evidence: '작성한 Dockerfile 리뷰' },
      { id: 'container-03', title: 'port·volume·환경변수 연결', intent: '컨테이너 외부와 연결되는 세 가지 경계를 구분한다.', evidence: '실행 옵션과 동작 확인' },
      { id: 'container-04', title: 'Docker Compose로 서비스 연결', intent: 'web과 data 구성요소를 재현 가능한 로컬 환경으로 묶는다.', evidence: '직접 작성한 compose 리뷰' },
      { id: 'container-05', title: '로그와 healthcheck 운영', intent: 'process running과 service healthy가 다른 상태임을 확인한다.', evidence: 'health 상태와 로그 근거' },
      { id: 'container-06', title: '컨테이너 장애 진단', intent: 'image, process, port, network, volume 순서로 실패 원인을 좁힌다.', evidence: 'docs/incidents/INC-007-container-failure.md' },
    ],
  },
  {
    id: 'terraform', label: '08', title: 'Terraform · IaC',
    description: '수동으로 이해한 인프라를 선언하고 재현 가능한 변경 절차로 전환합니다.',
    outcome: 'plan을 검토하고 state를 보호하며 동일 인프라를 안전하게 재현한다.',
    skills: ['HCL', 'provider', 'resource', 'variable', 'state', 'lifecycle'],
    tasks: [
      { id: 'terraform-01', title: 'HCL과 provider 초기화', intent: 'configuration, provider plugin, init의 역할을 구분한다.', evidence: '직접 작성한 최소 구성 리뷰' },
      { id: 'terraform-02', title: '기존 AWS 리소스를 선언', intent: 'console에서 만든 구조를 resource와 dependency로 표현한다.', evidence: 'VPC 또는 S3 구성 코드 리뷰' },
      { id: 'terraform-03', title: 'plan·apply·destroy 수명주기', intent: '실행 전 변경 계획을 읽고 실제 상태와 원하는 상태를 비교한다.', evidence: 'plan 해석과 apply 검증' },
      { id: 'terraform-04', title: 'variable·output·구성 분리', intent: '환경별 값과 재사용 가능한 구조의 경계를 정한다.', evidence: '민감값 없는 변수 설계' },
      { id: 'terraform-05', title: 'remote state와 locking 구성', intent: 'state의 민감성, 협업 충돌, 복구 전략을 이해한다.', evidence: 'backend 설계와 보호 방법' },
      { id: 'terraform-06', title: 'Terraform 배포 실패 대응', intent: 'validate, plan, state, provider, AWS API 오류 순서로 진단한다.', evidence: 'docs/incidents/INC-008-terraform-failure.md' },
    ],
  },
  {
    id: 'cicd', label: '09', title: 'CI/CD · Delivery',
    description: '반복 가능한 테스트와 배포 검증을 Git 변경 흐름에 연결합니다.',
    outcome: '신뢰할 수 있는 변경만 배포하고 실패 시 중단·복구하는 파이프라인을 운영한다.',
    skills: ['GitHub Actions', 'test', 'artifact', 'OIDC', 'deployment', 'rollback'],
    tasks: [
      { id: 'cicd-01', title: 'workflow trigger와 job 실습', intent: 'event, runner, job, step의 실행 관계를 이해한다.', evidence: '작은 검증 workflow 실행 기록' },
      { id: 'cicd-02', title: 'lint·test·build 품질 게이트', intent: '실패한 변경이 배포 단계로 넘어가지 않도록 구성한다.', evidence: '성공·실패 run 비교' },
      { id: 'cicd-03', title: 'Terraform validate·plan 자동화', intent: '인프라 변경을 PR에서 미리 검토할 수 있게 한다.', evidence: 'PR plan 결과' },
      { id: 'cicd-04', title: 'GitHub OIDC AWS 인증', intent: '장기 access key 없이 짧은 수명의 배포 권한을 사용한다.', evidence: 'trust policy와 권한 범위' },
      { id: 'cicd-05', title: '배포 후 smoke test와 rollback', intent: '배포 성공과 서비스 정상 동작을 분리해 검증한다.', evidence: '검증 실패 시 중단·복구 기록' },
      { id: 'cicd-06', title: 'Pipeline 실패 장애 대응', intent: 'trigger, permission, build, deploy, verify 단계 중 실패 지점을 찾는다.', evidence: 'docs/incidents/INC-009-pipeline-failure.md' },
    ],
  },
  {
    id: 'observability', label: '10', title: 'Observability · SRE',
    description: '로그, 메트릭, 알람을 사용자가 겪는 서비스 상태와 연결합니다.',
    outcome: '장애를 사용자 신고 전에 탐지하고 근거를 가지고 원인을 좁힌다.',
    skills: ['logs', 'metrics', 'dashboard', 'alarm', 'CloudWatch', 'SLI/SLO'],
    tasks: [
      { id: 'observe-01', title: '관찰 대상과 로그 전략 정의', intent: '무엇을 왜 기록하며 어떤 민감정보를 제외할지 정한다.', evidence: 'docs/architecture/observability-plan.md' },
      { id: 'observe-02', title: '서비스 로그 중앙화', intent: 'Nginx와 Serverless 로그를 시간·요청 기준으로 검색한다.', evidence: '대표 쿼리와 진단 사례' },
      { id: 'observe-03', title: '핵심 메트릭 선정', intent: 'traffic, error, latency, saturation을 서비스 신호로 연결한다.', evidence: '메트릭·임계값 선택 이유' },
      { id: 'observe-04', title: 'CloudWatch dashboard 구성', intent: '서비스 상태를 한 화면에서 판단할 수 있게 시각화한다.', evidence: 'dashboard와 해석 가이드' },
      { id: 'observe-05', title: 'Alarm과 알림 검증', intent: '실제 조건을 발생시켜 감지·알림·복구 상태 전환을 확인한다.', evidence: '알람 상태 변화 기록' },
      { id: 'observe-06', title: 'SLI·SLO 초안 작성', intent: '가용성과 지연시간 목표를 사용자 관점의 측정값으로 표현한다.', evidence: 'docs/architecture/service-objectives.md' },
    ],
  },
  {
    id: 'incidents', label: '11', title: 'Reliability · Incidents',
    description: '예측 가능한 복구 절차와 학습 가능한 장애 기록으로 운영 경험을 완성합니다.',
    outcome: '탐지부터 회고까지 반복 가능한 incident lifecycle을 수행한다.',
    skills: ['runbook', 'backup', 'load test', 'game day', 'postmortem', 'portfolio'],
    tasks: [
      { id: 'reliability-01', title: '서비스 복구 Runbook 작성', intent: '처음 보는 운영자도 안전하게 확인·복구·검증할 절차를 만든다.', evidence: 'docs/runbooks/service-recovery.md' },
      { id: 'reliability-02', title: 'backup과 restore 검증', intent: '백업 존재가 아니라 실제 복원이 가능한지를 확인한다.', evidence: '복원 시간과 데이터 검증 기록' },
      { id: 'reliability-03', title: '부하 테스트와 병목 관찰', intent: '트래픽 증가가 latency, error, saturation에 미치는 영향을 측정한다.', evidence: '부하 조건과 측정 결과' },
      { id: 'reliability-04', title: '통합 장애 Game Day 수행', intent: '알람을 시작점으로 여러 계층의 장애를 진단하고 협업 흐름을 연습한다.', evidence: 'docs/incidents/INC-010-game-day.md' },
      { id: 'reliability-05', title: '비난 없는 Postmortem 작성', intent: '원인, 기여 요인, 대응 시간, 후속 조치를 시스템 관점에서 정리한다.', evidence: 'postmortem과 action items' },
      { id: 'reliability-06', title: '아키텍처·비용·포트폴리오 리뷰', intent: '기술 선택과 트레이드오프를 설명하고 전체 증거를 연결한다.', evidence: '최종 README와 architecture vFinal' },
    ],
  },
];

export const extensions = [
  { title: 'Ansible', description: 'EC2의 반복적인 Nginx 설치·설정을 configuration management로 전환합니다.' },
  { title: 'ECS', description: 'Docker 이미지를 AWS managed container service에서 배포하고 운영합니다.' },
  { title: 'Kubernetes', description: 'Docker와 네트워크가 익숙해진 뒤 Pod·Service·Deployment·self-healing을 실습합니다.' },
];

export const initialCompletedTaskIds = ['linux-01'];
