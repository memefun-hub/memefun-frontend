'use client';

import Image from 'next/image';
import { useState } from 'react';

export const HomeMainItem = (props: {
  data: any;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) => {
  const { data, onClick } = props;
  const [imageHeight, setImageHeight] = useState<number | undefined>(undefined);

  return (
    <div className="flex cursor-pointer gap-2" onClick={onClick} style={{ height: 'auto', alignItems: 'flex-start' }}>
      <Image
        className="w-[100px] h-[100px]"
        // src="https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg!0x0.webp"
        src={data.logo}
        width={100}
        height={100}
        alt=""
        onLoad={(e) => setImageHeight(e.currentTarget.height)}
      />
      <div className="text-xs">
        <div className="text-blue-200">
          <span>Canister Id:</span>
          <span>{data.canister_id}</span>
        </div>
        {/*<div className="text-green-400">*/}
        {/*  <span>market cap: </span>*/}
        {/*  <span>10M</span>*/}
        {/*</div>*/}
        <div className="text-gray-300">
          <span>Name:</span>
          <span>{data.name}</span>
        </div>
        <div className="text-gray-300">
          <span>Ticker:</span>
          <span>{data.symbol}</span>
        </div>
        <div className="font-semibold text-gray-300">
          <span>Description:</span>
          <span>{data.description}</span>
        </div>
      </div>
    </div>
  );
};
