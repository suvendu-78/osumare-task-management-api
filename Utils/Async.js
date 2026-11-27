const Async = (fn) => async (req, res, next) => {
  try {
    const data = fn(req, res, next);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export default Async;
