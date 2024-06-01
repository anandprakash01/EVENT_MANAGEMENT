const validateRegistratinData = data => {
  const err = {
    hasError: false,
    message: "",
  };

  if (!data.name) {
    err.hasError = true;
    err.message = "Name, ";
  }
  if (!data.email) {
    err.hasError = true;
    err.message = "Email ";
  }
  if (!data.password) {
    err.hasError = true;
    err.message = "and Password ";
  }
  err.message = err.message + "is required";

  return err;
};

module.exports = validateRegistratinData;
