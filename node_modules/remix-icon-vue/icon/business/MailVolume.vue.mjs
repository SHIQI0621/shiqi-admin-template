import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MailVolume",
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
    const RemixMailVolume = () => {
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
          "d": "M20 14.5v9L16.667 21H14v-4h2.667L20 14.5zM21 3a1 1 0 0 1 1 1v10.529A6 6 0 0 0 12.34 21L3.002 21a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18zm0 14a2 2 0 0 1 .15 3.995L21 21v-4zM5.647 6.238L4.353 7.762l7.72 6.555 7.581-6.56-1.308-1.513-6.286 5.438-6.413-5.444z"
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
          "d": "M20 14.5v9L16.667 21H14v-4h2.667L20 14.5zM21 3a1 1 0 0 1 1 1v9h-2V7.237l-7.928 7.101L4 7.215V19h8v2H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18zm0 14a2 2 0 0 1 .15 3.995L21 21v-4zM19.5 5H4.511l7.55 6.662L19.5 5z"
        }, null)])])]);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixMailVolume);
    };
  }
});
export {
  _sfc_main as default
};
