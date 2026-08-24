# Day 01 Task 1 - Ubuntu VM 환경 구성

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
PRETTY_NAME="Ubuntu 24.04.4 LTS"
NAME="Ubuntu"
VERSION_ID="24.04"
VERSION="24.04.4 LTS (Noble Numbat)"
VERSION_CODENAME=noble
ID=ubuntu
ID_LIKE=debian
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="https://help.ubuntu.com/"
BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
```

`cat`은 파일 내용을 출력하는 명령이고, `/etc/os-release`는 현재 설치된 Linux 배포판의 정보를 담고 있는 파일이다.

### `uname -a`

현재 실행 중인 Linux 커널 버전과 CPU 아키텍처를 확인했다.

- Kernel version: `6.8.0-137-generic`
- CPU architecture: `aarch64`

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
- Network interface: `enp0s1`
- VM IPv4 address: `192.168.252.3/24`

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

# Day 01 Task 2 - 파일과 디렉터리 권한 실습

Linux 파일과 디렉터리의 기본 권한을 확인하고, `chmod`를 사용해 파일 권한을 변경했다.

### 생성한 파일과 디렉터리

```bash
mkdir -p ~/linux-lab/permissions
cd ~/linux-lab/permissions
touch test.txt
mkdir test-dir
```

### 초기 권한 확인

다음 명령으로 파일과 디렉터리의 초기 권한을 확인했다.

```bash
ls -l
```

실행 결과:

```text
drwxrwxr-x 2 ubuntu ubuntu 4096 Aug 24 16:26 test-dir
-rw-rw-r-- 1 ubuntu ubuntu    0 Aug 24 16:25 test.txt
```

확인한 정보:

- 초기 `test.txt` 권한: `664` (`rw-rw-r--`)
- 초기 `test-dir` 권한: `775` (`rwxrwxr-x`)
- 소유자: `ubuntu`
- 소유 그룹: `ubuntu`

일반 파일의 첫 번째 문자 `-`는 일반 파일을 의미하고, 디렉터리의 첫 번째 문자 `d`는 디렉터리를 의미한다.

### umask 확인

다음 명령으로 현재 설정된 umask 값을 확인했다.

```bash
umask
```

실행 결과:

```text
0002
```

일반 파일의 기본 후보 권한은 `666`이다. Umask `002`에 해당하는 권한이 제외되어 새로 생성한 `test.txt`에는 `664` 권한이 적용되었다.

디렉터리의 기본 후보 권한은 `777`이다. 같은 방식으로 권한이 제외되어 새로 생성한 `test-dir`에는 `775` 권한이 적용되었다.

| 대상      | 기본 후보 권한 | umask | 최종 권한 |
| --------- | -------------: | ----: | --------: |
| 일반 파일 |          `666` | `002` |     `664` |
| 디렉터리  |          `777` | `002` |     `775` |

### chmod를 이용한 권한 변경

`test.txt`의 권한을 다음과 같이 변경하는 것을 목표로 했다.

- 소유자: 읽기와 쓰기
- 그룹: 읽기
- 기타 사용자: 권한 없음

실행한 명령:

```bash
chmod 640 test.txt
```

변경된 권한을 확인했다.

```bash
stat test.txt
```

확인 결과:

```text
Access: (0640/-rw-r-----)
```

숫자 권한 `640`의 의미는 다음과 같다.

- `6`: 소유자의 읽기(`4`)와 쓰기(`2`)
- `4`: 그룹의 읽기
- `0`: 기타 사용자의 권한 없음

따라서 최종 권한은 다음과 같다.

```text
rw- | r-- | ---
소유자 | 그룹 | 기타 사용자
```

### Modify와 Change 시간 비교

`chmod` 실행 후 `stat`으로 확인한 시간은 다음과 같았다.

```text
Modify: 2026-08-24 16:25:57.039229425 +0900
Change: 2026-08-24 16:33:30.173252544 +0900
Birth:  2026-08-24 16:25:57.038229390 +0900
```

`chmod`를 실행할 때 파일 내용은 변경하지 않았기 때문에 `Modify` 시간은 바뀌지 않았다.

파일 권한이라는 메타데이터가 변경되었기 때문에 `Change` 시간은 `chmod`를 실행한 시각으로 갱신되었다.

- `Modify`: 파일 내용이 마지막으로 변경된 시각
- `Change`: 권한이나 소유자 등 메타데이터가 마지막으로 변경된 시각
- `Birth`: 파일이 처음 생성된 시각

### 새로 이해한 점

- Linux 권한은 소유자, 그룹, 기타 사용자 순서로 구분된다.
- `r`, `w`, `x`는 각각 읽기, 쓰기, 실행 권한을 의미한다.
- 숫자 권한에서는 `r=4`, `w=2`, `x=1`을 사용한다.
- 일반 파일과 디렉터리의 기본 후보 권한은 서로 다르다.
- `umask`는 새 파일과 디렉터리를 만들 때 제외할 권한을 결정한다.
- `chmod`는 파일 내용을 변경하지 않고 파일의 권한을 변경한다.
- 파일 내용이 바뀌면 `Modify` 시간이 변경되고, 권한과 같은 메타데이터가 바뀌면 `Change` 시간이 변경된다.

## 패키지·프로세스·자원 관찰

Ubuntu 서버에 설치된 패키지와 실행 중인 프로세스를 확인하고 CPU, 메모리, 디스크의 현재 상태를 관찰했다.

### 설치된 패키지 확인

설치된 패키지 중 일부를 다음 명령으로 확인했다.

```bash
apt list --installed 2>/dev/null | sed -n '1,10p'
```

출력에는 패키지 이름, 저장소, 설치 버전, CPU 아키텍처와 설치 상태가 표시되었다.

- `noble`: Ubuntu 24.04의 코드명
- `noble-updates`: Ubuntu 업데이트 저장소
- `arm64`: ARM64 아키텍처용 패키지
- `all`: CPU 아키텍처에 종속되지 않는 패키지
- `installed,automatic`: 다른 패키지의 의존성으로 자동 설치된 상태

### 실행 중인 프로세스 확인

```bash
ps -ef | sed -n '1,10p'
```

주요 출력은 다음과 같았다.

```text
UID          PID    PPID  C STIME TTY          TIME CMD
root           1       0  0 15:11 ?        00:00:01 /sbin/init
root           2       0  0 15:11 ?        00:00:00 [kthreadd]
```

- `UID`: 프로세스를 실행한 사용자
- `PID`: 프로세스의 고유 번호
- `PPID`: 부모 프로세스의 PID
- `TIME`: 프로세스가 사용한 누적 CPU 시간
- `CMD`: 실행된 명령

PID 1의 `/sbin/init`은 실제로 `systemd`로 실행되며, 시스템 부팅 후 서비스와 다른 프로세스를 관리한다. 대괄호로 표시된 `[kthreadd]`, `[kworker]` 등은 커널 내부 작업을 처리하는 커널 스레드다.

### CPU와 프로세스 상태 확인

```bash
top -b -n 1 | sed -n '1,15p'
```

확인한 주요 상태:

```text
load average: 0.02, 0.01, 0.00
Tasks: 102 total, 1 running, 101 sleeping, 0 stopped, 0 zombie
%Cpu(s): 0.0 us, 2.7 sy, 97.3 id, 0.0 wa
```

Load average는 최근 1분, 5분, 15분 동안의 평균 시스템 부하다. CPU가 2개인 현재 VM에서 측정값이 모두 0에 가까우므로 부하가 매우 낮다고 판단했다.

전체 작업 102개 중 1개가 실행 중이고 101개가 대기 중이었다. 중지되었거나 zombie 상태인 작업은 없었다. CPU의 `id` 값이 97.3%이므로 대부분의 CPU 시간이 사용되지 않고 있었고, 입출력 대기를 의미하는 `wa`도 0%였다.

### 메모리 상태 확인

```bash
free -h
```

실행 결과:

```text
              total        used        free      shared  buff/cache   available
Mem:           1.9Gi       230Mi       1.1Gi       1.1Mi       639Mi       1.7Gi
Swap:             0B          0B          0B
```

전체 메모리는 약 1.9GiB이고, 새 프로세스가 사용할 수 있는 `available` 메모리는 약 1.7GiB였다. Linux는 사용하지 않는 메모리를 캐시로 활용하므로 단순한 `free` 값보다 회수 가능한 캐시까지 고려한 `available` 값을 함께 확인해야 한다.

현재 swap은 설정되어 있지 않다. 즉시 문제가 발생한 상태는 아니지만 물리 메모리가 부족해질 경우 swap 공간으로 대피할 수 없다는 의미다.

### 디스크 상태 확인

처음에는 다음 명령을 실행했다.

```bash
df -h/
```

오류 메시지:

```text
df: invalid option -- '/'
Try 'df --help' for more information.
```

오류 메시지의 `invalid option`을 보고 명령의 옵션 부분을 확인했다. `-h` 옵션과 `/` 경로 사이에 공백이 없어서 `-h/` 전체가 하나의 옵션으로 해석된 것이 원인이었다.

다음과 같이 공백을 추가하여 다시 실행했다.

```bash
df -h /
```

실행 결과:

```text
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1       8.7G  2.0G  6.7G  23% /
```

루트 파일시스템 `/`는 전체 8.7GiB 중 2.0GiB를 사용하고 있었으며 사용률은 23%였다. 남은 공간이 6.7GiB이므로 현재 디스크 공간은 충분하다고 판단했다.

### 가동 시간과 부하 확인

```bash
uptime
```

실행 결과:

```text
16:42:49 up 1:31, 2 users, load average: 0.01, 0.01, 0.00
```

VM은 약 1시간 31분 동안 실행 중이었고 로그인 세션은 2개였다. `2 users`는 반드시 서로 다른 두 사람이 아니라 같은 사용자의 터미널 세션이 여러 개 연결된 상태일 수 있다.

### 시스템 상태 판단

- CPU 유휴 시간: 97.3%
- 사용 가능한 메모리: 약 1.7GiB
- 루트 디스크 사용률: 23%
- Zombie 프로세스: 0개
- Load average: 0에 가까움

CPU, 메모리, 디스크와 프로세스 상태를 함께 확인한 결과 현재 Ubuntu VM은 자원 부족이나 비정상 프로세스 없이 정상적으로 실행 중이라고 판단했다.

### 새로 이해한 점

- 패키지는 설치된 프로그램 단위이고 프로세스는 현재 실행 중인 프로그램의 인스턴스다.
- 각 프로세스에는 PID가 있으며 PPID를 통해 부모 프로세스와의 관계를 확인할 수 있다.
- PID 1의 `systemd`는 시스템 서비스와 프로세스 관리의 시작점이다.
- Linux 메모리는 `free` 값만 보지 않고 `available`과 캐시를 함께 확인해야 한다.
- 디스크 상태에서는 전체 크기보다 `Use%`와 남은 공간을 함께 확인해야 한다.
- 명령 오류가 발생하면 오류 메시지, 옵션, 인자와 공백을 순서대로 확인한다.
