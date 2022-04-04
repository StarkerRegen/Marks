import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    // check token is valid or not
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodedData;
    // 注册用户
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "viima");
      req.userId = decodedData?.id;
    } else {
      // google认证用户
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log({ message: error.message });
  }
};

export default auth;
