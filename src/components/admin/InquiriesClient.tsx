'use client'

import { useState, useTransition } from 'react'
import type { InquiryRow, InquiryStatus } from '@/types'
import { updateInquiryStatusAction } from '@/actions/inquiries'

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  New:        { bg: '#1a2a5a', color: '#93c5fd' },
  Contacted:  { bg: '#3a2a0a', color: '#fcd34d' },
  Quoted:     { bg: '#2a1a4a', color: '#c4b5fd' },
  Booked:     { bg: '#1a3a1a', color: '#86efac' },
  Archived:   { bg: '#2a2a2a', color: '#9ca3af' },
}
const STATUSES: InquiryStatus[] = ['New', 'Contacted', 'Quoted', 'Booked', 'Archived']

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_COLORS[status] ?? STATUS_COLORS.New
  return <span style={{ background: s.bg, color: s.color, borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>{status}</span>
}

function fmt(date: string) {
  return new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function InquiriesClient({ inquiries }: { inquiries: InquiryRow[] }) {
  const [filter, setFilter] = useState<string>('All')
  const [selected, setSelected] = useState<InquiryRow | null>(null)
  const [localStatuses, setLocalStatuses] = useState<Record<number, string>>({})
  const [, startTransition] = useTransition()

  const visible = filter === 'All' ? inquiries : inquiries.filter(i => i.status === filter)

  function changeStatus(id: number, status: InquiryStatus) {
    setLocalStatuses(p => ({ ...p, [id]: status }))
    if (selected?.id === id) setSelected(p => p ? { ...p, status } : p)
    startTransition(() => updateInquiryStatusAction(id, status))
  }

  const tabStyle = (active: boolean): React.CSSProperties => ({
    background: active ? '#588157' : '#1a2a3a', color: active ? 'white' : '#a3b18a',
    border: 'none', borderRadius: 8, padding: '8px 18px', cursor: 'pointer', fontSize: 13, fontWeight: 600,
  })

  return (
    <>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {['All', ...STATUSES].map(s => (
          <button key={s} onClick={() => setFilter(s)} style={tabStyle(filter === s)}>
            {s} ({s === 'All' ? inquiries.length : inquiries.filter(i => i.status === s).length})
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#5a7a6a', padding: '48px 0', fontSize: 15 }}>
          No inquiries{filter !== 'All' ? ` with status "${filter}"` : ''}.
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ color: '#a3b18a', textAlign: 'left', borderBottom: '1px solid #2a3a4a' }}>
                {['Name', 'Email', 'Country', 'Type', 'Package', 'Travel Date', 'Pax', 'Status', 'Date', ''].map(h => (
                  <th key={h} style={{ padding: '10px 12px', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.07em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.map(inq => {
                const status = localStatuses[inq.id] ?? inq.status
                return (
                  <tr key={inq.id} onClick={() => setSelected(inq)}
                    style={{ borderBottom: '1px solid #1a2a3a', cursor: 'pointer' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#1a2a3a')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <td style={{ padding: '12px 12px', color: '#f5f7f2', fontWeight: 500 }}>{inq.customer_name}</td>
                    <td style={{ padding: '12px 12px', color: '#a3b18a' }}>{inq.email}</td>
                    <td style={{ padding: '12px 12px', color: '#7a9a8a' }}>{inq.country ?? '—'}</td>
                    <td style={{ padding: '12px 12px' }}><span style={{ background: '#1a3a4a', color: '#67e8f9', borderRadius: 4, padding: '2px 8px', fontSize: 11 }}>{inq.inquiry_type}</span></td>
                    <td style={{ padding: '12px 12px', color: '#7a9a8a', maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{inq.package_title ?? '—'}</td>
                    <td style={{ padding: '12px 12px', color: '#7a9a8a' }}>{inq.travel_date ?? '—'}</td>
                    <td style={{ padding: '12px 12px', color: '#7a9a8a' }}>{inq.adults ?? '—'}{inq.children ? `+${inq.children}C` : ''}</td>
                    <td style={{ padding: '12px 12px' }}><StatusBadge status={status} /></td>
                    <td style={{ padding: '12px 12px', color: '#5a7a6a', whiteSpace: 'nowrap' }}>{fmt(inq.created_at)}</td>
                    <td style={{ padding: '12px 12px' }}>
                      <button onClick={e => { e.stopPropagation(); setSelected(inq) }}
                        style={{ background: '#1a3a2a', border: 'none', borderRadius: 6, padding: '5px 12px', color: '#a3b18a', cursor: 'pointer', fontSize: 12 }}>View</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Slide-over */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50 }} onClick={() => setSelected(null)}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
          <div onClick={e => e.stopPropagation()}
            style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '100%', maxWidth: 520, background: '#0d1b2a', overflowY: 'auto', boxShadow: '-8px 0 32px rgba(0,0,0,0.5)' }}>
            <div style={{ padding: '24px 28px', borderBottom: '1px solid #2a3a4a', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'sticky', top: 0, background: '#0d1b2a', zIndex: 1 }}>
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: '#f5f7f2', margin: '0 0 4px' }}>{selected.customer_name}</h2>
                <div style={{ color: '#5a7a6a', fontSize: 12 }}>{fmt(selected.created_at)}</div>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: '#a3b18a', cursor: 'pointer', fontSize: 22 }}>✕</button>
            </div>
            <div style={{ padding: '24px 28px' }}>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', color: '#a3b18a', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8, fontWeight: 600 }}>Update Status</label>
                <select value={localStatuses[selected.id] ?? selected.status}
                  onChange={e => changeStatus(selected.id, e.target.value as InquiryStatus)}
                  style={{ background: '#0a1520', border: '1px solid #2a3a4a', borderRadius: 8, padding: '8px 14px', color: '#f5f7f2', fontSize: 14, width: '100%' }}>
                  {STATUSES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              {selected.whatsapp && (
                <a href={`https://wa.me/${selected.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi ${selected.customer_name}, thank you for your inquiry${selected.package_title ? ` about "${selected.package_title}"` : ''}. I'd love to help plan your perfect trip!`)}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#1a3a1a', border: '1px solid #25D366', borderRadius: 10, padding: '12px 20px', color: '#86efac', textDecoration: 'none', fontWeight: 600, fontSize: 14, marginBottom: 24 }}>
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 20, height: 20 }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.864L.054 23.293a.75.75 0 00.918.919l5.561-1.457A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.715 9.715 0 01-4.953-1.354l-.355-.21-3.68.965.983-3.593-.232-.37A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg>
                  Chat on WhatsApp
                </a>
              )}
              {([['Type', selected.inquiry_type], ['Package', selected.package_title], ['Email', selected.email], ['WhatsApp', selected.whatsapp], ['Country', selected.country], ['Travel Date', selected.travel_date], ['Duration', selected.duration_days ? `${selected.duration_days} days` : null], ['Adults', selected.adults], ['Children', selected.children], ['Hotel Tier', selected.hotel_tier], ['Vehicle', selected.vehicle_type], ['Interests', (selected.interests ?? []).join(', ') || null], ['Notes', selected.notes]] as [string, string | number | null | undefined][]).filter(([, v]) => v != null && v !== '').map(([label, value]) => (
                <div key={label} style={{ marginBottom: 16 }}>
                  <div style={{ color: '#a3b18a', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4, fontWeight: 600 }}>{label}</div>
                  <div style={{ color: '#f5f7f2', fontSize: 14, lineHeight: 1.6 }}>{String(value)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
