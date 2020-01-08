# gsheets-json-api
A simple interface for pulling data from a google sheet

# Basic Usage
```javascript
const sheet = new GoogleSheet('abc-12edjasdlkjlkjalsdf', 1);

// Get all results from a column as an array
const ids = sheet.getResultsFromColumn("ID");

// Get result from a row
const result = sheet.getResultsFromRow(2);

// Get results from multiple rows
const results = sheet.getResultsFromRows([2,3,4]);

// Get results that match a value
const results = sheet.getResultsBy("id", 3);
```
