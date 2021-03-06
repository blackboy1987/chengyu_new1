import * as React from 'react';
import {
  View,
  Image,
  Button,
  Text,
  getStorageSync,
  setStorageSync,
  createInterstitialAd,
  createRewardedVideoAd,
    OpenData
} from 'remax/wechat';
import {usePageEvent} from 'remax/macro';
// @ts-ignore
import className from 'classnames';
import './index.css';
import {useState} from "react";
import CustomAd from "@/components/CustomAd";
import {SiteConfig, UserInfo} from "@/data";
import {defaultSiteConfig, defaultUserInfo} from "@/util/constants";
import {getUserInfo, post, siteInfo} from "@/util/wxUtils";

let rewardedVideoAd: WechatMiniprogram.RewardedVideoAd;
let interstitialAd: WechatMiniprogram.InterstitialAd;
let timer:NodeJS.Timeout;
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
  const [userInfo,setUserInfo]  = useState<UserInfo>(defaultUserInfo);
  const [siteConfig,setSiteConfig]  = useState<SiteConfig>(defaultSiteConfig);


  const reward = (type: string) =>{
    post("chengyu/reward",{
      type
    },data=>{
      getUserInfo(data=>setUserInfo(data));
    })
  }

  const interstitialAdCreate = (adUnitId:string) =>{
    if(!interstitialAd){
      interstitialAd = createInterstitialAd({
        adUnitId,
      });
      interstitialAd.onLoad((e)=>{
        console.log("onLoad",e);
      });
      interstitialAd.onClose((e)=>{
        console.log("onClose",e);
      });
      interstitialAd.onError((e)=>{
        console.log("onError",e);
      });
    }
  }

  const interstitialAdShow=()=>{
    if(interstitialAd){
      interstitialAd.show().then((e)=>{
        console.log("show",e);
      })
    }
  }

  const rewardedVideoAdCreate = (adUnitId:string) =>{
    if(!rewardedVideoAd){
      rewardedVideoAd = createRewardedVideoAd({
        adUnitId,
      });
      rewardedVideoAd.onLoad((e)=>{
        console.log("onLoad",e);
      });
      rewardedVideoAd.onClose((e)=>{
        console.log("onClose",e);
        if(e.isEnded){
          // 广告看完奖励积分
          reward('reviewRewardedVideoAd');
        }else{

        }
      });
      rewardedVideoAd.onError((e)=>{
        console.log("onError",e);
      });
    }
  }

  const rewardedVideoAdShow=()=>{
    console.log("rewardedVideoAd",rewardedVideoAd);
    if(rewardedVideoAd){
      rewardedVideoAd.show().catch(() => {
        rewardedVideoAd.load()
            .then(() => rewardedVideoAd.show())
            .catch(err => {
              console.log('激励视频 广告显示失败',err)
            })
      })
    }
  }


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
    // 用户信息
    getUserInfo(data=>setUserInfo(data));
    siteInfo(data=>{
      setSiteConfig(data);
      if(data.ads?.index.interstitialAdId){
        interstitialAdCreate(data.ads.index.interstitialAdId);
      }
      if(data.ads?.index.rewardedVideoAdId){
        rewardedVideoAdCreate(data.ads.index.rewardedVideoAdId);
      }
    });
  });

  usePageEvent('onShow',()=>{
    timer = setTimeout(()=>{
      interstitialAdShow();
    },15e3);
  })

  usePageEvent('onHide',()=>{
    console.log("onHide");
  })

  return (
    <>
      <View className="main">
        <View className="user">
          {
            userInfo.avatarUrl ? (
                <Image className="user-avatar" src={userInfo.avatarUrl} />
            ) : (
                <View className='user-avatar1'>
                  <OpenData lang='zh_CN' type='userAvatarUrl' />
                </View>
            )
          }
          {
            userInfo.nickName ? (
                <View className="user-nickname">{userInfo.nickName}</View>
            ) : (
                <View className="user-nickname">{userInfo.nickName}</View>
            )
          }

          <View className="user-power">体力：<Text>{userInfo.point}</Text></View>
        </View>
        <View className="jinbi-box">
          {
            showVideoAdButton&&time<=0 ? (
                <Button className="wshiping" disabled={time>0} onClick={rewardedVideoAdShow}> 观看视频每次奖励 {siteConfig.config.perVideoGold} 体力</Button>
            ) : null
          }
          {
            time>0 ? (
                <View className="wshiping">视频正在赶来的路上：{time}秒</View>
            ) : null
          }
          <View className="qiandao" onClick={()=>reward("sign")}>签到领取{siteConfig.config.signPoint}体力</View>
          <Button className="wyaoqing w_button" openType="share"> {siteConfig.config.inviteButtonText}</Button>
          <View className="wuser">
            <View className="wusertitle">{siteConfig.config.inviteText}</View>
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
        siteConfig.ads?.jinbi ? (
            <View className="wad">
              <CustomAd adIds={siteConfig.ads?.jinbi} />
            </View>
        ) : null
      }


    </>
  );
};

export default JinBi;
