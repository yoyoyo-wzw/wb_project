<template>
  <el-container>
    <el-aside width="200px">
      <h1 class="titleName">订单系统</h1>
      <div class="selectBox">
        <el-select
          class="selectInput"
          v-model="selectData.company"
          placeholder="请选择公司"
          size="mini"
        >
          <el-option
            v-for="item in pulldownData.companyList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <div>
          <el-tooltip effect="light" content="新建公司" placement="top">
            <i class="myicon el-icon-plus"></i>
          </el-tooltip>
          <el-tooltip effect="light" content="修改公司" placement="top">
            <i class="myicon el-icon-edit"></i>
          </el-tooltip>
          <el-tooltip effect="light" content="删除公司" placement="top">
            <i class="myicon el-icon-delete"></i>
          </el-tooltip>
        </div>
        <el-select
          class="selectInput"
          v-model="selectData.orderNumber"
          placeholder="请选择订单编号"
          size="mini"
        >
          <el-option
            v-for="item in pulldownData.orderList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select
          class="selectInput"
          v-model="selectData.orderNumber"
          placeholder="请选择订单编号"
          size="mini"
        >
          <el-option
            v-for="item in pulldownData.orderList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <el-menu
        :default-active="defaultActive"
        background-color="#333333"
        text-color="#fff"
        active-text-color="#409EFF"
        unique-opened
        router
        @select="menuSelect"
      >
        <el-submenu index="orderManage">
          <template slot="title">
            <i class="el-icon-edit-outline"></i>
            <span>{{menuData["orderManage"]}}</span>
          </template>
          <el-menu-item index="/orderManage/underway">{{
            menuData["underway"]
          }}</el-menu-item>
          <el-menu-item index="/orderManage/finished">{{
            menuData["finished"]
          }}</el-menu-item>
        </el-submenu>
        <el-menu-item index="/companyManage">
          <i class="el-icon-s-home"></i>
          <span slot="title">{{ menuData["companyManage"] }}</span>
        </el-menu-item>
        <el-menu-item index="/proTotal">
          <i class="el-icon-shopping-cart-full"></i>
          <span slot="title">{{ menuData["proTotal"] }}</span>
        </el-menu-item>
        <el-submenu index="systemManage">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>{{ menuData["systemManage"] }}</span>
          </template>
          <el-menu-item index="/systemManage/orderFields">{{
            menuData["orderFields"]
          }}</el-menu-item>
          <el-menu-item index="/systemManage/craftManage">{{
            menuData["craftManage"]
          }}</el-menu-item>
          <el-menu-item index="/systemManage/tipsTime">{{
            menuData["tipsTime"]
          }}</el-menu-item>
          <el-menu-item index="/systemManage/operationLog">{{
            menuData["operationLog"]
          }}</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header height="50px">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>我的公司</el-breadcrumb-item>
          <el-breadcrumb-item
            :class="{ active: index == breadcrumbData.length - 1 }"
            v-for="(item, index) in breadcrumbData"
            :key="item"
            >{{ item }}</el-breadcrumb-item
          >
        </el-breadcrumb>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      defaultActive: "/orderManage/underway",
      pulldownData: {
        companyList: [{ value: "123", label: "2123" }],
        orderList: [{ value: "123", label: "2123" }],
      },
      selectData: {},
      menuData: {
        orderManage: "订单管理",
        underway: "进行中",
        finished: "已完成",
        companyManage: "公司管理",
        proTotal: "生产统计",
        systemManage: "系统管理",
        orderFields: "订单字段",
        craftManage: "工艺管理",
        tipsTime: "提示时间",
        operationLog: "操作日志",
      },
      breadcrumbData: [],
    };
  },
  methods: {
		// 导航点击
    menuSelect(key, keyPath) {
      // console.log(key, keyPath);
      this.breadcrumbData = [];
      keyPath.forEach((item) => {
        let text = item;
        if (text.includes("/")) {
          let arr = text.split("/");
          text = arr[arr.length - 1];
        }
        this.breadcrumbData.push(this.menuData[text]);
      });
    },
  },
  created() {
    // console.log(this.$route.path);
    this.defaultActive = this.$route.path;
    // 处理刷新页面后的面包屑显示内容
    let arr = this.$route.path.split("/");
    arr.forEach((item) => {
      if (item) {
        this.breadcrumbData.push(this.menuData[item]);
      }
    });
  },
};
</script>

<style lang="less" scoped>
body > .el-container {
  height: 100%;
  background-color: #f2f2f2;
}

.el-aside {
  display: flex;
  flex-direction: column;
  background-color: #333333;
  color: #fff;
  .titleName {
    margin: 15px;
  }
  .selectBox {
    text-align: center;
    margin: 15px 0;
    .selectInput {
      width: 170px;
      margin: 5px auto;
    }
    .myicon {
      margin: 0 10px;
      cursor: pointer;
    }
  }
  .el-menu {
    flex: 1;
    border-right: 0;
  }
}

.el-header {
  background-color: #fff;
  color: #333;
  margin-bottom: 20px;
  .el-breadcrumb {
    line-height: 50px;
    .active {
      /deep/.el-breadcrumb__inner {
        color: #409eff;
      }
    }
  }
}

.el-main {
  background-color: #fff;
  color: #333;
}
</style>