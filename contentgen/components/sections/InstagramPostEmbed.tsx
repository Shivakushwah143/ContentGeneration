'use client'

import { useEffect } from 'react'

interface InstagramPostEmbedProps {
  postUrl: string
  className?: string
}

export default function InstagramPostEmbed({ 
  postUrl, 
  className = '' 
}: InstagramPostEmbedProps) {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://www.instagram.com/embed.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [postUrl])

  return (
   
      
      <div className="flex justify-center">
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={postUrl}
          data-instgrm-version="14"
         
        ></blockquote>
      </div>
    
  )
}