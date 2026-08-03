import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LinkUnlink",
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
    const RemixLinkUnlink = () => {
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
        "d": "M17 17h5v2h-3v3h-2v-5zM7 7H2V5h3V2h2v5zm11.364 8.536L16.95 14.12l1.414-1.414a5 5 0 1 0-7.071-7.071L9.879 7.05 8.464 5.636 9.88 4.222a7 7 0 0 1 9.9 9.9l-1.415 1.414zm-2.828 2.828l-1.415 1.414a7 7 0 0 1-9.9-9.9l1.415-1.414L7.05 9.88l-1.414 1.414a5 5 0 1 0 7.071 7.071l1.414-1.414 1.415 1.414zm-.708-10.607l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z"
      }, null)])])]);
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixLinkUnlink);
    };
  }
});
export {
  _sfc_main as default
};
