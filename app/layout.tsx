// tailwind 적용
import '@/app/ui/global.css';
import { pretendard } from '@/app/ui/fonts';

// children으로 안에 내용을 불러온다. 타입은 reactnode
// root:레이아웃 = 가장 먼저 열린다.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={pretendard.className}>{children}</body>
    </html>
  );
}
// page.tsx나 layout.tsx는 파일명을 변경할 수 없음.
