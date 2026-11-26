import Image from 'next/image'
import Link from 'next/link'
import { logoutAdmin } from '@/actions/auth'

export const dynamic = 'force-dynamic'

const NAV_LINKS = [
  {
    href: '/admin',
    label: 'Overview',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    href: '/admin/packages',
    label: 'Packages',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    href: '/admin/inquiries',
    label: 'Inquiries',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
        backgroundColor: '#0a1520',
      }}
    >
      {/*
       * ── SIDEBAR ──────────────────────────────────────────────────────────
       * On mobile (< 768 px) it becomes a top bar via CSS media query
       * injected in <style> at the bottom.
       */}
      <aside
        className="admin-sidebar"
        style={{
          width: '240px',
          minWidth: '240px',
          backgroundColor: '#0d1b2a',
          borderRight: '1px solid rgba(88,129,87,0.18)',
          display: 'flex',
          flexDirection: 'column',
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflowY: 'auto',
          zIndex: 50,
        }}
      >
        {/* Logo + branding */}
        <div
          style={{
            padding: '1.5rem 1.25rem 1.25rem',
            borderBottom: '1px solid rgba(88,129,87,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <div
            style={{
              width: '2.75rem',
              height: '2.75rem',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2px solid rgba(88,129,87,0.5)',
              flexShrink: 0,
            }}
          >
            <Image
              src="/logo.jpg"
              alt="Trinetra Solutions"
              width={44}
              height={44}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              priority
            />
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: '0.95rem',
                background: 'linear-gradient(135deg, #a3b18a, #588157)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1.2,
              }}
            >
              Admin Portal
            </div>
            <div
              style={{
                fontSize: '0.68rem',
                color: 'rgba(163,177,138,0.5)',
                letterSpacing: '0.04em',
                marginTop: '0.1rem',
              }}
            >
              Trinetra Solutions
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <div
            style={{
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(163,177,138,0.4)',
              padding: '0 0.5rem',
              marginBottom: '0.5rem',
            }}
          >
            Navigation
          </div>

          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.65rem 0.75rem',
                borderRadius: '0.5rem',
                color: 'rgba(240,244,236,0.75)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                transition: 'background-color 0.15s, color 0.15s',
              }}
              className="admin-nav-link"
            >
              <span style={{ color: 'rgba(88,129,87,0.8)', flexShrink: 0 }}>{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div
          style={{
            padding: '1rem 0.75rem',
            borderTop: '1px solid rgba(88,129,87,0.15)',
          }}
        >
          <form action={logoutAdmin}>
            <button
              type="submit"
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.65rem 0.75rem',
                borderRadius: '0.5rem',
                backgroundColor: 'transparent',
                border: '1px solid rgba(220,38,38,0.2)',
                color: 'rgba(248,113,113,0.8)',
                fontSize: '0.875rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'background-color 0.15s, color 0.15s, border-color 0.15s',
              }}
              className="admin-logout-btn"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0 }}
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
      <main
        style={{
          flex: 1,
          minWidth: 0,
          backgroundColor: '#0a1520',
          minHeight: '100vh',
          overflowX: 'hidden',
        }}
      >
        {/* Mobile top-bar (shown only on small screens via CSS) */}
        <div
          className="admin-mobile-topbar"
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.85rem 1rem',
            backgroundColor: '#0d1b2a',
            borderBottom: '1px solid rgba(88,129,87,0.18)',
            position: 'sticky',
            top: 0,
            zIndex: 40,
          }}
        >
          <div
            style={{
              width: '2rem',
              height: '2rem',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '1.5px solid rgba(88,129,87,0.5)',
              flexShrink: 0,
            }}
          >
            <Image src="/logo.jpg" alt="Trinetra" width={32} height={32} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
          </div>
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: '1rem',
              background: 'linear-gradient(135deg, #a3b18a, #588157)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Admin Portal
          </span>

          {/* Mobile nav links (inline, condensed) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto' }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2.1rem',
                  height: '2.1rem',
                  borderRadius: '0.4rem',
                  color: 'rgba(88,129,87,0.85)',
                  textDecoration: 'none',
                  transition: 'background-color 0.15s',
                }}
                title={link.label}
                className="admin-mobile-nav-link"
              >
                {link.icon}
              </Link>
            ))}

            {/* Mobile logout */}
            <form action={logoutAdmin}>
              <button
                type="submit"
                title="Sign Out"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2.1rem',
                  height: '2.1rem',
                  borderRadius: '0.4rem',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'rgba(248,113,113,0.7)',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s',
                }}
                className="admin-mobile-logout-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Page content */}
        <div style={{ padding: '2rem' }}>{children}</div>
      </main>

      {/* ── Responsive CSS (no extra JS, no Tailwind breakpoint classes needed) ── */}
      <style>{`
        /* Nav link hover */
        .admin-nav-link:hover {
          background-color: rgba(88, 129, 87, 0.12);
          color: #a3b18a;
        }

        /* Logout button hover */
        .admin-logout-btn:hover {
          background-color: rgba(220, 38, 38, 0.1);
          border-color: rgba(220, 38, 38, 0.4);
          color: #f87171;
        }

        /* Mobile nav icon hover */
        .admin-mobile-nav-link:hover,
        .admin-mobile-logout-btn:hover {
          background-color: rgba(88, 129, 87, 0.15);
        }

        /* ── Mobile breakpoint ── */
        @media (max-width: 767px) {
          .admin-sidebar {
            display: none !important;
          }
          .admin-mobile-topbar {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  )
}
