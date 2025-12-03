/**
 * 보안 취약점 데모용 코드 - OWASP Top 10 기반
 * 실제 프로덕션에서는 절대 사용하지 마세요!
 */

import * as crypto from 'crypto';

// A01:2021 - Broken Access Control
export class InsecureUserManager {
  private users: any[] = [];
  
  // 권한 검사 없이 모든 사용자 정보 반환
  getAllUsers() {
    return this.users; // 민감한 정보 포함
  }
  
  // 사용자 ID만으로 다른 사용자 정보 수정 가능
  updateUser(userId: string, data: any) {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      Object.assign(user, data); // 권한 검사 없음
    }
  }
  
  // 관리자 권한 체크 없이 사용자 삭제
  deleteUser(userId: string) {
    this.users = this.users.filter(u => u.id !== userId);
  }
}

// A02:2021 - Cryptographic Failures
export class WeakCrypto {
  // 약한 해시 알고리즘 사용
  hashPassword(password: string): string {
    return crypto.createHash('md5').update(password).digest('hex'); // MD5는 안전하지 않음
  }
  
  // 하드코딩된 암호화 키
  private static readonly SECRET_KEY = "hardcoded-secret-key-123"; // 하드코딩된 키
  
  // 약한 암호화
  encryptData(data: string): string {
    const cipher = crypto.createCipher('des', WeakCrypto.SECRET_KEY); // DES는 약함
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }
  
  // 솔트 없는 해시
  hashWithoutSalt(data: string): string {
    return crypto.createHash('sha1').update(data).digest('hex'); // 솔트 없음
  }
}

// A03:2021 - Injection
export class InjectionVulns {
  // SQL Injection 취약점
  getUserByEmail(email: string): string {
    // 실제로는 DB 쿼리이지만 시뮬레이션
    const query = `SELECT * FROM users WHERE email = '${email}'`; // SQL Injection 가능
    return query;
  }
  
  // NoSQL Injection
  findUser(filter: any): any {
    // MongoDB 스타일 쿼리 - 필터링 없음
    return { $where: filter }; // NoSQL Injection 가능
  }
  
  // Command Injection
  executeCommand(userInput: string): string {
    const command = `ls -la ${userInput}`; // Command Injection 가능
    return command;
  }
  
  // LDAP Injection
  searchLDAP(username: string): string {
    const filter = `(uid=${username})`; // LDAP Injection 가능
    return filter;
  }
}

// A04:2021 - Insecure Design
export class InsecureDesign {
  private attempts: Map<string, number> = new Map();
  
  // 무제한 로그인 시도 허용
  login(username: string, password: string): boolean {
    // 브루트 포스 공격에 취약
    if (username === "admin" && password === "password") {
      return true;
    }
    return false;
  }
  
  // 예측 가능한 토큰 생성
  generateToken(): string {
    return Date.now().toString(); // 예측 가능
  }
  
  // 보안 질문 없는 비밀번호 재설정
  resetPassword(email: string): string {
    return "new-password-123"; // 검증 없음
  }
}

// A05:2021 - Security Misconfiguration
export class SecurityMisconfig {
  // 디버그 정보 노출
  getSystemInfo(): any {
    return {
      nodeVersion: process.version,
      platform: process.platform,
      env: process.env, // 환경 변수 전체 노출
      memoryUsage: process.memoryUsage()
    };
  }
  
  // 기본 자격 증명 사용
  private readonly DEFAULT_ADMIN = {
    username: "admin",
    password: "admin123" // 기본 비밀번호
  };
  
  // 에러 스택 트레이스 노출
  handleError(error: Error): any {
    return {
      message: error.message,
      stack: error.stack, // 스택 트레이스 노출
      timestamp: new Date()
    };
  }
}

// A06:2021 - Vulnerable and Outdated Components
export class OutdatedComponents {
  // 취약한 라이브러리 시뮬레이션
  useVulnerableLibrary(): string {
    // 실제로는 취약한 버전의 라이브러리 사용
    return "Using vulnerable library version 1.0.0";
  }
}

// A07:2021 - Identification and Authentication Failures
export class AuthFailures {
  private sessions: Map<string, any> = new Map();
  
  // 약한 세션 관리
  createSession(userId: string): string {
    const sessionId = Math.random().toString(36); // 약한 세션 ID
    this.sessions.set(sessionId, { userId, created: Date.now() });
    return sessionId;
  }
  
  // 세션 만료 없음
  validateSession(sessionId: string): boolean {
    return this.sessions.has(sessionId); // 만료 검사 없음
  }
  
  // 약한 비밀번호 정책
  isValidPassword(password: string): boolean {
    return password.length >= 3; // 너무 약한 정책
  }
  
  // 계정 잠금 없음
  authenticate(username: string, password: string): boolean {
    // 무제한 시도 허용
    return username === "user" && password === "pass";
  }
}

// A08:2021 - Software and Data Integrity Failures
export class IntegrityFailures {
  // 서명 검증 없는 업데이트
  updateSoftware(updatePackage: any): boolean {
    // 무결성 검사 없음
    return true;
  }
  
  // 신뢰할 수 없는 소스에서 데이터 로드
  loadExternalData(url: string): Promise<any> {
    // URL 검증 없음
    return fetch(url).then(res => res.json());
  }
  
  // 직렬화된 객체 역직렬화 (안전하지 않음)
  deserializeObject(serializedData: string): any {
    return JSON.parse(serializedData); // 검증 없는 역직렬화
  }
}

// A09:2021 - Security Logging and Monitoring Failures
export class LoggingFailures {
  // 민감한 정보 로깅
  logUserAction(user: any, action: string): void {
    console.log(`User action: ${JSON.stringify(user)} performed ${action}`); // 민감한 정보 로깅
  }
  
  // 보안 이벤트 로깅 없음
  loginAttempt(username: string, success: boolean): void {
    // 로그인 시도 기록 없음
    if (!success) {
      // 실패한 로그인 기록하지 않음
    }
  }
  
  // 로그 무결성 보장 없음
  writeLog(message: string): void {
    // 로그 변조 방지 없음
    console.log(message);
  }
}

// A10:2021 - Server-Side Request Forgery (SSRF)
export class SSRFVulns {
  // 사용자 입력으로 서버 요청
  async fetchUserData(url: string): Promise<any> {
    // URL 검증 없음 - SSRF 가능
    const response = await fetch(url);
    return response.json();
  }
  
  // 내부 네트워크 접근 가능
  async getInternalResource(path: string): Promise<any> {
    const internalUrl = `http://localhost:8080/${path}`; // 내부 서비스 노출
    return fetch(internalUrl);
  }
  
  // 리다이렉트 검증 없음
  async followRedirect(url: string): Promise<any> {
    const response = await fetch(url, { redirect: 'follow' }); // 무제한 리다이렉트
    return response;
  }
}

// 추가 취약점들
export class AdditionalVulns {
  // XSS 취약점
  renderUserContent(userInput: string): string {
    return `<div>${userInput}</div>`; // XSS 가능
  }
  
  // 경로 순회 공격
  readFile(filename: string): string {
    const path = `./uploads/${filename}`; // 경로 순회 가능
    return path;
  }
  
  // 레이스 컨디션
  private counter = 0;
  incrementCounter(): number {
    const current = this.counter;
    // 비동기 작업 시뮬레이션
    setTimeout(() => {
      this.counter = current + 1; // 레이스 컨디션 가능
    }, 10);
    return this.counter;
  }
  
  // 메모리 누수
  private cache: Map<string, any> = new Map();
  cacheData(key: string, data: any): void {
    this.cache.set(key, data); // 캐시 정리 없음
  }
  
  // 무한 루프 가능성
  processData(data: any[]): any[] {
    let result = [];
    let i = 0;
    while (data[i]) { // 무한 루프 가능
      result.push(data[i]);
      // i++ 누락 가능성
    }
    return result;
  }
}

// 하드코딩된 시크릿
const API_KEY = "sk-1234567890abcdef"; // 하드코딩된 API 키
const DATABASE_PASSWORD = "super-secret-password"; // 하드코딩된 DB 비밀번호
const JWT_SECRET = "jwt-secret-key-do-not-use-in-production"; // 하드코딩된 JWT 시크릿

// 전역 변수 남용
let globalUserData: any = null;
let globalConfig: any = {
  debug: true,
  showErrors: true,
  allowUnsafeOperations: true
};

// 안전하지 않은 랜덤 생성
export function generateUnsafeRandom(): string {
  return Math.random().toString(36).substring(2); // 암호학적으로 안전하지 않음
}

// 타입 안전성 무시
export function unsafeTypeConversion(input: any): string {
  return input as string; // 타입 검사 없음
}

// 예외 처리 없음
export function riskyOperation(data: any): any {
  return data.someProperty.deepProperty.value; // null/undefined 체크 없음
}
