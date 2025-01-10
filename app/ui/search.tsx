'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  // URLSearchParams: URL 쿼리 매개변수를 조작하기 위한 유틸리티 메서드를 제공하는 웹 API. 복잡한 문자열 리터럴을 만드는 대신, 이를 사용하여 ?page=1&query=a과 같은 매개변수 문자열을 가져올 수 있다.
  const searchParams = useSearchParams();
  const pathname = usePathname();
  // useRouter가 return하는 객체 중 replace만 받아야하기에 구조 분해 할당을 위해 {}를 사용
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    // 아래와 같이 콘솔을 찍어보면 너무 많이 쿼리를 보낸다.
    // 디바운싱은 함수가 실행될 수 있는 속도를 제한하는 프로그래밍 관행. 사용자가 타이핑을 멈췄을 때만 데이터베이스를 쿼리
    // 그걸 구현하기 위해서 위 처럼 use-debounce를 사용한다.
    // console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);
    // 새로운 검색 쿼리를 입력하면 페이지 번호를 1로 재설정
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        // defaultValue(기본값을 설정)와 value의 차이
        // defaultValue: defaultValue는 내부 상태와는 독립적으로 작동, DOM에 의해 관리
        // value: value는 컴포넌트의 상태에 의존, 상태가 변경되면 value 속성도 그에 맞게 업데이트, React가 직접 폼 요소의 상태를 관리
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
