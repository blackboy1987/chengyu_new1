import * as React from 'react';
import {View, Image, getStorageSync} from 'remax/wechat';
// @ts-ignore
import className from 'classnames';
import './index.css';
import {SiteConfig} from "@/data";
import CustomAd from "@/components/CustomAd";
import {useState} from "react";

export type RankItem={
  id:number;
  level: number;
  nickName:string;
  avatarUrl:string;
  grade:number;
}
const siteConfig:SiteConfig = getStorageSync("siteInfo");
export const Rank = () => {
  const [data,setData] = useState<{type:1|2,list:RankItem[]}>({
    type:1,
    list:[],
  });


  return (
    <>
      <View className="wpaihang">
        <View className="wtop">
          <View className="wtitle1">闯关排行榜</View>
        </View>
        <View className="wlist">
          {
            data.type==1?(
                <>
                  {
                    data.list.map((item,index)=>(
                        <View className="witem" key={index}>
                          <View className="wid">{index+1}</View>
                          <Image className="img" src={item.avatarUrl} />
                          <View className="wname">{item.nickName}</View>
                          <View className="wguansu">{item.level}关</View>
                        </View>
                    ))
                  }
                </>
            ): null
          }
          {
            data.type===2?(
                <>
                  {
                    data.list.map((item,index)=>(
                        <View className="witem" key={index}>
                          <View className="wid">{index+1}</View>
                          <Image className="img" src={item.avatarUrl} />
                          <View className="wname">{item.nickName}</View>
                          <View className="wguansu" style={{fontSize:30}}>{item.grade}</View>
                        </View>
                    ))
                  }
                </>
            ): null
          }
        </View>
      </View>
      {
        siteConfig.ads?.rank ? (
            <View className="wad">
              <CustomAd adIds={siteConfig.ads?.rank} />
            </View>
        ) : null
      }
    </>
  );
};

export default Rank;
