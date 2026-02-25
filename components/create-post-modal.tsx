"use client";

import { useState } from "react";
import { ImageIcon, MapPinIcon, SmileIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

type CreatePostModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  displayName: string;
};

const CreatePostModal = ({
  isOpen,
  onOpenChange,
  displayName,
}: CreatePostModalProps) => {
  const [showClosePrompt, setShowClosePrompt] = useState(false);
  const [postType, setPostType] = useState("everyone");
  const [postContent, setPostContent] = useState("");
  const [selectedRepo, setSelectedRepo] = useState("");
  const [selectedCommit, setSelectedCommit] = useState("");

  const isDirty =
    postContent.trim() !== "" || selectedRepo !== "" || selectedCommit !== "";

  const resetForm = () => {
    setPostType("everyone");
    setPostContent("");
    setSelectedRepo("");
    setSelectedCommit("");
  };

  const closeAndReset = () => {
    setShowClosePrompt(false);
    resetForm();
    onOpenChange(false);
  };

  const handleCloseAttempt = () => {
    if (isDirty) {
      setShowClosePrompt(true);
      return;
    }
    closeAndReset();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="bg-foreground/45 absolute inset-0" onClick={handleCloseAttempt} />
      <div className="bg-card text-card-foreground border-border relative flex h-auto w-full max-w-2xl flex-col overflow-hidden rounded-3xl border shadow-2xl">
        <header className="flex items-center justify-between px-6 py-5">
          <button
            type="button"
            onClick={handleCloseAttempt}
            className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
            aria-label="Close create post"
          >
            <XIcon className="size-7" />
          </button>
          <Link
            href="/drafts"
            className="text-primary text-lg font-semibold transition-colors hover:opacity-80"
          >
            Drafts
          </Link>
        </header>

        <form
          className="flex h-full flex-col px-6 pb-5"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="mb-5 flex items-center gap-4">
            <div className="bg-muted ring-border text-foreground flex h-14 w-14 items-center justify-center rounded-full ring-2 text-sm font-semibold">
              {displayName.slice(0, 1).toUpperCase()}
            </div>
            <select
              className="bg-background border-input text-primary h-10 cursor-pointer rounded-full border px-5 pr-11 text-sm outline-none"
              value={postType}
              onChange={(event) => setPostType(event.target.value)}
            >
              <option value="everyone">Everyone</option>
              <option value="followers">Followers</option>
              <option value="private">Only me</option>
            </select>
          </div>

          <textarea
            id="dialogPostContent"
            rows={4}
            placeholder="What are you upto?"
            className="placeholder:text-muted-foreground mb-5 min-h-[120px] w-full resize-none bg-transparent text-2xl leading-tight outline-none"
            value={postContent}
            onChange={(event) => setPostContent(event.target.value)}
          />

          <div className="mb-4 grid gap-3 md:grid-cols-2">
            <select
              id="dialogRepo"
              className="bg-background border-input h-10 cursor-pointer rounded-xl border px-3 text-sm outline-none"
              value={selectedRepo}
              onChange={(event) => setSelectedRepo(event.target.value)}
            >
              <option value="" disabled>
                Select repository
              </option>
              <option value="oliver-web">oliver-web</option>
              <option value="oliver-cli">oliver-cli</option>
              <option value="infra-scripts">infra-scripts</option>
            </select>

            <select
              id="dialogCommit"
              className="bg-background border-input h-10 cursor-pointer rounded-xl border px-3 text-sm outline-none"
              value={selectedCommit}
              onChange={(event) => setSelectedCommit(event.target.value)}
            >
              <option value="" disabled>
                Select commit
              </option>
              <option value="a1b2c3d">
                a1b2c3d - Improve post composer spacing
              </option>
              <option value="d4e5f6g">d4e5f6g - Add draft list page</option>
              <option value="h7i8j9k">h7i8j9k - Refactor sidebar routing</option>
            </select>
          </div>

          <div className="border-border mt-auto border-t pt-4">
            <div className="flex items-center justify-between gap-4">
              <div className="text-primary flex items-center gap-3">
                <button
                  type="button"
                  className="hover:bg-primary/10 cursor-pointer rounded-full p-2"
                >
                  <ImageIcon className="size-5" />
                </button>
                <button
                  type="button"
                  className="hover:bg-primary/10 cursor-pointer rounded-full p-2"
                >
                  <SmileIcon className="size-5" />
                </button>
                <button
                  type="button"
                  className="hover:bg-primary/10 cursor-pointer rounded-full p-2"
                >
                  <MapPinIcon className="size-5" />
                </button>
              </div>

              <Button type="submit" className="cursor-pointer rounded-full px-8">
                Post
              </Button>
            </div>
          </div>
        </form>

        {showClosePrompt ? (
          <div className="bg-foreground/45 absolute inset-0 flex items-center justify-center p-4">
            <div className="bg-card border-border w-full max-w-sm rounded-2xl border p-5 shadow-xl">
              <h3 className="text-base font-semibold">Save this as a draft?</h3>
              <p className="text-muted-foreground mt-1 text-sm">
                You have unsaved changes in this post.
              </p>
              <div className="mt-4 flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  className="cursor-pointer"
                  onClick={() => setShowClosePrompt(false)}
                >
                  Keep editing
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={closeAndReset}
                >
                  Discard
                </Button>
                <Button
                  type="button"
                  className="cursor-pointer"
                  onClick={closeAndReset}
                >
                  Save draft
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CreatePostModal;
