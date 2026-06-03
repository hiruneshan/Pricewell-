'use client';

import { useEffect, useMemo, useState } from 'react';
import './HomePage.css';

type Product = {
  id: number;
  name: string;
  price: string;
  description: string;
};

const placeholderProducts: Product[] = [
  {
    id: 1,
    name: 'PriceWell Pro Planner',
    price: '$49',
    description: 'Organize your pricing strategy with intelligent workflows.',
  },
  {
    id: 2,
    name: 'PriceWell Growth',
    price: '$29',
    description: 'A lightweight plan for scaling product revenue and experimentation.',
  },
  {
    id: 3,
    name: 'PriceWell Insights',
    price: '$19',
    description: 'Get actionable product pricing analytics and competitive insights.',
  },
  {
    id: 4,
    name: 'PriceWell Starter',
    price: '$9',
    description: 'Start with a simple product pricing dashboard for early-stage teams.',
  },
  {
    id: 5,
    name: 'PriceWell Enterprise',
    price: '$99',
    description: 'Advanced pricing controls, reports, and customer segmentation.',
  },
];

const fetchProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(placeholderProducts), 200);
  });
};

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError('Unable to load products.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase().trim()),
      ),
    [products, query],
  );

  return (
    <main className="home-page">
      <section className="home-page__container">
        <header className="home-page__header">
          <h1 className="home-page__title">Search products</h1>
          <p className="home-page__subtitle">
            Find the right product from the list below. Type a product name to filter results instantly.
          </p>
        </header>

        <div className="home-page__search-area">
          <label htmlFor="product-search" className="home-page__label">
            Search by product name
          </label>
          <input
            id="product-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products..."
            className="home-page__search-input"
          />
        </div>

        <section className="home-page__products">
          <h2 className="home-page__products-title">Product list</h2>

          {loading ? (
            <p className="home-page__message">Loading products...</p>
          ) : error ? (
            <p className="home-page__message home-page__message--error">{error}</p>
          ) : filteredProducts.length === 0 ? (
            <p className="home-page__message">
              No products match your search. Try a different keyword.
            </p>
          ) : (
            <div className="home-page__product-grid">
              {filteredProducts.map((product) => (
                <article key={product.id} className="home-page__product-card">
                  <div className="home-page__product-card-header">
                    <h3 className="home-page__product-name">{product.name}</h3>
                    <span className="home-page__product-price">{product.price}</span>
                  </div>
                  <p className="home-page__product-description">{product.description}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
};

export default HomePage;
