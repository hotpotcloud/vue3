<template>
  <view class="canvas-page">
    <view>canvas海报生成</view>
    <!-- <canvas type="2d" id="canvas" style="width: 300rpx; height: 300rpx" /> -->
    <canvas
      style="width: 300px; height: 200px"
      canvas-id="firstCanvas"
      id="firstCanvas"
    ></canvas>
    <canvas
      style="width: 400px; height: 500px"
      canvas-id="secondCanvas"
      id="secondCanvas"
    ></canvas>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  onReady: function (e) {
    var context = uni.createCanvasContext("firstCanvas");
    context.setStrokeStyle("#00ff00");
    context.setLineWidth(5);
    context.rect(0, 0, 200, 200);
    context.stroke();
    context.setStrokeStyle("#ff0000");
    context.setLineWidth(2);
    context.moveTo(160, 100);
    context.arc(100, 100, 60, 0, 2 * Math.PI, true);
    context.moveTo(140, 100);
    context.arc(100, 100, 40, 0, Math.PI, false);
    context.moveTo(85, 80);
    context.arc(80, 80, 5, 0, 2 * Math.PI, true);
    context.moveTo(125, 80);
    context.arc(120, 80, 5, 0, 2 * Math.PI, true);
    context.stroke();
    context.draw();
  },
  methods: {
    canvasIdErrorCallback: function (e) {
      console.error(e.detail.errMsg);
    },
  },
};
</script>

<style scoped lang="scss">
// .canvas-page {
//   width: 100%;
// }
</style>
