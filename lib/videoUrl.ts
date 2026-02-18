export function extractGoogleDriveFileId(url: string): string | null {
  if (!url) return null

  try {
    const parsed = new URL(url.trim())
    const host = parsed.hostname.toLowerCase()
    const isDriveHost = host === 'drive.google.com' || host === 'docs.google.com'

    if (!isDriveHost) return null

    const filePathMatch = parsed.pathname.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
    if (filePathMatch?.[1]) return filePathMatch[1]

    const idParam = parsed.searchParams.get('id')
    if (idParam) return idParam

    const genericPathMatch = parsed.pathname.match(/\/d\/([a-zA-Z0-9_-]+)/)
    if (genericPathMatch?.[1]) return genericPathMatch[1]

    return null
  } catch {
    return null
  }
}

export function isGoogleDriveSharedLink(url: string): boolean {
  return Boolean(extractGoogleDriveFileId(url))
}

export function toGoogleDrivePreviewUrl(url: string): string | null {
  const fileId = extractGoogleDriveFileId(url)
  if (!fileId) return null
  return `https://drive.google.com/file/d/${fileId}/preview`
}
