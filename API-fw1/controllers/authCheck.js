const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models");

// ================= LOGIN =================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Email hoặc mật khẩu không chính xác!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Email hoặc mật khẩu không chính xác!" });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // ✅ PHẢI CÓ id ở đây
    return res.status(200).json({
      message: "Đăng nhập thành công!",
      token,
      user: {
        id: user.id,  // QUAN TRỌNG NHẤT
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone
      }
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

// ================= VERIFY TOKEN =================
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Chưa đăng nhập" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token không hợp lệ" });
  }
};

// ================= CHECK ADMIN =================
const isAdmin = (req, res, next) => {
  if (req.user.role!== 'admin') {
    return res.status(403).json({ message: "Không có quyền" });
  }
  next();
};

module.exports = {
  login,
  verifyToken,
  isAdmin
};
