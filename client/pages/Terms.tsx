export default function Terms() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold">Terms & Conditions</h1>
      <p className="mt-4 text-muted-foreground">
        These terms govern your use of NaturaCircle. By using our site you agree
        to these terms. Please read them carefully.
      </p>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Orders</h2>
        <p className="mt-2 text-muted-foreground">
          All orders are subject to acceptance and product availability. Prices
          and availability may change without notice until the order is
          confirmed.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Payments</h2>
        <p className="mt-2 text-muted-foreground">
          Payments are processed through secure providers. You agree to provide
          accurate payment information and authorize charges for your purchases.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Returns & Refunds</h2>
        <p className="mt-2 text-muted-foreground">
          Returns are accepted within 30 days for items in original condition.
          Refunds will be processed after inspection, subject to our return
          policy.
        </p>
      </section>

      <p className="mt-6 text-sm text-muted-foreground">Last updated: 2025</p>
    </div>
  );
}
