import {UserInfo} from "@/data";

export const constants = {
    baseUrl:'http://localhost:9000/api/',
    appCode: 'IEC3OARSJZAB4SG3TU',
    appToken:'fcb1123588b8c311c661e2e2f6bff63195fb1932809403507e67044dfadaf741',
    siteInfo:{
        name:'天天成语闯关',
        bannerAdId:'adunit-5d392fcce4af1bf9',
        rewardedVideoAdId:'adunit-18e594b5d4fabe3c',
        interstitialAdId:'adunit-f83096676f1a1054',
        videoAdId:'adunit-1f98f08e663fa1b7',
        videoFrontAdId:'adunit-1eefa901f0b541e0',
        gridAdId:'adunit-177ef912ea58ca3e',
        nativeAdId:'adunit-4088233b68c4f746',
        per_video_gold:2000,
        data:{
            qiandao:200,
        },
        invite_button_text:'邀请新新用户领2000金币',
        invite_text:'邀请领红包好友',
    }
}

export const defaultUserInfo:UserInfo = {
    id: 0,
    token: '',
    balance:0,
    amount:0,
    point:300,
    avatarUrl:'',
    rankName:'',
    nickName:'',
    isAuth:'',
    user_id:'',
    level:0,
}

export const defaultSiteConfig = {
    name:'',
    config:{
        levelPoint:100,
        signPoint: 300,
        perVideoGold: 1000,
        inviteButtonText:'邀请新用户领取2000金币',
        inviteText:'邀请领红包好友',
    }
}