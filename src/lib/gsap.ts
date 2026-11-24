type GsapModule = typeof import('gsap');
type ScrollTriggerModule = typeof import('gsap/ScrollTrigger');

let registration: Promise<{ gsap: GsapModule['gsap']; ScrollTrigger: ScrollTriggerModule['ScrollTrigger'] }> | null =
  null;

export async function registerScrollTrigger() {
  if (!registration) {
    registration = Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([gsapModule, scrollTriggerModule]) => {
        const { gsap } = gsapModule;
        const { ScrollTrigger } = scrollTriggerModule;
        gsap.registerPlugin(ScrollTrigger);
        return { gsap, ScrollTrigger };
      }
    );
  }

  return registration;
}

type ScrollTriggerType = (typeof import('gsap/ScrollTrigger'))['ScrollTrigger'];

export function observeScrollTriggerRefresh(scope: HTMLElement, ScrollTrigger: ScrollTriggerType): () => void {
  let disposed = false;
  const refresh = () => {
    if (!disposed) ScrollTrigger.refresh();
  };
  const images = Array.from(scope.querySelectorAll('img'));

  images.forEach((image) => {
    if (!image.complete) image.addEventListener('load', refresh);
  });

  void document.fonts?.ready.then(refresh);

  const frame = requestAnimationFrame(refresh);

  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    images.forEach((image) => image.removeEventListener('load', refresh));
  };
}
