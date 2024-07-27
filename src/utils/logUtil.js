const logRequest = (req, res, next) => {
    let msg = `[${req.method}] ${new Date().toISOString()} - ${req.url}`;
    if (req.body) msg = `${msg} - body: ${JSON.stringify(req.body)}`;
    console.log(msg);
    next();
  };
  
  module.exports = {
    logRequest,
  };
  