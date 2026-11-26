import { getAllInquiries } from '@/lib/db'
import { InquiriesClient } from '@/components/admin/InquiriesClient'

export const metadata = { title: 'Inquiries | Admin' }

export default async function InquiriesPage() {
  const inquiries = await getAllInquiries()

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: '#f5f7f2', margin: 0 }}>
          Customer Inquiries
        </h1>
        <p style={{ color: '#5a7a6a', margin: '6px 0 0', fontSize: 14 }}>
          {inquiries.length} total lead{inquiries.length !== 1 ? 's' : ''} — click a row to view details &amp; update status.
        </p>
      </div>
      {!process.env.POSTGRES_URL && (
        <div style={{ background: '#3a2a0a', border: '1px solid #ca8a04', borderRadius: 10, padding: '16px 20px', color: '#fcd34d', marginBottom: 24, fontSize: 14 }}>
          ⚠️ Database not configured. Connect Vercel Postgres and set <code>POSTGRES_URL</code> to store inquiries.
        </div>
      )}
      <div style={{ background: '#0d1b2a', borderRadius: 12, padding: 24 }}>
        <InquiriesClient inquiries={inquiries} />
      </div>
    </div>
  )
}
