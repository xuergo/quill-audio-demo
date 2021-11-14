<template>
  <div class="my-quill">
    <div ref="editor"></div>
    <!-- 上传文件到OSS -->
    <image-upload
      ref="imageUpload"
      @onSuccess="insertFile($event, 'image')"
    ></image-upload>
    <!-- 视频 -->
    <video-upload
      ref="videoUpload"
      @onSuccess="insertFile($event, 'video')"
    ></video-upload>
    <!-- 音频 -->
    <audio-upload
      ref="audioUpload"
      @onSuccess="insertFile($event, 'audio')"
    ></audio-upload>
  </div>
</template>

<script>
import Quill from "quill";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module";
import AudioBlot from "./component/audio-blot";
Quill.register(AudioBlot);
Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);
import imageUpload from "./component/image-upload.vue";
import videoUpload from "./component/video-upload.vue";
import audioUpload from "./component/audio-upload.vue";
export default {
  name: "my-quill",
  components: {
    imageUpload,
    videoUpload,
    audioUpload,
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    toolbar: {
      type: Array,
      default: () => [
        ["bold", "italic", "underline", "strike"],
        [
          {
            header: [1, 2, 3, 4, 5, 6, false],
          },
        ],
        [
          {
            size: ["small", false, "large", "huge"],
          },
        ],
        [
          {
            color: [],
          },
          {
            background: [],
          },
        ],
        ["blockquote", "code-block"],
        [
          {
            list: "ordered",
          },
          {
            list: "bullet",
          },
        ],
        // [{ 'script': 'sub' }, { 'script': 'super' }],
        [
          {
            indent: "-1",
          },
          {
            indent: "+1",
          },
        ],
        [
          {
            align: [],
          },
        ],
        [
          {
            direction: "rtl",
          },
        ],
        // [{ 'font': [] }],
        ["clean"],
        ["link", "image", "video", "audio"],
      ],
    },
  },
  data() {
    var _this = this;
    return {
      Quill: null,
      currentValue: "",
      options: {
        theme: "snow",
        bounds: document.body,
        debug: "warn",
        modules: {
          toolbar: {
            container: this.toolbar,
            handlers: {
              image: function (value) {
                if (value) {
                  _this.$refs.imageUpload.open();
                } else {
                  _this.quill.format("image", false);
                }
              },
              video: function (value) {
                if (value) {
                  _this.$refs.videoUpload.open();
                } else {
                  _this.quill.format("video", false);
                }
              },
              audio: function (value) {
                if (value) {
                  _this.$refs.audioUpload.open();
                } else {
                  _this.quill.format("audio", false);
                }
              },
            },
          },
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false,
          },
          imageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white",
            },
            modules: ["Resize", "DisplaySize", "Toolbar"],
          },
        },
        initAudioButton: function () {
          //初始化"audio"按钮样式
          const audioButtons = document.querySelectorAll(".ql-audio"); //"ql-" 是插件自动加的前缀
          audioButtons.forEach((item) => {
            item.innerHTML =
              '<i class="ivu-icon ivu-icon-md-volume-up" style="font-size: 20px;float: left;"></i>';
          });
        },
        placeholder: "内容...",
        readOnly: false,
      },
    };
  },
  watch: {
    value: {
      handler(val) {
        if (val !== this.currentValue) {
          this.currentValue = val;
          if (this.Quill) {
            // this.Quill.pasteHTML(this.value);
            this.$refs.editor.children[0].innerHTML = newVal;
          }
        }
      },
      immediate: true,
    },
  },
  methods: {
    init() {
      const editor = this.$refs.editor;
      // 初始化编辑器
      this.Quill = new Quill(editor, this.options);
      // 默认值
      this.Quill.pasteHTML(this.currentValue);
      this.Quill.options.initAudioButton(); //初始化音频图标，这样才能显示
    },
    //插入图片音频视频
    insertFile(url, type) {
      if (url !== null) {
        // 获取光标所在位置
        let length = this.Quill.selection.savedRange.index;
        // 插入图片
        if (type == "image") {
          this.Quill.insertEmbed(length, "image", url);
          this.Quill.setSelection(length + 1);
        } else if (type == "video") {
          this.Quill.insertEmbed(length, "video", url);
          this.Quill.setSelection(length + 1);
        } else if (type == "audio") {
          this.Quill.insertEmbed(length, "audio", { url: url }, "api");
          this.Quill.setSelection(length + 1); //光标位置向后移动一位
        }
      }
    },
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    console.log("销毁");
    // 在组件销毁后销毁实例
    this.Quill = null;
  },
};
</script>
<style lang="less">
</style>
