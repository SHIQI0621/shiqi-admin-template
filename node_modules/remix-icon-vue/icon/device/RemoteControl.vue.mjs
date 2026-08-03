import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RemoteControl",
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
    const RemixRemoteControl = () => {
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
          "d": "M17 12a1 1 0 0 1 1 1v9H6v-9a1 1 0 0 1 1-1h10zm-7 2H8v2h2v-2zm2-8a6 6 0 0 1 5.368 3.316l-1.79.895a4 4 0 0 0-7.157 0l-1.789-.895A6 6 0 0 1 12 6zm0-4a10 10 0 0 1 8.946 5.527l-1.789.895A8 8 0 0 0 12 4a8 8 0 0 0-7.157 4.422l-1.79-.895A10 10 0 0 1 12 2z"
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
          "d": "M17 12a1 1 0 0 1 1 1v9h-2v-8H8v8H6v-9a1 1 0 0 1 1-1h10zm-5 4v2h-2v-2h2zm0-10a6 6 0 0 1 5.368 3.316l-1.79.895a4 4 0 0 0-7.157 0l-1.789-.895A6 6 0 0 1 12 6zm0-4a10 10 0 0 1 8.946 5.527l-1.789.895A8 8 0 0 0 12 4a8 8 0 0 0-7.157 4.422l-1.79-.895A10 10 0 0 1 12 2z"
        }, null)])])]);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixRemoteControl);
    };
  }
});
export {
  _sfc_main as default
};
