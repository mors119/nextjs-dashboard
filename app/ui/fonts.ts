// 애플리케이션 전체에서 사용될 글꼴 보관
import { Inter, Lusitana } from 'next/font/google';

// 미리 로드 하도록 사용 시 사용페이지에서 위처럼 연결하지 않고, import { inter } from '@/app/ui/fonts'; 이런 식으로 연결한다.
export const inter = Inter({ subsets: ['latin'] });
export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
});
