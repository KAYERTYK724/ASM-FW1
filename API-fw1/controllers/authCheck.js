const jwt = require("jsonwebtoken");
const { User } = require("../models"); // nếu bạn dùng index.js

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // tìm user
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({
        message: "Email không tồn tại"
      });
    }

    // check password
    if (user.password !== password) {
      return res.status(400).json({
        message: "Sai mật khẩu"
      });
    }

    // tạo token (PHẢI có role)
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // trả về
    return res.json({
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        }
      }
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Lỗi server"
    });
  }
};

// nhớ export
module.exports = {
  ...module.exports,
  login
};