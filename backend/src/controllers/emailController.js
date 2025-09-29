"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recoveryPassoword = void 0;
const emailService_1 = require("../services/emailService");
const tokenUtils_1 = require("../utils/tokenUtils");
const user_1 = require("../models/user");
const recoveryPassoword = async (req, res) => {
    const { email } = req.body;
    try {
        //Buscar usuario por email en la DB
        const user = await user_1.User.findOne({ email });
        if (!user)
            return res.status(404).json({ message: 'Usuario no encontrado' });
        //Crear token o link de recuperación (puedes usar JWT o un UUID)
        const resetToken = await (0, tokenUtils_1.generateToken)({ userId: user.id });
        console.log("Reset token:", resetToken);
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
        console.log("Reset link:", resetLink);
        //Enviar correo con el link
        await (0, emailService_1.sendRecoveryEmail)(email, resetLink);
        return res.status(200).json({ message: 'Correo de recuperación enviado' });
    }
    catch (error) {
        console.log("Error al enviar el correo", error);
        return res.status(500).json({ message: 'Se presentaron problemas al enviar el correo' });
    }
};
exports.recoveryPassoword = recoveryPassoword;
//# sourceMappingURL=emailController.js.map