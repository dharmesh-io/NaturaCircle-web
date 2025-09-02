export default function Blog() {
  const posts = [
    {
      id: "p1",
      title: "5 Easy Swaps for a Greener Home",
      excerpt:
        "From bamboo toothbrushes to beeswax wraps, these small changes add up to big impact.",
      image:
        "https://images.pexels.com/photos/4397817/pexels-photo-4397817.jpeg?auto=compress&cs=tinysrgb&w=1600",
      tag: "Guides",
      date: "Mar 12, 2025",
    },
    {
      id: "p2",
      title: "Why Jute Beats Plastic Bags",
      excerpt:
        "Jute is durable, compostable, and stylish. Here’s how to make the switch for good.",
      image:
        "https://images.pexels.com/photos/15601758/pexels-photo-15601758.jpeg?auto=compress&cs=tinysrgb&w=1600",
      tag: "Sustainability",
      date: "Mar 3, 2025",
    },
    {
      id: "p3",
      title: "Build a Low‑Waste Bathroom Routine",
      excerpt:
        "Solid shampoo bars, refillables, and recyclable packaging make all the difference.",
      image:
        "https://images.pexels.com/photos/7262414/pexels-photo-7262414.jpeg?auto=compress&cs=tinysrgb&w=1600",
      tag: "Lifestyle",
      date: "Feb 22, 2025",
    },
  ];

  return (
    <div className="container py-12">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold">NaturaCircle Blog</h1>
          <p className="mt-2 max-w-prose text-muted-foreground">
            Tips, guides, and stories for eco‑conscious living. Follow us on Instagram
            <a className="ml-1 text-primary underline underline-offset-4" href="https://instagram.com/naturacircle" target="_blank" rel="noreferrer">@naturacircle</a>.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <article key={p.id} className="overflow-hidden rounded-xl border bg-card shadow-sm transition hover:shadow-md">
            <img src={p.image} alt={p.title} className="h-48 w-full object-cover" />
            <div className="p-5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="rounded-full bg-secondary px-2 py-0.5">{p.tag}</span>
                <span>{p.date}</span>
              </div>
              <h2 className="mt-2 text-lg font-semibold">{p.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{p.excerpt}</p>
              <a href="#" className="mt-3 inline-block text-sm text-primary underline underline-offset-4">Read more</a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
