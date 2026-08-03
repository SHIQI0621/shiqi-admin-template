import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "InsertRowBottom",
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
    const RemixInsertRowBottom = () => {
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
        "d": "M12 13c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5zm1 2h-2v1.999L9 17v2l2-.001V21h2v-2.001L15 19v-2l-2-.001V15zm7-12c.552 0 1 .448 1 1v6c0 .552-.448 1-1 1H4c-.552 0-1-.448-1-1V4c0-.552.448-1 1-1h16zM5 5v4h14V5H5z"
      }, null)])])]);
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixInsertRowBottom);
    };
  }
});
export {
  _sfc_main as default
};
