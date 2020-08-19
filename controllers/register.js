const handleRegister = (req, res, db, bcrypt) => {
  const { email, password, name } = req.body;
  if (!email || !name || !password ) {
    return res.status(400).json('incorrect form sbmission')
  }
  const hash = bcrypt.hashSync(password);
  db.transaction(trx => {
    trx.insert({
      hash,
      email
    })
    .into('login')
    .returning('email')
    .then(loginEmail => {
      data = {
        name,
        email: loginEmail[0],
        joined: new Date()
      };
      return trx('users')
        .returning('*')
        .insert(data)
        .then(user => {
          res.json(user[0]);
        })
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  // bcrypt.hash(password, null, null, function(err, hash) {
  //   // Store hash in your password DB.
  //   console.log(hash);
  // });
  .catch (err => res.status(400).json('Unable to register'));
}

module.exports = { handleRegister };