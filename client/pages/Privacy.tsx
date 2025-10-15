export default function Privacy() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p className="mt-4 text-muted-foreground">
        At NaturaCircle we respect your privacy. This policy explains what
        information we collect, how we use it, and your choices. We collect
        information you provide when creating an account, placing orders, or
        contacting support. We use this information to process orders, improve
        our services, and communicate with you about your account and orders.
      </p>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Information We Collect</h2>
        <ul className="mt-2 list-inside list-disc text-muted-foreground">
          <li>Contact details (name, email, shipping address)</li>
          <li>Order and payment information</li>
          <li>Device and usage data to improve our site</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">How We Use Your Data</h2>
        <p className="mt-2 text-muted-foreground">
          We use your data to fulfill orders, provide customer support, and send
          transactional messages. We do not sell your personal information to
          third parties. We may share limited data with service providers that
          help operate our site (payment processors, shipping partners).
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Your Choices</h2>
        <p className="mt-2 text-muted-foreground">
          You can access, update, or request deletion of your account data by
          contacting us at hello@naturacircle.com. You can opt out of marketing
          emails using the unsubscribe link in any marketing message.
        </p>
      </section>

      <p className="mt-6 text-sm text-muted-foreground">Last updated: 2025</p>
    </div>
  );
}
