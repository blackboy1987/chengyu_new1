import * as React from 'react';
import {View, Image, Button, Ad, Text,getStorageSync,setStorageSync} from 'remax/wechat';
import {usePageEvent} from 'remax/macro';
// @ts-ignore
import className from 'classnames';
import './index.css';
import {constants} from "@/util/constants";
import {useState} from "react";

const setting = constants.siteInfo;
const userInfo = {
  headimgurl:'',
  nickname:'haha',
  gold_num:123,
};
const time = 3;
const showVideoAdButton = true;
const wuser = [
  {
    headimgurl:'',
  },
  {
    headimgurl:'',
  },
]
const wList=[
  {},{},{},
];

export const JinBi = () => {

  const [time,setTime] = useState<number>(60);

  const flushTime=(newTime:number)=>{
    const timer = setTimeout(()=>{
      setTime(newTime-1);
      setStorageSync('time',newTime-1);
      if(newTime<=0){
        setStorageSync('time',0);
        clearTimeout(timer);
      }else{
        flushTime(newTime-1);
      }
    },1e3);
  }

  usePageEvent('onLoad',()=>{
    const newTimer = getStorageSync("time")||60;
    flushTime(newTimer);
  });


  return (
    <>
      <View className="main">
        <View className="user">
          <Image className="user-avatar" src={userInfo.headimgurl} />
          <View className="user-nickname">{userInfo.nickname}</View>
          <View className="user-power">体力：<Text>{userInfo.gold_num}</Text></View>
        </View>
        <View className="jinbi-box">
          {
            showVideoAdButton&&time<=0 ? (
                <Button className="wshiping" disabled={time>0}> 观看视频每次奖励 {setting.per_video_gold} 体力</Button>
            ) : null
          }
          {
            time>0 ? (
                <View className="wshiping">视频正在赶来的路上：{time}秒</View>
            ) : null
          }
          <View className="qiandao">签到领取{setting.data.qiandao}体力</View>
          <Button className="wyaoqing w_button" openType="share"> {setting.invite_button_text}</Button>
          <View className="wuser">
            <View className="wusertitle">{setting.invite_text}</View>
            <View className="w365-list">
              {
                wuser.length>0?(
                    <>
                      {
                        wuser.map((item,index)=>(
                            <View className="wlistitem" key={index}>
                              <Image className="wavatar" src={item.headimgurl} />
                            </View>
                        ))
                      }
                    </>
                ): null
              }
              {
                wList.map((item,index)=>(
                    <View className="wlistitem" key={index}>
                      <Image className="img" src="/images/icon/invite/fans.png" />
                    </View>
                ))
              }
              <View className="wlistitem">
                <Image className="img" src="/images/icon/invite/more.png" />
              </View>
            </View>
          </View>
        </View>
      </View>
      {
        setting.videoAdId ? (
            <View className="wad">
              <Ad adTheme="white" adType="video" unitId={setting.videoAdId} />
            </View>
        ) : null
      }


    </>
  );
};

export default JinBi;
