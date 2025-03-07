"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, SkipForward } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface VideoPlayerProps {
  videoId: string
}

export default function VideoPlayer({ videoId }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)

  const resolve = () => {
    return ;
  }
  // Format time in MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  // Handle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Handle seeking
  const handleSeek = (value: number[]) => {
    if (videoRef.current && duration) {
      const newTime = (value[0] / 100) * duration
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    if (videoRef.current) {
      const newVolume = value[0] / 100
      videoRef.current.volume = newVolume
      setVolume(newVolume)
      setIsMuted(newVolume === 0)
    }
  }

  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
      if (isMuted) {
        videoRef.current.volume = volume
      } else {
        videoRef.current.volume = 0
      }
    }
  }

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (playerRef.current) {
      if (!document.fullscreenElement) {
        playerRef.current.requestFullscreen().catch((err) => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`)
        })
      } else {
        document.exitFullscreen()
      }
    }
  }

  // Update time as video plays
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => {
      setCurrentTime(video.currentTime)
    }

    const updateDuration = () => {
      setDuration(video.duration)
    }

    const handleEnd = () => {
      setIsPlaying(false)
    }

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    video.addEventListener("timeupdate", updateTime)
    video.addEventListener("loadedmetadata", updateDuration)
    video.addEventListener("ended", handleEnd)
    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      video.removeEventListener("timeupdate", updateTime)
      video.removeEventListener("loadedmetadata", updateDuration)
      video.removeEventListener("ended", handleEnd)
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  return (
    <div ref={playerRef} className="relative w-full overflow-hidden rounded-lg bg-black aspect-video">
      <video
        ref={videoRef}
        className="w-full h-full"
        poster={`/placeholder.svg?height=720&width=1280&text=Video+${videoId}`}
      >
        <source
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Video controls */}
      <div className="absolute inset-0 flex flex-col justify-between opacity-0 hover:opacity-100 transition-opacity bg-gradient-to-t from-black/70 via-transparent to-black/30">
        {/* Top controls */}
        <div className="p-4">{/* Optional: Title or other info */}</div>

        {/* Bottom controls */}
        <div className="p-4 space-y-2">
          {/* Progress bar */}
          <Slider
            value={[duration ? (currentTime / duration) * 100 : 0]}
            onValueChange={handleSeek}
            className="w-full [&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-primary [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-primary [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0"
          />

          {/* Control buttons */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={togglePlay}>
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>

              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <SkipForward className="h-5 w-5" />
              </Button>

              <div className="flex items-center gap-2 ml-2">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={toggleMute}>
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>

                <div className="w-20 hidden sm:block">
                  <Slider
                    value={[isMuted ? 0 : volume * 100]}
                    onValueChange={handleVolumeChange}
                    className="[&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-white [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-white [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0"
                  />
                </div>
              </div>

              <span className="text-sm ml-2">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={toggleFullscreen}>
                <Maximize className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

