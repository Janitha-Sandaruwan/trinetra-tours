import Link from 'next/link'
import Image from 'next/image'
import { getAllPackages } from '@/lib/db'
import { PackageActions } from '@/components/admin/PackageActions'

// ── Category badge colour map ────────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
  wildlife: 'bg-emerald-800/50 text-emerald-300 border-emerald-700/60',
  cultural: 'bg-amber-800/40 text-amber-300 border-amber-700/60',
  adventure: 'bg-orange-800/40 text-orange-300 border-orange-700/60',
  beach: 'bg-sky-800/40 text-sky-300 border-sky-700/60',
  luxury: 'bg-purple-800/40 text-purple-300 border-purple-700/60',
  trekking: 'bg-lime-800/40 text-lime-300 border-lime-700/60',
}

function CategoryBadge({ category }: { category: string }) {
  const cls =
    CATEGORY_COLORS[category.toLowerCase()] ??
    'bg-white/10 text-white/60 border-white/20'
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border capitalize ${cls}`}
    >
      {category}
    </span>
  )
}

function BoolIcon({ value }: { value: boolean }) {
  return value ? (
    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-500/20">
      <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
    </span>
  ) : (
    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/5">
      <svg className="w-3 h-3 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </span>
  )
}

export default async function AdminPackagesPage() {
  const packages = await getAllPackages()

  const hasDb = packages.length > 0 || process.env.POSTGRES_URL

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-semibold text-white">Tour Packages</h1>
          <p className="text-sm text-white/50 mt-0.5">
            {packages.length} package{packages.length !== 1 ? 's' : ''} total
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
          Add New Package
        </Link>
      </div>

      {/* No-DB Banner */}
      {!hasDb && (
        <div className="rounded-lg px-4 py-3 flex items-start gap-3 text-sm bg-amber-900/30 border border-amber-700/50 text-amber-300">
          <svg className="w-5 h-5 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          <span>
            <strong>Database not configured</strong> — connect Vercel Postgres to manage packages.
            Showing mock data below.
          </span>
        </div>
      )}

      {/* Packages Table */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ backgroundColor: '#0d1b2a', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        {packages.length === 0 ? (
          <div className="px-6 py-16 text-center space-y-3">
            <svg
              className="w-10 h-10 mx-auto text-white/20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 9m0 8V9m0 0L9 7"
              />
            </svg>
            <p className="text-white/40 text-sm">No packages yet.</p>
            <Link
              href="/admin/packages/new"
              className="inline-flex items-center gap-1.5 text-sm transition-colors"
              style={{ color: '#a3b18a' }}
            >
              Create your first package →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.07]">
                  {[
                    'Thumbnail',
                    'Title',
                    'Category',
                    'Duration',
                    'Price (USD)',
                    'Featured',
                    'Published',
                    'Actions',
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider text-white/40 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {packages.map((pkg, idx) => (
                  <tr
                    key={pkg.id}
                    className={`border-b border-white/[0.04] transition-colors hover:bg-white/[0.025] ${
                      idx === packages.length - 1 ? 'border-none' : ''
                    }`}
                  >
                    {/* Thumbnail */}
                    <td className="px-4 py-3">
                      {pkg.cover_image_url ? (
                        <div className="w-10 h-10 rounded-md overflow-hidden shrink-0 relative bg-white/5">
                          <Image
                            src={pkg.cover_image_url}
                            alt={pkg.title}
                            fill
                            sizes="40px"
                            className="object-cover"
                            unoptimized={pkg.cover_image_url.startsWith('http')}
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-md bg-white/5 flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-white/20"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                    </td>

                    {/* Title */}
                    <td className="px-4 py-3 font-medium text-white max-w-[200px]">
                      <span className="line-clamp-2 leading-snug">{pkg.title}</span>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3">
                      <CategoryBadge category={pkg.category} />
                    </td>

                    {/* Duration */}
                    <td className="px-4 py-3 text-white/60 tabular-nums whitespace-nowrap">
                      {pkg.duration_days}d
                    </td>

                    {/* Price */}
                    <td className="px-4 py-3 text-white/60 tabular-nums whitespace-nowrap">
                      ${Number(pkg.starting_price_usd).toLocaleString()}
                    </td>

                    {/* Featured */}
                    <td className="px-4 py-3">
                      <BoolIcon value={pkg.is_featured} />
                    </td>

                    {/* Published */}
                    <td className="px-4 py-3">
                      <BoolIcon value={pkg.is_published} />
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <PackageActions
                        id={pkg.id}
                        isFeatured={pkg.is_featured}
                        isPublished={pkg.is_published}
                        title={pkg.title}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
