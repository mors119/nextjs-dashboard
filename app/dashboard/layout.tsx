import SideNav from '@/app/ui/dashboard/sidenav';
// next.config.ts에서 설정
// 경로의 정적 부분을 미리 렌더링하고 사용자가 요청할 때까지 동적 부분을 연기
export const experimental_ppr = true;
// 레이아웃을 사용하는 이점은 탐색 시 페이지 구성 요소만 업데이트되고 레이아웃은 다시 렌더링되지 않는다.
// UI를 공유할 수 있다.

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        {/* 구성 요소 는 <SideNav>데이터에 의존하지 않으며 사용자에 맞게 개인화되지 않으므로 정적 일 수 있습니다 .
        구성요소는 <Page>자주 변경되는 데이터에 의존하며 사용자에게 맞게 개인화되므로 동적 일 수 있습니다 . */}
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
