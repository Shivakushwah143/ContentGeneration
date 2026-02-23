'use client'
import { useEffect } from 'react'
import Script from 'next/script'
import LinkedInPostEmbed from '@/components/sections/LinkedInPostEmbed'
import InstagramPostEmbed from '@/components/sections/InstagramPostEmbed'
import { Instagram, Linkedin, Twitter } from 'lucide-react'

const SocialMediaEmbeds = () => {
  useEffect(() => {
    if (window.twttr) {
      window.twttr.widgets.load()
    }
  }, [])

  return (
    <div className="min-h-screen px-4 py-12">
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

      <div className="mx-auto max-w-4xl text-center">
        <div className="inline-flex items-center rounded-full border border-border/60 bg-background/70 px-4 py-1.5 text-sm text-muted-foreground">
          Real-world results
        </div>
        <h1 className="mt-4 text-4xl font-semibold">
          Featured community highlights
        </h1>
        <p className="mt-3 text-muted-foreground">
          See how creators, teams, and founders are using SoleScript to publish faster.
        </p>
      </div>
      
      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Twitter (X) Column */}
        <div className="space-y-6">
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-background/70 shadow-lg">
            <div className="flex items-center space-x-3 border-b border-border/60 bg-muted/50 p-5">
              <div className="rounded-full bg-black p-2">
                <Twitter className="text-white h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold">X Posts</h2>
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
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-background/70 shadow-lg">
            <div className="flex items-center space-x-3 border-b border-border/60 bg-muted/50 p-5">
              <div className="rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 p-2">
                <Instagram className="text-white h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold">Instagram Posts</h2>
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
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-background/70 shadow-lg">
            <div className="flex items-center space-x-3 border-b border-border/60 bg-muted/50 p-5">
              <div className="rounded-full bg-sky-600 p-2">
                <Linkedin className="text-white h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold">LinkedIn Posts</h2>
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
