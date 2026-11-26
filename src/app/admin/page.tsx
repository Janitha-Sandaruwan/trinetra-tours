import Link from 'next/link'
import { getDashboardStats, getRecentInquiries } from '@/lib/db'
import type { InquiryStatus } from '@/types'

// ── Status badge colour map ──────────────────────────────────
const STATUS_STYLES: Record<InquiryStatus, string> = {
  New: 'bg-blue-500/20 text-blue-300 border border-blue-500/40',
  Contacted: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40',
  Quoted: 'bg-purple-500/20 text-purple-300 border border-purple-500/40',
  Booked: 'bg-green-500/20 text-green-300 border border-green-500/40',
  Archived: 'bg-gray-500/20 text-gray-400 border border-gray-500/40',
}

function StatusBadge({ status }: { status: string }) {
  const cls =
    STATUS_STYLES[status as InquiryStatus] ??
    'bg-gray-500/20 text-gray-400 border border-gray-500/40'
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${cls}`}>
      {status}
    </span>
  )
}

export default async function AdminDashboardPage() {
  const [stats, inquiries] = await Promise.all([
    getDashboardStats(),
    getRecentInquiries(5),
  ])

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-semibold text-white">Dashboard</h1>
          <p className="text-sm text-white/50 mt-0.5">
            Trinetra Solutions — Admin Overview
          </p>
        </div>
        <Link
          href="/admin/packages/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          style={{ backgroundColor: '#3a5a40', color: '#f5f7f2' }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Package
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Published Packages — green */}
        <div
          className="rounded-xl p-5 flex items-center gap-4"
          style={{ backgroundColor: '#1a2e1e', border: '1px solid #3a5a40' }}
        >
          <div
            className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: '#3a5a40' }}
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 9m0 8V9m0 0L9 7" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-white/50">Published Packages</p>
            <p className="text-3xl font-bold text-white mt-0.5">{stats.publishedPackages}</p>
          </div>
        </div>

        {/* New Inquiries — amber */}
        <div
          className="rounded-xl p-5 flex items-center gap-4"
          style={{ backgroundColor: '#2a2010', border: '1px solid #b45309' }}
        >
          <div className="w-11 h-11 rounded-lg bg-amber-700 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-white/50">New Inquiries</p>
            <p className="text-3xl font-bold text-white mt-0.5">{stats.newInquiries}</p>
          </div>
        </div>

        {/* Booked Tours — blue */}
        <div
          className="rounded-xl p-5 flex items-center gap-4"
          style={{ backgroundColor: '#101a2a', border: '1px solid #1d4ed8' }}
        >
          <div className="w-11 h-11 rounded-lg bg-blue-700 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-white/50">Booked Tours</p>
            <p className="text-3xl font-bold text-white mt-0.5">{stats.bookedTours}</p>
          </div>
        </div>
      </div>

      {/* Recent Inquiries Table */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ backgroundColor: '#0d1b2a', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07]">
          <h2 className="text-base font-semibold text-white">Recent Inquiries</h2>
          <Link
            href="/admin/inquiries"
            className="text-sm transition-colors"
            style={{ color: '#a3b18a' }}
          >
            View All →
          </Link>
        </div>

        {inquiries.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-white/40">
            No inquiries yet. They will appear here once customers submit the contact form.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {['Name', 'Email', 'Type', 'Status', 'Date'].map((h) => (
                    <th
                      key={h}
                      className="text-left px-6 py-3 text-xs font-medium uppercase tracking-wider text-white/40"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inquiry, idx) => (
                  <tr
                    key={inquiry.id}
                    className={`border-b border-white/[0.04] transition-colors hover:bg-white/[0.03] ${
                      idx === inquiries.length - 1 ? 'border-none' : ''
                    }`}
                  >
                    <td className="px-6 py-3.5 font-medium text-white">
                      {inquiry.customer_name}
                    </td>
                    <td className="px-6 py-3.5 text-white/60">{inquiry.email}</td>
                    <td className="px-6 py-3.5 text-white/60">{inquiry.inquiry_type}</td>
                    <td className="px-6 py-3.5">
                      <StatusBadge status={inquiry.status} />
                    </td>
                    <td className="px-6 py-3.5 text-white/40 tabular-nums">
                      {new Date(inquiry.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-base font-semibold text-white mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/packages/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-white/10 text-white/80 transition-colors hover:bg-white/5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Package
          </Link>
          <Link
            href="/admin/inquiries"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-white/10 text-white/80 transition-colors hover:bg-white/5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            All Inquiries
          </Link>
          <Link
            href="/admin/packages"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-white/10 text-white/80 transition-colors hover:bg-white/5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            Manage Packages
          </Link>
        </div>
      </div>
    </div>
  )
}
