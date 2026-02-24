import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function CreatePostPage() {
  return (
    <div className="space-y-5">
      <header className="space-y-2">
        <p className="text-muted-foreground text-xs uppercase tracking-[0.18em]">Create</p>
        <h1 className="font-serif text-2xl">Write a new post</h1>
        <p className="text-muted-foreground text-sm">Draft a text update or link your post to a commit.</p>
      </header>

      <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
        <div className="space-y-2">
          <label htmlFor="postTitle" className="text-sm font-medium">
            Title
          </label>
          <Input id="postTitle" placeholder="Ship notes, daily build log, or release update" />
        </div>

        <div className="space-y-2">
          <label htmlFor="postContent" className="text-sm font-medium">
            Content
          </label>
          <Textarea
            id="postContent"
            rows={7}
            placeholder="What did you build today? Share context, decisions, and next steps."
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="commitLink" className="text-sm font-medium">
            Commit URL (optional)
          </label>
          <Input id="commitLink" placeholder="https://github.com/user/repo/commit/..." />
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button type="button" variant="outline">
            Save Draft
          </Button>
          <Button type="submit">Publish Post</Button>
        </div>
      </form>
    </div>
  )
}
