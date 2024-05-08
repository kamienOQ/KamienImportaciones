import express, { response } from "express";
import fetch from "node-fetch";
import "dotenv/config";
import path from "path";
import cors from "cors";

const { APIKEY, PORT = 8989 } = process.env;
const base = "https://v6.exchangerate-api.com/v6/";
const app = express();

app.use(cors());

// host static files
app.use(express.static("client"));

// parse post params sent in body in json format
app.use(express.json());

// Función para convertir la moneda
const convertCurrency = async (from, to, amount) => {
  try {
    const response = await fetch(
      `${base}/${APIKEY}/pair/${from}/${to}/${amount}`, 
    );
    if (!response.ok) {
      throw new Error("Error en la solicitud de la conversión de la moneda");
    }
    const data = await response.json();
    console.log("Resultado de la conversión", data);
    return data;
  } catch (error) {
    console.error("Error al convertir la moneda: ", error.message);
    throw error;
  }
};

// Endpoint para manejar la conversión de moneda
app.get("/exchange", async (req, res) => {
  const { from, to, amount } = req.query;
  console.log(from, to, amount);

  try {
    const result = await convertCurrency(from, to, amount);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Fallo al hacer el tipo de cambio de moneda" });
  }
});

// Definir una ruta para manejar las solicitudes a la ruta raíz
app.get("/", (req, res) => {
  // Envía una respuesta indicando que el servidor está en funcionamiento
  res.send("Servidor en funcionamiento");
});

app.listen(PORT, () => {
  console.log(`Node server listening at http://localhost:${PORT}/`);
});

// Permitir solicitudes CORS solo desde http://localhost:5173
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
