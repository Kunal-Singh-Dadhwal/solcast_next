"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import {
  Bell,
  Compass,
  FileText,
  History,
  Home,
  ImageIcon,
  Library,
  PlaySquare,
  Plus,
  Search,
  Trash2,
  Upload,
  Video,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample content data
const initialContent = [
  {
    id: "1",
    title: "Getting Started with React Hooks",
    type: "video",
    thumbnail: "/placeholder.svg?height=180&width=320&text=React+Hooks",
    uploadDate: "2023-11-15",
    views: 24500,
    likes: 1200,
    duration: "15:42",
  },
  {
    id: "2",
    title: "10 CSS Tricks Every Developer Should Know",
    type: "article",
    thumbnail: "/placeholder.svg?height=180&width=320&text=CSS+Tricks",
    uploadDate: "2023-10-28",
    views: 18300,
    likes: 950,
    readTime: "8 min read",
  },
  {
    id: "3",
    title: "Building a Portfolio Website - Live Coding",
    type: "video",
    thumbnail: "/placeholder.svg?height=180&width=320&text=Portfolio+Website",
    uploadDate: "2023-12-05",
    views: 9800,
    likes: 780,
    duration: "1:22:15",
  },
  {
    id: "4",
    title: "JavaScript Array Methods Cheat Sheet",
    type: "image",
    thumbnail: "/placeholder.svg?height=180&width=320&text=JS+Cheatsheet",
    uploadDate: "2023-09-18",
    views: 32100,
    likes: 1540,
  },
]

export default function CreatorDashboard() {
  const [content, setContent] = useState(initialContent)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [newContent, setNewContent] = useState({
    id: "",
    title: "",
    type: "video",
    description: "",
    thumbnail: "",
    uploadDate: "",
    views: 0,
    likes: 0,
  })
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)

  const handleCreateNew = () => {
    setIsCreateDialogOpen(true)
    setCurrentStep(1)
    setNewContent({
      id: Date.now().toString(),
      title: "",
      type: "video",
      description: "",
      thumbnail: "",
      uploadDate: new Date().toISOString().split("T")[0],
      views: 0,
      likes: 0,
    })
    setUploadedFile(null)
    setThumbnailPreview(null)
    setFilePreview(null)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isThumb = false) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (isThumb) {
      setThumbnailPreview(URL.createObjectURL(file))
    } else {
      setUploadedFile(file)
      if (file.type.startsWith("image/")) {
        setFilePreview(URL.createObjectURL(file))
      }
    }
  }

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleSaveContent = () => {
    // In a real app, you would upload the file to a server here
    const thumbnailUrl =
      thumbnailPreview || `/placeholder.svg?height=180&width=320&text=${encodeURIComponent(newContent.title)}`

    const newContentItem = {
      ...newContent,
      thumbnail: thumbnailUrl,
    }

    setContent((prev) => [newContentItem, ...prev])
    setIsCreateDialogOpen(false)
  }

  const handleDeleteContent = (id: string) => {
    setContent((prev) => prev.filter((item) => item.id !== id))
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "image":
        return <ImageIcon className="h-4 w-4" />
      case "article":
        return <FileText className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`
    }
    return views.toString()
  }

  return (
    <div className="flex flex-col w-full">
      {/* Header with Navigation */}
      <header className="sticky top-0 z-10 bg-background border-b w-full">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo and Brand */}
            <div className="flex items-center gap-2">
              <div className="flex items-center text-brand">
                <PlaySquare className="h-6 w-6 fill-current" />
                <span className="font-bold ml-1 hidden sm:inline">VideoHub</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search your content"
                  className="w-full h-10 px-4 rounded-l-full border border-r-0 focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button className="absolute right-0 top-0 h-10 px-4 bg-muted rounded-r-full border border-l-0">
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center gap-6">
              <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
                <Home className="h-5 w-5" />
                <span className="text-xs">Home</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
                <Compass className="h-5 w-5" />
                <span className="text-xs">Explore</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
                <Library className="h-5 w-5" />
                <span className="text-xs">Library</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
                <History className="h-5 w-5" />
                <span className="text-xs">History</span>
              </Button>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="h-8 w-8 rounded-full bg-muted overflow-hidden">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="User avatar"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center justify-between mt-2 pt-2 border-t">
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
              <Home className="h-5 w-5" />
              <span className="text-xs">Home</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
              <Compass className="h-5 w-5" />
              <span className="text-xs">Explore</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
              <Library className="h-5 w-5" />
              <span className="text-xs">Library</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
              <History className="h-5 w-5" />
              <span className="text-xs">History</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="w-full max-w-7xl mx-auto">
        <div className="w-full p-4">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Creator Dashboard</h1>
              <p className="text-muted-foreground">Manage your content and track performance</p>
            </div>
            <Button onClick={handleCreateNew} className="mt-4 md:mt-0 bg-primary hover:bg-primary/90 text-white">
              <Plus className="mr-2 h-4 w-4" /> Create New
            </Button>
          </div>

          {/* Dashboard Tabs */}
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
              <TabsTrigger value="monetization">Monetization</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4">
              {/* Content Filters */}
              <div className="flex flex-col sm:flex-row gap-2 justify-between mb-4">
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Content Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="video">Videos</SelectItem>
                      <SelectItem value="image">Images</SelectItem>
                      <SelectItem value="article">Articles</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select defaultValue="recent">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="oldest">Oldest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Content List */}
              <div className="grid grid-cols-1 gap-4">
                {content.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative w-full sm:w-48 h-40 sm:h-auto">
                          <Image
                            src={item.thumbnail || "/placeholder.svg"}
                            alt={item.title}
                            width={320}
                            height={180}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 left-2 bg-background/80 rounded-md px-2 py-1 text-xs font-medium flex items-center">
                            {getTypeIcon(item.type)}
                            <span className="ml-1 capitalize">{item.type}</span>
                          </div>
                          {item.type === "video" && item.duration && (
                            <div className="absolute bottom-2 right-2 bg-background/80 rounded-md px-2 py-1 text-xs">
                              {item.duration}
                            </div>
                          )}
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                          <div className="flex justify-between">
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-muted-foreground hover:text-destructive"
                              onClick={() => handleDeleteContent(item.id)}
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </div>
                          <div className="mt-2 text-sm text-muted-foreground">
                            <p>Uploaded on {formatDate(item.uploadDate)}</p>
                            <div className="flex gap-4 mt-1">
                              <span>{formatViews(item.views)} views</span>
                              <span>{item.likes} likes</span>
                              {item.readTime && <span>{item.readTime}</span>}
                            </div>
                          </div>
                          <div className="mt-auto pt-2 flex gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              Analytics
                            </Button>
                            <Button variant="outline" size="sm">
                              Share
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="flex items-center justify-center h-40 bg-muted rounded-lg">
                <p className="text-muted-foreground">Analytics dashboard will be displayed here</p>
              </div>
            </TabsContent>

            <TabsContent value="comments">
              <div className="flex items-center justify-center h-40 bg-muted rounded-lg">
                <p className="text-muted-foreground">Comments management will be displayed here</p>
              </div>
            </TabsContent>

            <TabsContent value="monetization">
              <div className="flex items-center justify-center h-40 bg-muted rounded-lg">
                <p className="text-muted-foreground">Monetization settings will be displayed here</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Create Content Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Content</DialogTitle>
          </DialogHeader>

          {/* Step 1: Content Type Selection */}
          {currentStep === 1 && (
            <div className="space-y-4 py-4">
              <h3 className="text-lg font-medium">Step 1: Select Content Type</h3>
              <RadioGroup
                value={newContent.type}
                onValueChange={(value) => setNewContent({ ...newContent, type: value })}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg border ${newContent.type === "video" ? "border-primary bg-primary/5" : "border-border"}`}
                >
                  <RadioGroupItem value="video" id="video" className="sr-only" />
                  <Label htmlFor="video" className="cursor-pointer flex flex-col items-center gap-2">
                    <Video className="h-8 w-8" />
                    <span className="font-medium">Video</span>
                    <span className="text-xs text-center text-muted-foreground">Upload a video file</span>
                  </Label>
                </div>

                <div
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg border ${newContent.type === "image" ? "border-primary bg-primary/5" : "border-border"}`}
                >
                  <RadioGroupItem value="image" id="image" className="sr-only" />
                  <Label htmlFor="image" className="cursor-pointer flex flex-col items-center gap-2">
                    <ImageIcon className="h-8 w-8" />
                    <span className="font-medium">Image</span>
                    <span className="text-xs text-center text-muted-foreground">Upload an image</span>
                  </Label>
                </div>

                <div
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg border ${newContent.type === "article" ? "border-primary bg-primary/5" : "border-border"}`}
                >
                  <RadioGroupItem value="article" id="article" className="sr-only" />
                  <Label htmlFor="article" className="cursor-pointer flex flex-col items-center gap-2">
                    <FileText className="h-8 w-8" />
                    <span className="font-medium">Article</span>
                    <span className="text-xs text-center text-muted-foreground">Write an article</span>
                  </Label>
                </div>
              </RadioGroup>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleNextStep}>Next</Button>
              </DialogFooter>
            </div>
          )}

          {/* Step 2: File Upload */}
          {currentStep === 2 && (
            <div className="space-y-4 py-4">
              <h3 className="text-lg font-medium">Step 2: Upload Content</h3>

              <div className="border-2 border-dashed border-muted rounded-lg p-6 flex flex-col items-center justify-center">
                {filePreview ? (
                  <div className="relative w-full">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-background/80 rounded-full"
                      onClick={() => {
                        setFilePreview(null)
                        setUploadedFile(null)
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <Image
                      src={filePreview || "/placeholder.svg"}
                      alt="Preview"
                      width={400}
                      height={225}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                ) : (
                  <>
                    <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground mb-2">
                      {newContent.type === "video" && "Drag and drop your video file here, or click to browse"}
                      {newContent.type === "image" && "Drag and drop your image here, or click to browse"}
                      {newContent.type === "article" && "Upload a cover image for your article"}
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      {newContent.type === "video" && "Supported formats: MP4, MOV, AVI (Max: 2GB)"}
                      {newContent.type === "image" && "Supported formats: JPG, PNG, GIF (Max: 10MB)"}
                      {newContent.type === "article" && "Supported formats: JPG, PNG (Max: 5MB)"}
                    </p>
                    <Label htmlFor="content-file" className="cursor-pointer">
                      <div className="bg-primary text-primary-foreground px-4 py-2 rounded-md">Browse Files</div>
                      <Input
                        id="content-file"
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e)}
                        accept={
                          newContent.type === "video" ? "video/*" : newContent.type === "image" ? "image/*" : "image/*"
                        }
                      />
                    </Label>
                  </>
                )}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={handlePrevStep}>
                  Back
                </Button>
                <Button onClick={handleNextStep} disabled={!uploadedFile && newContent.type !== "article"}>
                  Next
                </Button>
              </DialogFooter>
            </div>
          )}

          {/* Step 3: Metadata */}
          {currentStep === 3 && (
            <div className="space-y-4 py-4">
              <h3 className="text-lg font-medium">Step 3: Add Details</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newContent.title}
                    onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
                    placeholder="Enter a title for your content"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newContent.description || ""}
                    onChange={(e) => setNewContent({ ...newContent, description: e.target.value })}
                    placeholder="Enter a description"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Thumbnail</Label>
                  <div className="border-2 border-dashed border-muted rounded-lg p-4 flex flex-col items-center justify-center">
                    {thumbnailPreview ? (
                      <div className="relative w-full">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 bg-background/80 rounded-full"
                          onClick={() => setThumbnailPreview(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <Image
                          src={thumbnailPreview || "/placeholder.svg"}
                          alt="Thumbnail preview"
                          width={320}
                          height={180}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">Upload a thumbnail image</p>
                        <Label htmlFor="thumbnail" className="cursor-pointer">
                          <div className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm">
                            Upload Thumbnail
                          </div>
                          <Input
                            id="thumbnail"
                            type="file"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, true)}
                            accept="image/*"
                          />
                        </Label>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={handlePrevStep}>
                  Back
                </Button>
                <Button onClick={handleSaveContent} disabled={!newContent.title}>
                  Save Content
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

