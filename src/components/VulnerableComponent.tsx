/**
 * React 컴포넌트 보안 취약점 데모
 * 실제 프로덕션에서는 절대 사용하지 마세요!
 */

import React, { useState, useEffect, useRef } from 'react';

// XSS 취약점이 있는 컴포넌트
export const XSSVulnerableComponent: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  // 사용자 입력을 직접 HTML로 렌더링 (XSS 취약점)
  const addMessage = () => {
    setMessages([...messages, userInput]);
  };

  return (
    <div>
      <h2>메시지 게시판 (XSS 취약)</h2>
      <input 
        type="text" 
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="메시지를 입력하세요..."
      />
      <button onClick={addMessage}>메시지 추가</button>
      
      <div>
        {messages.map((message, index) => (
          // dangerouslySetInnerHTML 사용으로 XSS 취약점
          <div 
            key={index} 
            dangerouslySetInnerHTML={{ __html: message }}
          />
        ))}
      </div>
    </div>
  );
};

// 민감한 정보 노출 컴포넌트
export const SensitiveDataComponent: React.FC = () => {
  const [user, setUser] = useState({
    id: '12345',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'secretpassword123', // 민감한 정보
    creditCard: '1234-5678-9012-3456', // 민감한 정보
    ssn: '123-45-6789' // 민감한 정보
  });

  // 개발자 도구에서 확인 가능한 로깅
  console.log('User data:', user);
  
  // 로컬 스토리지에 민감한 정보 저장
  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(user));
    localStorage.setItem('userPassword', user.password);
  }, [user]);

  return (
    <div>
      <h2>사용자 정보 (민감한 데이터 노출)</h2>
      <p>사용자 ID: {user.id}</p>
      <p>이름: {user.name}</p>
      <p>이메일: {user.email}</p>
      {/* 민감한 정보를 화면에 표시 */}
      <p>비밀번호: {user.password}</p>
      <p>신용카드: {user.creditCard}</p>
      <p>주민번호: {user.ssn}</p>
    </div>
  );
};

// 안전하지 않은 파일 업로드 컴포넌트
export const UnsafeFileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string>('');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      // 파일 타입 검증 없음
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setFileContent(content);
        
        // 파일 내용을 직접 실행 (매우 위험!)
        if (file.name.endsWith('.js')) {
          try {
            eval(content); // 업로드된 JavaScript 실행
          } catch (error) {
            console.error('Script execution error:', error);
          }
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <h2>파일 업로드 (안전하지 않음)</h2>
      <input 
        type="file" 
        onChange={handleFileSelect}
        // accept 속성 없음 - 모든 파일 타입 허용
      />
      {selectedFile && (
        <div>
          <p>선택된 파일: {selectedFile.name}</p>
          <p>파일 크기: {selectedFile.size} bytes</p>
          {/* 파일 내용을 직접 HTML로 렌더링 */}
          <div dangerouslySetInnerHTML={{ __html: fileContent }} />
        </div>
      )}
    </div>
  );
};

// 클라이언트 사이드 인증만 의존하는 컴포넌트
export const ClientSideAuthComponent: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userRole, setUserRole] = useState('user');

  // 클라이언트에서만 관리자 권한 확인
  const checkAdminAccess = () => {
    // 로컬 스토리지에서 역할 확인 (조작 가능)
    const role = localStorage.getItem('userRole');
    setIsAdmin(role === 'admin');
    setUserRole(role || 'user');
  };

  // 클라이언트에서만 권한 부여
  const grantAdminAccess = () => {
    localStorage.setItem('userRole', 'admin');
    setIsAdmin(true);
    setUserRole('admin');
  };

  return (
    <div>
      <h2>관리자 패널 (클라이언트 사이드 인증)</h2>
      <button onClick={checkAdminAccess}>권한 확인</button>
      <button onClick={grantAdminAccess}>관리자 권한 부여</button>
      
      <p>현재 역할: {userRole}</p>
      
      {/* 클라이언트에서만 권한 검사 */}
      {isAdmin && (
        <div style={{ backgroundColor: '#ffcccc', padding: '10px' }}>
          <h3>관리자 전용 영역</h3>
          <p>민감한 시스템 정보:</p>
          <ul>
            <li>데이터베이스 연결 정보</li>
            <li>API 키: sk-1234567890abcdef</li>
            <li>서버 설정</li>
          </ul>
        </div>
      )}
    </div>
  );
};

// 메모리 누수가 있는 컴포넌트
export const MemoryLeakComponent: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 정리되지 않는 인터벌
    intervalRef.current = setInterval(() => {
      setData(prevData => [...prevData, new Date().toISOString()]);
    }, 1000);

    // 정리되지 않는 타임아웃
    timeoutRef.current = setTimeout(() => {
      console.log('Timeout executed');
    }, 10000);

    // cleanup 함수 없음 - 메모리 누수 발생
    // return () => {
    //   if (intervalRef.current) clearInterval(intervalRef.current);
    //   if (timeoutRef.current) clearTimeout(timeoutRef.current);
    // };
  }, []);

  // DOM 이벤트 리스너 정리 없음
  useEffect(() => {
    const handleScroll = () => {
      console.log('Scrolling...');
    };

    window.addEventListener('scroll', handleScroll);
    
    // 이벤트 리스너 정리 없음
    // return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <h2>메모리 누수 컴포넌트</h2>
      <p>데이터 개수: {data.length}</p>
      <div style={{ maxHeight: '200px', overflow: 'auto' }}>
        {data.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </div>
  );
};

// 안전하지 않은 외부 통신 컴포넌트
export const UnsafeAPIComponent: React.FC = () => {
  const [apiData, setApiData] = useState<any>(null);
  const [userInput, setUserInput] = useState('');

  // 사용자 입력을 직접 URL에 사용 (SSRF 가능)
  const fetchExternalData = async () => {
    try {
      // URL 검증 없음
      const response = await fetch(userInput);
      const data = await response.json();
      setApiData(data);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  // 민감한 정보를 HTTP로 전송
  const sendSensitiveData = async () => {
    const sensitiveData = {
      password: 'user-password',
      creditCard: '1234-5678-9012-3456',
      ssn: '123-45-6789'
    };

    try {
      // HTTP 사용 (HTTPS 아님)
      await fetch('http://api.example.com/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sensitiveData)
      });
    } catch (error) {
      console.error('Send Error:', error);
    }
  };

  return (
    <div>
      <h2>안전하지 않은 API 통신</h2>
      <input 
        type="text" 
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="API URL 입력..."
      />
      <button onClick={fetchExternalData}>외부 데이터 가져오기</button>
      <button onClick={sendSensitiveData}>민감한 데이터 전송</button>
      
      {apiData && (
        <div>
          <h3>API 응답:</h3>
          <pre>{JSON.stringify(apiData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

// 안전하지 않은 상태 관리
export const UnsafeStateComponent: React.FC = () => {
  // 민감한 정보를 상태로 관리
  const [sensitiveState, setSensitiveState] = useState({
    apiKey: 'sk-1234567890abcdef',
    databasePassword: 'super-secret-db-password',
    encryptionKey: 'aes-256-key-hardcoded'
  });

  // 전역 객체에 민감한 정보 노출
  useEffect(() => {
    (window as any).appState = sensitiveState;
    (window as any).debugInfo = {
      version: '1.0.0',
      environment: 'production',
      secrets: sensitiveState
    };
  }, [sensitiveState]);

  return (
    <div>
      <h2>안전하지 않은 상태 관리</h2>
      <p>API 키: {sensitiveState.apiKey}</p>
      <p>DB 비밀번호: {sensitiveState.databasePassword}</p>
      <p>암호화 키: {sensitiveState.encryptionKey}</p>
      
      <button onClick={() => console.log('Sensitive state:', sensitiveState)}>
        콘솔에 민감한 정보 출력
      </button>
    </div>
  );
};

// 모든 취약한 컴포넌트를 포함하는 메인 컴포넌트
export const VulnerabilityDemo: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>보안 취약점 데모 컴포넌트</h1>
      <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
        <XSSVulnerableComponent />
      </div>
      <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
        <SensitiveDataComponent />
      </div>
      <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
        <UnsafeFileUpload />
      </div>
      <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
        <ClientSideAuthComponent />
      </div>
      <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
        <MemoryLeakComponent />
      </div>
      <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
        <UnsafeAPIComponent />
      </div>
      <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
        <UnsafeStateComponent />
      </div>
    </div>
  );
};

export default VulnerabilityDemo;
