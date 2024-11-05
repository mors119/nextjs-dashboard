'use client';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
// 경로 이름을 가져오기
// import { usePathname } from 'next/navigation';

// 사이드 내비게이션에 표시할 링크 맵입니다.
// 애플리케이션의 크기에 따라 데이터베이스에 저장됩니다.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  // 리액트 훅을 사용할 때는 'use client'를 붙여야 브라우저에서 실행된다.
  // const pathname = usePathname();
  const [state, setState] = useState(0);

  return (
    <>
      {links.map((link, idx) => {
        const LinkIcon = link.icon;
        return (
          // a 태그를 이용하면 새로고침이 되므로 Link 컴포넌트를 사용하는 것이 좋다.
          <Link
            key={link.name}
            href={link.href}
            // font = wehight, text = size
            // text 색상을 변경하면 svg에 상속된다.
            className={clsx(
              'bg-[#f9fafb] rounded-md flex h-12 items-center px-3 gap-2 text-[14px] hover:bg-[#e0f2fe] hover:text-[#2f6feb] sm:flex-grow sm:justify-center',
              // { 'text-[#2f6feb] bg-sky-100': pathname === link.href }
              { 'text-[#2f6feb] bg-sky-100': idx === state }
            )}
            onClick={() => setState(idx)}
          >
            <LinkIcon className="w-6" />
            <p className="sm:hidden">{link.name}</p>
          </Link>
        );
      })}
      {/* 하나의 값만 출력 {links[0].name} */}
    </>
  );
}
