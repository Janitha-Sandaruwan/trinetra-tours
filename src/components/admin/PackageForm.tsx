'use client'

import { useState, useRef, useTransition } from 'react'
import { useFormStatus } from 'react-dom'
import type { TourPackageRow, ItineraryDay } from '@/types'

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending}
      style={{ background: pending ? '#a3b18a' : '#588157', color: 'white', border: 'none', borderRadius: 10, padding: '12px 32px', fontSize: 15, fontWeight: 600, cursor: pending ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
      {pending && <span style={{ width: 16, height: 16, border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />}
      {pending ? 'Saving…' : label}
    </button>
  )
}

function DynamicList({ label, items, onChange, placeholder }: { label: string; items: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={labelStyle}>{label}</label>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <input value={item} onChange={e => { const n = [...items]; n[i] = e.target.value; onChange(n) }} placeholder={placeholder ?? `Item ${i + 1}`} style={{ ...inputStyle, flex: 1 }} />
          <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))} style={{ background: '#3a1a1a', border: 'none', borderRadius: 6, padding: '0 12px', color: '#f87171', cursor: 'pointer', fontSize: 18 }}>×</button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...items, ''])} style={{ background: '#1a2a1a', border: '1px dashed #588157', borderRadius: 6, padding: '7px 16px', color: '#a3b18a', cursor: 'pointer', fontSize: 13 }}>+ Add {label.replace(/s$/, '')}</button>
    </div>
  )
}

const inputStyle: React.CSSProperties = { flex: 1, background: '#0a1520', border: '1px solid #2a3a4a', borderRadius: 8, padding: '10px 14px', color: '#f5f7f2', fontSize: 14, outline: 'none', width: '100%' }
const textareaStyle: React.CSSProperties = { ...inputStyle, resize: 'vertical' as const, minHeight: 80 }
const labelStyle: React.CSSProperties = { display: 'block', fontWeight: 600, marginBottom: 6, color: '#a3b18a', fontSize: 12, textTransform: 'uppercase' as const, letterSpacing: '0.07em' }
const cardStyle: React.CSSProperties = { background: '#0d1b2a', borderRadius: 12, padding: 24, marginBottom: 20 }

export function PackageForm({ initialData, action }: {
  initialData?: TourPackageRow
  action: (prev: { error?: string } | null, fd: FormData) => Promise<{ error?: string }>
}) {
  const [title, setTitle] = useState(initialData?.title ?? '')
  const [category, setCategory] = useState(initialData?.category ?? 'Cultural')
  const [summary, setSummary] = useState(initialData?.summary ?? '')
  const [coverUrl, setCoverUrl] = useState(initialData?.cover_image_url ?? '')
  const [routeTags, setRouteTags] = useState<string[]>(initialData?.route_tags ?? [])
  const [inclusions, setInclusions] = useState<string[]>(initialData?.inclusions ?? [])
  const [exclusions, setExclusions] = useState<string[]>(initialData?.exclusions ?? [])
  const [itinerary, setItinerary] = useState<ItineraryDay[]>(initialData?.itinerary ?? [])
  const [isFeatured, setIsFeatured] = useState(initialData?.is_featured ?? false)
  const [isPublished, setIsPublished] = useState(initialData?.is_published ?? true)
  const [uploadPending, setUploadPending] = useState(false)
  const [error, setError] = useState<string>()
  const [, startTransition] = useTransition()
  const fileRef = useRef<HTMLInputElement>(null)

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return
    setUploadPending(true)
    try {
      const fd = new FormData(); fd.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      if (!res.ok) { const j = await res.json(); throw new Error(j.error) }
      setCoverUrl((await res.json()).url)
    } catch (err) { alert(`Upload failed: ${(err as Error).message}`) }
    finally { setUploadPending(false) }
  }

  const addDay = () => setItinerary(p => [...p, { day: p.length + 1, title: '', description: '', accommodation: '', meals: '' }])
  const removeDay = (i: number) => setItinerary(p => p.filter((_, j) => j !== i).map((d, j) => ({ ...d, day: j + 1 })))
  const updateDay = (i: number, field: keyof ItineraryDay, value: string) =>
    setItinerary(p => p.map((d, j) => j === i ? { ...d, [field]: value } : d))

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    fd.set('route_tags', JSON.stringify(routeTags))
    fd.set('inclusions', JSON.stringify(inclusions))
    fd.set('exclusions', JSON.stringify(exclusions))
    fd.set('itinerary', JSON.stringify(itinerary))
    fd.set('is_featured', String(isFeatured))
    fd.set('is_published', String(isPublished))
    startTransition(async () => { const r = await action(null, fd); if (r?.error) setError(r.error) })
  }

  return (
    <>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      {error && <div style={{ background: '#3a1a1a', border: '1px solid #f87171', borderRadius: 8, padding: '12px 16px', marginBottom: 20, color: '#f87171', fontSize: 14 }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="cover_image_url" value={coverUrl} />

        {/* Basic Info */}
        <div style={cardStyle}>
          <h3 style={{ color: '#a3b18a', fontWeight: 700, marginBottom: 20, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Basic Information</h3>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Title *</label>
            <input name="title" required value={title} onChange={e => setTitle(e.target.value)} style={inputStyle} placeholder="e.g. Cultural Heritage Trail" />
            {slug && <div style={{ color: '#5a7a6a', fontSize: 11, marginTop: 4 }}>URL slug: /{slug}</div>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Category</label>
              <select name="category" value={category} onChange={e => setCategory(e.target.value)} style={{ ...inputStyle, appearance: 'auto' }}>
                {['Cultural', 'Wildlife', 'Honeymoon', 'Beach & Wellness', 'Adventure'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Duration (Days) *</label>
              <input name="duration_days" type="number" required min={1} defaultValue={initialData?.duration_days ?? 7} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Starting Price (USD) *</label>
              <input name="starting_price_usd" type="number" required min={0} step="0.01" defaultValue={initialData?.starting_price_usd ?? ''} style={inputStyle} placeholder="1290.00" />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Summary</label>
            <textarea name="summary" value={summary} onChange={e => setSummary(e.target.value)} style={textareaStyle} placeholder="Brief description for listing cards…" />
          </div>
        </div>

        {/* Cover Image */}
        <div style={cardStyle}>
          <h3 style={{ color: '#a3b18a', fontWeight: 700, marginBottom: 16, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Cover Image</h3>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Image URL</label>
              <input value={coverUrl} onChange={e => setCoverUrl(e.target.value)} style={inputStyle} placeholder="https://… or upload →" />
            </div>
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" style={{ display: 'none' }} onChange={handleUpload} />
            <button type="button" onClick={() => fileRef.current?.click()} disabled={uploadPending}
              style={{ background: '#1a3a2a', border: '1px solid #588157', borderRadius: 8, padding: '10px 18px', color: '#a3b18a', cursor: 'pointer', fontSize: 13, whiteSpace: 'nowrap' }}>
              {uploadPending ? '⏳ Uploading…' : '☁ Upload Image'}
            </button>
          </div>
          {coverUrl && <img src={coverUrl} alt="Preview" style={{ marginTop: 16, maxHeight: 180, borderRadius: 8, border: '1px solid #2a3a4a', objectFit: 'cover' }} />}
        </div>

        {/* Lists */}
        <div style={cardStyle}>
          <DynamicList label="Route Stops" items={routeTags} onChange={setRouteTags} placeholder="e.g. Sigiriya" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <DynamicList label="Inclusions" items={inclusions} onChange={setInclusions} placeholder="e.g. Private vehicle & guide" />
            <DynamicList label="Exclusions" items={exclusions} onChange={setExclusions} placeholder="e.g. International airfare" />
          </div>
        </div>

        {/* Itinerary */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ color: '#a3b18a', fontWeight: 700, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>Day-by-Day Itinerary</h3>
            <button type="button" onClick={addDay} style={{ background: '#1a3a2a', border: '1px solid #588157', borderRadius: 8, padding: '8px 16px', color: '#a3b18a', cursor: 'pointer', fontSize: 13 }}>+ Add Day</button>
          </div>
          {itinerary.length === 0 && <div style={{ color: '#5a7a6a', textAlign: 'center', padding: '16px 0', fontSize: 14 }}>Click "Add Day" to build the itinerary.</div>}
          {itinerary.map((day, i) => (
            <div key={i} style={{ background: '#0a1520', border: '1px solid #2a3a4a', borderRadius: 10, padding: 20, marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                <span style={{ color: '#588157', fontWeight: 700 }}>Day {day.day}</span>
                <button type="button" onClick={() => removeDay(i)} style={{ background: '#3a1a1a', border: 'none', borderRadius: 6, padding: '4px 12px', color: '#f87171', cursor: 'pointer', fontSize: 13 }}>Remove</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div><label style={{ ...labelStyle, fontSize: 11 }}>Day Title</label><input value={day.title} onChange={e => updateDay(i, 'title', e.target.value)} style={inputStyle} placeholder="e.g. Sigiriya Rock Fortress" /></div>
                <div><label style={{ ...labelStyle, fontSize: 11 }}>Accommodation</label><input value={day.accommodation} onChange={e => updateDay(i, 'accommodation', e.target.value)} style={inputStyle} placeholder="e.g. Luxury eco-lodge" /></div>
              </div>
              <div style={{ marginBottom: 12 }}><label style={{ ...labelStyle, fontSize: 11 }}>Description</label><textarea value={day.description} onChange={e => updateDay(i, 'description', e.target.value)} style={{ ...textareaStyle, minHeight: 60 }} /></div>
              <div><label style={{ ...labelStyle, fontSize: 11 }}>Meals Included</label><input value={day.meals} onChange={e => updateDay(i, 'meals', e.target.value)} style={inputStyle} placeholder="Breakfast, Dinner" /></div>
            </div>
          ))}
        </div>

        {/* Flags */}
        <div style={{ ...cardStyle, marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 32 }}>
            {[{ label: 'Featured on homepage', checked: isFeatured, set: setIsFeatured }, { label: 'Published (visible to public)', checked: isPublished, set: setIsPublished }].map(({ label, checked, set }) => (
              <label key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                <input type="checkbox" checked={checked} onChange={e => set(e.target.checked)} style={{ width: 18, height: 18, accentColor: '#588157' }} />
                <span style={{ color: '#f5f7f2', fontSize: 14 }}>{label}</span>
              </label>
            ))}
          </div>
        </div>

        <SubmitButton label={initialData ? 'Save Changes' : 'Create Package'} />
      </form>
    </>
  )
}
