'use server';

import { neon } from '@neondatabase/serverless';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export type ActionState = {
  error?: string;
  success?: boolean;
} | null;

export async function addProductAction(
  prevState: ActionState, 
  formData: FormData
): Promise<ActionState> {
  
  const cookieStore = await cookies();
  
  const sessionCookie = cookieStore.get('session_user_id');

  if (!sessionCookie || !sessionCookie.value) {
    return { error: 'Unauthorized, please log in' };
  }

  const profileId = sessionCookie.value;
  
  const name = formData.get('productName') as string;

  const image = formData.get('productImage') as string; 

  const description = formData.get('productDesc') as string;
  
  const price = parseFloat(formData.get('productPrice') as string);

  const category = formData.get('productCategory') as string;

  if (!name || !description || isNaN(price) || !category) {
    return { error: 'Name, price, description and category are required.' };
  }

  try {
    const sql = neon(process.env.DATABASE_URL!);
    
    await sql`
          INSERT INTO products (name, image, description, price, profile_id, category)
          VALUES (${name}, ${image}, ${description}, ${price}, ${profileId}, ${category})
        `;

    revalidatePath('/profile');
    
    return { success: true };
  } catch (error) {
    return { error: 'Something went wrong.' };
  }
}