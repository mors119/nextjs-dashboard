'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// 양식 스키마(구조) 정의, enum 열거형
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

// id, date은 폼데이터에 생략되어 있음을 알려줌
const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  // Test it out:
  // console.log(rawFormData);
  // 센트 단위로 변경
  const amountInCents = amount * 100;
  // 생성 날짜 만들기
  const date = new Date().toISOString().split('T')[0];

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

  // 해당 경로에 대한 데이터 재검증하여 업데이트된 데이터와 캐시 데이터가 다르므로 새로운 데이터 가져옴
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
