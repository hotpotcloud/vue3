<template>
  <view class="container">
    <view class="user-info-box">
      <cell-item title="头像">
        <view slot="value">
          <button
            open-type="chooseAvatar"
            @chooseavatar="chooseavatar"
            class="avatar-img"
          >
            <u-image
              :src="user.wxAvatarUrl ? user.wxAvatarUrl : avtar"
              width="72rpx"
              height="72rpx"
              class="uploadimg"
              shape="circle"
              @tap="changeHead"
            ></u-image>
          </button>
        </view>
      </cell-item>
      <cell-item title="用户名">
        <view slot="value">
          <input
            class="nickname-input"
            type="nickname"
            maxlength="15"
            v-model="user.name"
            @change="inputName"
            @blur="inputBlur"
          />
        </view>
      </cell-item>
      <cell-item
        title="性别"
        isLink="true"
        @onClick="selectSex"
        :value="sextext"
      >
      </cell-item>
      <cell-item title="生日" @onClick="selectBirthday">
        <view slot="value">
          <picker
            mode="date"
            :value="date"
            :start="startDate"
            :end="endDate"
            @change="bindDateChange"
          >
            <view :class="[user.birthday || date ? '' : 'cancel-text']">{{
              user.birthday ? user.birthday : date ? date : "请选择生日"
            }}</view>
          </picker>
        </view>
      </cell-item>
      <cell-item
        title="年龄"
        :value="userAge"
        :isForward="isForward"
      ></cell-item>
      <cell-item
        title="手机号"
        :value="user.phone"
        :isForward="isForward"
      ></cell-item>
      <cell-item title="职业">
        <view slot="value">
          <u-input
            @change="inputJob"
            maxlength="30"
            border="none"
            inputAlign="right"
            v-model="user.occupation"
            placeholder="选填"
            placeholderStyle="color:#999999"
          />
        </view>
      </cell-item>
      <cell-item title="邮箱">
        <view slot="value">
          <u-input
            maxlength="30"
            @blur="blurEmail"
            border="none"
            inputAlign="right"
            v-model="user.email"
            placeholder="选填"
            placeholderStyle="color:#999999"
            @change="inputEmail"
          /> </view
      ></cell-item>
    </view>

    <view>
      <button
        class="save-btn"
        :disabled="false"
        :loading="false"
        hover-class="button-hover"
        @click="saveUserInfo"
      >
        保存
      </button>
    </view>
  </view>
</template>

<script>
import api from "@/utils/api";
import { Sex, SexText } from "@/utils/enum";
import { Global_Cog } from "@/utils/config";
import cellItem from "./cell-item.vue";
// 计算年龄
function jsGetAge(strBirthday) {
  if (!strBirthday) return;
  let returnAge;
  //截取出生年月日
  const strBirthdayArr = strBirthday.split("-");
  const birthYear = strBirthdayArr[0];
  const birthMonth = strBirthdayArr[1];
  const birthDay = strBirthdayArr[2];

  const d = new Date();
  const nowYear = d.getFullYear();
  const nowMonth = d.getMonth() + 1;
  const nowDay = d.getDate();

  if (nowYear == birthYear) {
    returnAge = 0; //同年 则为0岁
  } else {
    const ageDiff = nowYear - birthYear; //年之差
    if (ageDiff > 0) {
      if (nowMonth == birthMonth) {
        const dayDiff = nowDay - birthDay; //日之差
        if (dayDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff;
        }
      } else {
        const monthDiff = nowMonth - birthMonth; //月之差
        if (monthDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff;
        }
      }
    } else {
      returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
    }
  }
  return returnAge; //返回周岁年龄
}
// 时间
function getDate(type) {
  const date = new Date();

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (type === "start") {
    year = year - 110;
  } else if (type === "end") {
    year = year;
  }
  month = month > 9 ? month : "0" + month;
  day = day > 9 ? day : "0" + day;
  return `${year}-${month}-${day}`;
}
// let name = ""; //不让用户名为空
export default {
  components: {
    cellItem,
  },
  data() {
    return {
      isForward: false,
      date: "",
      startDate: getDate("start"),
      endDate: getDate("end"),
      array: [1, 2, 3],
      avtar:
        "https://freshgo-prd-1302811166.cos.ap-chengdu.myqcloud.com/fhgo-miniprogram/commonSource/%E5%B0%8F%E7%A8%8B%E5%BA%8F-icon/info/user1.png",
      // 用户信息
      user: {
        name: "",
        avatarUrl: "", //微信头像
        phone: "",
        memberNo: "",
        wxAvatarUrl: "", //用户头像
        sex: "",
        birthday: "",
        occupation: "", //职业
        email: "选填",
        appId: Global_Cog.APPID,
      },
      sextext: "", //性别
      userAge: "", //岁数
      showdate: false, //生日选择器

      dateVal: "2022-2-21",
      handimg: "", //本地上传地址
      sex: "男",
      show: false,
    };
  },
  onShow() {
    const info = uni.getStorageSync("userMsg");
    // console.log("用户信息", info);

    // this.user = { ...info };

    console.log(this.userAge, "----", this.user);
  },
  onLoad(id) {
    const memberId = id.id;
    console.log(memberId);
    this.getMemberInfo(memberId); //请求会员信息
    // name=this.user.name;
  },

  methods: {
    onPhoto() {
      console.log("2-头像", 2);
    },

    async chooseavatar(e) {
      try {
        console.log("e", e);
        const { avatarUrl } = e.detail;
        this.user.wxAvatarUrl = avatarUrl;
        timeStamp: 70966;
        if (e.timeStamp > 2097152) {
          //2M大小
          return uni.showToast({
            title: "请上传低于2M图片",
            icon: "none",
          });
        }
        this.handimg = avatarUrl;
        const { data } = await api.uploadFile(avatarUrl);
        this.user.avatarUrl = data;
        this.user.wxAvatarUrl = data;
      } catch (error) {
        uni.showToast({
          title: error.msg,
          icon: "none",
        });
      }
    },
    // 筛选性别
    checkSex(sex) {
      const text =
        sex === Sex.UNKOWN
          ? SexText.UNKOWN
          : sex === Sex.MAN
          ? SexText.MAN
          : sex === Sex.WOMAN
          ? SexText.WOMAN
          : " ";
      this.sextext = text;
    },
    // 获取会员信息
    getMemberInfo(memberId) {
      console.log("请求接口个人信息");
      api
        .$get(this.urlapi.user.member + memberId, "加载中")
        .then((res) => {
          console.log("个人信息", res);
          this.user = { ...res.data };

          console.log("更新后信息", this.user);
          this.checkSex(res.data.sex);
          this.userAge = jsGetAge(res.data.birthday);
        })
        .catch((err) => {
          uni.showToast({
            title: "获取失败",
            icon: "none",
            mask: true,
          });
        });
    },
    inputBlur(e) {
      console.log("blur", e);
      this.user.name = e.target.value;
    },
    inputName(e) {
      console.log("e-changge", e);
      const len = uni.$u.trim(e, "all");
      const flag = this.$u.test.rangeLength(len, [1, 14]); //boolen。判断长度
      const lenWidth = len.length;
      if (!flag) {
        // if (lenWidth === 0) {
        //   this.user.name = name;
        // }
        return lenWidth < 1
          ? this.$u.toast("用户名不能空哦！")
          : this.$u.toast("字数超了哦！");
      }
    },
    // 头像上传
    changeHead() {
      //头像
      uni.chooseImage({
        count: 1,
        sizeType: ["compressed"], //压缩图
        success: (res) => {
          console.log("res-商城头像", res);
          if (res.tempFiles[0].size > 2097152) {
            //2M大小
            return uni.showToast({
              title: "请上传低于2M图片",
              icon: "none",
            });
          }
          this.handimg = res.tempFilePaths[0]; //本地地址
          api
            .uploadFile(this.handimg)
            .then((url) => {
              //上传头像
              const { data } = url;
              console.log("改变图片", data);
              this.user.avatarUrl = data;
              this.user.wxAvatarUrl = data;
            })
            .catch((err) => {
              uni.showToast({
                title: err.msg,
              });
            });
        },
      });
    },

    // 性别选择
    selectSex() {
      const arr = [SexText.MAN, SexText.WOMAN];
      uni.showActionSheet({
        itemList: arr,
        success: (res) => {
          const checksex =
            arr[res.tapIndex] === SexText.MAN ? Sex.MAN : Sex.WOMAN;
          console.log(checksex);
          this.user.sex = checksex;
          this.checkSex(checksex);
          console.log(this.user);
        },
        fail: function (res) {
          console.log(res.errMsg);
        },
      });
    },
    // 生日选择
    selectBirthday() {
      console.log("选择生日");
    },
    bindDateChange: function (e) {
      this.date = e.detail.value;
      this.user.birthday = e.detail.value;
      this.userAge = jsGetAge(this.date); //计算岁数
    },
    // 验证
    checkLength(e, end = 14) {
      const len = uni.$u.trim(e, "all"); //去除空格
      const flag = this.$u.test.rangeLength(len, [1, `${end}`]); //boolen。判断长度
      const lenWidth = len.length;
      if (!flag) {
        // if (lenWidth === 0) {
        //   this.user.name = name;
        // }
        return lenWidth < 1
          ? this.$u.toast("不能空哦！")
          : this.$u.toast("字数超啦！");
      }
    },
    // 职业验证
    inputJob(e) {
      // this.checkLength(e,29);
    },

    // 邮箱验证
    inputEmail(e) {
      // this.checkLength(e,29);
    },
    blurEmail(e) {
      console.log("邮箱", e);
      const flagEmail = this.$u.test.email(e);

      if (!flagEmail) {
        uni.showToast({
          title: "请输入正确邮箱地址",
          icon: "none",
          mask: true,
        });
      }
      // this.checkLength(e);
    },
    // 更新用户信息
    saveUserInfo() {
      console.log(this.user);
      if (!this.user.occupation) {
        this.user.occupation = null;
      }
      if (!this.user.email) {
        this.user.email = null;
      }
      this.user.appId = Global_Cog.APPID;
      api
        .$post(this.urlapi.user.update, this.user, "保存中...")
        .then((res) => {
          console.log(res);
          if (res.code === "00000") {
            uni.showToast({
              title: res.msg,
              icon: "none",
              mask: true,
            });
            setTimeout(() => {
              uni.navigateBack({ delta: 1 });
            }, 1500);
          }
        })
        .catch((err) => {
          uni.showToast({
            title: err.msg,
            icon: "none",
            mask: true,
          });
        });
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  padding: 0 40rpx;
}
::v-deep .u-line {
  border-bottom-style: none !important;
}
::v-deep .u-cell__body {
  padding: 0 !important;
  height: 112rpx;
  line-height: 112rpx;
  border-bottom: 2rpx solid $h-border-smallcolor;
}
::v-deep .cancel-text {
  color: $uni-text-color-grey;
}
.save-btn {
  background: $uni-color-primary;
  color: #fff;
  height: 104rpx;
  line-height: 104rpx;
  border-radius: 254rpx;
  position: fixed;
  bottom: 90rpx;
  width: calc(100% - 80rpx);
}

.nickname-input {
  text-align: right;
}
.avatar-img {
  background: transparent;
  padding: 0;
  &::after {
    border: none;
  }
}
</style>
