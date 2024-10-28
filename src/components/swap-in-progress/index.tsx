'use client';

import { useState } from 'react';
import { Modal } from '../modal';
import classNames from 'classnames';
import style from './style.module.scss';

export const SwapInProgress = (props: { visible: boolean; onClose?: () => void }) => {
  const { visible = false, onClose } = props;
  const [icuLoading, setIcuLoading] = useState(false);
  const [icpLoading, setIcpLoading] = useState(false);

  setInterval(() => {
    setIcuLoading(!icuLoading);
    setIcpLoading(!icpLoading);
  }, 2000);

  return (
    <Modal visible={visible}>
      <div className="pt-8 px-20 pb-16 rounded-lg text-white flex flex-col gap-12 items-center bg-[#131835]">
        <div className="w-full relative">
          <div className="text-center text-4xl font-bold">Swap in Progress</div>
          <div
            className="absolute right-0 top-[50%] transform translate-y-[-50%] text-[32px] text-[#8b9ac9]"
            onClick={onClose}
          >
            X
          </div>
        </div>
        <div className="text-xl text-[#8b9ac9]">Please wait some time for transactions to finish</div>
        <div className="flex items-center gap-[110px] pb-[100px]">
          <div className=" relative">
            <div
              className={classNames(
                'w-[120px] h-[120px] rounded-full flex justify-center items-center',
                icuLoading ? 'bg-[#7768f4]' : 'bg-[#1f2846]',
              )}
            >
              {icuLoading ? (
                <>
                  <svg viewBox="0 0 36 36" className={style.loading}>
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="50%" x2="100%" y2="50%">
                        <stop offset="0%" style={{ stopColor: 'white' }} />
                        <stop offset="100%" style={{ stopColor: 'white', stopOpacity: 0 }} />
                      </linearGradient>
                    </defs>
                    <circle
                      cx="18"
                      cy="18"
                      r="17"
                      stroke="url(#grad1)"
                      stroke-width="2"
                      stroke-dasharray="60"
                      fill="none"
                    />
                  </svg>
                  <span>loading</span>
                </>
              ) : (
                'ok'
              )}
            </div>
            <div className="absolute -bottom-[90px] left-0 w-full text-xl text-[#8b9ac9] text-center">
              <div>Approving</div>
              <div>ICU</div>
            </div>
          </div>
          <div className="text-[60px]">&gt;</div>
          <div className="relative">
            <div
              className={classNames(
                'w-[120px] h-[120px] rounded-full flex justify-center items-center',
                icuLoading ? 'bg-[#7768f4]' : 'bg-[#1f2846]',
              )}
            >
              {icpLoading ? (
                <>
                  <svg viewBox="0 0 36 36" className={style.loading}>
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="50%" x2="100%" y2="50%">
                        <stop offset="0%" style={{ stopColor: 'white' }} />
                        <stop offset="100%" style={{ stopColor: 'white', stopOpacity: 0 }} />
                      </linearGradient>
                    </defs>
                    <circle
                      cx="18"
                      cy="18"
                      r="17"
                      stroke="url(#grad1)"
                      stroke-width="2"
                      stroke-dasharray="60"
                      fill="none"
                    />
                  </svg>
                  <span>loading</span>
                </>
              ) : (
                'ok'
              )}
            </div>
            <div className="absolute -bottom-[90px] left-0 w-full text-xl text-[#8b9ac9] text-center">
              <div>Swap ICU to</div>
              <div>ICP</div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
