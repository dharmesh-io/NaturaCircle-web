import { Button } from "@/components/ui/button";

export const Placeholder: React.FC<{ title: string; children?: React.ReactNode }> = ({ title, children }) => (
  <div className="container py-16">
    <h1 className="text-3xl font-bold">{title}</h1>
    <p className="mt-2 max-w-prose text-muted-foreground">
      This page is a placeholder. Tell Fusion what you want here next and we'll build it out.
    </p>
    {children && <div className="mt-6">{children}</div>}
    <div className="mt-8">
      <Button asChild>
        <a href="/shop">Continue Shopping</a>
      </Button>
    </div>
  </div>
);
