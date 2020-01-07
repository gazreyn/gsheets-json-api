export default class GoogleSheet {

    constructor(urlId, sheetid) {
        this.sheet;
        this.columns = {};
        this.url = `https://spreadsheets.google.com/feeds/cells/${urlId}/${sheetid}/public/full?alt=json`;
    }

    fetchSheet() {
        return new Promise((resolve, reject) => {
            fetch(this.url)
                .then((response) => {
                    return response.json();
                })
                .then((json) => {
                    this.sheet = json;
                    this.getColumns(); // Gets the titles of the columns
                    resolve(json);
                })
                .catch((e) => {
                    reject(e);
                });
        });
    }

    getColumns() {
        const results = this.sheet.feed.entry.filter((cell) => {
            return cell["gs$cell"].row === "1";
        });
        const resultsLength = results.length;
        for(let i = 0; i < resultsLength; i++) {
            this.columns[results[i].content["$t"]] = results[i]["gs$cell"].col;
        }
    }

    getResultsFromColumn(value) {

        if(typeof value === "undefined") return new Error("No value set");

        const sanitizedValue = (parseInt(value)) ? value.toString() : this.columns[value];

        const results = this.sheet.feed.entry.filter((cell) => {
            return (cell["gs$cell"].col === sanitizedValue && cell["gs$cell"].row !== "1");
        });

        const resultsLength = results.length;
        let resultsArray = [];
        for(let i = 0; i < resultsLength; i++) {
            resultsArray.push(results[i].content["$t"]);
        }
        return resultsArray;
    }

    getResultsFromRow(value) {

        if(value < 2) return new Error("Data rows should start at 2. Please use columns for table headers");

        if(!parseInt(value)) return new Error("Must supply a numeric value or numeric string");

        const sanitizedValue = value.toString();
        const results = this.sheet.feed.entry.filter((cell) => {
            return (cell["gs$cell"].row === sanitizedValue);
        });

        const columns = Object.keys(this.columns);
        const resultsLength = results.length;
        let resultsObject = {};
        
        for(let i = 0; i < resultsLength; i++) {
            resultsObject[columns[i]] = results[i].content["$t"];
        }
        return resultsObject;
    }

    getResultsFromRows(array) {
        if(!Array.isArray(array)) return new Error("You must supply an array");

        const resultsArray = [];
        const rowLength = array.length;

        for(let i = 0; i < rowLength; i++) {
            resultsArray.push(this.getResultsFromRow(array[i]));
        }

        return resultsArray;
    }

}