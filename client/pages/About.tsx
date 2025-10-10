export default function About() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold">About NaturaCircle</h1>
        <p className="mt-3 text-muted-foreground">
          NaturaCircle is an online marketplace and resource for people who want
          everyday products that are kind to the planet. We curate thoughtfully
          made essentials — from home goods to personal care — focusing on
          durability, compostability, and transparency.
        </p>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="mt-2 text-muted-foreground">
            We want to make sustainable choices the easy choice. By offering
            well-made products, clear information about materials and impact,
            and tools to reduce waste, we help people build greener routines
            without compromise.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Sustainability Goals</h2>
          <ul className="mt-3 space-y-2 list-inside list-disc text-muted-foreground">
            <li>
              Prioritize refillable, reusable, or compostable packaging for all
              eligible products.
            </li>
            <li>
              Source from suppliers who publish material and labor practices,
              and favor local manufacturing when feasible.
            </li>
            <li>
              Continually reduce our own operational footprint: energy,
              shipments, and single-use plastics.
            </li>
            <li>
              Educate our community through guides, tips, and transparent product
              stories so impact multiplies across households.
            </li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Our Story</h2>
          <p className="mt-2 text-muted-foreground">
            NaturaCircle began as a small idea: that better products should be
            accessible and easy to find. We started by working directly with
            makers who use natural materials and simple, low-waste processes.
            Over time we expanded our offering while keeping our original
            standards: durability, repairability, and honest supply chains.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">What You’ll Find Here</h2>
          <p className="mt-2 text-muted-foreground">
            Carefully chosen everyday essentials, clear product information, and
            practical guides to help you transition to a lower-waste lifestyle.
            We highlight product materials, care instructions, and end-of-life
            guidance so you can make informed choices.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">How We Work with Makers</h2>
          <p className="mt-2 text-muted-foreground">
            We build long-term relationships with small brands and artisans who
            share our values. That means fair pricing, transparent practices,
            and collaborating on packaging improvements or refill options when
            possible.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Join Our Community</h2>
          <p className="mt-2 text-muted-foreground">
            Follow our blog for practical tips and product spotlights, or reach
            out if you want to collaborate. If you’re ready to shop, visit our
            <a href="/shop" className="ml-1 text-primary underline underline-offset-4">Shop</a>.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            For press, partnership, or bulk orders, <a href="/contact" className="text-primary underline underline-offset-4">contact us</a> and we’ll get back
            to you within 48 hours.
          </p>
        </section>

      </div>
    </div>
  );
}
