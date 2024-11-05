import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';

export default function SideNav() {
  return (
    <div className="h-full px-2 py-4 flex flex-col">
      <Link
        className="h-[160px] bg-point-color2 rounded-md flex items-end p-4 sm:h-20"
        href="/"
      >
        <AcmeLogo />
      </Link>
      {/* tailwind divide 요소 간 간격 = gap 공간에 선이 있는 느낌. GAP 대신 SPACE를 사용할 수 있다. */}
      <div className="flex flex-col gap-2 mt-2 flex-grow sm:flex-row">
        <NavLinks />
        <div className="bg-[#f9fafb] flex-grow sm:hidden"></div>
        <form>
          <button
            type="submit"
            className="flex bg-[#f9fafb] rounded-md h-12 items-center px-3 gap-2 text-[14px] hover:bg-[#e0f2fe] hover:text-[#2f6feb] w-full"
          >
            <PowerIcon className="w-6" />
            {/* button은 인라인블럭이기 때문에 block을 넣을 수 없다 */}
            <span className="sm:hidden">Sign Out</span>
          </button>
        </form>
      </div>
    </div>
  );
}
