'use client'
import { useEffect } from 'react'
import Script from 'next/script'
import LinkedInPostEmbed from '@/components/sections/LinkedInPostEmbed'
import InstagramPostEmbed from '@/components/sections/InstagramPostEmbed'
import { FaLinkedin, FaInstagram } from 'react-icons/fa'
import { SiX } from 'react-icons/si'

const SocialMediaEmbeds = () => {
  useEffect(() => {
    if (window.twttr) {
      window.twttr.widgets.load()
    }
  }, [])

  return (
    <div className="px-4 py-8 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen">
      {/* Twitter Widgets Script */}
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (window.twttr) {
            window.twttr.widgets.load()
          }
        }}
      />

      <h1 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
        Featured Social Media Posts
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
        {/* Twitter (X) Column */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 overflow-hidden">
            <div className="p-5 flex items-center space-x-3 border-b border-gray-700 bg-gray-900">
              <div className="bg-black p-2 rounded-full">
                <SiX className="text-white text-xl" />
              </div>
              <h2 className="text-xl font-bold text-white">Twitter Posts</h2>
            </div>
            <div className="space-y-4 p-5">
              <div className="rounded-lg overflow-hidden">
                <blockquote className="twitter-tweet" data-lang="en" data-theme="dark">
                  <a href="https://twitter.com/ig_raunit/status/1952738867200877000"></a>
                </blockquote>
              </div>
              <div className="rounded-lg overflow-hidden">
                <blockquote className="twitter-tweet" data-lang="en" data-theme="dark">
                  <a href="https://twitter.com/elonmusk/status/123456789"></a>
                </blockquote>
              </div>
            </div>
          </div>
        </div>

        {/* Instagram Column */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 overflow-hidden">
            <div className="p-5 flex items-center space-x-3 border-b border-gray-700 bg-gray-900">
              <div className="bg-gradient-to-tr from-purple-500 to-pink-500 p-2 rounded-full">
                <FaInstagram className="text-white text-xl" />
              </div>
              <h2 className="text-xl font-bold text-white">Instagram Posts</h2>
            </div>
            <div className="space-y-4 p-5">
              <div className="rounded-lg overflow-hidden">
                <InstagramPostEmbed postUrl="https://www.instagram.com/p/DMUx-xiTNsc/" />
              </div>
              <div className="rounded-lg overflow-hidden">
                <InstagramPostEmbed postUrl="https://www.instagram.com/p/DGYOePIyU14/" />
              </div>
            </div>
          </div>
        </div>

        {/* LinkedIn Column */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 overflow-hidden">
            <div className="p-5 flex items-center space-x-3 border-b border-gray-700 bg-gray-900">
              <div className="bg-blue-600 p-2 rounded-full">
                <FaLinkedin className="text-white text-xl" />
              </div>
              <h2 className="text-xl font-bold text-white">LinkedIn Posts</h2>
            </div>
            <div className="space-y-4 p-5">
              <div className="rounded-lg overflow-hidden">
                <LinkedInPostEmbed
                  postUrl="https://www.linkedin.com/posts/sampleuser_post-id"
                  profileName="Saumya"
                  postImage="https://media.licdn.com/dms/image/v2/D5622AQHPX7dCZjoCfA/feedshare-shrink_1280/B56ZhhVKTAG4Ak-/0/1753979600091?e=1757548800&v=beta&t=uJFGvPzyloX8IRwykKTsGH-cM9_9eTL33tRS4gCS-9U"
                />
              </div>
              <div className="rounded-lg overflow-hidden">
                <LinkedInPostEmbed
                  postUrl="https://www.linkedin.com/posts/vivek-verma-v022003_new-feature-update-like-share-comment-activity-7348050561407008768-3n8e"
                  profileName="Vivek Verma"
                  postImage="https://media.licdn.com/dms/image/v2/D5622AQE4k9e0wcS9ug/feedshare-shrink_800/B56ZfmFCWjH8Ag-/0/1751911770500?e=1757548800&v=beta&t=JOGJLletwlo-M7o7-3yAlWVKq2_jbaeBGFS0krTwQF8"
                />
              </div>
              <div className="rounded-lg overflow-hidden">
                <LinkedInPostEmbed
                  postUrl="https://www.linkedin.com/posts/vishal-patidar-088811319_nextjs-reactjs-fullstackdeveloper-activity-7357369157002117121-cbS5"
                  profileName="Vishal Patidar"
                  postImage="https://media.licdn.com/dms/image/D5622AQE6Y5Y3Oj8JYw/feedshare-shrink_1280/0/1718020280720?e=1720051200&v=beta&t=3w7mz2WbQh6W1x4F0V7Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SocialMediaEmbeds