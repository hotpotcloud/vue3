<template>
  <view class="day-root-container">
    <view class="title"><text class="num-font">5</text>/5</view>
    <view class="title-text">给计划取个名字吧~</view>
    <view class="prent-container">
      <view class="container">
        <view class="input-style">
          <input
            class="input-view"
            @input="onKeyInput"
            placeholder="请输入配送计划"
            maxlength="13"
            v-model="inputValue"
          />
          <!-- :value="inputValue" -->
          <img
            class="imgStyle"
            src="https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/distribution/compile.png"
            alt=""
          />
        </view>
        <view class="hint-text">限2-13个中文，英文或数字</view>
      </view>
    </view>

    <view class="btn-view">
      <view
        class="button-style"
        @click="nextStep"
        :style="{ background: btnActive ? '#1D9BDC' : '#C7C7C7' }"
        >{{ btnText }}</view
      >
    </view>
  </view>
</template>
<script lang="ts">
import Vue from "vue";
import { distributionUrl } from "@/utils/url";
import { AlterORCrtate } from "@/utils/enum";
import { mapMutations, mapState } from "vuex";
import { oneceFn } from "@/utils/utils";
export default Vue.extend({
  data() {
    return {
      inputValue: "",
      btnText: "完成",
      btnActive: false,
      name: "", //用户姓名
    };
  },
  computed: {
    ...mapState("distribution", ["addProject", "editData"]),
    ...mapState("order", ["orderUrl"]),
    //计算名字
  },

  onShow() {
    if (this.type !== AlterORCrtate.CREATE) {
      this.inputValue = this.editData.planName;
      this.btnText = "确定";
    } else {
      this.btnText = "完成";
    }
    console.log(this.editData);
  },
  onLoad(options) {
    const { param, name } = options;
    this.type = param;
    this.inputValue = name + "的计划";
    if (this.inputValue) {
      this.btnActive = true;
    }
  },

  methods: {
    ...mapMutations("distribution", ["M_planName", "M_AlterPlanName"]),
    nextStep() {
      //const reg = /^[\u4e00-\u9fa5]{1,10}$|^[\dA-Za-z_]{1,10}$/;
      if (!this.btnActive) return;
      const reg = /^[\u4e00-\u9fa5_a-zA-Z0-9]{2,13}$/;
      if (reg.test(this.inputValue)) {
        // const pages = getCurrentPages();
        // console.log("保存配送计划路由栈", pages, this.orderUrl);
        // this.caeateRoalter();
        oneceFn(this.caeateRoalter, 1100);
        //下单页面进来的
        // if (this.orderUrl) {
        //   console.log("this.type-->我在新增里面", this.type);
        //   // if (this.type === AlterORCrtate.CREATE) {
        //   //   //新增情况

        //   // } else {
        //   //   //编辑情况
        //   //   uni.navigateBack({
        //   //     delta: 1,
        //   //   });

        //   // }
        //   const index = this.type === AlterORCrtate.CREATE ? 5 : 1;
        //   console.log("index", index);
        //   uni.navigateBack({
        //     delta: index,
        //   });
        // } else {
        //   this.caeateRoalter();
        // }
      } else {
        uni.showToast({
          icon: "none",
          title: "限2-13个中文,英文或数字",
          duration: 2000,
        });
      }
    },

    caeateRoalter() {
      try {
        if (this.type === AlterORCrtate.CREATE) {
          this.M_planName(this.inputValue);
          this.PUT(distributionUrl.saveOrUpdate, this.addProject).then(() => {
            uni.showToast({
              title: "新增配送计划成功",
              icon: "none",
              duration: 2000,
              success: () => {
                setTimeout(() => {
                  uni.navigateBack({
                    delta: 5,
                  });
                }, 1000);
              },
            });
            // uni.navigateBack({
            //   delta: 5,
            // });
            // if (this.orderUrl) {
            //   uni.navigateBack({
            //     delta: 5,
            //   });
            // } else {
            //   uni.redirectTo({
            //     url: `/subPages/distribution/programList/programListPage`,
            //   });
            // }
          });
        } else {
          this.M_AlterPlanName(this.inputValue);
          const pages = getCurrentPages();
          console.log("pages[]", pages);
          uni.navigateBack({
            delta: 1,
          });
        }
      } catch (error) {}
    },

    onKeyInput(e) {
      console.log(e.detail.value);
      const val = e.detail.value;

      this.inputValue = val;
      if (val) {
        this.btnActive = true;
      } else {
        this.btnActive = false;
      }
    },
  },
});
</script>

<style scoped>
.day-root-container {
  width: 100%;
  height: 100vh;
  background: #f5f5f5;
}
.prent-container {
  border-bottom: #f5f5f5 1px solid;
  width: 100%;
}
.container {
  width: 100%;
  height: 280rpx;
  background-color: white;
  padding-left: 48rpx;
  padding-right: 48rpx;
}
.title {
  width: 100%;
  padding-top: 32rpx;
  padding-left: 32rpx;
  font-size: 32rpx;
  color: #88c7e8;
}
.num-font {
  font-size: 48rpx;
  color: #1d9bdc;
}
.title-text {
  font-size: 36rpx;
  color: #1d9bdc;
  padding-left: 32rpx;
  padding-top: 16rpx;
  margin-bottom: 72rpx;
}
.title-view {
  height: 100%;
  width: 562rpx;
}
.input-style {
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
}
.input-view {
  height: 104rpx;
  width: 600rpx;
  background: #f1f1f1;
  border-radius: 104rpx;
  text-align: center;
  color: #333333;
  margin-top: 60rpx;
}
.hint-text {
  width: 100%;
  text-align: center;
  font-size: 28rpx;
  color: #999999;
  margin-top: 16rpx;
}
.imgStyle {
  width: 32rpx;
  height: 32rpx;
  position: absolute;
  top: 98rpx;
  right: 60rpx;
}
.btn-view {
  width: 100%;
  position: fixed;
  bottom: 68rpx;
  display: flex;
  justify-content: center;
}
.button-style {
  display: flex;
  border-radius: 100rpx;
  background-color: #1d9bdc;
  height: 104rpx;
  width: 670rpx;
  color: white;
  justify-content: center;
  align-items: center;
  font-size: 34rpx;
}
.personage-info-view {
  display: flex;
  margin-top: 32rpx;
  margin-bottom: 16rpx;
}
.name-style {
  font-size: 30rpx;
  font-weight: 500;
}
.phone-style {
  color: #999999;
  font-size: 30rpx;
  margin-left: 18rpx;
}
.company-style {
  margin-left: 18rpx;
  width: 80rpx;
  height: 44rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e4f4ff;
  color: #1d9bdc;
  border-radius: 8rpx;
}
</style>
