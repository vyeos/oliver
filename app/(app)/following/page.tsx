export default function FollowingPage() {
  const following = [
    { name: "Maya Chen", status: "Posted 12m ago" },
    { name: "Noah Park", status: "Commented on your post" },
    { name: "Elena Ortiz", status: "Linked a new commit" },
  ];

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground text-xs uppercase tracking-[0.18em]">
        Following
      </p>
      <h1 className="font-serif text-2xl">People you follow</h1>
      <p className="text-muted-foreground text-sm">
        A focused stream from your selected developers.
      </p>
      <div className="space-y-2">
        {following.map((person) => (
          <article key={person.name} className="bg-muted rounded-md px-3 py-2">
            <p className="font-medium">{person.name}</p>
            <p className="text-muted-foreground text-xs">{person.status}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
