import { ref, watch } from 'vue';

export function useDateValidation() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize time to midnight
  const minDate = today.toISOString().split('T')[0];

  const dob = ref('');
  const dobError = ref('');

  const validateExpiryDate = (date) => {
    if (!date) return false;
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  };

  const validateDOB = () => {
    if (!dob.value) {
      dobError.value = 'Date of birth is required';
      return false;
    }

    const selectedDate = new Date(dob.value);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate >= today) {
      dobError.value = 'Date of birth cannot be today or in the future';
      return false;
    } else {
      dobError.value = '';
      return true;
    }
  };

  // Watch for changes in dob and validate automatically
  watch(dob, validateDOB);

  return {
    minDate,
    validateExpiryDate,
    validateDOB,
    dob,
    dobError,
  };
}
