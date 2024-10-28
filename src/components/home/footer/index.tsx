'use client';

import { DashedImage } from '../../dashedImage';
import Meme6 from '@/assets/images/meme6.png';
import styles from './style.module.scss';
import { Button } from '@/components/button';
import { Border } from '@/components/border';

export const HomeFooter = () => {
  return (
    <div className={styles.footer}>
      <Border className="text-green-600" style={{ strokeDashoffset: '11' }} />
      <div className={styles['footer-content']}>
        <DashedImage className="w-[125px] md:w-[250px] h-[113px] md:h-[226px]" src={Meme6} />
        <Button>Enjoy Meme Fun</Button>
      </div>
    </div>
  );
};
