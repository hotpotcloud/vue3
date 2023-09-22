<template>
  <view class="address-content">
    <!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
    <u--form
      labelPosition="top"
      :model="formInfo"
      :rules="rules"
      ref="addressFormRef"
      :labelStyle="labelStyle"
      labelWidth="100%"
    >
      <u-form-item label="收货人" prop="receiver" borderBottom>
        <view class="input-layer">
          <u--input
            clearable
            v-model="formInfo.receiver"
            border="none"
            placeholder="请填写收货人姓名"
            fontSize="30rpx"
          ></u--input>
        </view>
      </u-form-item>
      <u-form-item label="性别" prop="sex" borderBottom>
        <view class="input-layer">
          <u-radio-group
            v-model="formInfo.sex"
            size="44rpx"
            activeColor="#1D9BDC"
          >
            <u-radio
              :customStyle="{ marginRight: '87rpx' }"
              v-for="(item, index) in radioformInfo"
              :key="index"
              :label="item.label"
              :name="item.name"
              size="32rpx"
            ></u-radio>
          </u-radio-group>
        </view>
      </u-form-item>
      <u-form-item label="手机号" prop="receiverPhone" borderBottom>
        <view class="input-layer">
          <u--input
            clearable
            v-model="formInfo.receiverPhone"
            border="none"
            placeholder="请填写收货人手机号"
            fontSize="30rpx"
            type=""
          ></u--input>
        </view>
      </u-form-item>
      <u-form-item label="收货地址" prop="address" @tap="showMap" borderBottom>
        <view class="input-layer">
          <u--input
            v-model="formInfo.community"
            border="none"
            placeholder="请填写收货人地址"
            fontSize="29rpx"
            :disabled="true"
            disabledColor="#fff"
            clearable
          ></u--input>
        </view>
        <u-icon slot="right" name="map" color="#1D9BDC" size="48rpx"></u-icon>
      </u-form-item>
      <u-form-item label="门牌号" prop="doorCode" borderBottom>
        <view class="input-layer">
          <u--input
            clearable
            v-model="formInfo.doorCode"
            border="none"
            placeholder="例：2栋18层1801"
            fontSize="29rpx"
          ></u--input>
        </view>
      </u-form-item>
      <u-form-item label="标签" prop="label" borderBottom>
        <view class="tag-row">
          <text
            class="tag-cell"
            :class="currentTag === item.name ? 'active' : 'normal'"
            v-for="(item, index) in tags"
            :key="index"
            @tap="changeTag(item, index)"
          >
            {{ item.label }}
          </text>
        </view>
      </u-form-item>
      <u-form-item label="设为默认地址" prop="defaulted">
        <!-- <view class="input-layer"> -->
        <view class="info-text input-layer">每次下单会默认推荐使用该地址</view>
        <u-switch
          slot="right"
          size="25"
          v-model="formInfo.defaulted"
          activeColor="#1D9BDC"
          inactiveCcolor="#fff"
          @change="changeSwitch"
        ></u-switch>
        <!-- </view> -->
      </u-form-item>
    </u--form>
    <!-- <view class="btn-box">
      <view class="btn-submite" @click="getAddressInfo">保存</view>
    </view> -->
  </view>
</template>

<script>
import { Sex, SexText, Tag, TagText } from "@/utils/enum";
export default {
  props: {
    addressForm: {
      type: Object,
      receiver: {
        type: String,
        default: "",
      },
      receiverPhone: {
        type: Number,
        default: null,
      },
      address: {
        type: String,
        default: "",
      },
      doorCode: {
        type: String,
        default: null,
      },
      label: {
        type: String,
        default: Tag.HOME,
      },
      defaulted: {
        type: Boolean,
        default: false,
      },
      sex: {
        type: "string",
        default: Sex.MAN,
      },
    },
    saveAddress: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      toast: false, //弹窗提示
      labelStyle: {
        fontSize: "30rpx",
        color: "#333",
        fontWeight: "bold",
        lineHeight: "36rpx",
      },
      currentTag: Tag.HOME,
      formInfo: {
        receiver: "",
        receiverPhone: "",
        address: "",
        doorCode: "",
        sex: Sex.MAN,
        label: Tag.HOME,
        defaulted: false,
        community: "", //小区名
      },
      radioformInfo: [
        {
          name: Sex.MAN,
          label: SexText.MAN,
        },
        {
          name: Sex.WOMAN,
          label: SexText.WOMAN,
        },
      ],
      tags: [
        {
          name: Tag.HOME,
          label: TagText.HOME,
        },
        {
          name: Tag.COMPANY,
          label: TagText.COMPANY,
        },
        {
          name: Tag.SCHOOL,
          label: TagText.SCHOOL,
        },
        {
          name: Tag.OTHER,
          label: TagText.OTHER,
        },
      ],
      rules: {
        receiver: {
          type: "string",
          required: true,
          message: "请填写长度在10位以内的收货人姓名",
          trigger: ["blur", "change"],
          min: 1,
          max: 10,
        },
        address: {
          type: "string",
          required: true,
          message: "请选择收货人地址",
          trigger: ["blur", "change"],
        },
        receiverPhone: {
          type: "number",
          required: true,
          message: "请填写正确的收货人11位数手机号",
          trigger: ["change"],
          len: 11,
          // pattern: /^[1][3-9][\d]{9}/,
          pattern: /^1[3456789]\d{9}$/,
          validator: (rule, value, callback) => {
            // if (!value) {
            //   return callback(new Error("请填写收货人电话"));
            // }
            const flag = new RegExp(/^1[3456789]\d{9}$/).test(value);
            console.log("value-手机", flag, value);

            // return uni.$u.test.mobile(value);
            return flag;
          },
        },
        doorCode: {
          type: "string",
          required: true,
          message: "请填写门牌号",
          min: 1,
          max: 20,
          trigger: ["blur", "change"],
        },
        sex: {
          type: "string",
          required: true,
          message: "请选择性别",
          trigger: ["change"],
        },
      },
    };
  },
  onReady() {
    this.$refs.addressFormRef.setRules(this.rules);
  },
  beforeCreate() {},
  watch: {
    addressForm(val) {
      let info = {};
      for (let i in val) {
        info[i] = val[i];
      }
      this.formInfo = info;
      for (let n in this.tags) {
        if (this.formInfo.label === this.tags[n].name) {
          this.currentTag = this.tags[n].name;
        }
      }
      // this.$emit("getAddressInfo", this.formInfo);
    },
  },
  methods: {
    changeSwitch(val) {
      // const url = "../../assets/success.png";
      // if (val) {
      //   uni.showToast({
      //     title: "设置成功",
      //     // icon: "success",
      //     // image: require("../../assets/success.png"),
      //     duration: 1600,
      //   });
      // }
    },
    changeTag(el, i) {
      // console.log(i, "6666", el);
      this.currentTag = el.name;
      this.formInfo.label = el.name;
    },
    // 切换时标签
    // changeTag(item) {
    //   this.tags.map(el => {
    //     el.checked = item.name === el.name ? true : false
    //     this.formInfo.label = item.name
    //   })
    // },
    async getAddressInfo() {
      const res = await this.$refs.addressFormRef.validate();
      if (res) {
        return this.formInfo;
      } else {
        // console.log(res, "验证失败");
      }
    },
    // changeSex(str) {
    // 	console.log(str, "00043453");
    // 	console.log(this.info, "666")
    // 	this.formInfo.sex = str;
    // 	this.$emit("getAddressInfo", this.formInfo);
    // },
    // 打开地图
    showMap() {
      uni.chooseLocation({
        success: (res) => {
          console.log(res, "00088");
          // console.log("位置名称:" + res.name);
          // console.log("详细地址:" + res.address);

          let formInfo = {
            ...this.formInfo,
          };
          formInfo.address = res.address;
          formInfo.latitude = res.latitude;
          formInfo.longitude = res.longitude;
          formInfo.community = res.name;

          this.formInfo = formInfo;
          this.$emit("getAddressInfo", this.formInfo);
        },
      });
      // uni.authorize({
      //   scope: "scope.userLocation",
      //   success: (res) => {
      //     console.log("res1", res);
      //     uni.chooseLocation({
      //       success: (res) => {
      //         console.log(res, "00088");
      //         // console.log("位置名称:" + res.name);
      //         // console.log("详细地址:" + res.address);

      //         let formInfo = {
      //           ...this.formInfo,
      //         };
      //         formInfo.address = res.address;
      //         formInfo.latitude = res.latitude;
      //         formInfo.longitude = res.longitude;
      //         formInfo.community = res.name;

      //         this.formInfo = formInfo;
      //         this.$emit("getAddressInfo", this.formInfo);
      //       },
      //     });
      //   },
      //   fail: (err) => {
      //     console.log(err);
      //   },
      // });
    },
  },
};
</script>
<style scoped lang="scss">
.address-content {
  padding: 40rpx 40rpx 0 40rpx;
  font-size: 54rpx;
  //width: 100vw;
  height: 100vh;
  background: #ffffff;
}
.input-layer {
  // margin: 24rpx 0;
  padding: 12rpx 0;
}
.tag-row {
  margin: 24rpx 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .tag-cell {
    width: 146rpx;
    height: 72rpx;
    border-radius: 96rpx;
    color: #999999;
    line-height: 72rpx;
    text-align: center;
  }
  .normal {
    color: #999999;
    border: 2rpx solid #999999;
  }
  .active {
    border: 2rpx solid #1d9bdc;
    color: #1d9bdc;
  }
}

.info-text {
  color: #a9a9a9;
  font-size: 26rpx;
}
.btn-box {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 228rpx;
  background: #fff;
  font-size: 34rpx;
  padding: 0 32rpx;
  padding-top: 32rpx;
  // border-top: 2rpx solid #f3f3f3;
  .del-btn {
    color: #f00;
    text-align: center;
    width: 100%;
  }

  .btn-submite {
    background: #1d9bdc;
    border-color: #1d9bdc;
    width: 100%;
    height: 94rpx;
    line-height: 94rpx;
    margin-top: 32rpx;
    text-align: center;
    color: #fff;
    border-radius: 94rpx;
  }
}
</style>
