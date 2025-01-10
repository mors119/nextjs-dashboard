import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

// 루트 레이아웃은 필수이고, 모든 UI는 html페이지에서 공유된다.
// 루트 레이아웃을 사용하여 및 태그를 수정하고 메타데이터를 추가할 수 있다.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* 글꼴을 전체에 적용, antialiased: 글꼴을 매끄럽게 해준다. */}
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
