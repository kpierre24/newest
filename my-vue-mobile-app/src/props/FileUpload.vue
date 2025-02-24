<template>
  <div class="file-upload-container">
    <button 
      type="button" 
      class="browse-button" 
      @click.stop="triggerFileUpload"
    >
      {{ buttonText }}
    </button>
    <input
      ref="fileInput"
      type="file"
      :id="id"
      @change="handleFileUpload"
      :accept="accept"
      :multiple="multiple"
      style="display: none;"
    />
    <div v-if="fileName" class="file-name">{{ fileName }}</div>
  </div>
</template>

<script>
export default {
  name: 'FileUpload',
  props: {
    id: String,
    buttonText: {
      type: String,
      default: 'Browse'
    },
    accept: String,
    multiple: Boolean
  },
  data() {
    return {
      fileName: ''
    };
  },
  methods: {
    triggerFileUpload(event) {
      event.preventDefault();
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.fileName = file ? file.name : '';
      this.$emit('file-uploaded', file);
    }
  }
};
</script>

<style scoped>
.browse-button {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}
.browse-button {
  background-color: #7838dd; /* Purple background */
  color: white; /* White text */
}

.browse-button:hover {
  background-color: #9e79da; /* Lighter purple on hover */
}
</style>
