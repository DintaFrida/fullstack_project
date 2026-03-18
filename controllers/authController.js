let users = []; // mock users

exports.register = (req, res) => {
    const newUser = { id: users.length + 1, ...req.body };
    users.push(newUser);
    res.json({ message: "User berhasil dibuat (mock)", userId: newUser.id });
};

exports.login = (req, res) => {
    const user = users.find(u => u.email === req.body.email && u.password === req.body.password);
    if(user){
        res.json({ message: "Login berhasil (mock)", userId: user.id, name: user.name });
    } else {
        res.status(401).json({ message: "Email atau password salah" });
    }
};