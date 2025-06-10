require("dotenv").config();
const app = require("./app");
const bcrypt = require("bcrypt");
const User = require("./modules/user/user.model");
const sequelize = require("./config/database");

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();

    await sequelize.sync(); // Geliştirme ortamı için
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPass = process.env.ADMIN_PASSWORD;

    if (adminEmail && adminPass) {
      const [admin, created] = await User.findOrCreate({
        where: { email: adminEmail },
        defaults: {
          name: "Admin",
          role: "admin",
          password: await bcrypt.hash(adminPass, 10),
        },
      });
    } else {
      console.warn("⚠️ ADMIN_EMAIL veya ADMIN_PASSWORD env ayarları eksik.");
    }
    app.listen(PORT, () => {
      console.log(`Sunucu http://localhost:${PORT} üzerinde çalışıyor`);
    });
  } catch (error) {
    console.error("Veritabanı bağlantısı başarısız:", error);
  }
})();
