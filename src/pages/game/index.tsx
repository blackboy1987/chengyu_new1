import * as React from 'react';
import { View, Image,Button,getStorageSync,showModal,navigateTo,CoverView,CoverImage } from 'remax/wechat';
import {usePageEvent} from 'remax/macro';
// @ts-ignore
import className from 'classnames';
import './index.css';
import CustomAd from "@/components/CustomAd";
import {SiteConfig, UserInfo} from "@/data";
import {useState} from "react";
import {post} from "@/util/wxUtils";

const siteConfig:SiteConfig = getStorageSync("siteInfo");

const wwenti = {
  keyword:[
      '一','墙','?','隔',
  ],
  alternatives:[
      '强','抢','抢','呛'
  ]
}
const text = '强';
export const Game = () => {
  const [wtanchuguanka,setWtanchuguanka] = useState<boolean>(false);
  const [userInfo,setUserInfo] = useState<UserInfo>({});

  const get=(level?:number)=>{
    post("chengyu/get",{level:level?level:''},data=>{
      console.log(data);
    })
  }

  usePageEvent("onLoad",()=>{
    get();
  })


  const judge= (result: string)=>{
    /**
     * 1. 判断金币够不够，不够提示体力不足，够进入第2步
     * 2. 判断回答正不正确。
     */
    showModal({
      title: "温馨提示",
      content: "您的体力已经不足，点击按钮获取更多体力",
      confirmText: "去获取",
      confirmColor: "#fd5757"
    }).then((res)=>{
      console.log("res",res);
      if(res.confirm){
        navigateTo({
          url: "/pages/jinbi/index"
        }).then();
      }
    })
  }

  /**
   * 回答正确进入下一关
   */
  const next=()=>{
    setWtanchuguanka(false);
  }

  /**
   * 分享
   */
  usePageEvent('onShareAppMessage',()=>{
    return {
      title: '[微信红包] 答题兑现金，分分钟变土豪',
      path: "/pages/index/index?parentId="+userInfo.id,
      imageUrl: 'tu',
    }
  })

  return (
    <>
      <View className="game">
        <View className="menus">
          <View className="menu menu-power">
            <View className="menu-left">
              <View className="menu-text menu-power-title">闯关体力</View>
              <View className="menu-text menu-power-num">123</View>
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
              <view className="menu-text menu-money-num">134.4</view>
            </View>
            <View className="menu-right">
              <View className="menu-btn menu-btn-money">
                <View className="menu-btn-money menu-btn-text">兑换</View>
              </View>
            </View>
          </View>
        </View>
        <View className="wchengyu">
          <View className="title">第 123 关</View>
          <View className="chenyubox">
            {
              wwenti.keyword.map((item,index)=>(<View className="wchengyuitem" key={index}>{item}</View>))
            }
          </View>
        </View>
        <View className="wxuanxiang">
          {
            wwenti.alternatives.map((item,index)=>(<View className={className('wopt',text===item?'werr':'')} key={index} onClick={()=>{
              judge(item);
            }}>{item}</View>))
          }
        </View>
        <View className="wshare">
          <Button className="wbangzhu" openType="share">求助好友</Button>
        </View>
        <View className="wad">
          <CustomAd adIds={siteConfig.ads?.game} />
        </View>
      </View>
      {
        wtanchuguanka ? (
            <CoverView className="wbox" style={{zIndex: 1000}}>
              <CoverView className="wsuccess">
                <CoverView className="wsuccessbtn">
                  <CoverImage className="img" src="/images/icon/detail/correct.png" />
                </CoverView>
                <CoverView className="wtitle">恭喜闯关成功</CoverView>
                <CoverView className="wcon">连续答题有机会获得红包</CoverView>
                <CoverView onClick={()=>next()} className="wbtn">进入下一关</CoverView>
              </CoverView>

            </CoverView>
        ) : null
      }


    </>
  );
};

export default Game;
