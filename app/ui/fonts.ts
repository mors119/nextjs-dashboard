import { Montserrat, Lusitana } from 'next/font/google';
import localFont from 'next/font/local';

// google fonts에서 variable이면 변수형
// 변수형 폰트
export const montserrat = Montserrat({
  // 영문은 subsets지정 해줘야함.
  subsets: ['latin'],
  display: 'swap',
});

// 변수형이 아닌 경우 weight 지정
export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

//@를 이용해서 경로지정 불가하다.
export const pretendard = localFont({
  src: [
    { path: '../../public/fonts/Pretendard-Regular.woff', weight: '400' },
    { path: '../../public/fonts/Pretendard-Medium.woff', weight: '500' },
    { path: '../../public/fonts/Pretendard-Bold.woff', weight: '700' },
  ],
  display: 'swap',
});
