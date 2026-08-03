import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TextDirectionL",
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
    const RemixTextDirectionL = () => {
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
        "d": "M11 5v10H9v-4a4 4 0 1 1 0-8h8v2h-2v10h-2V5h-2zM9 5a2 2 0 1 0 0 4V5zm8 12v-2.5l4 3.5-4 3.5V19H5v-2h12z"
      }, null)])])]);
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixTextDirectionL);
    };
  }
});
export {
  _sfc_main as default
};
