import SideNav from '@/app/ui/dashboard/sidenav';

// 레이아웃을 사용하는 이점은 탐색 시 페이지 구성 요소만 업데이트되고 레이아웃은 다시 렌더링되지 않는다.
// UI를 공유할 수 있다.

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
