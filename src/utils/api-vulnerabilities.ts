/**
 * API 및 서버 사이드 보안 취약점 데모
 * 실제 프로덕션에서는 절대 사용하지 마세요!
 */

// 부적절한 로깅 및 모니터링
export class LoggingVulnerabilities {
  // 민감한 정보를 로그에 기록
  logUserLogin(username: string, password: string, creditCard: string): void {
    console.log(`Login attempt: ${username}/${password}`); // 비밀번호 로깅
    console.log(`User payment info: ${creditCard}`); // 신용카드 정보 로깅
  }
  
  // 보안 이벤트 로깅 누락
  handleFailedLogin(username: string): void {
    // 실패한 로그인 시도를 기록하지 않음
    console.log('Login failed'); // 세부 정보 없음
  }
  
  // 과도한 정보 로깅
  logSystemState(): void {
    console.log('System state:', {
      environment: process.env, // 전체 환경 변수 로깅
      memory: process.memoryUsage(),
      uptime: process.uptime(),
      versions: process.versions
    });
  }
  
  // 로그 레벨 부적절
  logDebugInfo(sensitiveData: any): void {
    console.debug('Debug info:', sensitiveData); // 프로덕션에서도 디버그 로그
  }
}

// 레이트 리미팅 없음
export class NoRateLimiting {
  private loginAttempts: Map<string, number> = new Map();
  
  // 무제한 API 호출 허용
  async processAPIRequest(userId: string, request: any): Promise<any> {
    // 레이트 리미팅 없음
    return this.handleRequest(request);
  }
  
  // 브루트 포스 공격 방어 없음
  async login(username: string, password: string): Promise<boolean> {
    // 로그인 시도 횟수 제한 없음
    if (username === 'admin' && password === 'password') {
      return true;
    }
    return false;
  }
  
  // 파일 업로드 크기 제한 없음
  async uploadFile(file: Buffer): Promise<string> {
    // 파일 크기 검사 없음
    return 'File uploaded successfully';
  }
  
  private async handleRequest(request: any): Promise<any> {
    return { status: 'processed', data: request };
  }
}

// 입력 검증 부족
export class InputValidationFailures {
  // 타입 검증 없음
  processUserData(data: any): any {
    return {
      name: data.name, // 타입 검증 없음
      age: data.age,   // 숫자 검증 없음
      email: data.email // 이메일 형식 검증 없음
    };
  }
  
  // 길이 제한 없음
  saveUserBio(bio: string): void {
    // 길이 제한 없어 DoS 가능
    console.log(`Bio saved: ${bio}`);
  }
  
  // 특수 문자 필터링 없음
  searchUsers(query: string): string[] {
    // SQL Injection 등에 취약
    const sql = `SELECT * FROM users WHERE name LIKE '%${query}%'`;
    console.log('Executing:', sql);
    return [];
  }
  
  // 파일 확장자 검증 없음
  uploadAvatar(filename: string, content: Buffer): void {
    // 악성 파일 업로드 가능
    console.log(`Uploading ${filename}`);
  }
}

// 권한 검사 부족
export class AuthorizationFailures {
  private users = new Map<string, any>();
  
  // 수평적 권한 상승
  getUserProfile(requesterId: string, targetUserId: string): any {
    // 요청자가 대상 사용자 정보에 접근 권한이 있는지 확인하지 않음
    return this.users.get(targetUserId);
  }
  
  // 수직적 권한 상승
  deleteUser(requesterId: string, targetUserId: string): boolean {
    // 관리자 권한 확인 없음
    this.users.delete(targetUserId);
    return true;
  }
  
  // 리소스 소유권 확인 없음
  updateDocument(userId: string, documentId: string, content: string): void {
    // 문서 소유자 확인 없음
    console.log(`Document ${documentId} updated by ${userId}`);
  }
  
  // 역할 기반 접근 제어 없음
  accessAdminPanel(userId: string): any {
    // 관리자 역할 확인 없음
    return { adminData: 'sensitive admin information' };
  }
}

// 세션 관리 취약점
export class SessionVulnerabilities {
  private sessions = new Map<string, any>();
  
  // 세션 고정 공격
  createSession(userId: string, sessionId?: string): string {
    const id = sessionId || this.generateSessionId(); // 외부에서 세션 ID 지정 가능
    this.sessions.set(id, { userId, created: Date.now() });
    return id;
  }
  
  // 세션 만료 없음
  validateSession(sessionId: string): boolean {
    return this.sessions.has(sessionId); // 만료 시간 확인 없음
  }
  
  // 세션 무효화 없음
  logout(sessionId: string): void {
    // 세션을 삭제하지 않음
    console.log(`User logged out: ${sessionId}`);
  }
  
  // 동시 세션 제한 없음
  allowMultipleSessions(userId: string): boolean {
    return true; // 무제한 동시 세션 허용
  }
  
  private generateSessionId(): string {
    return Math.random().toString(36); // 약한 세션 ID 생성
  }
}

// API 보안 헤더 누락
export class MissingSecurityHeaders {
  // CORS 설정 부적절
  setCORSHeaders(): Record<string, string> {
    return {
      'Access-Control-Allow-Origin': '*', // 모든 도메인 허용
      'Access-Control-Allow-Methods': '*', // 모든 메서드 허용
      'Access-Control-Allow-Headers': '*'  // 모든 헤더 허용
    };
  }
  
  // 보안 헤더 누락
  getSecurityHeaders(): Record<string, string> {
    return {
      // 다음 헤더들이 누락됨:
      // 'X-Content-Type-Options': 'nosniff'
      // 'X-Frame-Options': 'DENY'
      // 'X-XSS-Protection': '1; mode=block'
      // 'Strict-Transport-Security': 'max-age=31536000'
      // 'Content-Security-Policy': "default-src 'self'"
    };
  }
  
  // 캐시 제어 부적절
  getCacheHeaders(): Record<string, string> {
    return {
      'Cache-Control': 'public, max-age=31536000' // 민감한 데이터도 캐시
    };
  }
}

// 에러 처리 부적절
export class ImproperErrorHandling {
  // 상세한 에러 정보 노출
  handleDatabaseError(error: Error): any {
    return {
      error: error.message,
      stack: error.stack, // 스택 트레이스 노출
      query: 'SELECT * FROM users WHERE id = ?', // 쿼리 구조 노출
      timestamp: new Date().toISOString()
    };
  }
  
  // 시스템 정보 노출
  handleSystemError(): any {
    return {
      nodeVersion: process.version,
      platform: process.platform,
      architecture: process.arch,
      memoryUsage: process.memoryUsage(),
      uptime: process.uptime()
    };
  }
  
  // 예외 처리 없음
  riskyOperation(data: any): any {
    return data.user.profile.settings.theme; // null/undefined 체크 없음
  }
  
  // 에러 로깅 부족
  silentFailure(operation: string): void {
    try {
      // 위험한 작업
      throw new Error('Something went wrong');
    } catch (error) {
      // 에러를 무시함
    }
  }
}

// 데이터 검증 부족
export class DataValidationFailures {
  // JSON 스키마 검증 없음
  processJSON(jsonData: string): any {
    return JSON.parse(jsonData); // 검증 없는 파싱
  }
  
  // 파일 타입 검증 없음
  processUploadedFile(file: any): void {
    // 파일 타입, 크기, 내용 검증 없음
    console.log(`Processing file: ${file.name}`);
  }
  
  // 비즈니스 로직 검증 없음
  transferMoney(fromAccount: string, toAccount: string, amount: number): void {
    // 잔액 확인, 계좌 유효성 검사 없음
    console.log(`Transferring ${amount} from ${fromAccount} to ${toAccount}`);
  }
  
  // 중복 처리 방지 없음
  processPayment(paymentId: string, amount: number): void {
    // 중복 결제 방지 없음
    console.log(`Processing payment ${paymentId}: ${amount}`);
  }
}

// 암호화 및 해싱 취약점
export class CryptographicWeaknesses {
  // 약한 해싱 알고리즘
  hashSensitiveData(data: string): string {
    // MD5는 충돌 공격에 취약
    const crypto = require('crypto');
    return crypto.createHash('md5').update(data).digest('hex');
  }
  
  // 솔트 없는 비밀번호 해싱
  hashPassword(password: string): string {
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(password).digest('hex'); // 솔트 없음
  }
  
  // 하드코딩된 암호화 키
  encryptData(data: string): string {
    const crypto = require('crypto');
    const key = 'hardcoded-key-123'; // 하드코딩된 키
    const cipher = crypto.createCipher('aes192', key);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }
  
  // 약한 랜덤 생성
  generateToken(): string {
    return Math.random().toString(36); // 예측 가능
  }
}

// 비즈니스 로직 취약점
export class BusinessLogicFlaws {
  private userBalances = new Map<string, number>();
  
  // 레이스 컨디션
  async withdraw(userId: string, amount: number): Promise<boolean> {
    const balance = this.userBalances.get(userId) || 0;
    
    // 비동기 작업 중 잔액이 변경될 수 있음
    await new Promise(resolve => setTimeout(resolve, 100));
    
    if (balance >= amount) {
      this.userBalances.set(userId, balance - amount);
      return true;
    }
    return false;
  }
  
  // 가격 조작 가능
  calculateDiscount(originalPrice: number, discountPercent: number): number {
    // 음수 할인율 검증 없음
    return originalPrice * (1 - discountPercent / 100);
  }
  
  // 수량 제한 없음
  addToCart(userId: string, itemId: string, quantity: number): void {
    // 음수 수량, 재고 확인 없음
    console.log(`Added ${quantity} of ${itemId} to cart for ${userId}`);
  }
  
  // 시간 기반 공격
  isValidCoupon(couponCode: string, validCodes: string[]): boolean {
    // 문자열 비교로 타이밍 공격 가능
    return validCodes.includes(couponCode);
  }
}

// 하드코딩된 민감한 정보
export const HARDCODED_SECRETS = {
  DATABASE_URL: 'postgresql://admin:supersecret@localhost:5432/mydb',
  API_KEY: 'sk-1234567890abcdefghijklmnopqrstuvwxyz',
  JWT_SECRET: 'my-super-secret-jwt-key-do-not-share',
  ENCRYPTION_KEY: 'aes-256-encryption-key-hardcoded',
  ADMIN_PASSWORD: 'admin123456',
  SMTP_PASSWORD: 'email-server-password',
  THIRD_PARTY_TOKEN: 'oauth-token-hardcoded-value'
};

// 디버그 정보 노출
export function exposeDebugInfo(): any {
  return {
    env: process.env,
    argv: process.argv,
    config: HARDCODED_SECRETS,
    internalState: 'sensitive internal information'
  };
}
