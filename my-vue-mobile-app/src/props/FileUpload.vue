<template>
  <div class="file-upload-container">
    <button 
      type="button" 
      class="browse-button" 
      @click.stop="triggerFileUpload"
      :class="{ 'has-file': fileName }"
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
    <div v-if="fileName" class="file-name">
      <span>{{ fileName }}</span>
      <button type="button" class="clear-file" @click="clearFile">×</button>
    </div>
    <div v-if="error" class="file-error">{{ error }}</div>
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
    multiple: Boolean,
    maxSize: {
      type: Number,
      default: 5 // Default max size in MB
    },
    required: Boolean
  },
  data() {
    return {
      fileName: '',
      error: ''
    };
  },
  methods: {
    triggerFileUpload(event) {
      event.preventDefault();
      this.$refs.fileInput.click();
    },
    
    handleFileUpload(event) {
      this.error = '';
      const selectedFile = event.target.files[0];
      
      if (!selectedFile) {
        this.fileName = '';
        this.$emit('file-uploaded', null);
        
        // Emit validation event if required
        if (this.required) {
          this.$emit('validation', { field: this.id, valid: false, message: 'File is required' });
        }
        return;
      }
      
      // Check file size
      const fileSizeInMB = selectedFile.size / (1024 * 1024);
      if (fileSizeInMB > this.maxSize) {
        this.error = `File size exceeds ${this.maxSize}MB limit`;
        this.fileName = '';
        this.$emit('file-uploaded', null);
        this.$emit('validation', { field: this.id, valid: false, message: this.error });
        return;
      }
      
      this.fileName = selectedFile.name;
      this.$emit('file-uploaded', selectedFile);
      this.$emit('validation', { field: this.id, valid: true });
      console.log('File uploaded:', selectedFile.name);
    },
    
    clearFile() {
      this.fileName = '';
      this.error = '';
      // Reset the file input
      this.$refs.fileInput.value = '';
      this.$emit('file-uploaded', null);
      
      // Emit validation event if required
      if (this.required) {
        this.$emit('validation', { field: this.id, valid: false, message: 'File is required' });
      }
    }
  }
};
</script>

<style scoped>
.file-upload-container {
  width: 100%;
  margin-bottom: 15px;
}

.browse-button {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  background-color: #7838dd; /* Purple background */
  color: white; /* White text */
}

.browse-button:hover {
  background-color: #9e79da; /* Lighter purple on hover */
}

.browse-button.has-file {
  background-color: #4CAF50; /* Green background when file is selected */
}

.file-name {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  padding: 8px 12px;
  background-color: #f0f0f0;
  border-radius: 4px;
  font-size: 14px;
  word-break: break-all;
}

.clear-file {
  background: none;
  border: none;
  color: #ff4d4d;
  font-size: 18px;
  cursor: pointer;
  padding: 0 5px;
}

.file-error {
  color: #ff4d4d;
  font-size: 12px;
  margin-top: 5px;
}
</style>
