const express = require("express")
const router = express.Router()
const controller = require("../controller/contatosController")

router.get("/", controller.getAll)
router.get("/nome/:nome", controller.getByName)
router.get("/:id", controller.getById)
router.post("/criar", controller.add)
router.delete("/deletar/:id", controller.deleteById)
router.patch("/atualizar/:id", controller.pathById)

module.exports = router
