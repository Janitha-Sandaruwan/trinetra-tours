'use client'

import { useActionState, useState } from 'react'
import Image from 'next/image'
import { loginAdmin } from '@/actions/auth'

const initialState: { error?: string } | null = null

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAdmin, initialState)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0d1b2a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
      }}
    >
      {/* Background subtle texture overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage:
            'radial-gradient(ellipse at 20% 50%, rgba(88,129,87,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(58,90,64,0.10) 0%, transparent 55%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '28rem',
          zIndex: 1,
        }}
      >
        {/* Card */}
        <div
          style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: '1.25rem',
            padding: '2.5rem 2rem',
            boxShadow: '0 32px 64px rgba(0,0,0,0.5)',
          }}
        >
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '5rem',
                height: '5rem',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid rgba(88,129,87,0.6)',
                boxShadow: '0 0 0 4px rgba(88,129,87,0.15)',
                marginBottom: '1.25rem',
              }}
            >
              <Image
                src="/logo.jpg"
                alt="Trinetra Solutions"
                width={80}
                height={80}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                priority
              />
            </div>

            {/* Headline */}
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '1.75rem',
                fontWeight: 700,
                letterSpacing: '0.01em',
                background: 'linear-gradient(135deg, #a3b18a, #588157)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                margin: 0,
              }}
            >
              Admin Portal
            </h1>
            <p
              style={{
                marginTop: '0.4rem',
                fontSize: '0.825rem',
                color: 'rgba(163,177,138,0.7)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Trinetra Solutions Tours &amp; Travels
            </p>
          </div>

          {/* Divider */}
          <div
            style={{
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(88,129,87,0.4), transparent)',
              marginBottom: '2rem',
            }}
          />

          {/* Error banner */}
          {state?.error && (
            <div
              role="alert"
              style={{
                backgroundColor: 'rgba(220,38,38,0.12)',
                border: '1px solid rgba(220,38,38,0.35)',
                borderRadius: '0.5rem',
                padding: '0.75rem 1rem',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              {/* Warning icon */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f87171"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0 }}
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span style={{ color: '#f87171', fontSize: '0.875rem' }}>{state.error}</span>
            </div>
          )}

          {/* Form */}
          <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Username */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label
                htmlFor="email"
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  color: '#a3b18a',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                Username
              </label>
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="username"
                required
                placeholder="Enter your username"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(163,177,138,0.25)',
                  borderRadius: '0.6rem',
                  padding: '0.75rem 1rem',
                  color: '#f0f4ec',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(88,129,87,0.7)'
                  e.target.style.boxShadow = '0 0 0 3px rgba(88,129,87,0.15)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(163,177,138,0.25)'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>

            {/* Password */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label
                htmlFor="password"
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  color: '#a3b18a',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(163,177,138,0.25)',
                    borderRadius: '0.6rem',
                    padding: '0.75rem 3rem 0.75rem 1rem',
                    color: '#f0f4ec',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    width: '100%',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(88,129,87,0.7)'
                    e.target.style.boxShadow = '0 0 0 3px rgba(88,129,87,0.15)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(163,177,138,0.25)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
                {/* Eye toggle */}
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((v) => !v)}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.25rem',
                    color: 'rgba(163,177,138,0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {showPassword ? (
                    // Eye-off icon
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    // Eye icon
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              style={{
                marginTop: '0.5rem',
                width: '100%',
                padding: '0.85rem 1rem',
                backgroundColor: isPending ? 'rgba(88,129,87,0.6)' : '#588157',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.95rem',
                letterSpacing: '0.03em',
                borderRadius: '0.6rem',
                border: 'none',
                cursor: isPending ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                transition: 'background-color 0.2s, box-shadow 0.2s, transform 0.15s',
                boxShadow: isPending ? 'none' : '0 4px 16px rgba(88,129,87,0.35)',
              }}
              onMouseEnter={(e) => {
                if (!isPending) {
                  ;(e.target as HTMLButtonElement).style.backgroundColor = '#3a5a40'
                  ;(e.target as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(88,129,87,0.45)'
                  ;(e.target as HTMLButtonElement).style.transform = 'translateY(-1px)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isPending) {
                  ;(e.target as HTMLButtonElement).style.backgroundColor = '#588157'
                  ;(e.target as HTMLButtonElement).style.boxShadow = '0 4px 16px rgba(88,129,87,0.35)'
                  ;(e.target as HTMLButtonElement).style.transform = 'translateY(0)'
                }
              }}
            >
              {isPending ? (
                <>
                  {/* Spinner */}
                  <svg
                    style={{
                      animation: 'spin 0.8s linear infinite',
                    }}
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M12 2a10 10 0 0 1 10 10" opacity="0.3" />
                    <path d="M12 2a10 10 0 0 1 10 10" strokeDasharray="31.4" strokeDashoffset="10" />
                  </svg>
                  Signing in…
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Footer note */}
          <p
            style={{
              marginTop: '1.75rem',
              textAlign: 'center',
              fontSize: '0.75rem',
              color: 'rgba(163,177,138,0.45)',
              letterSpacing: '0.03em',
            }}
          >
            Secure admin access · Trinetra Solutions
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        input::placeholder { color: rgba(163,177,138,0.35); }
      `}</style>
    </div>
  )
}
