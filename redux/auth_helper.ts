import { jwtDecode } from 'jwt-decode';

// JWT 토큰의 payload에 들어있는 구조를 정의 (필요한 필드만)
interface JwtPayload {
  sub?: string;
  role?: string;
  [key: string]: unknown; // 기타 필드를 허용
}

// 사용자 ID (sub) 추출
export const getUserSubFromToken = (token: string | null): string | null => {
  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.sub ?? null;
  } catch (error) {
    console.error('jwtDecode 실패 (sub)', error);
    return null;
  }
};

// 사용자 역할(role) 추출
export const getUserRoleFromToken = (token: string | null): string | null => {
  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.role ?? null;
  } catch (error) {
    console.error('jwtDecode 실패 (role)', error);
    return null;
  }
};
