import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PhoneLock",
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
    const RemixPhoneLock = () => {
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
          "d": "M18 2a1 1 0 0 1 1 1l.001 7.1A5.002 5.002 0 0 0 13.1 14H12v8H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12zm0 10a3 3 0 0 1 3 3v1h1v5a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-5h1v-1a3 3 0 0 1 3-3zm0 2c-.513 0-1 .45-1 1v1h2v-1a1 1 0 0 0-1-1z"
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
          "d": "M18 2a1 1 0 0 1 1 1v7h-2V4H7v16h5v2H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12zm0 10a3 3 0 0 1 3 3v1h1v5a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-5h1v-1a3 3 0 0 1 3-3zm2 6h-4v2h4v-2zm-2-4c-.508 0-1 .45-1 1v1h2v-1a1 1 0 0 0-1-1z"
        }, null)])])]);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixPhoneLock);
    };
  }
});
export {
  _sfc_main as default
};
