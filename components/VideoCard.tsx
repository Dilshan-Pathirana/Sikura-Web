import React from 'react'
import Link from 'next/link'

type Video = { id: string; title: string; thumbnail?: string }

export default function VideoCard({ video }: { video: Video }) {
  return (
    <article style={{ border: '1px solid #ddd', padding: 8, borderRadius: 6 }}>
      <Link href={`/videos/${video.id}`}>
        <h3>{video.title}</h3>
      </Link>
    </article>
  )
}
