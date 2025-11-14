import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post("/cadastro", async(req,res) => {
    const { nome, email, senha, confirmarSenha } = req.body;
    const User = req.app.get('models').User;

    if(!nome || !email || !senha || !confirmarSenha){
        return res.status(400).json({ error: "Todos os campos são obrigatorios" });
    }

    if(senha !== confirmarSenha){
        return res.status(400).json({ error: "As senhas não coincidem." });
    }

    try {
        
        const usuarioExistente = await User.findOne({ where: {email} });
        if(usuarioExistente){
            return res.status(409).json({ error: "Esse e-mail já está cadastrado." });
        }

        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha, salt);

        const novoUsuario = await User.create({
            nome: nome,
            email: email,
            senha: senhaHash
        });

        const token = jwt.sign(
            { id: novoUsuario.id, email: novoUsuario.email, nome: novoUsuario.nome },
            process.env.JWT_SECRET,
            { expiresIn: '24' }
        );
        
        return res.status(201).json({
            message: 'Usuario criado com sucesso!',
            token,
            user: {
                id: novoUsuario.id,
                nome: novoUsuario.nome,
                email: novoUsuario.email
            }
        });

    } catch (error) {
        console.error('Erro ao cadastrar usuário:', err);
        return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
})

router.post("/login", async(req,res) => {
    const { email, senha } = req.body;
    const User = req.app.get('models').User;

    if(!email || !senha){
        return res.status(400).json({ error: "Todos os campos são obrigatorios" });
    }

    try {
        
        const usuario = await User.findOne({ where: {email} });
        if(!usuario){
            return res.status(401).json({ error: "E-mail ou senha incorretos." });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if(!senhaValida){
            return res.status(401).json({ error: "E-mail ou senha incorretos." });
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email, nome: usuario.nome },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        return res.status(201).json({
            message: 'Login realizado com sucesso!',
            token,
            user: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        });

    } catch (err) {
        console.error('Erro ao realizar login:', err);
        return res.status(500).json({ error: 'Erro ao realizar login' });
    }
})

export default router;