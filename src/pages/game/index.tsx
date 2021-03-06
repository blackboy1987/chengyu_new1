import * as React from 'react';
import {
  View,
  Image,
  Button,
  getStorageSync,
  showModal,
  navigateTo,
  CoverView,
  CoverImage,
  setStorageSync
} from 'remax/wechat';
import {usePageEvent} from 'remax/macro';
// @ts-ignore
import className from 'classnames';
import './index.css';
import CustomAd from "@/components/CustomAd";
import {Idiom, SiteConfig, UserInfo} from "@/data";
import {useState} from "react";
import {getUserInfo, post} from "@/util/wxUtils";
import {defaultUserInfo} from "@/util/constants";

const siteConfig:SiteConfig = getStorageSync("siteInfo");
const adv = {
  status:true,
  data:[],
}
const wtanchuhongbao = true;
const whongbao = {
  openStatus:true,
  balance:2.2,
}
export const Game = () => {
  const [wtanchuguanka,setWtanchuguanka] = useState<boolean>(false);
  const [userInfo,setUserInfo] = useState<UserInfo>(defaultUserInfo);
  const [idiom,setIdiom] = useState<Idiom>({
    level:0,
    answers:[],
    words:[],
    position:0,
  });
  const [text,setText] = useState<string>('');

  const get=(level?:number)=>{
    post("chengyu/get",{level:level?level:''},data=>{
      setIdiom(data);
    })
  }

  usePageEvent("onLoad",()=>{
    get();
    getUserInfo((data)=>{
      setUserInfo(data);
    })
  })


  const judge= (result: string)=>{
    setText(result);
    /**
     * 1. 判断金币够不够，不够提示体力不足，够进入第2步
     * 2. 判断回答正不正确。
     */
    if(userInfo.point>siteConfig.config.levelPoint){
      let memo='';
      let continuousCount = getStorageSync('continuous') || 0;
      if(result===idiom.words[idiom.position]){
        // 回答正确。写入连对数据
        memo='回答正确';
        continuousCount +=1;
      }else{
        // 回答错误，清空连队数据
        memo='回答错误';
        continuousCount = 0;
      }
      setStorageSync('continuousCount',continuousCount);
      // 扣减积分
      post("chengyu/discount",{level:idiom.level,memo},data=>{
        // 不管回答正确还是错误，直接跳转到下一关
      });
    }else{
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
console.log(idiom);
  return (
    <>
      <View className="game">
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
              <view className="menu-text menu-money-num">{userInfo.balance}</view>
            </View>
            <View className="menu-right">
              <View className="menu-btn menu-btn-money">
                <View className="menu-btn-money menu-btn-text">兑换</View>
              </View>
            </View>
          </View>
        </View>
        <View className="wchengyu">
          <View className="title">第 {idiom.level} 关</View>
          <View className="chenyubox">
            {
              (idiom.words||[]).map((item,index)=>(<View className="wchengyuitem" key={index}>{index===idiom.position?'?':item}</View>))
            }
          </View>
        </View>
        <View className="wxuanxiang">
          {
            (idiom.answers||[]).map((item,index)=>(<View className={className('wopt',text===item?'werr':'')} key={index} onClick={()=>{
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
              {
                adv.status ? (
                    <CoverView className="links">
                      {
                        adv.data.map((item:{
                          appid:string;
                          image:string;
                          name: string;
                        })=>(
                            <CoverView key={item.appid}>
                              <CoverImage className="avatar" src={item.image} />
                              <CoverView className="name">{item.name}</CoverView>
                            </CoverView>
                        ))
                      }

                    </CoverView>
                ) : null
              }
            </CoverView>
        ) : null
      }
      {
        wtanchuhongbao ? (
            <CoverView className="wbox" style={{zIndex:10000}}>
              <CoverView className="whongbao">
                <CoverImage className="wbgimg" src="/images/icon/redbag.png" />
                <CoverView className="wtitle">恭喜</CoverView>
                <CoverView className="wcon">您获得一个现金红包</CoverView>
                <CoverView className="wopenhongbao">
                  {
                    whongbao.openStatus ? (
                        <CoverView className="wshowhongbao">{whongbao.balance} 元</CoverView>
                    ) : (
                        <CoverImage  className="whongbaoimg" src="/images/icon/open.png" />
                    )
                  }
                </CoverView>
                <CoverView className="wmiaoshu">该红包仅可用于兑换商品</CoverView>
              </CoverView>
              <CoverView className="wclose">
                <CoverImage className="wcloseimg" src="/images/icon/detail/poster/close.png" />
              </CoverView>
            </CoverView>
        ) : null
      }



    </>
  );
};

export default Game;
