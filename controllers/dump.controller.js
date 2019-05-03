const fs = require("fs");
const csv = require("fast-csv");
const { join } = require("path")
const stock = require("../models/stock.model");

function dumpData(request, response) {

    const stream = fs.createReadStream(join(__dirname, "../data/prices763fefc.csv"));

    csv.fromStream(stream, { headers: true }).on("data", function (data) {
        data.open = Number(data.open)
        data.close = Number(data.close)
        data.low = Number(data.low)
        data.high = Number(data.high)
        data.volume = Number(data.volume)
        new stock(data).save()
    }).on("end", function () {
        response.status(200).send({ message: "success", data: null })
    });

}

module.exports = {
    dumpData
}