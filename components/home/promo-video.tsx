"use client"

import { Card, CardContent } from "@/components/ui/card"

// Dummy video data
const promoVideo = {
  id: 1,
  title: "Fresh Products, Delivered Daily",
  type: "youtube",
  video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Sample YouTube URL
  description: "Discover our premium selection of fresh groceries and organic products"
}

const PromoVideo = () => {
  const getEmbedUrl = (type: string, url: string) => {
    switch (type) {
      case "youtube":
        // Convert YouTube watch URL to embed URL with autoplay
        const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
        return youtubeMatch
          ? `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1&mute=1&loop=1&playlist=${youtubeMatch[1]}&controls=0&showinfo=0&rel=0&modestbranding=1`
          : url
      case "vimeo":
        // Convert Vimeo URL to embed URL
        const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
        return vimeoMatch ? `https://player.vimeo.com/video/${vimeoMatch[1]}` : url
      default:
        return url
    }
  }

  // Get iframe attributes based on video type
  const getIframeAttributes = (type: string) => {
    const baseAttributes = {
      width: "100%",
      height: "100%",
      frameBorder: "0",
      allowFullScreen: true,
      className: "absolute inset-0 w-full h-full rounded-lg",
    }

    switch (type) {
      case "youtube":
        return {
          ...baseAttributes,
          allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
          referrerPolicy: "strict-origin-when-cross-origin" as const,
          style: { pointerEvents: "none" as const },
        }
      case "vimeo":
        return {
          ...baseAttributes,
          allow: "autoplay; fullscreen; picture-in-picture",
          allowFullScreen: true,
          style: { pointerEvents: "auto" as const },
        }
      default:
        return baseAttributes
    }
  }

  if (!promoVideo) return null

  const embedUrl = getEmbedUrl(promoVideo.type, promoVideo.video_url)
  const iframeAttributes = getIframeAttributes(promoVideo.type)

  return (
    <section className="py-8 md:py-12 lg:py-16">
      <div className="md:container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Experience Fresh Quality</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Watch how we source, prepare, and deliver the freshest products right to your doorstep.
          </p>
        </div>
        
        <div className="gap-12 items-center">
          <div className="relative group">
            <Card
              className="overflow-hidden bg-gradient-to-br from-background via-muted/50 to-background border-border/50 p-0 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <CardContent className="p-0">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <iframe 
                    src={embedUrl} 
                    title={promoVideo.title || "Promo Video"} 
                    {...iframeAttributes} 
                  />
                  {promoVideo.title && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-lg pointer-events-none">
                      <div className="p-4 md:p-6">
                        <h3 className="text-white font-semibold text-lg md:text-xl mb-2">
                          {promoVideo.title}
                        </h3>
                        {promoVideo.description && (
                          <p className="text-white/90 text-sm md:text-base">
                            {promoVideo.description}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-all duration-300">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300 cursor-pointer">
                      <svg 
                        className="w-6 h-6 md:w-8 md:h-8 text-black ml-1" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PromoVideo
