require("dotenv").config({
  path: '../.env'
});

const express = require("express");
const cors = require("cors");
const db = require("./db");
const path = require("path")

const morgan = require("morgan");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// // Cek Server is Running
// app.use("/", (req, res) => {
//   res.send("Server is running")
// })

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../client/build')))

// Get Demografi Data
app.get("/api/demografi-semarang", async (req, res) => {
  try {
    const results = await db.query(
        `SELECT
        json_build_object(
            'type', 'FeatureCollection',
            'name', 'DEMOGRAFI KOTA SEMARANG',
            'features', json_agg(ST_AsGeoJSON(t.*)::json)
          )
        FROM
        "demografi-semarang" AS t`);
    console.log(results);
    res.json({
      status: "success",
      results: results.rows.length,
      data: {
        demografi: results.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Get POI Data
app.get("/api/poi-semarang", async (req, res) => {
  try {
    const results = await db.query(
        `SELECT
        json_build_object(
            'type', 'FeatureCollection',
            'name', 'POI KOTA SEMARANG',
            'features', json_agg(ST_AsGeoJSON(t.*)::json)
          )
        FROM
        "poi-semarang" AS t`);
    console.log(results);
    res.json({
      status: "success",
      results: results.rows.length,
      data: {
        poi: results.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// After defining your routes, anything that doesn't match what's above, we want to return index.html from our built React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'))
})

const port = process.env.PORT || 4001;
app.listen(port, () => {
  console.log(`server is up and listening from port ${port}`);
});
