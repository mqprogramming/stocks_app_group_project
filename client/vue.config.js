module.exports = {
    pages: {
        index: {
            entry: './src/pages/HomePage/main.js',
            template: 'public/index.html',
            title: 'Home Page',
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        searchPage:{
            entry: './src/pages/SearchPage/main.js',
            template: 'public/searchPage.html',
            title: 'Search Page',
            chunks: ['chunk-vendors', 'chunk-common', 'searchPage']
        },
        stockDetailsPage:{
            entry: './src/pages/StockDetailsPage/main.js',
            template: 'public/stockDetailsPage.html',
            title: 'Stock Details Page',
            chunks: ['chunk-vendors', 'chunk-common', 'stockDetailsPage']
        }
    }

}
