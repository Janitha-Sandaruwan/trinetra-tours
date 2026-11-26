'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import {
  toggleFeaturedAction,
  togglePublishedAction,
  deletePackageAction,
} from '@/actions/packages'

interface PackageActionsProps {
  id: number
  isFeatured: boolean
  isPublished: boolean
  title: string
}

export function PackageActions({
  id,
  isFeatured,
  isPublished,
  title,
}: PackageActionsProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function handleToggleFeatured() {
    startTransition(async () => {
      await toggleFeaturedAction(id, !isFeatured)
      router.refresh()
    })
  }

  function handleTogglePublished() {
    startTransition(async () => {
      await togglePublishedAction(id, !isPublished)
      router.refresh()
    })
  }

  function handleDelete() {
    if (
      !window.confirm(
        `Delete "${title}"?\n\nThis cannot be undone.`
      )
    )
      return
    startTransition(async () => {
      await deletePackageAction(id)
      router.refresh()
    })
  }

  const toggleBase =
    'relative inline-flex items-center w-10 h-5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0d1b2a] disabled:opacity-50'

  return (
    <div className="flex items-center gap-3">
      {/* Featured toggle */}
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-[10px] text-white/40 leading-none">Featured</span>
        <button
          onClick={handleToggleFeatured}
          disabled={isPending}
          aria-label={isFeatured ? 'Unfeature package' : 'Feature package'}
          className={`${toggleBase} focus:ring-amber-500 ${
            isFeatured ? 'bg-amber-500' : 'bg-white/15'
          }`}
        >
          <span
            className={`inline-block w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform ${
              isFeatured ? 'translate-x-5' : 'translate-x-0.5'
            }`}
          />
        </button>
      </div>

      {/* Published toggle */}
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-[10px] text-white/40 leading-none">Published</span>
        <button
          onClick={handleTogglePublished}
          disabled={isPending}
          aria-label={isPublished ? 'Unpublish package' : 'Publish package'}
          className={`${toggleBase} focus:ring-green-500 ${
            isPublished ? 'bg-[#588157]' : 'bg-white/15'
          }`}
        >
          <span
            className={`inline-block w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform ${
              isPublished ? 'translate-x-5' : 'translate-x-0.5'
            }`}
          />
        </button>
      </div>

      {/* Edit link */}
      <a
        href={`/admin/packages/${id}/edit`}
        className="p-1.5 rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-colors"
        title="Edit package"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </a>

      {/* Delete button */}
      <button
        onClick={handleDelete}
        disabled={isPending}
        title="Delete package"
        className="p-1.5 rounded-md text-white/40 hover:text-red-400 hover:bg-red-900/20 transition-colors disabled:opacity-40"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  )
}
