import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Dropbox",
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
    const RemixDropbox = () => {
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
          "d": "M17.285 10.668l5.215 3.323-5.252 3.346L12 13.993l-5.248 3.344L1.5 13.99l5.215-3.323L1.5 7.346 6.752 4 12 7.343 17.248 4 22.5 7.346l-5.215 3.322zm-.074 0L12 7.348l-5.211 3.32L12 13.988l5.211-3.32zM6.786 18.446l5.252-3.346 5.252 3.346-5.252 3.346-5.252-3.346z"
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
          "d": "M8.646 17.26l3.392 2.162 3.392-2.161 1.86 1.185-5.252 3.346-5.252-3.346 1.86-1.185zm-.877-8.28l2.393-1.553-2.425-1.574L5.28 7.37 7.77 8.98zm1.84 1.19L12 11.719l2.39-1.547L12 8.619l-2.391 1.552zm4.231 2.74l2.424 1.568 2.45-1.502-2.485-1.612-2.389 1.545zM12 6.234l4.237-2.748L22.46 7.33l-4.392 2.843 4.393 2.85-6.226 3.819L12 14.1l-4.235 2.74-6.23-3.817 4.396-2.851L1.539 7.33l6.224-3.843L12 6.235zm1.837 1.192L16.23 8.98l2.489-1.61-2.456-1.517-2.426 1.574zM10.16 12.91l-2.39-1.546-2.486 1.613 2.451 1.502 2.425-1.569z"
        }, null)])])]);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixDropbox);
    };
  }
});
export {
  _sfc_main as default
};
