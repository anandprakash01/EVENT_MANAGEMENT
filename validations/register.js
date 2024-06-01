const validateRegistratinData = data => {
  const err = {
    hasError: false,
    message: "",
  };

  if (!data.name) {
    err.hasError = true;
    err.message = "Name is required";
  }
  if (!data.email) {
    err.hasError = true;
    err.message = "Email is required";
  }
  if (!data.password) {
    err.hasError = true;
    err.message = "Password is required";
  }

  return err;
};

module.exports = validateRegistratinData;
