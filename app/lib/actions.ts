// server action을 위한 파일
'use server';

// 유형 검증 라이브러리 zod
import { z } from 'zod';
// 데이터 삽입
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const FormSchema = z.object({
  id: z.string(),
  // Zod는 이미 customer 필드가 비어 있으면 type을 예상하기 때문에 오류를 발생하지만, 오류 메시지 지정
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  // 문자열을 숫자로 강제 변환하고 해당 유형의 유효성을 검사
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});
// ZOD를 사용하여 예상 유형을 업데이트
const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

// HTML에서는 속성에 URL을 전달합니다 action. 이 URL은 양식 데이터를 제출해야 하는 대상이지만,
// React에서는 이 action속성이 특별한 prop으로 간주된다.
export async function createInvoice(prevState: State, formData: FormData) {
  // 양식의 데이터가 데이터베이스의 예상 유형과 일치하는지 확인하는 것이 중요
  // const { customerId, amount, status } = CreateInvoice.parse({
  // ZOD를 사용하여 양식 필드를 검증
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // 양식 검증이 실패하면 오류를 일찍 반환. 그렇지 않으면 계속.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // 데이터베이스에 삽입을위한 데이터를 준비
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100; // 센트로 변환하기 위해
  const date = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD" 형식

  // 데이터베이스에 데이터를 삽입
  try {
    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;
  } catch (error) {
    // 문서와 달리 message를 보내면 형태가 같지 않아 오류 발생
    // 데이터베이스 오류가 발생하면보다 구체적인 오류를 반환.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  // 송장 페이지의 캐시를 다시 비우고 사용자를 리디렉션.
  // 재검증 캐시를 지우고 최신 데이터를 가져옴
  revalidatePath('/dashboard/invoices');
  // redirect(다시 지시하다): 재이동
  redirect('/dashboard/invoices');
}

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  // 에러 생성: 코드에 도달하지 못하고 에러 발생
  // throw new Error('Failed to Delete Invoice');

  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
  } catch (error) {
    // return { message: 'Database Error: Failed to Delete Invoice.' };
  }
  revalidatePath('/dashboard/invoices');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
