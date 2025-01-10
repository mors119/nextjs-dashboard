import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/lib/data';
import { Metadata } from 'next';
// 메타 데이터 추가
export const metadata: Metadata = {
  title: 'Invoices',
};

// useSearchParams- 현재 URL의 매개변수에 액세스할 수 있습니다. 예를 들어, 이 URL의 검색 매개변수는 /dashboard/invoices?page=1&query=pending다음과 같습니다 {page: '1', query: 'pending'}.
// usePathname- 현재 URL의 경로 이름을 읽을 수 있습니다. 예를 들어, 경로의 경우 /dashboard/invoices. usePathname을 반환합니다 '/dashboard/invoices'.
// useRouter- 클라이언트 구성 요소 내에서 경로 간 탐색을 프로그래밍 방식으로 활성화합니다. 사용할 수 있는 여러 가지 방법이 있습니다 .

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
