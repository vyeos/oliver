export function NotificationsPanel() {
  const notifications = [
    "@maya liked your post about release automation.",
    "New follower: @elena.",
    "RSS source 'Frontend Weekly' published 2 new items.",
    "@npark reposted your build log.",
  ]

  return (
    <aside className="bg-card border-border hidden h-fit rounded-xl border p-4 lg:block">
      <h3 className="text-sm font-semibold uppercase tracking-[0.16em]">Notifications</h3>
      <ul className="mt-4 space-y-3">
        {notifications.map((item) => (
          <li key={item} className="text-muted-foreground border-border border-b pb-3 text-sm last:border-b-0 last:pb-0">
            {item}
          </li>
        ))}
      </ul>
    </aside>
  )
}
