import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TShirtAir",
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
    const RemixTShirtAir = () => {
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
          "d": "M12.707 17.793C13.534 18.62 14.295 19 15 19c.378 0 .68-.067 1.237-.276l.392-.152C17.679 18.15 18.209 18 19 18c1.214 0 2.379.545 3.486 1.58l.221.213-1.414 1.414C20.466 20.38 19.705 20 19 20c-.378 0-.68.067-1.237.276l-.392.152c-1.05.421-1.58.572-2.371.572-1.214 0-2.379-.545-3.486-1.58l-.221-.213 1.414-1.414zM9 3a3 3 0 0 0 6 0h6a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-9a2 2 0 0 0-1.995 1.85L10 14v7H6a1 1 0 0 1-1-1l-.001-8.001L3 12a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6zm3.707 10.793C13.534 14.62 14.295 15 15 15c.378 0 .68-.067 1.237-.276l.392-.152C17.679 14.15 18.209 14 19 14c1.214 0 2.379.545 3.486 1.58l.221.213-1.414 1.414C20.466 16.38 19.705 16 19 16c-.378 0-.68.067-1.237.276l-.392.152c-1.05.421-1.58.572-2.371.572-1.214 0-2.379-.545-3.486-1.58l-.221-.213 1.414-1.414z"
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
          "fill-rule": "nonzero",
          "d": "M12.707 17.793C13.534 18.62 14.295 19 15 19c.378 0 .68-.067 1.237-.276l.392-.152C17.679 18.15 18.209 18 19 18c1.214 0 2.379.545 3.486 1.58l.221.213-1.414 1.414C20.466 20.38 19.705 20 19 20c-.378 0-.68.067-1.237.276l-.392.152c-1.05.421-1.58.572-2.371.572-1.214 0-2.379-.545-3.486-1.58l-.221-.213 1.414-1.414zM9 3a3 3 0 0 0 6 0h6a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-4.002v-2L20 9.999v-5h-3.417l-.017.041a5.002 5.002 0 0 1-4.35 2.955L12 8a5.001 5.001 0 0 1-4.566-2.96L7.416 5H4v5l2.999-.001V19H10v2H6a1 1 0 0 1-1-1l-.001-8.001L3 12a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6zm3.707 10.793C13.534 14.62 14.295 15 15 15c.378 0 .68-.067 1.237-.276l.392-.152C17.679 14.15 18.209 14 19 14c1.214 0 2.379.545 3.486 1.58l.221.213-1.414 1.414C20.466 16.38 19.705 16 19 16c-.378 0-.68.067-1.237.276l-.392.152c-1.05.421-1.58.572-2.371.572-1.214 0-2.379-.545-3.486-1.58l-.221-.213 1.414-1.414z"
        }, null)])])]);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixTShirtAir);
    };
  }
});
export {
  _sfc_main as default
};
