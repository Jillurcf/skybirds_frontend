import { Container } from '@/components/ui/container';

export function AnnouncementBar() {
  return (
    <div className="border-b border-charcoal/10 bg-charcoal text-ivory">
      <Container className="flex min-h-9 items-center justify-center text-center">
        <p className="text-[11px] uppercase tracking-editorial text-ivory/75">
          Premium menswear. Crafted with intention.
        </p>
      </Container>
    </div>
  );
}
