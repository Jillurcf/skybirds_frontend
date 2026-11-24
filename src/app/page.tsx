import type { Metadata } from 'next';
import { BrandIntroduction } from '@/components/sections/brand-introduction';
import { CompanyStory } from '@/components/sections/company-story';
import { ContactCta } from '@/components/sections/contact-cta';
import { CraftsmanshipQuality } from '@/components/sections/craftsmanship-quality';
import { FeaturedCollections } from '@/components/sections/featured-collections';
import { HomeHero } from '@/components/sections/home-hero';
import { ManufacturingCapabilities } from '@/components/sections/manufacturing-capabilities';
import { NewArrivals } from '@/components/sections/new-arrivals';
import { SignatureMenswear } from '@/components/sections/signature-menswear';
import { getHomeContent } from '@/lib/repository';

export const metadata: Metadata = {
  title: 'Premium Menswear & Manufacturing',
  description:
    'SKY BIRDS FASHION BD — premium men\'s fashion, considered craftsmanship and a clear manufacturing showcase.'
};

export default async function HomePage() {
  const content = await getHomeContent();
  const heroLookbookImages = [
    ...content.arrivals.images.map((image) => image.src),
    ...content.signature.panels.slice(0, 1).map((panel) => panel.image)
  ].slice(0, 4);

  return (
    <>
      <HomeHero content={content.hero} lookbookImages={heroLookbookImages} />
      <BrandIntroduction content={content.intro} />
      <FeaturedCollections content={content.collections} />
      <NewArrivals content={content.arrivals} />
      <SignatureMenswear content={content.signature} />
      <ManufacturingCapabilities content={content.manufacturing} />
      <CraftsmanshipQuality content={content.craftsmanship} />
      <CompanyStory content={content.story} />
      <ContactCta content={content.contactCta} />
    </>
  );
}
