import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Rainbow",
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
    const RemixRainbow = () => {
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
          "d": "M12 4c6.075 0 11 4.925 11 11v5h-3v-5a8 8 0 0 0-7.75-7.996L12 7a8 8 0 0 0-7.996 7.75L4 15v5H1v-5C1 8.925 5.925 4 12 4zm0 4a7 7 0 0 1 7 7v5h-3v-5a4 4 0 0 0-3.8-3.995L12 11a4 4 0 0 0-3.995 3.8L8 15v5H5v-5a7 7 0 0 1 7-7zm0 4a3 3 0 0 1 3 3v5H9v-5a3 3 0 0 1 3-3z"
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
          "d": "M12 4c6.075 0 11 4.925 11 11v5h-2v-5a9 9 0 0 0-8.735-8.996L12 6a9 9 0 0 0-8.996 8.735L3 15v5H1v-5C1 8.925 5.925 4 12 4zm0 4a7 7 0 0 1 7 7v5h-2v-5a5 5 0 0 0-4.783-4.995L12 10a5 5 0 0 0-4.995 4.783L7 15v5H5v-5a7 7 0 0 1 7-7zm0 4a3 3 0 0 1 3 3v5h-2v-5a1 1 0 0 0-.883-.993L12 14a1 1 0 0 0-.993.883L11 15v5H9v-5a3 3 0 0 1 3-3z"
        }, null)])])]);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixRainbow);
    };
  }
});
export {
  _sfc_main as default
};
