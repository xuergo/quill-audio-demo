<template>
  <div class="home">
    <my-quill :toolbar="toolbar" v-model="formQuestionsData.title"> </my-quill>
    <h1>预览</h1>
    <Input v-model="formQuestionsData.title" />
    <div v-html="formQuestionsData.title"></div>
  </div>
</template>

<script>
import myQuill from "@/components/quill";

export default {
  name: "Home",
  components: {
    myQuill,
  },
  data() {
    return {
      formQuestionsData: { title: "" },
      toolbar: [
        ["image", "video", "audio"],
        [
          {
            script: "sub",
          },
          {
            script: "super",
          },
        ],
        ["bold", "italic", "underline", "strike"],
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
            font: [],
          },
        ],
        ["clean"],
      ],
    };
  },
};
</script>
