const express = require('express')
const route = express.Router()
const cors = require('cors')
const auth = require('../middlewares/auth')
const fileUpload = require('express-fileupload')
const path = require('path')
route.use(cors())
route.use(fileUpload())
route.use('../uploads', express.static('uploads'))
route.use(express.json())
const connection = require('../db_connection')

route.get('/getAll', auth, (req, res) => {
  connection.connect()

  var query = connection.query(
    'SELECT p.statue as status, p.id_prod as ref,p.nom,p.img,p.qte,p.prix,f.nom as fournisseur FROM `produits` as p ,fournisseurs as f WHERE f.id_four=p.id_four',
    function (error, results, fields) {
      if (error) throw error
      res.json({ status: 'ok', data: results })
    }
  )
  connection.end()
})

route.get('/getProd/:id', auth, (req, res) => {
  connection.connect()
  if (req.role !== 'admin') {
    return res.json({ status: 'ko', data: "vous n'avez pas le droit d'accès" })
  }
  const id = req.params.id
  var query = connection.query(
    'SELECT * FROM produits WHERE id_prod = ?',
    [id],
    function (error, results, fields) {
      if (error) throw error

      res.json({ status: 'ok', data: results[0] })
    }
  )
  connection.end()
  //
})

route.post('/add', auth, (req, res) => {
  if (req.role !== 'admin' && req.role !== 'vendeur') {
    return res.json({ status: 'ko', data: "vous n'avez pas le droit d'accès" })
  }

  connection.connect()

  let { ref, qte, nom, prix, fournisseur } = req.body
  let img
  qte = parseInt(qte)
  fournisseur = parseInt(fournisseur)
  prix = parseFloat(prix)

  if (req.role !== 'admin' && req.role !== 'vendeur') {
    return res.json({ status: 'ko', data: "vous n'avez pas le droit d'accès" })
  }

  let uploadedFile = req?.files?.img
  if (uploadedFile) {
    const newImgName = Math.floor(Math.random() * 100) + uploadedFile.name
    const uploadPath = path.join(__dirname, '..', 'uploads', newImgName)

    uploadedFile.mv(uploadPath, (err) => {
      if (err) console.log(err)
    })
    img = newImgName
  } else {
    img = 'defaultImg.png'
  }

  var query = connection.query(
    'INSERT INTO produits values (?,?,?,?,?,?,?) ',
    [ref, nom, img, qte, prix, fournisseur, 1],
    function (error, results, fields) {
      if (error) {
        console.log(error)
        return res.json({ status: 'ko', data: 'produit non ajouté' })
      }
      if (results.affectedRows > 0) {
        res.json({ status: 'ok', data: 'produit ajouté avec succés' })
      } else {
        res.json({ status: 'ko', data: 'produit non ajouté' })
      }
    }
  )
  connection.end()
})
route.put('/modify/:id', auth, (req, res) => {
  connection.connect()

  if (req.role !== 'admin') {
    return res.json({ status: 'ko', data: "vous n'avez pas le droit d'accès" })
  }
  const id = req.params.id
  let { qte, nom, prix } = req.body
  let img
  prix = parseFloat(prix)
  qte = parseInt(qte)
  console.log(qte, nom, prix)
  let uploadedFile = req?.files?.img
  if (uploadedFile) {
    const newImgName = Math.floor(Math.random() * 100) + uploadedFile.name
    const uploadPath = path.join(__dirname, '..', 'uploads', newImgName)

    uploadedFile.mv(uploadPath, (err) => {
      if (err) console.log(err)
    })
    img = newImgName
  }
  if (!img) {
    var values = [nom, qte, prix, id]
    var query1 = `UPDATE produits SET nom = ? , qte=? ,prix=?   WHERE id_prod=?`
  } else {
    var values = [nom, qte, img, prix, id]
    var query1 = `UPDATE produits SET nom = ? , qte=?,img=? ,prix=?   WHERE id_prod=?`
  }
  var query = connection.query(
    query1,
    values,
    function (error, results, fields) {
      if (error) throw error
      if (results.affectedRows > 0) {
        res.json({ status: 'ok', data: 'produit modifié avec succés' })
      } else {
        res.json({ status: 'ko', data: 'modification errone' })
      }
    }
  )
  connection.end()
})

route.delete('/delete/:id', auth, (req, res) => {
  connection.connect()
  const id = req.params.id
  if (req.role !== 'admin') {
    return res.json({ status: 'ko', data: "vous n'avez pas le droit d'accès" })
  }

  var query = connection.query(
    'UPDATE produits SET statue = ? WHERE id_prod =?  ',
    [0, id],
    function (error, results, fields) {
      if (error) console.log(error)

      if (results.affectedRows <= 0) {
        return res.json({ status: 'ko', data: 'produit non trouve' })
      }

      res.json({
        status: 'ok',
        data: 'produit supprier ave succes',
      })
    }
  )

  connection.end()
})

module.exports = route
