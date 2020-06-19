
# gsheets-json-api
A simple interface for pulling data from a published google sheet

## Prerequisites
You will first need to publish (not share) the Google Sheet you wish to use.

This API also assumes that Row 1 is used for table headings which can then by used when using calls like `getResultsFromColumn(colName)`

| ID | Name | Color |
|--|--|--|
| 1 | Bob | Purple |


## Usage
```javascript
const documentID = '1RzHoRzvOOijE2ZbII_pSqwDJTmDYjoRWVB_7DZQyw_E';
const sheetNum = 1;

// Instantiate a new Google Sheet. 
// The `documentID` must be the ID in the URL of the document, not from the published URL.
const sheet = new GoogleSheet(documentID, sheetNum);

// Get all results from a column as an array
const ids = sheet.getResultsFromColumn("ID");

// Get result from a row
const result = sheet.getResultsFromRow(2);

// Get results from multiple rows
const results = sheet.getResultsFromRows([2,3,4]);

// Get results that match a value
const results = sheet.getResultsBy("id", 3);
```
