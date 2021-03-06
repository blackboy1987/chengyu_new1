import * as React from 'react';
import { View, Text, Image,OpenData,ScrollView,showLoading,hideLoading,navigateTo,createInterstitialAd,createRewardedVideoAd } from 'remax/wechat';
import {usePageEvent} from 'remax/macro';
import './index.css';
import {siteInfo, userLogin} from "@/util/wxUtils";
import {useState} from "react";
import {SiteConfig, UserInfo} from "@/data";
import CustomAd from "@/components/CustomAd";

const rewardList = [
  {
    id:1,
    name:'哈哈',
    balance:1.23,
  },
  {
    id:2,
    name:'哈哈2',
    balance:123,
  },
  {
    id:3,
    name:'哈哈3',
    balance:12.35,
  }
];

const adv = {
  status: true,
  data:[
    {
      id:1,
      image:'https://alaolu.cn/content/templates/meta/Static/images/logo.png',
      name:'哈哈'
    },
    {
      id:2,
      image:'https://alaolu.cn/content/templates/meta/Static/images/logo.png',
      name:'哈哈'
    },
    {
      id:3,
      image:'https://alaolu.cn/content/templates/meta/Static/images/logo.png',
      name:'哈哈'
    },
    {
      id:4,
      image:'https://alaolu.cn/content/templates/meta/Static/images/logo.png',
      name:'哈哈'
    },
    {
      id:5,
      image:'https://alaolu.cn/content/templates/meta/Static/images/logo.png',
      name:'哈哈'
    },
    {
      id:6,
      image:'https://alaolu.cn/content/templates/meta/Static/images/logo.png',
      name:'哈哈'
    },
    {
      id:7,
      image:'https://alaolu.cn/content/templates/meta/Static/images/logo.png',
      name:'哈哈'
    },
  ]
};
const setting = {
  gonggao:{
    status: true,
    info:'我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容我是公告内容'
  }
}
const gonggao= false;
const qiandao = false;
let rewardedVideoAd: WechatMiniprogram.RewardedVideoAd;
let interstitialAd: WechatMiniprogram.InterstitialAd;
let timer:NodeJS.Timeout;


export default () => {
  const [userInfo,setUserInfo] = useState<UserInfo>({});
  const [siteConfig,setSiteConfig] = useState<SiteConfig>({});
  const [guize,setGuize] = useState<boolean>(false);


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

  usePageEvent("onLoad",()=>{
    showLoading({
      title:'数据初始化中...'
    }).then();
    siteInfo(data=>{
      setSiteConfig(data);
      if(data.ads?.index.interstitialAdId){
        interstitialAdCreate(data.ads.index.interstitialAdId);
      }
      if(data.ads?.index.rewardedVideoAdId){
        rewardedVideoAdCreate(data.ads.index.rewardedVideoAdId);
      }
    })
    userLogin(data=>{
      setUserInfo(data.userInfo)
      hideLoading().then();
    });
  });

  usePageEvent('onShow',()=>{
    timer = setTimeout(()=>{
      interstitialAdShow();
    },15e3);
  })


  return (
    <>
      <View className="w">
        <View className="info">
          <View className="uinfo">
            <View className="avatar">
              <OpenData lang='zh_CN' type='userAvatarUrl' />
            </View>
            <View className="detail">
              <View className="simple">
                <View className="nickname">
                  <OpenData lang='zh_CN' type='userNickName' />
                </View>
                <View className="level">已闯关： {userInfo.level} 道</View>
              </View>
            </View>
          </View>
        </View>
        <View className="wwenti" onClick={()=>navigateTo({url:'/pages/help/index'})}>
          <View>帮助</View>
        </View>
        <View className="rule" onClick={()=>setGuize(true)}>
          <Text>规则</Text>
        </View>
        <View className="broadbox">
          <View className="broadcast">
            <Image className="icon" src="/images/icon/gg.png" />
            <View className="itemlist">
              {
                rewardList.map(item=>(
                    <View className="item" key={item.id}>
                      恭喜 {item.name} 成功兑换 {item.balance} 元红包
                    </View>
                ))
              }
            </View>
          </View>
        </View>
        <View className="ranking">
          <Image className="ranking-icon" src="/images/icon/index/rank.png" />
          <View className="ranking-text">排行</View>
        </View>
        <View className="menus">
          <View className="menu menu-power">
            <View className="menu-left">
              <View className="menu-text menu-power-title">闯关体力</View>
              <View className="menu-text menu-power-num">{userInfo.point}</View>
            </View>
            <View className="menu-right">
              <View className="menu-btn menu-btn-power">
                <View className="menu-btn-text">免费领取</View>
              </View>
              <View className="menu-redbag">
                <Image src="/images/icon/index/redbagindex.png" />
              </View>
            </View>
          </View>
          <View className="menu menu-money">
            <View className="menu-left">
              <View className="menu-text menu-money-title">红包余额</View>
              <View className="menu-text menu-money-num">{userInfo.balance}</View>
            </View>
            <View className="menu-right">
              <View className="menu-btn menu-btn-money">
                <View className="menu-btn-money menu-btn-text">兑换</View>
              </View>
            </View>
          </View>
        </View>
        <View className="wchuangguan" onClick={()=>{
          clearTimeout(timer);
          navigateTo({url: '/pages/game/index'}).then();
        }}>开始猜成语</View>
        <CustomAd adIds={siteConfig.ads?.index} />
        {
          adv.status&&adv.data.length>0? (
              <View>
                {
                  adv.status ? (
                      <ScrollView scrollX className="apps">
                        {
                          adv.data.map(item=>(
                              <View className="app"key={item.id}>
                                <Image className="app-icon" src={item.image} />
                                <View className="app-title">{item.name}</View>
                              </View>
                          ))
                        }
                      </ScrollView>
                  ) : null
                }
              </View>
          ) : null
        }
      </View>
      {
        guize ? (
            <View className="wbox">
              <View className="wclose" onClick={()=>setGuize(false)} />
              <View className="wguize">
                <View className="wboxtitle">规则</View>
                <View className="wcon">1.成语答题每答一题，消耗100体力，获取体力可到免费体力获取。
                  2.答题随机关卡可获得红包奖励，红包可兑换物品。
                </View>
                <View className="wbtn" onClick={()=>setGuize(false)}>我知道了</View>
              </View>
            </View>
        ) : null
      }
      {
        qiandao ? (
            <View className="wbox">
              <View  className="wbtn">返回答题</View>
            </View>
        ) : null
      }
      {
        setting.gonggao.status&&gonggao ? (
            <View className="wbox">
              <View className="wclose" />
              <View className="wguize">
                <View className="wboxtitle">公告</View>
                <View className="wcon">{setting.gonggao.info}</View>
                <View className="wbtn">我知道了</View>
              </View>
            </View>
        ) : null
      }
    </>
  );
};
