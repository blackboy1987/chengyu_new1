import {MenuButtonBoundingClientRect, SystemInfo} from "@/data";
import {request,showLoading,showToast,hideLoading,login} from 'remax/wechat';
import {constants} from "@/util/constants";

/**
 * 获取菜单按钮（右上角胶囊按钮）的布局位置信息。坐标信息以屏幕左上角为原点。
 */
export const getMenuButtonBoundingClientRect = (): MenuButtonBoundingClientRect =>{
    return wx.getMenuButtonBoundingClientRect();
}

export const getSystemInfo = (): SystemInfo =>{
    return wx.getSystemInfoSync();
}

export const getStorage = (key: string) =>{
    if(!key){
        return null;
    }
    return wx.getStorageSync(key);
}

export const setStorage = (key: string, value: any) =>{
   wx.setStorageSync(key,value);
}

export const themeMode=() =>{
    const themeMode = getStorage("themeMode");
    if(themeMode){
        return themeMode;
    }
    return "white";
}

export const post = (url:string,data:{[key:string]:any},callback:(response:any)=>void) =>{
    showLoading({
        title:'加载中',
        mask: true,
    })
    request({
        url:url.indexOf('http')===0?url:constants.baseUrl+url,
        header: {
            "Content-Type": "application/x-www-form-urlencoded",
            "token":getStorage("token"),
            "appCode":constants.appCode,
            "appToken":constants.appToken,
        },
        data,
        method: 'POST',
    }).then((response)=>{
        if(response.statusCode>=200&&response.statusCode<300){
            const {data} = response;
            if(data.code===0){
                callback&&callback(data.data);
                hideLoading();
            }else{
                showToast({
                    title: data.msg,
                    icon: 'none',
                    image: '/images/error.png',
                    duration: 5000,
                    mask: true
                })
                hideLoading();
            }
        }else {showToast({
                title: data.msg,
                icon: 'none',
                image: '/images/error.png',
                duration: 5000,
                mask: true
            });
            hideLoading();
        }

    }).catch((err)=>{
        hideLoading();
    })
}

export const userLogin=(callback?:(res:any)=>void )=>{
    login().then(res=>{
        if(res.code){
            post("login",{code:res.code},data=>{
                if(callback){
                    callback(data);
                }
                if(data.userInfo){
                    setStorage("userInfo",data.userInfo);
                }
                if(data.token){
                    setStorage('token',data.token);
                }
            })
        }
    })
}

export const getUserInfo=(callback?:(res:any)=>void)=>{
    post("userInfo",{},data=>{
        if(callback){
            callback(data);
        }
        if(data.userInfo){
            setStorage("userInfo",data.userInfo);
        }
        if(data.token){
            setStorage('token',data.token);
        }
    })
}

export const siteInfo=(callback?:(res:any)=>void )=>{
    post("site",{},data=>{
        setStorage("siteInfo",data);
        if(callback){
            callback(data);
        }
    })
}

export const createRewardedVideoAd=(adUnitId:string,callback:{
    onLoad?:()=>void;
    onError?:(err:any)=>void;
    onClose?:(res:any)=>void;
}):any=>{
    console.log(adUnitId);
// 在页面onLoad回调事件中创建激励视频广告实例
    if (wx.createRewardedVideoAd) {
        const videoAd = wx.createRewardedVideoAd({adUnitId})
        videoAd.onLoad(() => callback.onLoad&&callback.onLoad());
        videoAd.onError((err:any) => callback.onError&&callback.onError(err));
        videoAd.onClose((res:any) => callback.onClose&&callback.onClose(res));
        return videoAd;
    }
    return null;
}

export const rewardedVideoAdShow=(rewardedVideoAd: any)=>{
    if (rewardedVideoAd) {
        rewardedVideoAd.show().catch(() => {
            // 失败重试
            rewardedVideoAd.load()
                .then(() => rewardedVideoAd.show())
                .catch((err: any) => {
                    console.log('激励视频 广告显示失败', err)
                })
        })
    }
}

export const createInterstitialAd=(adUnitId:string,callback:{
    onLoad?:()=>void;
    onError?:(err:any)=>void;
    onClose?:(res:any)=>void;
}): WechatMiniprogram.InterstitialAd| null=>{
// 在页面onLoad回调事件中创建激励视频广告实例
    if (wx.createInterstitialAd) {
        const interstitialAd = wx.createRewardedVideoAd({adUnitId })
        interstitialAd.onLoad(() => callback.onLoad&&callback.onLoad());
        interstitialAd.onError((err:any) => callback.onError&&callback.onError(err));
        interstitialAd.onClose((res:any) => callback.onClose&&callback.onClose(res));
        return interstitialAd;
    }
    return null;
};

export const interstitialAdShow = (interstitialAd: WechatMiniprogram.InterstitialAd) =>{
    // 在适合的场景显示插屏广告
    if (interstitialAd) {
        interstitialAd.show().catch((err:any) => {
            console.log('插屏 广告显示失败', err)
        })
    }
}