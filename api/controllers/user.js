import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM usuarios";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  const q = "INSERT INTO usuarios(`nome`, `email`, `telefone`, `data_nascimento`) VALUES(?)";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.telefone, 
    req.body.data_nascimento,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Usuário criado com sucesso.");
  });
};

export const updateUser = (req, res) => {
  const q =
    "UPDATE usuarios SET `nome` = ?, `email` = ?, `telefone` = ?, `data_nascimento` = ? WHERE `id_usuarios` = ?";

  
  const values = [
    req.body.nome,
    req.body.email,
    req.body.telefone,
    req.body.data_nascimento,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Usuário atualizado com sucesso.");
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM usuarios WHERE `id_usuarios` = ?";

  db.query(q, [req.params.id], (err, result) => {
    
    if (err) return res.status(500).json(err);

    
    if (result.affectedRows === 0) {
        return res.status(404).json("Usuário não encontrado ou já deletado.");
    }

    
    return res.status(200).json("Usuário deletado com sucesso.");
  });
};