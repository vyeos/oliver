export default function NotificationsPage() {
  const events = [
    "Maya mentioned you in 'release automation workflow'.",
    "Noah reposted your commit-linked update.",
    "Elena started following you.",
    "Frontend Weekly RSS source posted a new issue.",
  ];

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground text-xs uppercase tracking-[0.18em]">
        Notifications
      </p>
      <h1 className="font-serif text-2xl">Activity updates</h1>
      <p className="text-muted-foreground text-sm">
        Mentions, likes, reposts, and follow events.
      </p>
      <ul className="space-y-2">
        {events.map((event) => (
          <li key={event} className="bg-muted rounded-md px-3 py-2 text-sm">
            {event}
          </li>
        ))}
      </ul>
    </div>
  );
}
