import { useMemo, useState } from 'react';

type Product = {
  id: number;
  name: string;
  price: string;
  description: string;
};

const products: Product[] = [
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

const HomePage = () => {
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase().trim()),
      ),
    [query],
  );

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <section style={{ maxWidth: 960, margin: '0 auto' }}>
        <header style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>
            Search products
          </h1>
          <p style={{ color: '#555', lineHeight: 1.6 }}>
            Find the right product from the list below. Type a product name to filter results instantly.
          </p>
        </header>

        <div style={{ marginBottom: '2rem' }}>
          <label htmlFor="product-search" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
            Search by product name
          </label>
          <input
            id="product-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products..."
            style={{
              width: '100%',
              padding: '0.9rem 1rem',
              fontSize: '1rem',
              borderRadius: 10,
              border: '1px solid #d1d5db',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)',
            }}
          />
        </div>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            Product list
          </h2>

          {filteredProducts.length === 0 ? (
            <p style={{ color: '#666' }}>
              No products match your search. Try a different keyword.
            </p>
          ) : (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {filteredProducts.map((product) => (
                <article
                  key={product.id}
                  style={{
                    padding: '1.25rem',
                    borderRadius: 16,
                    border: '1px solid #e5e7eb',
                    background: '#fff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.125rem' }}>{product.name}</h3>
                    <span style={{ fontWeight: 700, color: '#111' }}>{product.price}</span>
                  </div>
                  <p style={{ margin: 0, color: '#4b5563', lineHeight: 1.7 }}>{product.description}</p>
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
