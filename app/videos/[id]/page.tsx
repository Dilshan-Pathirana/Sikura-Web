import React from 'react'

type Props = { params: { id: string } }

export default async function VideoPage({ params }: Props) {
  const { id } = params
  // Placeholder: fetch video details by id
  return (
    <article>
      <h2>Video {id}</h2>
      <p>Video details go here.</p>
    </article>
  )
}
