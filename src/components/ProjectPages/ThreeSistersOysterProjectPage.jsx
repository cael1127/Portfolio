import React from 'react';
import ProjectLayout from '../ProjectLayout';

const ThreeSistersOysterProjectPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Three Sisters Oyster Co."
      subtitle="Production e-commerce for a working Gulf Coast oyster farm"
      accent="#A31F34"
      onBack={() => setCurrentPage('work')}
      next={{ label: 'Bapux', onClick: () => setCurrentPage('bapux-project') }}
      heroVisual={
        <div className="flex h-full min-h-[180px] flex-col justify-between p-6 md:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
            Live product
          </p>
          <div>
            <p className="display text-3xl text-[var(--text)]">threesistersoyster.com</p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Catalog · inventory · checkout · orders
            </p>
          </div>
        </div>
      }
      demo={
        <div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-xl font-medium text-[var(--text)]">Three Sisters Oyster Co.</h3>
              <p className="mt-1 text-[var(--muted)]">
                Premium Texas oysters — sustainable aquaculture, sold online.
              </p>
            </div>
            <a
              href="https://threesistersoyster.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--accent-fg)] transition hover:brightness-110"
            >
              Visit live site →
            </a>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-sm border border-[var(--border)] bg-[var(--bg)] p-5">
              <h4 className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)] mb-3">
                Commerce
              </h4>
              <ul className="space-y-2 text-sm text-[var(--muted)]">
                <li>Product catalog and perishable inventory</li>
                <li>Cart, checkout, and order management</li>
                <li>Customer accounts</li>
                <li>Stripe payment processing</li>
              </ul>
            </div>
            <div className="rounded-sm border border-[var(--border)] bg-[var(--bg)] p-5">
              <h4 className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)] mb-3">
                Craft
              </h4>
              <ul className="space-y-2 text-sm text-[var(--muted)]">
                <li>Mobile-first buying flows</li>
                <li>SEO and performance budget</li>
                <li>Ops-friendly inventory truth</li>
                <li>Deployed for real customers</li>
              </ul>
            </div>
          </div>
        </div>
      }
      problem="Three Sisters Oyster Co. needed a modern storefront that could sell perishable Gulf Coast oysters online — with inventory that matched the farm, secure payments, and a mobile experience customers would actually finish."
      approach="Built a full-stack platform with React, Node, MongoDB, and Stripe. Prioritized inventory honesty for perishable stock, a clear browse → cart → checkout path, and deployment that the business could rely on day to day."
      process={[
        'Mapped farm inventory constraints and customer buying flows',
        'Designed catalog and cart UX for mobile-first traffic',
        'Implemented APIs for products, orders, and inventory',
        'Integrated Stripe and hardened checkout',
        'Shipped to production and monitored real orders',
      ]}
      technicalDecisions={[
        'Chose MongoDB for flexible product and order documents',
        'Kept inventory updates close to the order path to avoid overselling perishables',
        'Used Stripe for PCI-sensitive payment handling',
        'Deployed frontend on Netlify for fast static delivery',
      ]}
      overview="Full-stack e-commerce for Three Sisters Oyster Co. in Port Lavaca, Texas — catalog, inventory, cart, checkout, and order management for premium oysters."
      role="Full-stack development, UI/UX, payment integration, and deployment."
      stack={['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS', 'Express', 'Netlify']}
      challenges={[
        'Inventory management for perishable products',
        'Intuitive product browsing on small screens',
        'Secure payment processing',
        'Fast loads under real traffic',
      ]}
      results={[
        'Launched production e-commerce platform',
        'Secure payment processing in place',
        'Strong Lighthouse performance scores',
        'Reliable inventory tracking for ops',
      ]}
      impact="The farm can sell online with an experience that matches the product — clear, fast, and trustworthy — instead of relying on ad-hoc phone and social orders alone."
      lessons={[
        'Perishable inventory is a product problem first, then a database problem',
        'Mobile checkout friction kills more conversions than missing features',
        'Ship the path customers actually take; polish the edges after revenue flows',
      ]}
      highlights={[
        'Full-stack e-commerce platform',
        'Inventory management for perishables',
        'Secure payment processing',
        'Responsive, SEO-aware storefront',
      ]}
    />
  );
};

export default ThreeSistersOysterProjectPage;
