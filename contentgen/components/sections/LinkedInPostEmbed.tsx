'use client'

interface LinkedInPostEmbedProps {
  postUrl: string
  className?: string
  profileImage?: string
  profileName?: string
  postImage?: string
}

export default function LinkedInPostEmbed({
  postUrl,
  className = '',
  profileImage,
  profileName,
  postImage,
}: LinkedInPostEmbedProps) {
  return (
    <div className={`rounded-lg border  p-4 shadow-lg max-w-md  ${className}`}>
      {/* Profile section */}
      <div className="flex items-center space-x-3 mb-4">
        {profileImage ? (
          <img
            src={profileImage}
            alt={profileName || 'User'}
            className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
          />
        ) : (
          <div className=" ">
           
          </div>
        )}
        <div>
          <p className="text-white font-semibold text-lg">
            {  'LinkedIn Post'}
          </p>
        
        </div>
      </div>

      {/* Post preview image */}
      {postImage && (
        <div className="mt-3 rounded-lg overflow-hidden border border-gray-700">
          <img
            src={postImage}
            alt="LinkedIn Post"
            className="w-full  object-cover"
          />
        </div>
      )}

      {/* Post link */}
      <div className="mt-4 flex justify-end">
        <a
          href={postUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
        >
          View Full Post
        </a>
      </div>
    </div>
  )
}