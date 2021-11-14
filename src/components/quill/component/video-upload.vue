<template>
  <Modal v-model="modal1" title="插入视频">
    <Tabs v-model="tabName">
      <TabPane label="上传文件" name="name1"></TabPane>
      <TabPane label="输入地址" name="name2"></TabPane>
    </Tabs>

    <div
      v-if="tabName == 'name1'"
      class="upload-box"
      @click="$refs.quillUpload.changeFile()"
    >
      <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
      <p>点击上传</p>
      <Progress :percent="percent" />
    </div>

    <div v-if="tabName == 'name2'">
      <Input v-model="url" placeholder="请输入地址" />
      <video v-if="url" :src="url" controls="controls"></video>
    </div>

    <div slot="footer">
      <Button @click="modal1 = false">取消</Button>
      <Button type="primary" @click="ok">确认</Button>
    </div>
    <!-- 上传文件到OSS -->
    <upload-oss
      ref="quillUpload"
      type="video"
      fileHostPath="question/video"
      :isSingle="false"
      :onProgress="
        (e) => {
          percent = e.progress;
        }
      "
      :onSuccess="handleAvatarSuccess"
      :onError="uploadError"
    >
    </upload-oss>
  </Modal>
</template>

<script>
import uploadOss from "@/components/upload/upload-oss.vue";
export default {
  components: {
    uploadOss,
  },
  data() {
    return {
      tabName: "name1",
      modal1: false,
      percent: 0,
      url: "",
      ossUrl: "",
    };
  },
  methods: {
    open() {
      this.percent = 0;
      this.url = "";
      this.modal1 = true;
      this.tabName = "name1";
    },
    handleAvatarSuccess(url) {
      this.ossUrl = url;
    },
    ok() {
      if (this.tabName == "name1") {
        if (!this.ossUrl) {
          this.$Modal.error({
            title: "请上传视频",
          });
          return;
        }
        this.$emit("onSuccess", this.ossUrl);
        this.modal1 = false;
      } else {
        if (!this.url) {
          this.$Modal.error({
            title: "请输入视频地址",
          });
          return;
        }
        this.$emit("onSuccess", this.url);
        this.modal1 = false;
      }
    },
    uploadError() {
      this.$Notice.warning({
        title: "上传文件失败",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.upload-box {
  width: 100%;
  text-align: center;
  cursor: pointer;
}

video {
  margin-top: 20px;
  width: 100%;
  height: auto;
}
</style>
