// import {
//   fetchCardData,
//   fetchLatestInvoices,
//   fetchRevenue,
// } from '@/app/lib/data';
import CardWrapper, { Card } from '@/app/ui/dashboard/cards';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import { lusitana } from '@/app/ui/fonts';
import {
  CardSkeleton,
  CardsSkeleton,
  LatestInvoicesSkeleton,
  RevenueChartSkeleton,
} from '@/app/ui/skeletons';
import { Suspense } from 'react';

// async - await으로 받아야한다. async는 함수의 앞에 붙여서 해당 함수가 비동기 함수임을 나타내며, await는 비동기 함수의 실행 결과를 기다리는 키워드이다. async 함수 안에서 await 키워드를 사용하면, 해당 비동기 작업이 완료될 때까지 코드 실행을 일시 중지하고 결과를 기다린 다음, 해당 결과를 반환한다.
export default async function DashboardPage() {
  // await는 데이터가 차례대로(직렬로) 들어온다. 하나의 데이터가 밀리면 로딩이 전체적으로 느려진다.
  // const {
  //   numberOfCustomers,
  //   numberOfInvoices,
  //   totalPaidInvoices,
  //   totalPendingInvoices,
  // } = await fetchCardData();
  // const revenue = await fetchRevenue();
  // const latestInvoices = await fetchLatestInvoices();

  // 각각의 컴포넌트에 await로 받아주면 병렬처리가 돼서 먼저 들어온 데이터를 먼저 로딩한다.

  return (
    <main>
      <h2 className={`${lusitana.className} text-[24px]`}>Dashboard</h2>
      <div className="grid grid-cols-4 gap-6 md:grid-cols-2 sm:grid-cols-1">
        {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> */}
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="flex mt-6 gap-6 md:flex-col">
        {/* 각각의 서스펜스에 대체 ui를 넣어줬으므로 loading 페이지 처리를 할 필요가 없다 */}
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}
