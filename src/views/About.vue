<template>
  <div class="about">
    <h2 class="name">我们都队</h2>
    <br />
    <div class="box">
      <div class="self" v-for="item in items" :key="item.text">
        <b-img
          rounded="circle"
          :src="item.src"
          fluid
          alt="Responsive image"
          class="pic"
        ></b-img>
        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
        <div
          class="card content"
          :value="item.text"
          plaintext
          style="width:400px"
        >
          <h5 style="color:#5cacee">{{ item.job }}.{{ item.name }}</h5>
          <p>座右铭：{{ item.say }}</p>
          负责的任务：
          <ul class="uul">
            <li v-for="(work, index) in item.works" :key="index">{{ work }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'About',
  data() {
    return {
      items: [
        {
          name: "吴泽群",
          job: "前端",
          say: "Talk is cheap, show me the salary.",
          text: "111111",
          works: [
            "资产页面的增删改查",
            "日志查看页面",
            "API文档编写",
            "数据库设计",
            "响应式的实现",
            "性能优化",
          ],
          src: require("../assets/img/about/wzq.jpg"),
        },
        {
          name: "郭佳鑫",
          job: "后端",
          say: "优雅永不过时",
          works: [
            "框架的搭建、jar包的管理",
            "日志接收任务的实现，并使用异步任务优化性能",
            "日志导出Excel表格",
            "日志查询功能以及使用Redis记录每秒插入的日志",
            "代码merge以及优化SQL",
          ],
          text: "888888",
          src: require("../assets/img/about/gjx.jpg"),
        },
        {
          name: "张媛媛",
          job: "前端",
          say: "立志成为靠谱成年女性",
          works: [
            "统计页面数据的可视化展示",
            "配置页面的实现",
            "导航栏的实现",
            "页面的部分优化",
          ],
          text: ``,
          src: require("../assets/img/about/zyy.png"),
        },
        {
          name: "张浩",
          job: "后端",
          say: "慢慢来，会很快~ ",
          works: [
            "Kafka的部署与优化",
            "客户端随机日志的高并发数据传输",
            "服务端日志的分批数据接收与存储",
            "利用AOP方式实现大数据的处理与拦截",
          ],
          text: "333333",
          src: require("../assets/img/about/zh.jpg"),
        },
        {
          name: "黄园媛",
          job: "测试",
          say: "故天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为，所以动心忍性，曾益其所不能。",
          works: ["责项目的测试工作，包括冒烟测试、功能测试等"],
          text: "666666",
          src: require("../assets/img/about/hyy.png"),
        },
        {
          name: "张曦月",
          job: "后端",
          say: "志当存高远",
          works: ["SM4加密解密功能的实现"],
          text: "777777",
          src: require("../assets/img/about/zxy.png"),
        },

        {
          name: "曾璇奇",
          job: "后端",
          say: "让子弹飞一会",
          works: [
            "恶意IP防火墙拦截功能",
            "资产增删改查的实现",
            "日志接收服务的IP配置",
          ],
          text: "44444",
          src: require("../assets/img/about/zxq.png"),
        },
        {
          name: "刘庚辰",
          job: "后端",
          say: "不积跬步无以至千里",
          works: [
            "数据库实现和维护与部分接口的编写",
            "需求文档以及概要设计的编写",
          ],
          text: "555555",
          src: require("../assets/img/about/lgc.jpg"),
        },
      ],
    }
  },
}
</script>
<style scoped>
.about {
  margin-top: 80px;
}
.box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.name {
  color: cornflowerblue;
}
.self {
  display: flex;
  margin: 2vh 2vw 0 0;
}
.pic {
  width: 15vw;
  height: 15vw;
}
.text {
  width: 80vw;
  height: auto;
}
.card {
  background-color: #f0f8ff;
  outline: none;
}
.content {
  text-align: left;
  padding: 1vh 2vw 1vh 2vw;
}
</style>
