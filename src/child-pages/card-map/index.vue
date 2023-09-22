// 地图测试
<template>
  <view>
    <hmap :polygons="pointArr" />
  </view>
</template>

<script>
import hmap from "../components/h-map/index.vue";
import {BaseApp} from "@/const/appIdConf";
import {mapState} from "vuex";
export default {
  components: {
    hmap,
  },
  data() {
    return {
      BaseApp,
      polygons: [
        {
          points: [
            {longitude: "103.801575", latitude: "30.972899"},
            {longitude: "104.680481", latitude: "30.970544"},
            {longitude: "104.955139", latitude: "30.443938"},
            {longitude: "104.422302", latitude: "30.085731"},
            {longitude: "103.439026", latitude: "30.297018"},
            {longitude: "103.801575", latitude: "30.972899"},
          ],
          strokeWidth: 1,
          strokeColor: "#ff000066",
          fillColor: "#ff000016",
        },
      ],
    };
  },
  computed: {
    ...mapState("milkcard", ["cardDetail"]),
    pointArr() {
      const {customRegion} = this.cardDetail;
      return [
        {
          points: customRegion,
          strokeWidth: 1,
          strokeColor: "#ff000066",
          fillColor: "#ff000016",
        },
      ];
    },
  },
  methods: {
    selected: (data) => {
      console.log(data);
    },
  },
};
</script>

<style scoped lang="scss"></style>
