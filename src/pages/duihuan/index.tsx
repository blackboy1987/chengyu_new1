import * as React from 'react';
import {View, Image, Button, Text, getStorageSync} from 'remax/wechat';
// @ts-ignore
import className from 'classnames';
import './index.css';
import CustomAd from "@/components/CustomAd";
import {SiteConfig} from "@/data";

const setting = {
  unit_id:'123456'
}
const wduihuan = [
  {
    id:1,
    image:'http://msn-img-nos.yiyouliao.com/inforec-20210303-ffdb9569dd4fb863a3c4eb6e2bd8376e.jpg',
    name:'1341',
    price:12,
    market_price:22,
    free_count:12,
    count:345,
  },
  {
    id:1,
    image:'http://msn-img-nos.yiyouliao.com/inforec-20210303-ffdb9569dd4fb863a3c4eb6e2bd8376e.jpg',
    name:'1341',
    price:12,
    market_price:22,
    free_count:12,
    count:345,
  },
  {
    id:1,
    image:'http://msn-img-nos.yiyouliao.com/inforec-20210303-ffdb9569dd4fb863a3c4eb6e2bd8376e.jpg',
    name:'1341',
    price:12,
    market_price:22,
    free_count:12,
    count:345,
  },
  {
    id:1,
    image:'http://msn-img-nos.yiyouliao.com/inforec-20210303-ffdb9569dd4fb863a3c4eb6e2bd8376e.jpg',
    name:'1341',
    price:12,
    market_price:22,
    free_count:12,
    count:345,
  },
  {
    id:1,
    image:'http://msn-img-nos.yiyouliao.com/inforec-20210303-ffdb9569dd4fb863a3c4eb6e2bd8376e.jpg',
    name:'1341',
    price:12,
    market_price:22,
    free_count:12,
    count:345,
  },
  {
    id:1,
    image:'http://msn-img-nos.yiyouliao.com/inforec-20210303-ffdb9569dd4fb863a3c4eb6e2bd8376e.jpg',
    name:'1341',
    price:12,
    market_price:22,
    free_count:12,
    count:345,
  },
  {
    id:1,
    image:'http://msn-img-nos.yiyouliao.com/inforec-20210303-ffdb9569dd4fb863a3c4eb6e2bd8376e.jpg',
    name:'1341',
    price:12,
    market_price:22,
    free_count:12,
    count:345,
  },
  {
    id:1,
    image:'http://msn-img-nos.yiyouliao.com/inforec-20210303-ffdb9569dd4fb863a3c4eb6e2bd8376e.jpg',
    name:'1341',
    price:12,
    market_price:22,
    free_count:12,
    count:345,
  },
  {
    id:1,
    image:'http://msn-img-nos.yiyouliao.com/inforec-20210303-ffdb9569dd4fb863a3c4eb6e2bd8376e.jpg',
    name:'1341',
    price:12,
    market_price:22,
    free_count:12,
    count:345,
  },
  {
    id:1,
    image:'http://msn-img-nos.yiyouliao.com/inforec-20210303-ffdb9569dd4fb863a3c4eb6e2bd8376e.jpg',
    name:'1341',
    price:12,
    market_price:22,
    free_count:12,
    count:345,
  },
  {
    id:1,
    image:'http://msn-img-nos.yiyouliao.com/inforec-20210303-ffdb9569dd4fb863a3c4eb6e2bd8376e.jpg',
    name:'1341',
    price:12,
    market_price:22,
    free_count:12,
    count:345,
  },
  {
    id:1,
    image:'http://msn-img-nos.yiyouliao.com/inforec-20210303-ffdb9569dd4fb863a3c4eb6e2bd8376e.jpg',
    name:'1341',
    price:12,
    market_price:22,
    free_count:12,
    count:345,
  },
  {
    id:1,
    image:'http://msn-img-nos.yiyouliao.com/inforec-20210303-ffdb9569dd4fb863a3c4eb6e2bd8376e.jpg',
    name:'1341',
    price:12,
    market_price:22,
    free_count:12,
    count:345,
  },
  {
    id:1,
    image:'http://msn-img-nos.yiyouliao.com/inforec-20210303-ffdb9569dd4fb863a3c4eb6e2bd8376e.jpg',
    name:'134wmeiyoule1',
    price:12,
    market_price:22,
    free_count:0,
    count:345,
  },
  {
    id:1,
    image:'http://msn-img-nos.yiyouliao.com/inforec-20210303-ffdb9569dd4fb863a3c4eb6e2bd8376e.jpg',
    name:'1341',
    price:12,
    market_price:22,
    free_count:12,
    count:345,
  },
]
const siteConfig:SiteConfig = getStorageSync("siteInfo");
export const DuiHuan = () => {
  return (
    <>
      <View>
        <View className="wduihuanlist">
          {
            siteConfig.ads?.duihuan ? (
                <View style={{marginBottom:20}}>
                  <CustomAd adIds={siteConfig.ads?.duihuan} />
                </View>
            ) : null
          }
          {
            wduihuan.map((item,index)=>(
                <View className="wdiuhuanitem" key={index}>
                  <Image className="img" src={item.image} />
                  <View className="wxiangqing">
                    <View>{item.name}</View>
                    <View className="wjiage">{item.price}
                      <Text className="wrejiage">市场价：{item.market_price}</Text>
                    </View>
                    <View className="wshuliang">
                      <Text className="wslnum">剩余：{item.free_count}/{item.count}</Text>
                      <Button className="wgo" disabled={item.free_count===0}>立即兑换</Button>
                    </View>
                  </View>
                </View>
            ))
          }
        </View>
      </View>

    </>
  );
};

export default DuiHuan;
