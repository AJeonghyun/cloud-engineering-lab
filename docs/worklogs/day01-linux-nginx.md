# Day 01 — Ubuntu VM 환경 구성

## 오늘의 목표

macOS에서 Ubuntu 가상머신을 생성하고 Linux 시스템의 기본 상태를 확인한다.

## 사용한 환경

- Host OS: macOS
- VM 도구: Multipass
- Guest OS: Ubuntu 24.04 LTS
- CPU: 2개
- Memory: 2GB
- Disk: 10GB
- VM 이름: `day1-ubuntu`

## 실행한 명령어

```bash
cat /etc/os-release
uname -a
whoami
hostname
ip addr
systemctl is-system-running
```

## 확인한 내용

### `cat /etc/os-release`

Ubuntu 배포판의 이름과 버전을 확인했다.

내 환경에는 Ubuntu 24.04 LTS가 설치되어 있었다.

주요 출력값:

```text
PRETTY_NAME="[실제 출력값]"
VERSION_ID="[실제 출력값]"
```

`cat`은 파일 내용을 출력하는 명령이고, `/etc/os-release`는 현재 설치된 Linux 배포판의 정보를 담고 있는 파일이다.

### `uname -a`

현재 실행 중인 Linux 커널 버전과 CPU 아키텍처를 확인했다.

- Kernel version: `[실제 커널 버전]`
- CPU architecture: `[실제 아키텍처]`

`/etc/os-release`는 Ubuntu 배포판 정보를 보여주고, `uname`은 현재 실행 중인 Linux 커널 정보를 보여준다는 차이를 알게 되었다.

### `whoami`

현재 로그인한 사용자를 확인했다.

```text
ubuntu
```

Linux에서는 사용자마다 파일 접근 권한과 명령 실행 권한이 다르므로, 현재 어떤 사용자로 작업하고 있는지 확인하는 것이 중요하다.

### `hostname`

현재 접속한 시스템의 hostname을 확인했다.

```text
day1-ubuntu
```

Hostname은 여러 서버 중 현재 어떤 서버에 접속했는지 구분할 때 사용된다.

### `ip addr`

VM의 네트워크 인터페이스와 IP 주소를 확인했다.

- Loopback interface: `lo`
- Loopback address: `127.0.0.1`
- Network interface: `[실제 인터페이스 이름]`
- VM IPv4 address: `[실제 IPv4 주소]`

`127.0.0.1`은 명령을 실행하는 시스템 자신을 의미한다.

따라서 Ubuntu VM 내부의 `127.0.0.1`은 macOS가 아니라 Ubuntu VM 자신을 가리킨다.

### `systemctl is-system-running`

Systemd가 판단하는 시스템 전체 실행 상태를 확인했다.

실행 결과:

```text
running
```

`running`은 systemd 관점에서 시스템이 정상적으로 실행 중이며, 실패한 unit이 없다는 의미다.

만약 `degraded`가 출력된다면 다음 명령으로 실패한 unit을 확인할 수 있다.

```bash
systemctl --failed
```

## 새로 알게 된 점

- macOS와 Ubuntu VM은 서로 분리된 운영체제 환경이다.
- Ubuntu 배포판 버전과 Linux 커널 버전은 서로 다른 정보다.
- VM도 독립적인 hostname과 IP 주소를 가진다.
- Linux에서는 사용자에 따라 파일 및 명령 실행 권한이 달라진다.
- Systemd는 Linux 서비스와 시스템 상태를 관리한다.
- `127.0.0.1`은 항상 명령을 실행하는 시스템 자신을 의미한다.

## 발생한 문제

Ubuntu VM 생성과 시스템 상태 확인 과정에서 특별한 오류는 발생하지 않았다.

## 다음 작업

작성한 Worklog를 검토받은 후 Linux 파일시스템과 권한 실습을 진행한다.
