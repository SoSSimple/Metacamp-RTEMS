const Influx = require("influx");
const os = require("os");

const influx = new Influx.InfluxDB({
  host: "localhost",
  database: "edukit",
  schema: [
    {
      measurement: "plc_table",
      fields: {
        path: Influx.FieldType.STRING,
        time: Influx.FieldType.STRING,
        temperature: Influx.FieldType.INTEGER,
        huminity: Influx.FieldType.INTEGER,
      },
      tags: ["host"],
    },
  ],
});

const postInflux = (req, res, next) => {
  const time = new Date();
  const { temperature, huminity } = req.body;

  influx
    .writePoints([
      {
        measurement: "plc_table",
        tags: { host: os.hostname() },
        fields: { time, temperature, huminity, path: req.path },
      },
    ])
    .catch((err) => {
      console.error(`Error saving data to InfluxDB ${err.stack}`);
      return next(err);
    });

  return res.status(200).json({
    success: true,
    msg: "influxDB에 기록 성공",
  });
};

const getInflux = (req, res, next) => {
  influx
    .query(`select * from logs order by time desc`)
    .then((result) => {
      return res.json({
        success: true,
        msg: "db 기록 가져오기 성공",
        result,
      });
    })
    .catch((err) => {
      return res.status(500).send(err.stack);
    });
};

module.exports = {
  postInflux,
  getInflux,
};
