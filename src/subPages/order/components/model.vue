
<template>
  <view>
    <view :class="[typeName === 'num' ? 'd-flex-center' : 'd-sb']" class="d-se">
      <view v-for="(el, index) in calcList" :key="index" class="row-model">
        <view
          @tap.stop="onClickNum(el, index)"
          class="d-flex-center"
          style="margin-bottom: 20rpx"
          :class="[typeName === 'num' ? 'd-se' : 'd-sb']"
        >
          <!-- v-if="el.value <= goodsInfo[0].qty || typeName !== 'num'" -->
          <view
            :class="[
              typeName === 'num' ? 'num-text' : '',
              typeName === 'num' && numIndex === index ? 'num-text-active' : '',
            ]"
            >{{ el.label }}</view
          >
          <radio-group
            @change="radioChange(el, index)"
            v-if="typeName !== 'num'"
          >
            <label class="radio">
              <radio
                :value="el.value"
                :checked="checked === el.value"
                color="#1D9BDC"
                style="transform: scale(0.77)"
            /></label>
          </radio-group>
        </view>
        <!--隔日送 步进器 -->
        <view
          class="day-step"
          v-if="
            typeName === 'long' &&
            el.value === ruleTypeEnum.TERTIAN_DAYS &&
            checked === ruleTypeEnum.TERTIAN_DAYS
          "
        >
          <h-number-box
            :integer="true"
            buttonSize="64rpx"
            inputWidth="64rpx"
            color="#999999"
            v-model="defaultDay"
            :disabledInput="false"
            :min="1"
            :max="30"
            @change="changeValue"
            @blur="blurNumber"
          >
            <view slot="minus" />
            <view slot="plus" />
          </h-number-box>
        </view>
        <!-- 星期送 -->
        <view
          v-if="el.children && checked === ruleTypeEnum.WEEK_DAYS"
          class="d-flex-warp week-list"
        >
          <view
            v-for="item in el.children"
            :key="item.id"
            :class="['week', weekVal.includes(item.value) ? 'week-active' : '']"
            @tap.stop="onClickWeek(item)"
            >{{ item.label }}</view
          >
        </view>
      </view>
    </view>
    <!--每次配送步进器 -->
    <view
      v-if="typeName === 'num' && numIndex === 3 && calcList.length === 4"
      class="num-step d-flex-center d-sb"
    >
      <view>自定义数量：</view>
      <h-number-box
        :integer="true"
        buttonSize="64rpx"
        inputWidth="64rpx"
        color="#000"
        v-model="defaultNum"
        :disabledInput="false"
        :min="1"
        :max="goodsInfo[0].qty"
        @change="changDefaultNum"
        @blur="blurDefaultNum"
      >
        <view slot="minus" />
        <view slot="plus" />
      </h-number-box>
    </view>
  </view>
</template>

<script>
export default {};
</script>

<style scoped>
</style>