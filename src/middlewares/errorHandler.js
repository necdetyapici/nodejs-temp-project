module.exports = (err, req, res, next) => {
  console.error("❌ Hata:", err);

  const status = err.status || 500;
  const message = err.message || "Bilinmeyen bir sunucu hatası";

  res.status(status).json({
    error: message,
  });
};
