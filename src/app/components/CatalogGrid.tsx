'use client';

import { useMemo, useState } from 'react';
import { PRODUCTS, PRODUCT_CATEGORIES } from '@/lib/data';
import type { ProductCategory } from '@/types';
import styles from './CatalogGrid.module.css';

type CategoryFilter = 'All' | ProductCategory;
type PriceFilter = 'all' | 'under-25' | '25-to-50' | 'over-50';
type SortOption = 'default' | 'price-low' | 'price-high';

const CATEGORY_FILTERS: readonly CategoryFilter[] = [
  'All',
  ...PRODUCT_CATEGORIES,
] as const;

export default function CatalogGrid() {
  const [category, setCategory] = useState<CategoryFilter>('All');
  const [priceFilter, setPriceFilter] = useState<PriceFilter>('all');
  const [sort, setSort] = useState<SortOption>('default');

  const visibleProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (category !== 'All') {
      result = result.filter((p) => p.category === category);
    }

    if (priceFilter !== 'all') {
      result = result.filter((p) => {
        if (priceFilter === 'under-25') return p.price < 25;
        if (priceFilter === '25-to-50') return p.price >= 25 && p.price <= 50;
        if (priceFilter === 'over-50') return p.price > 50;
        return true;
      });
    }

    if (sort === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') result.sort((a, b) => b.price - a.price);

    return result;
  }, [category, priceFilter, sort]);

  return (
    <section className={styles.section} aria-labelledby="catalog-heading">
      <h2 id="catalog-heading" className={styles.heading}>
        Featured Products
      </h2>

      <div className={styles.toolbar}>
        <div
          className={styles.categories}
          role="group"
          aria-label="Filter by category"
        >
          {CATEGORY_FILTERS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`${styles.chip} ${category === c ? styles.chipActive : ''
                }`}
              aria-pressed={category === c}
            >
              {c}
            </button>
          ))}
        </div>

        <div className={styles.dropdowns}>
          <label className={styles.dropdown}>
            <span className={styles.srOnly}>Filter by price</span>
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value as PriceFilter)}
              className={styles.select}
            >
              <option value="all">Price</option>
              <option value="under-25">Under $25</option>
              <option value="25-to-50">$25 to $50</option>
              <option value="over-50">Over $50</option>
            </select>
          </label>

          <label className={styles.dropdown}>
            <span className={styles.srOnly}>Sort products</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className={styles.select}
            >
              <option value="default">Sort</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </label>
        </div>
      </div>

      {visibleProducts.length === 0 ? (
        <p className={styles.empty}>No products match your filters.</p>
      ) : (
        <ul className={styles.grid}>
          {visibleProducts.map((product) => (
            <li key={product.id} className={styles.card}>
              <div className={styles.imageWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className={styles.image}
                />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{product.name}</h3>
                <p className={styles.description}>{product.description}</p>
                <p className={styles.price}>${product.price}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}