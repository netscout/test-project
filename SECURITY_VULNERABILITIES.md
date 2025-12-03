# 보안 취약점 데모 프로젝트

이 프로젝트는 SonarQube 보안 분석 데모를 위해 의도적으로 생성된 보안 취약점들을 포함하고 있습니다.

## ⚠️ 경고

**이 코드는 교육 목적으로만 사용되며, 실제 프로덕션 환경에서는 절대 사용하지 마세요!**

## 포함된 취약점 목록

### 1. A01:2021 - Broken Access Control (권한 제어 실패)

**파일:** `src/utils/security-vulnerabilities.ts` - `InsecureUserManager`

- **취약점:**
  - 권한 검사 없이 모든 사용자 정보 반환
  - 사용자 ID만으로 다른 사용자 정보 수정 가능
  - 관리자 권한 체크 없이 사용자 삭제

**파일:** `src/utils/api-vulnerabilities.ts` - `AuthorizationFailures`

- **취약점:**
  - 수평적 권한 상승 (다른 사용자 정보 접근)
  - 수직적 권한 상승 (관리자 권한 없이 삭제)
  - 리소스 소유권 확인 없음

**파일:** `src/components/VulnerableComponent.tsx` - `ClientSideAuthComponent`

- **취약점:**
  - 클라이언트에서만 관리자 권한 확인
  - 로컬 스토리지 기반 권한 관리 (조작 가능)

### 2. A02:2021 - Cryptographic Failures (암호화 실패)

**파일:** `src/utils/security-vulnerabilities.ts` - `WeakCrypto`

- **취약점:**
  - MD5 해시 알고리즘 사용 (충돌 공격에 취약)
  - 하드코딩된 암호화 키
  - DES 암호화 사용 (약한 암호화)
  - 솔트 없는 해시

**파일:** `src/utils/api-vulnerabilities.ts` - `CryptographicWeaknesses`

- **취약점:**
  - 솔트 없는 비밀번호 해싱
  - 약한 랜덤 생성 (Math.random 사용)

### 3. A03:2021 - Injection (인젝션)

**파일:** `src/utils/security-vulnerabilities.ts` - `InjectionVulns`

- **취약점:**
  - SQL Injection (문자열 연결로 쿼리 생성)
  - NoSQL Injection (필터링 없는 쿼리)
  - Command Injection (사용자 입력을 직접 명령어에 사용)
  - LDAP Injection

**파일:** `src/utils/api-vulnerabilities.ts` - `InputValidationFailures`

- **취약점:**
  - 타입 검증 없음
  - 특수 문자 필터링 없음
  - 파일 확장자 검증 없음

### 4. A04:2021 - Insecure Design (안전하지 않은 설계)

**파일:** `src/utils/security-vulnerabilities.ts` - `InsecureDesign`

- **취약점:**
  - 무제한 로그인 시도 허용 (브루트 포스 공격에 취약)
  - 예측 가능한 토큰 생성
  - 보안 질문 없는 비밀번호 재설정

**파일:** `src/utils/api-vulnerabilities.ts` - `NoRateLimiting`

- **취약점:**
  - 레이트 리미팅 없음
  - 파일 업로드 크기 제한 없음

### 5. A05:2021 - Security Misconfiguration (보안 설정 오류)

**파일:** `src/utils/security-vulnerabilities.ts` - `SecurityMisconfig`

- **취약점:**
  - 디버그 정보 노출 (환경 변수, 시스템 정보)
  - 기본 자격 증명 사용
  - 에러 스택 트레이스 노출

**파일:** `src/utils/api-vulnerabilities.ts` - `MissingSecurityHeaders`

- **취약점:**
  - CORS 설정 부적절 (모든 도메인 허용)
  - 보안 헤더 누락
  - 캐시 제어 부적절

### 6. A06:2021 - Vulnerable and Outdated Components (취약하고 오래된 구성 요소)

**파일:** `src/utils/security-vulnerabilities.ts` - `OutdatedComponents`

- **취약점:**
  - 취약한 라이브러리 버전 사용 시뮬레이션

### 7. A07:2021 - Identification and Authentication Failures (식별 및 인증 실패)

**파일:** `src/utils/security-vulnerabilities.ts` - `AuthFailures`

- **취약점:**
  - 약한 세션 관리 (Math.random 사용)
  - 세션 만료 없음
  - 약한 비밀번호 정책 (3자 이상)
  - 계정 잠금 없음

**파일:** `src/utils/api-vulnerabilities.ts` - `SessionVulnerabilities`

- **취약점:**
  - 세션 고정 공격 가능
  - 동시 세션 제한 없음
  - 세션 무효화 없음

### 8. A08:2021 - Software and Data Integrity Failures (소프트웨어 및 데이터 무결성 실패)

**파일:** `src/utils/security-vulnerabilities.ts` - `IntegrityFailures`

- **취약점:**
  - 서명 검증 없는 업데이트
  - 신뢰할 수 없는 소스에서 데이터 로드
  - 검증 없는 역직렬화

### 9. A09:2021 - Security Logging and Monitoring Failures (보안 로깅 및 모니터링 실패)

**파일:** `src/utils/security-vulnerabilities.ts` - `LoggingFailures`

- **취약점:**
  - 민감한 정보 로깅
  - 보안 이벤트 로깅 없음
  - 로그 무결성 보장 없음

**파일:** `src/utils/api-vulnerabilities.ts` - `LoggingVulnerabilities`

- **취약점:**
  - 비밀번호, 신용카드 정보 로깅
  - 실패한 로그인 시도 기록 없음
  - 과도한 시스템 정보 로깅

### 10. A10:2021 - Server-Side Request Forgery (SSRF)

**파일:** `src/utils/security-vulnerabilities.ts` - `SSRFVulns`

- **취약점:**
  - 사용자 입력으로 서버 요청 (URL 검증 없음)
  - 내부 네트워크 접근 가능
  - 리다이렉트 검증 없음

**파일:** `src/components/VulnerableComponent.tsx` - `UnsafeAPIComponent`

- **취약점:**
  - 사용자 입력 URL로 직접 fetch 요청

## 추가 취약점들

### XSS (Cross-Site Scripting)

**파일:** `src/utils/client-side-vulnerabilities.ts` - `DOMXSSVulns`

- **취약점:**
  - innerHTML 사용으로 DOM 기반 XSS
  - URL 파라미터를 직접 DOM에 삽입
  - 동적 스크립트 생성

**파일:** `src/components/VulnerableComponent.tsx` - `XSSVulnerableComponent`

- **취약점:**
  - dangerouslySetInnerHTML 사용

### 민감한 정보 노출

**파일:** `src/utils/client-side-vulnerabilities.ts` - `SensitiveDataExposure`

- **취약점:**
  - 로컬 스토리지에 평문 비밀번호 저장
  - 콘솔에 민감한 정보 출력
  - 글로벌 변수에 민감한 정보

**파일:** `src/components/VulnerableComponent.tsx` - `SensitiveDataComponent`

- **취약점:**
  - 화면에 민감한 정보 표시
  - 로컬 스토리지에 민감한 정보 저장

### 안전하지 않은 파일 처리

**파일:** `src/utils/client-side-vulnerabilities.ts` - `UnsafeFileHandling`

- **취약점:**
  - 파일 타입 검증 없음
  - 파일 크기 제한 없음
  - 업로드된 스크립트 실행

**파일:** `src/components/VulnerableComponent.tsx` - `UnsafeFileUpload`

- **취약점:**
  - 모든 파일 타입 허용
  - JavaScript 파일 자동 실행

### 메모리 누수

**파일:** `src/utils/client-side-vulnerabilities.ts` - `MemoryLeaks`

- **취약점:**
  - 정리되지 않는 인터벌/타임아웃
  - DOM 참조 누수

**파일:** `src/components/VulnerableComponent.tsx` - `MemoryLeakComponent`

- **취약점:**
  - useEffect cleanup 함수 없음
  - 이벤트 리스너 정리 없음

### 하드코딩된 시크릿

**모든 파일에 분산:**

- API 키, 데이터베이스 비밀번호, JWT 시크릿 등이 하드코딩됨

## SonarQube 분석 실행

1. **SonarQube 서버 설정:**
   ```bash
   # Docker로 SonarQube 실행
   docker run -d --name sonarqube -p 9000:9000 sonarqube:latest
   ```

2. **프로젝트 분석:**
   ```bash
   # SonarScanner 설치 후
   sonar-scanner
   ```

3. **결과 확인:**
   - http://localhost:9000 에서 분석 결과 확인
   - Security Hotspots 및 Vulnerabilities 섹션에서 발견된 취약점들 확인

## 예상되는 SonarQube 탐지 결과

- **Critical/High Severity Issues:**
  - 하드코딩된 시크릿 (Credentials should not be hard-coded)
  - SQL Injection 패턴
  - XSS 취약점 (dangerouslySetInnerHTML 사용)
  - 약한 암호화 알고리즘 사용

- **Medium Severity Issues:**
  - 예외 처리 부족
  - 메모리 누수 가능성
  - 입력 검증 부족

- **Low Severity Issues:**
  - 코드 복잡도 높음
  - 중복 코드
  - 사용하지 않는 변수

## 수정 방법

각 취약점에 대한 수정 방법은 SonarQube의 "Why is this an issue?" 및 "How to fix it" 섹션을 참고하세요.

## 면책 조항

이 프로젝트는 순전히 교육 목적으로 작성되었습니다. 실제 애플리케이션에서는 이러한 패턴을 사용하지 마세요.
