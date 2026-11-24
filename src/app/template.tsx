import { RouteTransition } from '@/components/layout/route-transition';

export default function Template({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RouteTransition>{children}</RouteTransition>;
}
