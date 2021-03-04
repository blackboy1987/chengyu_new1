import { AppConfig } from "remax/wechat";

const config: AppConfig = {
  pages: [
    'pages/game/index',
    'pages/index/index',
    'pages/jinbi/index',
    'pages/more/index',
    'pages/duihuan/index',
    'pages/rank/index',
    'pages/help/index',
  ],
  window: {
    backgroundColor: "#ffd541",
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#766ed7",
    navigationBarTitleText: "贝贝成语答题",
    navigationBarTextStyle: "white"
  }
};

export default config;
