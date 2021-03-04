import * as React from 'react';
import {View, Image, Button, Ad, getStorageSync} from 'remax/wechat';
// @ts-ignore
import className from 'classnames';
import './index.css';
import {SiteConfig} from "@/data";
import CustomAd from "@/components/CustomAd";

const rank = 1;
const wrank = [
  {
    id:1,
    headimgurl:'http://p4.qhimg.com/t01fd9ddeb47975ad37.jpg?&w=96&h=54&rs=2&qlt=100',
    nickname:'昵称',
    grade:12,
    level:123,
  },
  {
    id:1,
    headimgurl:'http://p4.qhimg.com/t01fd9ddeb47975ad37.jpg?&w=96&h=54&rs=2&qlt=100',
    nickname:'昵称',
    grade:12,
    level:123,
  },
  {
    id:1,
    headimgurl:'http://p4.qhimg.com/t01fd9ddeb47975ad37.jpg?&w=96&h=54&rs=2&qlt=100',
    nickname:'昵称',
    grade:12,
    level:123,
  },
  {
    id:1,
    headimgurl:'http://p4.qhimg.com/t01fd9ddeb47975ad37.jpg?&w=96&h=54&rs=2&qlt=100',
    nickname:'昵称',
    grade:12,
    level:123,
  },
  {
    id:1,
    headimgurl:'http://p4.qhimg.com/t01fd9ddeb47975ad37.jpg?&w=96&h=54&rs=2&qlt=100',
    nickname:'昵称',
    grade:12,
    level:123,
  },
  {
    id:1,
    headimgurl:'http://p4.qhimg.com/t01fd9ddeb47975ad37.jpg?&w=96&h=54&rs=2&qlt=100',
    nickname:'昵称',
    grade:12,
    level:123,
  },
  {
    id:1,
    headimgurl:'http://p4.qhimg.com/t01fd9ddeb47975ad37.jpg?&w=96&h=54&rs=2&qlt=100',
    nickname:'昵称',
    grade:12,
    level:123,
  },
  {
    id:1,
    headimgurl:'http://p4.qhimg.com/t01fd9ddeb47975ad37.jpg?&w=96&h=54&rs=2&qlt=100',
    nickname:'昵称',
    grade:12,
    level:123,
  },
  {
    id:1,
    headimgurl:'http://p4.qhimg.com/t01fd9ddeb47975ad37.jpg?&w=96&h=54&rs=2&qlt=100',
    nickname:'昵称',
    grade:12,
    level:123,
  },
  {
    id:1,
    headimgurl:'http://p4.qhimg.com/t01fd9ddeb47975ad37.jpg?&w=96&h=54&rs=2&qlt=100',
    nickname:'昵称',
    grade:12,
    level:123,
  },
  {
    id:1,
    headimgurl:'http://p4.qhimg.com/t01fd9ddeb47975ad37.jpg?&w=96&h=54&rs=2&qlt=100',
    nickname:'昵称',
    grade:12,
    level:123,
  },
  {
    id:1,
    headimgurl:'http://p4.qhimg.com/t01fd9ddeb47975ad37.jpg?&w=96&h=54&rs=2&qlt=100',
    nickname:'昵称',
    grade:12,
    level:123,
  },
  {
    id:1,
    headimgurl:'http://p4.qhimg.com/t01fd9ddeb47975ad37.jpg?&w=96&h=54&rs=2&qlt=100',
    nickname:'昵称',
    grade:12,
    level:123,
  },
  {
    id:1,
    headimgurl:'http://p4.qhimg.com/t01fd9ddeb47975ad37.jpg?&w=96&h=54&rs=2&qlt=100',
    nickname:'昵称',
    grade:12,
    level:123,
  },
  {
    id:1,
    headimgurl:'http://p4.qhimg.com/t01fd9ddeb47975ad37.jpg?&w=96&h=54&rs=2&qlt=100',
    nickname:'昵称',
    grade:12,
    level:123,
  },
  {
    id:1,
    headimgurl:'http://p4.qhimg.com/t01fd9ddeb47975ad37.jpg?&w=96&h=54&rs=2&qlt=100',
    nickname:'昵称',
    grade:12,
    level:123,
  },
  {
    id:1,
    headimgurl:'http://p4.qhimg.com/t01fd9ddeb47975ad37.jpg?&w=96&h=54&rs=2&qlt=100',
    nickname:'昵称',
    grade:12,
    level:123,
  },
  {
    id:1,
    headimgurl:'http://p4.qhimg.com/t01fd9ddeb47975ad37.jpg?&w=96&h=54&rs=2&qlt=100',
    nickname:'昵称',
    grade:12,
    level:123,
  },
  {
    id:1,
    headimgurl:'http://p4.qhimg.com/t01fd9ddeb47975ad37.jpg?&w=96&h=54&rs=2&qlt=100',
    nickname:'昵称',
    grade:12,
    level:123,
  },
  {
    id:1,
    headimgurl:'http://p4.qhimg.com/t01fd9ddeb47975ad37.jpg?&w=96&h=54&rs=2&qlt=100',
    nickname:'昵称',
    grade:12,
    level:123,
  },
];
const setting = {
  pg_video_unit_id:'131412'
};
const siteConfig:SiteConfig = getStorageSync("siteInfo");
export const Rank = () => {
  return (
    <>
      <View className="wpaihang">
        <View className="wtop">
          <View className="wtitle1">闯关排行榜</View>
        </View>
        <View className="wlist">
          {
            rank==1?(
                <>
                  {
                    wrank.map((item,index)=>(
                        <View className="witem" key={index}>
                          <View className="wid">{index+1}</View>
                          <Image className="img" src={item.headimgurl} />
                          <View className="wname">{item.nickname}</View>
                          <View className="wguansu">{item.level}关</View>
                        </View>
                    ))
                  }
                </>
            ): null
          }
          {
            rank===2?(
                <>
                  {
                    wrank.map((item,index)=>(
                        <View className="witem" key={index}>
                          <View className="wid">{index+1}</View>
                          <Image className="img" src={item.headimgurl} />
                          <View className="wname">{item.nickname}</View>
                          <View className="wguansu" style="font-size:30rpx">{item.grade}</View>
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
