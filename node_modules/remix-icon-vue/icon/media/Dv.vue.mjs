import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Dv",
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
    const RemixDv = () => {
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
          "d": "M4 14.745a7 7 0 1 1 8 0V21a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6.255zM8 14A5 5 0 1 0 8 4a5 5 0 0 0 0 10zm-1 4v2h2v-2H7zm1-6a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm6 5v-1.292A8.978 8.978 0 0 0 17 9a8.966 8.966 0 0 0-2.292-6H21a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-7zm4-10v2h2V7h-2z"
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
          "d": "M11.608 3H21a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-7v-2h6V5h-6.255A6.968 6.968 0 0 1 15 9a6.992 6.992 0 0 1-3 5.745V21a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6.255A7 7 0 1 1 11.608 3zM6 13.584V20h4v-6.416a5.001 5.001 0 1 0-4 0zM8 12a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm9-3h2v2h-2V7zM7 17h2v2H7v-2z"
        }, null)])])]);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixDv);
    };
  }
});
export {
  _sfc_main as default
};
