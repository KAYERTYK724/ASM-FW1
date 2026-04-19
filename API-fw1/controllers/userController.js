const UserModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "123456";

class UserController {
  // 📌 Lấy danh sách user
  static async get(req, res) {
    try {
      const users = await UserModel.findAll();

<<<<<<< HEAD
=======
  static async get(req, res) {
    try {
      const users = await UserModel.findAll();

>>>>>>> fce904397fd94518b0670247ee6d541b764ec14d
      res.status(200).json({
        status: 200,
        message: 'Lấy danh sách thành công',
        data: users,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 📌 Lấy user theo ID
  static async getById(req, res) {
    try {
      const { id } = req.params;

      const user = await UserModel.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: 'Id không tồn tại' });
      }

      res.status(200).json({
        status: 200,
        data: user,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 📌 Thêm user
  static async create(req, res) {
    try {
      const { username, password, email, name, phone, status, role } = req.body;

      const user = await UserModel.create({
        username,
<<<<<<< HEAD
        password,
=======
        password, // model tự hash
>>>>>>> fce904397fd94518b0670247ee6d541b764ec14d
        email,
        name,
        phone,
        status,
        role,
      });

      res.status(201).json({
        message: 'Thêm mới thành công',
        user,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

<<<<<<< HEAD
  // 📌 Cập nhật user
=======
  // Cập nhật user
>>>>>>> fce904397fd94518b0670247ee6d541b764ec14d
  static async update(req, res) {
    try {
      const { id } = req.params;

      const user = await UserModel.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'Id không tồn tại' });
      }

      const { username, password, email, name, phone, status, role } = req.body;

      user.username = username;
<<<<<<< HEAD
      user.password = password;
=======
>>>>>>> fce904397fd94518b0670247ee6d541b764ec14d
      user.email = email;
      user.name = name;
      user.phone = phone;
      user.status = status;
      user.role = role;

<<<<<<< HEAD
      await user.save();

=======
      // nếu có password mới thì hash
      if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }

      await user.save();

>>>>>>> fce904397fd94518b0670247ee6d541b764ec14d
      res.status(200).json({
        message: 'Cập nhật thành công',
        user,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

<<<<<<< HEAD
  // 📌 Xóa user
  static async delete(req, res) {
    try {
      const { id } = req.params;

      const user = await UserModel.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'Id không tồn tại' });
      }

      await user.destroy();

=======

  static async delete(req, res) {
    try {
      const { id } = req.params;

      const user = await UserModel.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'Id không tồn tại' });
      }

      await user.destroy();

>>>>>>> fce904397fd94518b0670247ee6d541b764ec14d
      res.status(200).json({
        message: 'Xóa thành công',
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

<<<<<<< HEAD
  static async register(req, res) {
    try {
      const { name, email, password, username, phone } = req.body;

      // 🚨 validate
      if (!username || !email || !password) {
        return res.status(400).json({ message: 'Thiếu username hoặc email hoặc password' });
      }

      const existingUser = await UserModel.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email đã tồn tại!' });
      }

      // 🔐 hash password
      const hashedPassword = await bcrypt.hash(password, 10);
=======

  static async register(req, res) {
    try {
      const { name, email, password, username, phone } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ message: 'Thiếu username hoặc email hoặc password' });
      }

      const existingUser = await UserModel.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email đã tồn tại!' });
      }
>>>>>>> fce904397fd94518b0670247ee6d541b764ec14d

      const user = await UserModel.create({
        name,
        email,
        username,
<<<<<<< HEAD
        password: hashedPassword,
        phone, 
=======
        password,
        phone,
>>>>>>> fce904397fd94518b0670247ee6d541b764ec14d
      });

      res.status(201).json({
        message: 'Đăng ký thành công!',
        user,
      });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
  }

<<<<<<< HEAD
=======
  //LOGIN
>>>>>>> fce904397fd94518b0670247ee6d541b764ec14d
  static async login(req, res) {
    try {
      const { email, password } = req.body;

<<<<<<< HEAD
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: 'Email hoặc mật khẩu không chính xác!' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Email hoặc mật khẩu không chính xác!' });
      }

      const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '1h' },
      );
      return res.status(200).json({
        message: 'Đăng nhập thành công!',
        token,
      });
    } catch (error) {
      console.error('Lỗi server:', error);
      return res
        .status(500)
        .json({ message: 'Lỗi server, vui lòng thử lại!', error: error.message });
=======
      if (!email || !password) {
        return res.status(400).json({ message: 'Thiếu email hoặc password' });
      }

      //mới sửa ở đây nè khánh
      const user = await UserModel.findOne({ where: { email } });

      if (!user) {
        return res.status(400).json({ message: 'Email hoặc mật khẩu không chính xác!' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Email hoặc mật khẩu không chính xác!' });
      }

      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      return res.status(200).json({
        message: 'Đăng nhập thành công!',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });

    } catch (error) {
      console.error('Lỗi server:', error);
      return res.status(500).json({
        message: 'Lỗi server, vui lòng thử lại!',
        error: error.message,
      });
>>>>>>> fce904397fd94518b0670247ee6d541b764ec14d
    }
  }
}

module.exports = UserController;