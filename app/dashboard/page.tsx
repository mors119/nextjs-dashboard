import { fetchCardData } from '@/app/lib/data';
import { Card } from '@/app/ui/dashboard/cards';
import { lusitana } from '@/app/ui/fonts';

// async - await으로 받아야한다. async는 함수의 앞에 붙여서 해당 함수가 비동기 함수임을 나타내며, await는 비동기 함수의 실행 결과를 기다리는 키워드이다. async 함수 안에서 await 키워드를 사용하면, 해당 비동기 작업이 완료될 때까지 코드 실행을 일시 중지하고 결과를 기다린 다음, 해당 결과를 반환한다.
export default async function DashboardPage() {
  const {
    numberOfCustomers,
    numberOfInvoices,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();
  return (
    <main>
      <h2 className={`${lusitana.className} text-[24px]`}>Dashboard</h2>
      <div className="grid grid-cols-4 gap-6 md:grid-cols-2 sm:grid-cols-1">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />

        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
    </main>
  );
}
