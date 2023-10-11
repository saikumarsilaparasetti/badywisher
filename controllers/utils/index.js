module.exports = {
  successResponse: (res, data, message = "success") => {
    res.status(200).json({
      success: true,
      message,
      data,
    });
  },
  errorResponse: (res, err, message = "error") => {
    res.status(500).json({
      success: false,
      message,
      err,
    });
  },
};
