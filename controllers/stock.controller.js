const stock = require("../models/stock.model");
const async = require('async');

function companySearch(request, response) {
    console.log("companySearch")
    response.status(200).send({ message: "success", data: null })
}

function timeFrame(request, response) {

    const body = request.body;
    const findQuery = {
        date: {
            $gte: body.start,
            $lte: body.end
        }
    }

    stock.find(findQuery).then((findData) => {

        if (Object.keys(findData)) return response.status(200).send({ type: "success", description: "data found", data: findData })

        return response.status(200).send({ type: "failure", description: "data not found, invalid ticker", data: null })

    }).catch((findError) => {
        response.status(204).send({ message: "internal-server-error", data: null })
    })
}

function stocksInTime(request, response) {
    const body = request.body;

    let data = []

    async.eachSeries(body.tickers, function (ticker, next) {

        const findQuery = {
            symbol: ticker,
            date: {
                $gte: body.start,
                $lte: body.end
            }
        }
        console.log(findQuery)
        stock.find(findQuery).then((findData) => {

            if (Object.keys(findData)) {
                data.push({ [findQuery.findData.symbol]: findData })
                return next()
            }

            data.push({ [findQuery.findData.symbol]: null })
            return next()


        }).catch((findError) => {
            return next()
        })

    }, function () {
        if (Object.keys(data)) return response.status(200).send({ type: "success", description: "data found", data: data })
        return response.status(200).send({ type: "failure", description: "data not found", data: null })
    })
}

function tickerSearch(request, response) {

    const params = request.params;

    stock.find(params).then((findData) => {

        if (Object.keys(findData)) return response.status(200).send({ type: "success", description: "data found", data: findData })

        return response.status(200).send({ type: "failure", description: "data not found, invalid ticker", data: null })

    }).catch((findError) => {
        response.status(204).send({ message: "internal-server-error", data: null })
    })
}

module.exports = {
    companySearch,
    timeFrame,
    stocksInTime,
    tickerSearch
}