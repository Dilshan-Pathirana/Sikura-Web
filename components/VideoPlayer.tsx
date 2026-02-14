import React from 'react'

interface VideoPlayerProps {
  videoUrl: string
  title: string
}

export default function VideoPlayer({ videoUrl, title }: VideoPlayerProps) {
  const getEmbedUrl = (url: string) => {
    try {
      if (!url) return ''
      // YouTube
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const v = url.split('v=')[1]?.split('&')[0] || url.split('/').pop()
        return `https://www.youtube.com/embed/${v}`
      }
      // Google Drive
      if (url.includes('drive.google.com')) {
        return url.replace('/view', '/preview')
      }
      return url
    } catch (e) {
      return url
    }
  }

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-brand-600 to-accent-cyan rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
      <div className="relative w-full aspect-video bg-navy-950 rounded-xl overflow-hidden shadow-2xl border border-navy-800">
        <iframe
          src={getEmbedUrl(videoUrl)}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}
