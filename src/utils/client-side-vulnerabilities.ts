/**
 * 클라이언트 사이드 보안 취약점 데모
 * 실제 프로덕션에서는 절대 사용하지 마세요!
 */

// DOM 기반 XSS 취약점
export class DOMXSSVulns {
  // 사용자 입력을 직접 DOM에 삽입
  displayUserMessage(message: string): void {
    const element = document.getElementById('message');
    if (element) {
      element.innerHTML = message; // XSS 취약점
    }
  }
  
  // URL 파라미터를 직접 사용
  displayUrlParam(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    if (name) {
      document.body.innerHTML += `<h1>Hello ${name}!</h1>`; // XSS 취약점
    }
  }
  
  // 동적 스크립트 생성
  loadDynamicScript(userInput: string): void {
    const script = document.createElement('script');
    script.innerHTML = `console.log('${userInput}');`; // 코드 주입 가능
    document.head.appendChild(script);
  }
}

// 민감한 정보 노출
export class SensitiveDataExposure {
  // 로컬 스토리지에 민감한 정보 저장
  storeUserCredentials(username: string, password: string): void {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password); // 평문 비밀번호 저장
  }
  
  // 세션 스토리지에 토큰 저장
  storeAuthToken(token: string): void {
    sessionStorage.setItem('authToken', token); // XSS로 접근 가능
  }
  
  // 콘솔에 민감한 정보 출력
  debugUserInfo(user: any): void {
    console.log('User details:', user); // 민감한 정보 콘솔 출력
    console.log('API Key:', user.apiKey);
    console.log('Credit Card:', user.creditCard);
  }
  
  // 글로벌 변수에 민감한 정보
  setGlobalUserData(userData: any): void {
    (window as any).currentUser = userData; // 글로벌 접근 가능
  }
}

// 안전하지 않은 통신
export class InsecureCommunication {
  // HTTP로 민감한 데이터 전송
  sendUserData(userData: any): Promise<Response> {
    return fetch('http://api.example.com/users', { // HTTP 사용
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
  }
  
  // CORS 설정 없는 요청
  fetchExternalData(url: string): Promise<any> {
    return fetch(url, {
      mode: 'no-cors' // CORS 우회
    });
  }
  
  // 인증 없는 API 호출
  callAPI(endpoint: string): Promise<Response> {
    return fetch(endpoint); // 인증 헤더 없음
  }
}

// 클라이언트 사이드 검증만 의존
export class ClientSideValidationOnly {
  // 클라이언트에서만 비밀번호 강도 검사
  validatePassword(password: string): boolean {
    if (password.length < 8) {
      alert('Password too short!');
      return false;
    }
    return true; // 서버 검증 없음
  }
  
  // 클라이언트에서만 권한 검사
  isAdmin(user: any): boolean {
    return user.role === 'admin'; // 클라이언트에서만 검사
  }
  
  // 클라이언트에서만 입력 검증
  validateEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email); // 서버 검증 없음
  }
}

// 안전하지 않은 파일 처리
export class UnsafeFileHandling {
  // 파일 타입 검증 없음
  uploadFile(file: File): void {
    const formData = new FormData();
    formData.append('file', file); // 타입 검증 없음
    
    fetch('/upload', {
      method: 'POST',
      body: formData
    });
  }
  
  // 파일 크기 제한 없음
  handleLargeFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      // 메모리 사용량 제한 없음
      const content = e.target?.result;
    };
    reader.readAsText(file);
  }
  
  // 파일 내용 직접 실행
  executeUploadedScript(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      const script = e.target?.result as string;
      eval(script); // 업로드된 스크립트 실행
    };
    reader.readAsText(file);
  }
}

// 안전하지 않은 이벤트 처리
export class UnsafeEventHandling {
  // 이벤트 리스너 메모리 누수
  addEventListeners(): void {
    const button = document.getElementById('myButton');
    if (button) {
      // 제거되지 않는 이벤트 리스너
      button.addEventListener('click', () => {
        console.log('Button clicked');
      });
    }
  }
  
  // postMessage 검증 없음
  setupPostMessage(): void {
    window.addEventListener('message', (event) => {
      // origin 검증 없음
      const data = event.data;
      document.getElementById('content')!.innerHTML = data; // XSS 가능
    });
  }
  
  // 사용자 입력 이벤트 직접 처리
  handleUserInput(): void {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'F12') {
        // 개발자 도구 차단 시도 (우회 가능)
        event.preventDefault();
        alert('Developer tools disabled!');
      }
    });
  }
}

// 타이밍 공격 취약점
export class TimingAttacks {
  // 비밀번호 비교에서 타이밍 공격 가능
  comparePasswords(input: string, stored: string): boolean {
    if (input.length !== stored.length) {
      return false;
    }
    
    // 문자별 비교로 타이밍 공격 가능
    for (let i = 0; i < input.length; i++) {
      if (input[i] !== stored[i]) {
        return false; // 즉시 반환으로 타이밍 차이 발생
      }
    }
    return true;
  }
  
  // 토큰 검증에서 타이밍 공격
  validateToken(token: string): boolean {
    const validToken = 'secret-token-123';
    return token === validToken; // 타이밍 공격 가능
  }
}

// 안전하지 않은 랜덤 생성
export class WeakRandomGeneration {
  // 예측 가능한 ID 생성
  generateUserId(): string {
    return Date.now().toString(); // 예측 가능
  }
  
  // 약한 세션 ID
  generateSessionId(): string {
    return Math.random().toString(36); // 암호학적으로 안전하지 않음
  }
  
  // 약한 CSRF 토큰
  generateCSRFToken(): string {
    return btoa(Date.now().toString()); // 예측 가능
  }
}

// 메모리 누수 및 성능 문제
export class MemoryLeaks {
  private intervals: number[] = [];
  private timeouts: number[] = [];
  
  // 정리되지 않는 인터벌
  startPolling(): void {
    const interval = setInterval(() => {
      console.log('Polling...');
    }, 1000);
    this.intervals.push(interval);
    // clearInterval 호출 없음
  }
  
  // 정리되지 않는 타임아웃
  scheduleTask(): void {
    const timeout = setTimeout(() => {
      console.log('Task executed');
    }, 5000);
    this.timeouts.push(timeout);
    // clearTimeout 호출 없음
  }
  
  // DOM 참조 누수
  private domReferences: HTMLElement[] = [];
  
  storeDOMReference(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      this.domReferences.push(element); // DOM 참조 누적
    }
  }
}

// 하드코딩된 설정값들
export const INSECURE_CONFIG = {
  API_ENDPOINT: 'http://localhost:3000/api', // 하드코딩된 엔드포인트
  SECRET_KEY: 'client-secret-key-123', // 클라이언트에 노출된 시크릿
  DEBUG_MODE: true, // 프로덕션에서도 디버그 모드
  ADMIN_PASSWORD: 'admin123', // 하드코딩된 관리자 비밀번호
  DATABASE_URL: 'mongodb://admin:password@localhost:27017/mydb' // 하드코딩된 DB 연결 정보
};

// 전역 변수 오염
(window as any).sensitiveData = {
  userCredentials: {},
  apiKeys: {},
  internalConfig: {}
};

// eval 사용
export function executeUserCode(code: string): any {
  return eval(code); // 코드 주입 가능
}

// Function 생성자 사용
export function createDynamicFunction(code: string): Function {
  return new Function(code); // 코드 주입 가능
}

// innerHTML 사용
export function updateContent(html: string): void {
  document.body.innerHTML = html; // XSS 가능
}

// 안전하지 않은 정규식
export function validateInput(input: string): boolean {
  // ReDoS 공격 가능한 정규식
  const regex = /^(a+)+$/;
  return regex.test(input);
}
