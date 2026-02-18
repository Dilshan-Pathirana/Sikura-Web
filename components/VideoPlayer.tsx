import React from 'react'
import { toGoogleDrivePreviewUrl } from '../lib/videoUrl'

interface VideoPlayerProps {
  videoUrl: string
  title: string
}

export default function VideoPlayer({ videoUrl, title }: VideoPlayerProps) {
  const embedUrl = toGoogleDrivePreviewUrl(videoUrl)

  if (!embedUrl) {
    return (
      <div className="relative group">
        <div className="absolute -inset-1.5 bg-gradient-to-r from-primary to-accent-green rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
        <div className="relative w-full aspect-video bg-navy-950 rounded-2xl overflow-hidden shadow-2xl border border-white/5 flex items-center justify-center p-6 text-center">
          <div>
            <p className="text-navy-300 font-semibold">Invalid Google Drive video link.</p>
            <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-white underline break-all text-sm">
              Open original link
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative group">
      <div className="absolute -inset-1.5 bg-gradient-to-r from-primary to-accent-green rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
      <div className="relative w-full aspect-video bg-navy-950 rounded-2xl overflow-hidden shadow-2xl border border-white/5">
        <iframe
          src={embedUrl}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}
