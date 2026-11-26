import { createPackageAction } from '@/actions/packages'
import { PackageForm } from '@/components/admin/PackageForm'

export const metadata = { title: 'New Package | Admin' }

export default function NewPackagePage() {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <a href="/admin/packages" style={{ color: '#588157', textDecoration: 'none', fontSize: 13 }}>← Back to Packages</a>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: '#f5f7f2', margin: '8px 0 0' }}>
          New Tour Package
        </h1>
      </div>
      <PackageForm action={createPackageAction} />
    </div>
  )
}
