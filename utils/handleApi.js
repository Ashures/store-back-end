const handleApi = async (res, body) => {
  try {
    await body();
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
}

export default handleApi;