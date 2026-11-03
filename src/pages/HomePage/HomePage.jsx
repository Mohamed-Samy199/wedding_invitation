import { useRef } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import OpeningGate from '../../components/opening/OpeningGate';
import HeroSection from '../../components/hero/HeroSection';
import DetailsSection from '../../components/details/DetailsSection';
import SaveTheDateSection from '../../components/details/SaveTheDateSection';
import WeddingGallerySection from '../../components/details/WeddingGallerySection';
import useOpenInvitation from '../../hooks/opening/useOpenInvitation';
import useScrollLock from '../../hooks/shared/useScrollLock';
import useAutoScroll from '../../hooks/shared/useAutoScroll';

export default function HomePage() {
  const { opened, opening, open, refs } = useOpenInvitation();
  const scrollRef = useRef(null);
  useScrollLock(!opened);
  useAutoScroll(opened, scrollRef);

  return (
    <>
      {/* الصفحة ظاهرة خلف البوابة، فتنفتح الأبواب على الهيرو مباشرة */}
      <MainLayout inert={!opened} mainRef={scrollRef}>
        <HeroSection />
        <DetailsSection />
        <SaveTheDateSection />
        <WeddingGallerySection />
      </MainLayout>
      <OpeningGate opened={opened} opening={opening} onOpen={open} refs={refs} />
    </>
  );
}
