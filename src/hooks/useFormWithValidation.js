import React, { useCallback } from 'react';

function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const { target } = event;
    const { name } = target;
    const { value } = target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    setValues,
    handleChange,
    errors,
    isValid,
    setIsValid,
    resetForm,
  };
}

export default useFormWithValidation;



// import { useState, useCallback } from 'react';

// import { validateForm } from '../utils/validateFormFunc';

// function useFormWithValidation() {
//   const [values, setValues] = useState({});
//   const [errors, setErrors] = useState({});
//   const [isValid, setIsValid] = useState(false);
//   const [isFocused, setIsFocused] = useState(false);


//   const onFocus = () => {
//     setIsFocused(true);
//   };

//   const handleChange = (event) => {
//     const target = event.target;
//     const name = target.name;
//     const value = target.value;
//     const error = validateForm(name, value);
//     setErrors(validateForm(name, value));
//     setValues({...values, [name]: value});
//     if(Object.keys(error).length === 0){
//       setIsValid(target.closest("form").checkValidity());
//     }
//   };

//   const resetForm = useCallback(
//     (newErrors = {}, newIsValid = false) => {
//       setErrors(newErrors);
//       setIsValid(newIsValid);
//     },
//     [setErrors, setIsValid]
//   );

//   return {
//     values,
//     handleChange,
//     errors,
//     isValid,
//     resetForm,
//     onFocus,
//     isFocused,
//     setValues
//   };
// }

// export default useFormWithValidation;
