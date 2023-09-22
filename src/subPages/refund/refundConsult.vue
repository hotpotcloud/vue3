<!-- 协商记录页面 -->
<template>
  <view class="record-container">
    <view class="record-box">
      <!-- 我-撤销 -->
      <!-- <view class="record-revoke common-card" v-if="item.status === 'REVOKED'">
        <view class="platform-info">
          <view class="platform-info-img">
            <img :src="item.handleDTO.userHeadImg" alt="图" />
            <text>{{ item.handleDTO.handleName }}</text>
          </view>
          <view class="platform-info-time">
            <text class="time-top">买家撤销了退款申请</text>
            <text class="time-bottom">{{ item.handleDTO.handleTime }}</text>
          </view>
        </view>
      </view>-->
      <!-- 平台 -->
      <view class="record-platform common-card" v-if="infoRefund.handleDTO">
        <view class="platform-info">
          <view class="platform-info-img">
            <view class="platform-info-cover">
              <img
                :src="
              infoRefund.handleDTO.userHeadImg?infoRefund.handleDTO.userHeadImg: getAssetImgUrl('user_avarta.png')
              "
                alt="图"
              />
            </view>
            <text>{{ infoRefund.handleDTO.handleBy }}</text>
          </view>
          <view class="platform-info-time">
            <text :class="['time-top', infoRefund.handleDTO.status]">
              {{
              infoRefund.handleDTO.statusName
              }}
            </text>
            <text class="time-bottom">
              {{
              infoRefund.handleDTO.handleTime ?infoRefund.handleDTO.handleTime : "暂无"
              }}
            </text>
          </view>
        </view>
        <!-- v-if="infoRefund.handleDTO.status === refundStatus.REJECTED" -->

        <view class="platform-reason" v-if="infoRefund.handleDTO.handleDescription.length>0">
          拒绝原因：
          <text class="reason-str">
            {{
            infoRefund.handleDTO.handleDescription
            }}
          </text>
        </view>
      </view>
      <!-- 我-创建 -->
      <view class="record-create common-card">
        <view class="platform-info">
          <view class="platform-info-img">
            <view class="platform-info-cover">
              <img
                :src="infoRefund.saleRecord.memberImage?infoRefund.saleRecord.memberImage: getAssetImgUrl('user_avarta.png')"
                alt="图"
              />
            </view>
            <text class="platform-info-user">
              {{
              infoRefund.saleRecord.applyName
              }}
            </text>
          </view>
          <view class="platform-info-time">
            <!-- <text
              :class="['time-top',infoRefund.saleRecord.status]"
            >{{infoRefund.saleRecord.statusName}}</text>-->
            <text :class="['time-top']">创建申请</text>
            <text class="time-bottom">{{ infoRefund.saleRecord.applyTime }}</text>
          </view>
        </view>
        <!-- 中间详细信息 -->
        <view class="detail-info">
          <view class="detail-info-item d-flex">
            <view class="detail-info-label">退款类型:</view>
            <view class="detail-info-value">{{ infoRefund.saleRecord.typeName }}</view>
          </view>
          <view class="detail-info-item d-flex">
            <view class="detail-info-label">退款原因:</view>
            <view class="detail-info-value">
              {{
              infoRefund.saleRecord.reasonName
              }}
            </view>
          </view>
          <view class="detail-info-item d-flex">
            <view class="detail-info-label">退款金额:</view>
            <view class="detail-info-value h-main-color">
              <text calss="price-icon">￥</text>
              <text class="price-money">
                {{
                infoRefund.saleRecord.applyAmount | noformatAmount
                }}
              </text>
            </view>
          </view>
          <view
            class="detail-info-item d-flex"
            v-if="infoRefund.saleRecord.userApply.applyDescription"
          >
            <view class="detail-info-label">拒绝原因：:</view>
            <view class="detail-info-value">
              {{
              infoRefund.saleRecord.refuseReason
              ? infoRefund.saleRecord.refuseReason
              : "暂无"
              }}
            </view>
          </view>

          <view class="detail-info-item d-flex">
            <view class="detail-info-label">退款说明:</view>
            <view
              class="detail-info-value"
            >{{ infoRefund.saleRecord.remark.length>0? infoRefund.saleRecord.remark:'暂无'}}</view>
          </view>

          <!-- 图片 -->
          <view class="detail-info-item d-flex" v-if="infoRefund.saleRecord.imageUrlList.length>0">
            <text class="detail-info-label">申请凭证:</text>
            <!-- 后端没有返字段 -->
            <view class="detail-info-value d-flex-warp">
              <img
                v-for="(subItem, subIndex) in infoRefund.saleRecord.imageUrlList"
                :key="subIndex"
                :src="subItem"
                class="imgs"
              />
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 下方按钮 -->
    <view class="select-container">
      <view class="btn-box">
        <button class="service-btn" open-type="contact" type="default">在线客服</button>
        <!-- <button class="service-btn">电话客服</button> -->
        <!-- <view class="custom-style-left">
          <button class="service-btn" open-type="contact" type="default">在线客服</button>
        </view>
        <view class="custom-style-right" @click="makeCall">
          <button class="service-btn">电话客服</button>
        </view>-->
      </view>
    </view>
  </view>
</template>

<script>
import { refund } from "@/utils/url";
import urlapi from "@/utils/url";
import { refundStatus } from "@/utils/enum";
import { mapState } from "vuex";
export default {
  data() {
    return {
      refundStatus,
      info: [],
      refundPersonEnum: {
        MEMBER: "买家",
        PLATFORM: "系统"
      }
    };
  },
  onLoad(option) {
    // this.getDetail(option.afterSaleNo);
    // this.info = this.infoRefund.saleRecord;
    console.log(this.infoRefund.saleRecord, "-----------");
  },
  computed: {
    ...mapState("refund", ["infoRefund"])
  },
  methods: {
    // 获取协商详情
    getDetail(afterSaleNo) {
      this.GET(refund.negotiationHistories + `${afterSaleNo}`).then(res => {
        this.info = res.data;
      });
    },
    // 电话客服
    makeCall() {
      this.GET(urlapi.about.customerHotline).then(res => {
        const { content } = res.data;
        if (content) {
          uni.makePhoneCall({
            phoneNumber: content //仅为示例
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.record-container {
  background: #f5f5f5;
  height: calc(100vh - 228rpx);
  overflow-y: auto;

  .record-platform {
    .platform-info {
      display: flex;
      justify-content: space-between;
      padding-bottom: 32rpx;
      margin-bottom: 32rpx;
      border-bottom: 2rpx dashed #f4f4f4;
    }
  }
  // 平台信息
  .platform-info-img {
    display: flex;
    align-items: center;
    width: 50%;
    .platform-info-cover {
      width: 80rpx;
      height: 80rpx;
      background: #f4f4f4;
      border-radius: 40rpx;
      margin-right: 16rpx;
      img {
        width: 80rpx;
        height: 80rpx;
        border-radius: 40rpx;
        margin-right: 29rpx;
        // border: 2rpx solid #ccc;
      }
    }

    text {
      font-size: 30rpx;

      font-weight: 400;
      color: #000;
      line-height: 35rpx;
    }
  }
  .platform-info-time {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .time-top {
      margin-bottom: 12rpx;
      font-size: 26rpx;
      //font-weight: bold;
      color: #666;
      line-height: 30rpx;
    }
    .time-bottom {
      font-size: 26rpx;
      font-weight: 400;
      color: #666;
      line-height: 30rpx;
    }
  }

  // 拒绝原因
  .platform-reason {
    font-size: 26rpx;
    font-weight: 400;
    color: #666666;
    line-height: 30rpx;
  }

  // 我-撤销
  .record-revoke {
    .platform-info {
      display: flex;
      justify-content: space-between;
    }
  }
  // 我-创建
  .record-create {
    padding-bottom: 16rpx !important;
    .platform-info {
      display: flex;
      justify-content: space-between;
      padding-bottom: 28rpx;
      margin-bottom: 32rpx;
      border-bottom: 2rpx dashed #f4f4f4;
    }
    // 中间退款详细信息
    .detail-info {
      .detail-info-item {
        margin-bottom: 16rpx;
        font-size: 26rpx;

        font-weight: 400;
        color: #666;
        line-height: 30rpx;
        .detail-info-label {
          // margin-right: 32rpx;
          width: 130rpx;
        }
        .detail-info-value {
          width: 476rpx;
        }
        .imgs {
          width: 120rpx;
          height: 120rpx;
          border-radius: 8rpx;
          background: #fff;
          margin-right: 16rpx;
          margin-bottom: 16rpx;
        }
      }
    }
  }
}
.record-box {
  padding: 0 32rpx;
  margin-top: 32rpx;
}
//   下方选择按钮
.select-container {
  width: 100%;
  height: 228rpx;
  position: fixed;
  bottom: 0;
  border-top: 2rpx solid #e5e5e5;
  background: #fff;
}
.btn-box {
  // margin-top: 32rpx;
  padding: 32rpx 40rpx;
  .service-btn {
    border-radius: 254rpx;
    background: #1d9bdc;
    color: #fff;
    line-height: 104rpx;
    font-weight: bold;
    font-size: 34rpx;
  }
}
.price-icon {
  font-size: 22rpx;
  font-weight: bold !important;
}
.price-money {
  font-size: 26rpx;
  font-weight: bold;
}
.reason-str {
  color: #333;
  font-size: 26rpx;
}
</style>
