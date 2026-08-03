import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "HomeGear",
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
    const RemixHomeGear = () => {
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
          "d": "M20 20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9zM8.592 13.808l-.991.572 1 1.733.993-.573a3.5 3.5 0 0 0 1.405.811v1.145h2.002V16.35a3.5 3.5 0 0 0 1.405-.81l.992.572L16.4 14.38l-.991-.572a3.504 3.504 0 0 0 0-1.62l.991-.573-1-1.733-.993.573A3.5 3.5 0 0 0 13 9.645V8.5h-2.002v1.144a3.5 3.5 0 0 0-1.405.811l-.992-.573L7.6 11.616l.991.572a3.504 3.504 0 0 0 0 1.62zm3.408.69a1.5 1.5 0 1 1-.002-3.001 1.5 1.5 0 0 1 .002 3z"
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
          "d": "M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454-6 5.454V19zm2.591-5.191a3.508 3.508 0 0 1 0-1.622l-.991-.572 1-1.732.991.573a3.495 3.495 0 0 1 1.404-.812V8.5h2v1.144c.532.159 1.01.44 1.404.812l.991-.573 1 1.731-.991.573a3.508 3.508 0 0 1 0 1.622l.991.572-1 1.731-.991-.572a3.495 3.495 0 0 1-1.404.811v1.145h-2V16.35a3.495 3.495 0 0 1-1.404-.811l-.991.572-1-1.73.991-.573zm3.404.688a1.5 1.5 0 1 0 0-2.998 1.5 1.5 0 0 0 0 2.998z"
        }, null)])])]);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixHomeGear);
    };
  }
});
export {
  _sfc_main as default
};
