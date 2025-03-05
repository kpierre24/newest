<template>
  <transition name="modal">
    <div v-if="visible" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ title }}</h2>
          <button class="close-button" @click="closeModal">×</button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button v-if="showCancel" class="cancel-button" @click="closeModal">
            {{ cancelText }}
          </button>
          <button class="confirm-button" @click="confirmAction">
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    visible: Boolean,
    title: String,
    confirmText: {
      type: String,
      default: 'Confirm'
    },
    cancelText: {
      type: String,
      default: 'Cancel'
    },
    showCancel: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    confirmAction() {
      this.$emit('confirm');
    }
  }
};
</script>

<style scoped>
/* Add your modal styles here */
</style>
