import * as React from 'react';
import {View, Image, Ad, getStorageSync} from 'remax/wechat';
// @ts-ignore
import className from 'classnames';
import './index.css';
import {SiteConfig} from "@/data";
import CustomAd from "@/components/CustomAd";

const setting = {
  pg_video_unit_id:'12345',
}
const wmore = [
  {
    id:1,
    image:'https://dfzximg01.dftoutiao.com/news/20210303/20210303161540_32496107705c4ab09eca58e11b73bf1c_0.jpeg',
    description:'1342134阿斯顿发',
    name:'大法师',
  },
  {
    id:1,
    image:'https://dfzximg01.dftoutiao.com/news/20210303/20210303161540_32496107705c4ab09eca58e11b73bf1c_0.jpeg',
    description:'1342134阿斯顿发',
    name:'大法师',
  },
  {
    id:1,
    image:'https://dfzximg01.dftoutiao.com/news/20210303/20210303161540_32496107705c4ab09eca58e11b73bf1c_0.jpeg',
    description:'1342134阿斯顿发',
    name:'大法师',
  },
  {
    id:1,
    image:'https://dfzximg01.dftoutiao.com/news/20210303/20210303161540_32496107705c4ab09eca58e11b73bf1c_0.jpeg',
    description:'1342134阿斯顿发',
    name:'大法师',
  },
]
const siteConfig:SiteConfig = getStorageSync("siteInfo");
export const More = () => {
  return (
      <>
        {
          siteConfig.ads?.more?(
              <View className="wad">
                <CustomAd adIds={siteConfig.ads?.more} />
              </View>
          ): null
        }
        <View className="wmore">
          {
            wmore.map((item,index)=>(
                <View className="wmoreitem" key={index}>
                  <Image className="img" src={item.image} />
                  <View className="wcon">
                    <View className="wtitle">{item.name}</View>
                    <View className="wmiaoshu">{item.description}</View>
                  </View>
                  <View className="wbtm">去看看</View>
                </View>
            ))
          }
        </View>
      </>
  );
};

export default More;
