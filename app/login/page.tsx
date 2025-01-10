import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import { Metadata } from 'next';
// 메타 데이터 추가
export const metadata: Metadata = {
  title: 'login',
};
// NextAuth.js로 세션, 로그인 및 로그아웃, 기타 인증 측면을 관리하는 데 관련 추상화
// 비밀키 생성: bush > openssl rand -base64 32
// .env 파일 AUTH_SECRET= 에 넣기
// 루트 폴더에 auth.config.ts 생성
// middleware.ts 생성해서 authConfig 전달
// auth.ts 생성 -> Google이나 GitHub와 같은 다양한 로그인 옵션을 나열하는 배열

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
