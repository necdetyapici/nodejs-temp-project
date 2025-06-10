const express = require("express");
const router = express.Router();

const userService = require("./user.service");
const UserController = require("./user.controller");
const validate = require("../../middlewares/validate");
const authMiddleware = require("../../middlewares/authMiddleware");
const requireRole = require("../../middlewares/requireRole");
const { createUserSchema, updateUserSchema } = require("./user.validation");

const userController = new UserController(userService);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Kullanıcı yönetimi
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Tüm kullanıcıları listele
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Kullanıcı listesi başarıyla getirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/", authMiddleware, requireRole("admin"), userController.findAll);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Belirli bir kullanıcıyı getir
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Kullanıcı bulundu
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Kullanıcı bulunamadı
 */
router.get(
  "/:id",
  authMiddleware,
  requireRole("admin"),
  userController.findById
);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Yeni kullanıcı oluştur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       201:
 *         description: Kullanıcı oluşturuldu
 *       400:
 *         description: Geçersiz istek
 */
router.post(
  "/",
  authMiddleware,
  requireRole("admin"),
  validate(createUserSchema),
  userController.create
);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Kullanıcıyı güncelle
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: Güncelleme başarılı
 *       404:
 *         description: Kullanıcı bulunamadı
 */
router.put(
  "/:id",
  authMiddleware,
  requireRole("admin"),
  validate(updateUserSchema),
  userController.update
);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Kullanıcıyı sil
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Silme başarılı
 *       404:
 *         description: Kullanıcı bulunamadı
 */
router.delete(
  "/:id",
  authMiddleware,
  requireRole("admin"),
  userController.delete
);

router.get(
  "/deleted",
  authMiddleware,
  requireRole("admin"),
  userController.softList
);

router.post(
  "/:id/restore",
  authMiddleware,
  requireRole("admin"),
  userController.restore
);
module.exports = router;
