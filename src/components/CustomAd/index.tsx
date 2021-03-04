import * as React from 'react';
import {Ad} from 'remax/wechat';
// @ts-ignore
import AdCustom from '../NativeAd';

import './index.css';
import {AdIds} from "@/data";
export type CustomAdProps={
  adIds: AdIds | undefined;
}
export const CustomAd:React.FC<CustomAdProps> = ({adIds}) => {
  return (
      <>
          {
              adIds ? (
                  <>
                      {
                          adIds.bannerId ? (<Ad unitId={adIds.bannerId} />) : null
                      }
                      {
                          adIds.gridAdId ? (<Ad adType='grid' unitId={adIds.gridAdId} />) : null
                      }
                      {
                          adIds.nativeAdId ? (<AdCustom unitId={adIds.nativeAdId} />) : null
                      }
                      {
                          adIds.videoAdId ? (<Ad adType='video' unitId={adIds.videoAdId} />) : null
                      }
                  </>
              ) : null
          }
      </>
  );
};

export default CustomAd;
