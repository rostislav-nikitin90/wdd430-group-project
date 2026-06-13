'use server';

import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const sql = neon(process.env.DATABASE_URL!);

export async function signupAction(prevState: any, formData: FormData) {

  const name = formData.get('fullName') as string;

  const email = formData.get('email') as string;

  const password = formData.get('password') as string;
  
  let image = formData.get('profileImage') as string;

  let bio = formData.get('bio') as string;

  const DEFAULT_IMAGE = '/images/sellers/default-profile.jpg';
  
  const DEFAULT_BIO = 'A bio has not been added yet.';

  if (!name || !email || !password) {
    return { error: 'All fields are required.' };
  }

  try {
    const existingUser = await sql`
      SELECT * FROM profiles WHERE contact = ${email}
    `;

    if (existingUser.length > 0) {
      return { error: 'Email address is already in use.' };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await sql`
      INSERT INTO profiles (name, contact, password_hash, image, bio)
      VALUES (${name}, ${email}, ${passwordHash}, ${image || DEFAULT_IMAGE}, ${bio || DEFAULT_BIO})
    `;

    redirect('/login');
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) throw error;
    return { error: 'A server error occurred. Please try again.' };
  }
}


export async function loginAction(prevState: any, formData: FormData) {

  const email = formData.get('email') as string;

  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Please fill in all fields.' };
  }

  try {
    const users = await sql`
      SELECT * FROM profiles WHERE contact = ${email}
    `;

    if (users.length === 0) {
      return { error: 'Invalid credentials.' };
    }

    const user = users[0];

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!isPasswordValid) {
      return { error: 'Invalid credentials.' };
    }

    const cookieStore = await cookies();

    cookieStore.set('session_user_id', user.profile_id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    redirect('/profile');
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) throw error;

    return { error: 'Failed to sign in.' };
  }
}