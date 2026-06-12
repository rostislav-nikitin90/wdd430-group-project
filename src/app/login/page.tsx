'use client';

import { useActionState } from 'react';
import { loginAction } from '@/lib/actions/auth';
import styles from '@/styles/auth.module.css';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
      <main className={`${styles.authContainer} ${styles.loginContainer}`}>      
      
      <h1 className={styles.title}>Seller Account Login</h1>

      <form action={formAction} className={styles.authForm}>
        <h2 className={styles.formTitle}>Login Form</h2>

        {state?.error && (
          <p
            style={{
              color: 'var(--color-accent4)',
              fontSize: '0.9rem',
              textAlign: 'center',
              marginBottom: '0.75rem',
            }}
          >
            {state.error}
          </p>
        )}

        <div className={styles.inputGroup}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className={styles.input}
            required
          />
        </div>

        <button
           type="submit"
            className={`${styles.submitBtn} ${styles.loginBtn}`}
            disabled={isPending}
        >
          {isPending ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </main>
  );
}