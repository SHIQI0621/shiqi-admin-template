import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Plant",
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
    const RemixPlant = () => {
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
          "d": "M0 0H24V24H0z"
        }, null), createVNode("path", {
          "d": "M21 3v2c0 3.866-3.134 7-7 7h-1v1h5v7c0 1.105-.895 2-2 2H8c-1.105 0-2-.895-2-2v-7h5v-3c0-3.866 3.134-7 7-7h3zM5.5 2c2.529 0 4.765 1.251 6.124 3.169C10.604 6.51 10 8.185 10 10v1h-.5C5.358 11 2 7.642 2 3.5V2h3.5z"
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
          "d": "M0 0H24V24H0z"
        }, null), createVNode("path", {
          "d": "M6 2c2.69 0 5.024 1.517 6.197 3.741C13.374 4.083 15.31 3 17.5 3H21v2.5c0 3.59-2.91 6.5-6.5 6.5H13v1h5v7c0 1.105-.895 2-2 2H8c-1.105 0-2-.895-2-2v-7h5v-2H9c-3.866 0-7-3.134-7-7V2h4zm10 13H8v5h8v-5zm3-10h-1.5C15.015 5 13 7.015 13 9.5v.5h1.5c2.485 0 4.5-2.015 4.5-4.5V5zM6 4H4c0 2.761 2.239 5 5 5h2c0-2.761-2.239-5-5-5z"
        }, null)])])]);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixPlant);
    };
  }
});
export {
  _sfc_main as default
};
