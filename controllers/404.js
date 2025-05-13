const NotFound = (req, res) => {
  res.status(404).json({
    success: false,
    mensaje: "Página no encontrada",
    data: null,
  });
};

export default NotFound;
