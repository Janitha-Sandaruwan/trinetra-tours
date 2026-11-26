import { notFound } from 'next/navigation'
import { getPackageById } from '@/lib/db'
import { updatePackageAction } from '@/actions/packages'
import { PackageForm } from '@/components/admin/PackageForm'

export const metadata = { title: 'Edit Package | Admin' }

export default async function EditPackagePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const pkg = await getPackageById(parseInt(id))
  if (!pkg) notFound()

  const boundAction = updatePackageAction.bind(null, pkg.id)

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <a href="/admin/packages" style={{ color: '#588157', textDecoration: 'none', fontSize: 13 }}>← Back to Packages</a>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: '#f5f7f2', margin: '8px 0 0' }}>
          Edit: {pkg.title}
        </h1>
      </div>
      <PackageForm initialData={pkg} action={boundAction} />
    </div>
  )
}
