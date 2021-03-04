import * as React from 'react';
import {View, getStorageSync} from 'remax/wechat';
// @ts-ignore
import className from 'classnames';
import './index.css';
import CustomAd from "@/components/CustomAd";
import {SiteConfig} from "@/data";

const wwenti = [
  {
    id: 1,
    name:'问题1',
    miaoshu:'问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述'
  },
  {
    id: 2,
    name:'问题2',
    miaoshu:'问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述'
  },
  {
    id: 3,
    name:'问题3',
    miaoshu:'问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述问题1描述'
  },
];

const windex = 1;
const siteConfig:SiteConfig = getStorageSync("siteInfo");
export const Help = () => {
  return (
    <>
      <View>
        <View className="wlist">
          {
            wwenti.map((item,index)=>(
                <View className="wlistitem" key={index}>
                  <View className={className('wtitle',windex===index ? 'wtitleactive':'')} data-index="{{index}}">{item.name}</View>
                  {
                    windex===index?(<View className="wmiaoshu">{item.miaoshu}</View>): null
                  }
                </View>
            ))
          }
        </View>
        <View className="wbtn">返回闯关</View>
      </View>
      <View className="wad">
        <CustomAd adIds={siteConfig.ads?.help} />
      </View>
    </>
  );
};

export default Help;
