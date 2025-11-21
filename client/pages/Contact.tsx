import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <p className="mt-2 max-w-prose text-muted-foreground">
        We'd love to hear from you. Reach out via the form or visit us in
        Ahmedabad.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          <div className="rounded-xl border bg-card p-5">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="font-semibold">
                  NaturaCircle : Eco-Friendly Products
                </p>
                <p className="text-sm text-muted-foreground">
                  18, Ompark Society, near Sub-division Office, Vatva, Ahmedabad
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <a href="mailto:mcad240014@gmail.com" className="text-sm">
                mcad240014@gmail.com
              </a>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <a href="tel:+919510088267" className="text-sm">
                +91 95100 88267
              </a>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <Instagram className="h-5 w-5 text-primary" />
              <a
                href="https://instagram.com/naturacircle"
                target="_blank"
                rel="noreferrer"
                className="text-sm"
              >
                @naturacircle
              </a>
            </div>
            <div className="mt-4">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=18,+Ompark+Society,+Vatva,+Ahmedabad"
                target="_blank"
                rel="noreferrer"
              >
                <button className="mt-2 inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground">
                  Get directions
                </button>
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border">
            <iframe
              title="NaturaCircle Location Map"
              src="https://www.google.com/maps?q=18+Ompark+Society+Vatva+Ahmedabad&output=embed"
              className="h-64 w-full"
              loading="lazy"
            />
          </div>
        </div>

        <form
          className="rounded-xl border bg-card p-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget as HTMLFormElement;
            form.reset();
            toast({
              title: "Thanks!",
              description: "We received your message and will reply soon.",
            });
          }}
        >
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Message</label>
            <textarea
              className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              rows={5}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Send message
          </Button>
        </form>
      </div>
    </div>
  );
}
