const NotFound = (req, res) => {
  res.status(404).json({ mensaje: "Página no encontrada" });
};

export default NotFound;
