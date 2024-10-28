import { HomeBanner } from '@/components/home/banner/index';
import { HomeFooter } from '@/components/home/footer';
import { HomeMain } from '@/components/home/main';
import { SwapInProgress } from '@/components/swap-in-progress';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HomeBanner />
      <HomeMain />
      <HomeFooter />
      {/*<SwapInProgress visible />*/}
    </div>
  );
}
