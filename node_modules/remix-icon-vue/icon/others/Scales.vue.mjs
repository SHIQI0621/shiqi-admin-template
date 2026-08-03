import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Scales",
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
    const RemixScales = () => {
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
          "d": "M13 2v1h7v2h-7v14h4v2H7v-2h4V5H4V3h7V2h2zM5 6.343l2.828 2.829C8.552 9.895 9 10.895 9 12c0 2.21-1.79 4-4 4s-4-1.79-4-4c0-1.105.448-2.105 1.172-2.828L5 6.343zm14 0l2.828 2.829C22.552 9.895 23 10.895 23 12c0 2.21-1.79 4-4 4s-4-1.79-4-4c0-1.105.448-2.105 1.172-2.828L19 6.343zm0 2.829l-1.414 1.414C17.212 10.96 17 11.46 17 12l4 .001c0-.54-.212-1.041-.586-1.415L19 9.172zm-14 0l-1.414 1.414C3.212 10.96 3 11.46 3 12l4 .001c0-.54-.212-1.041-.586-1.415L5 9.172z"
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
          "d": "M13 2v1h7v2h-7v14h4v2H7v-2h4V5H4V3h7V2h2zM5 6.343l2.828 2.829C8.552 9.895 9 10.895 9 12c0 2.21-1.79 4-4 4s-4-1.79-4-4c0-1.105.448-2.105 1.172-2.828L5 6.343zm14 0l2.828 2.829C22.552 9.895 23 10.895 23 12c0 2.21-1.79 4-4 4s-4-1.79-4-4c0-1.105.448-2.105 1.172-2.828L19 6.343zM5 9.172l-1.414 1.414C3.212 10.96 3 11.46 3 12c0 1.105.895 2 2 2s2-.895 2-2c0-.54-.212-1.04-.586-1.414L5 9.172zm14 0l-1.414 1.414C17.212 10.96 17 11.46 17 12c0 1.105.895 2 2 2s2-.895 2-2c0-.54-.212-1.04-.586-1.414L19 9.172z"
        }, null)])])]);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixScales);
    };
  }
});
export {
  _sfc_main as default
};
