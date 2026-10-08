import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProductsByCategory } from '../../api/products';
import { Loader } from '../../components/Loader';
import { ProductsList } from '../../components/ProductsList';
import { Product, ProductCategory } from '../../types/Product';
import { SortType } from '../../types/SortType';
import styles from './CategoryPage.module.scss';

type Props = {
  category: ProductCategory;
  title: string;
  emptyMessage: string;
};

const PER_PAGE_OPTIONS = ['4', '8', '16', 'all'];

export const CategoryPage = ({ category, title, emptyMessage }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const sort = (searchParams.get('sort') || 'age') as SortType;
  const perPage = searchParams.get('perPage') || 'all';
  const currentPage = Number(searchParams.get('page')) || 1;

  const loadProducts = useCallback(() => {
    setIsLoading(true);
    setHasError(false);

    getProductsByCategory(category)
      .then(setProducts)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [category]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const sortedProducts = useMemo(() => {
    const result = [...products];

    switch (sort) {
      case 'title':
        return result.sort((a, b) => a.name.localeCompare(b.name));

      case 'price':
        return result.sort((a, b) => a.price - b.price);

      case 'age':
      default:
        return result.sort((a, b) => b.year - a.year);
    }
  }, [products, sort]);

  const itemsPerPage =
    perPage === 'all' ? sortedProducts.length : Number(perPage);

  const totalPages =
    perPage === 'all' ? 1 : Math.ceil(sortedProducts.length / Number(perPage));

  const safePage = Math.min(Math.max(currentPage, 1), totalPages);

  const visibleProducts = sortedProducts.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage,
  );

  const updateParams = (changes: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(changes).forEach(([key, value]) => {
      params.set(key, value);
    });

    setSearchParams(params);
  };

  const handleSortChange = (value: string) => {
    updateParams({
      sort: value,
      page: '1',
    });
  };

  const handlePerPageChange = (value: string) => {
    updateParams({
      perPage: value,
      page: '1',
    });
  };

  const handlePageChange = (page: number) => {
    updateParams({
      page: String(page),
    });
  };

  return (
    <main>
      <h1>{title}</h1>

      {isLoading && <Loader />}

      {!isLoading && hasError && (
        <div className={styles.error}>
          <p>Something went wrong</p>

          <button type="button" onClick={loadProducts}>
            Reload
          </button>
        </div>
      )}

      {!isLoading && !hasError && sortedProducts.length === 0 && (
        <p>{emptyMessage}</p>
      )}

      {!isLoading && !hasError && sortedProducts.length > 0 && (
        <>
          <div className={styles.controls}>
            <label>
              <span>Sort by:</span>

              <select
                value={sort}
                onChange={event => handleSortChange(event.target.value)}
              >
                <option value="age">Newest</option>
                <option value="title">Alphabetically</option>
                <option value="price">Cheapest</option>
              </select>
            </label>

            <label>
              <span>Items per page:</span>

              <select
                value={perPage}
                onChange={event => handlePerPageChange(event.target.value)}
              >
                {PER_PAGE_OPTIONS.map(option => (
                  <option key={option} value={option}>
                    {option === 'all' ? 'All' : option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <ProductsList products={visibleProducts} />

          {perPage !== 'all' && totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                type="button"
                disabled={safePage === 1}
                onClick={() => handlePageChange(safePage - 1)}
              >
                ←
              </button>

              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;

                return (
                  <button
                    key={page}
                    type="button"
                    className={page === safePage ? styles.activePage : ''}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                type="button"
                disabled={safePage === totalPages}
                onClick={() => handlePageChange(safePage + 1)}
              >
                →
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
};
