module.exports = {
    companySearch: (require('./stock.controller')).companySearch,
    dumpData: (require('./dump.controller')).dumpData,
    timeFrame: (require('./stock.controller')).timeFrame,
    stocksInTime: (require('./stock.controller')).stocksInTime,
    tickerSearch: (require('./stock.controller')).tickerSearch
}