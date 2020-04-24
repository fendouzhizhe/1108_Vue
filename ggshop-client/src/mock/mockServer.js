//引入mock
import Mock from "mockjs";

//引入首页大轮播图数据
import banners from "./banners.json";
//引入楼层数据
import floors from "./floors.json";

//定义banners数据
Mock.mock("/mock/banners", {
  code: 200,
  message: "成功",
  data: banners,
});
//定义floors数据
Mock.mock("/mock/floors", {
  code: 200,
  message: "成功",
  data: floors,
});
