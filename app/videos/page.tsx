import React from 'react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function VideosPage() {
  // Placeholder: fetch videos from API or DB
  const videos = [{ id: '1', title: 'Sample Video' }]
  return (
    <section>
      <h2>Videos</h2>
      <ul>
        {videos.map(v => (
          <li key={v.id}>
            <Link href={`/videos/${v.id}`}>{v.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
