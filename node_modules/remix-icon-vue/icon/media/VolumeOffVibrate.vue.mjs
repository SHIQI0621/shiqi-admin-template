import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "VolumeOffVibrate",
  props: Props,
  setup(__props) {
    const props = __props;
    const iconStyle = reactive({
      "--icon-size": "",
      "--icon-color": ""
    });
    const iconSize = isNumber(props.size) ? `${props.size}px` : props.size;
    const iconColor = props.color || "";
    iconStyle["--icon-size"] = iconSize;
    iconStyle["--icon-color"] = iconColor;
    const RemixVolumeOffVibrate = () => {
      if (props.fill) {
        return createVNode("i", {
          "class": ["remix-icon", {
            "remix-icon--spin": props.spin
          }],
          "style": iconStyle
        }, [createVNode("svg", {
          "xmlns": "http://www.w3.org/2000/svg",
          "viewBox": "0 0 24 24"
        }, [createVNode("g", null, [createVNode("path", {
          "fill": "none",
          "d": "M0 0h24v24H0z"
        }, null), createVNode("path", {
          "d": "M19.39 3.161l1.413 1.414-2.475 2.475 2.475 2.475L18.328 12l2.475 2.476-2.475 2.475 2.475 2.475-1.414 1.414-3.889-3.89 2.475-2.474L15.5 12l2.475-2.475L15.5 7.05l3.89-3.889zM13 19.945a.5.5 0 0 1-.817.387L6.89 15.999 3 16a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1l2.584-.002-3.776-3.776 1.414-1.414L13 12.586v7.359zm-.113-16.206a.5.5 0 0 1 .113.316v5.702L9.282 6.04l2.901-2.372a.5.5 0 0 1 .704.07z"
        }, null)])])]);
      } else {
        return createVNode("i", {
          "class": ["remix-icon", {
            "remix-icon--spin": props.spin
          }],
          "style": iconStyle
        }, [createVNode("svg", {
          "xmlns": "http://www.w3.org/2000/svg",
          "viewBox": "0 0 24 24"
        }, [createVNode("g", null, [createVNode("path", {
          "fill": "none",
          "d": "M0 0h24v24H0z"
        }, null), createVNode("path", {
          "d": "M19.39 3.161l1.413 1.414-2.475 2.475 2.475 2.475L18.328 12l2.475 2.476-2.475 2.475 2.475 2.475-1.414 1.414-3.889-3.89 2.475-2.474L15.5 12l2.475-2.475L15.5 7.05l3.89-3.889zM13 19.945a.5.5 0 0 1-.817.387L6.89 15.999 3 16a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1l2.584-.002-3.776-3.776 1.414-1.414L13 12.586v7.359zM7.584 9.998L4 10V14l3.603-.001L11 16.779v-3.365L7.584 9.998zm5.303-6.26a.5.5 0 0 1 .113.317v5.702l-2-2V7.22l-.296.241-1.421-1.42 2.9-2.373a.5.5 0 0 1 .704.07z"
        }, null)])])]);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixVolumeOffVibrate);
    };
  }
});
export {
  _sfc_main as default
};
