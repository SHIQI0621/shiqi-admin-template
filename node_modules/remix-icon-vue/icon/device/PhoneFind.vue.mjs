import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PhoneFind",
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
    const RemixPhoneFind = () => {
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
          "d": "M18 2a1 1 0 0 1 1 1v8.529A6 6 0 0 0 9 16c0 3.238 2.76 6 6 6H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12zm-3 10a4 4 0 0 1 3.446 6.032l2.21 2.21-1.413 1.415-2.211-2.21A4 4 0 1 1 15 12zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
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
          "d": "M18 2a1 1 0 0 1 1 1v8h-2V4H7v16h4v2H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12zm-3 10a4 4 0 0 1 3.446 6.032l2.21 2.21-1.413 1.415-2.212-2.21A4 4 0 1 1 15 12zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
        }, null)])])]);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixPhoneFind);
    };
  }
});
export {
  _sfc_main as default
};
