'use client';

import { useActionState } from 'react';
import { signupAction } from '@/lib/actions/auth';
import styles from "./auth.module.css";

export default function SignUpPage() {
  const [state, formAction, isPending] = useActionState(signupAction, null);

  return (
    <main className={`${styles.authContainer} ${styles.signupContainer}`}>
      <h1 className={styles.title}>Create a Seller Account</h1>

      <form action={formAction} className={styles.authForm}>
        <h2 className={styles.formTitle}>Sign Up Form</h2>

        {state?.error && (
          <p className={styles.errorMessage}>
            {state.error}
          </p>
        )}

        <div className={styles.inputGroup}>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Full Name"
            className={styles.input}
            required
          />
        </div>

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
          className={`${styles.submitBtn} ${styles.signupBtn}`}
          disabled={isPending}
        >
          {isPending ? 'Registering...' : 'Sign Up'}
        </button>
      </form>
    </main>
  );
}