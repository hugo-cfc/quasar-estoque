export default function useFormValidations() {
  const isRequired = (value: string) => {
    if (value && value.length > 0) {
      return true;
    }

    return 'Required';
  };

  const min6 = (value: string) => {
    if (value && value.length >= 6) {
      return true;
    }

    return 'Required 6 characters';
  };

  return {
    isRequired,
    min6,
  };
}
