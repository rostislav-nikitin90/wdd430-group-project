'use client';

import { useActionState, useRef, useEffect } from 'react';
import { addProductAction } from '@/lib/actions/product';

import styles from "./auth.module.css";

export default function AddProductForm() {
  const [state, formAction, isPending] = useActionState(addProductAction, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {

    if (state?.success && formRef.current) {

      formRef.current.reset();
    }
  }, [state]);

  return (
    <div className={styles.addProductSection}>

      <form

        action={formAction}
        ref={formRef}
        className={styles.authForm}
        style={{ maxWidth: '450px' }}
      >
        <h2
          className={styles.formTitle}

          style={{ fontFamily: 'var(--font-body)', fontSize: '1.6rem' }}
        >
          Add New Product
        </h2>

        {state?.error && (
          <p className={styles.errorMessage}>{state.error}</p>
        )}

        {state?.success && (
          <p
            style={{
              color: 'var(--color-accent2)',
              textAlign: 'center',
              marginBottom: '0.75rem',
            }}
          >
            Product added successfully!
          </p>
        )}

        <div className={styles.inputGroup}>
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <input
            type="text"
            name="productImage"
            placeholder="Add a Product Photo (URL)"
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <textarea 
            name="productDesc" 
            placeholder="Product Description" 
            className={styles.input} 
            style={{ height: '80px', paddingTop: '0.5rem', resize: 'vertical' }} 
            required 
          />
        </div>

        <div className={styles.inputGroup}>
          <select 
            name="productCategory" 
            className={styles.input} 
            required
            defaultValue=""
          >
            <option value="" disabled>Select a Category</option>
            <option value="Jewelry">Jewelry</option>
            <option value="Home Decor">Home Decor</option>
            <option value="Accessories">Accessories</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className={styles.inputGroup}>

          <input type="number" name="productPrice" placeholder="Product Price" step="0.01" className={styles.input} required />
        </div>

        <div className={styles.buttonGroup}>

          <button type="button" className={styles.cancelBtn} onClick={() => formRef.current?.reset()}>
            Cancel
          </button>

          <button type="submit" className={styles.saveBtn} disabled={isPending}>
            {isPending ? 'Saving...' : 'Save'}
          </button>

        </div>
        
      </form>
    </div>
  );
}