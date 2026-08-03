import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Hail",
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
    const RemixHail = () => {
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
          "d": "M18.995 17.794a4 4 0 0 0-5.085-3.644A4.001 4.001 0 0 0 6 15c0 1.08.428 2.059 1.122 2.778a8 8 0 1 1 9.335-10.68 5.5 5.5 0 0 1 2.537 10.696zM10 17a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm5 3a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-5 3a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
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
          "d": "M6 17.418A8.003 8.003 0 0 1 9 2a8.003 8.003 0 0 1 7.458 5.099A5.5 5.5 0 0 1 19 17.793v-2.13a3.5 3.5 0 1 0-4-5.612V10a6 6 0 1 0-9 5.197v2.221zM10 17a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm5 3a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-5 3a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
        }, null)])])]);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixHail);
    };
  }
});
export {
  _sfc_main as default
};
