import SideNav from '@/app/ui/dashboard/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen sm:flex-col sm:h-[138px]">
      <div className="w-[256px] sm:w-full h-screen fixed left-0 top-0 sm:static">
        <SideNav />
      </div>
      <div className="p-12 flex-grow sm:p-6 pl-[280px]">{children}</div>
    </div>
  );
}
// sideNav return add best menu 