// Data for Q1

db.widgetSales.insertMany( [
{ date: new ISODate("2018-12-01"), quantity: 2, unitPrice: new NumberDecimal("60") },
{ date: new ISODate("2018-12-02"), quantity: 5, unitPrice: new NumberDecimal("90") },
{ date: new ISODate("2018-12-02"), quantity: 10, unitPrice: new NumberDecimal("200") },
{ date: new ISODate("2018-12-04"), quantity: 20, unitPrice: new NumberDecimal("80") },
{ date: new ISODate("2018-12-04"), quantity: 1, unitPrice: new NumberDecimal("16") },
{ date: new ISODate("2018-12-05"), quantity: 3, unitPrice: new NumberDecimal("60") },
{ date: new ISODate("2019-01-25"), quantity: 2,unitPrice: new NumberDecimal("60") },
{ date: new ISODate("2019-01-25"), quantity: 1, unitPrice: new NumberDecimal("16") },
{ date: new ISODate("2019-01-26"), quantity: 5, unitPrice: new NumberDecimal("100") },
{ date: new ISODate("2019-01-26"), quantity: 12,unitPrice: new NumberDecimal("48") },
{ date: new ISODate("2019-01-26"), quantity: 2, unitPrice: new NumberDecimal("36") },
{ date: new ISODate("2019-01-26"), quantity: 5,unitPrice: new NumberDecimal("100") },
{ date: new ISODate("2019-01-27"), quantity: 1,unitPrice: new NumberDecimal("20") },
{ date: new ISODate("2019-01-27"), quantity: 5, unitPrice: new NumberDecimal("80") },
{ date: new ISODate("2019-01-27"), quantity: 3, unitPrice: new NumberDecimal("12") },
{ date: new ISODate("2019-01-27"), quantity: 12,unitPrice: new NumberDecimal("48") },
{ date: new ISODate("2019-01-27"), quantity: 5, unitPrice: new NumberDecimal("36") },
{ date: new ISODate("2019-01-27"), quantity: 5, unitPrice: new NumberDecimal("100") },
])

// Question 1

db.widgetSales.aggregate([{
  $group: {
    _id: {$dateToString: { format: "%Y-%m", date: "$date" }},
    monthlySales: {$sum: {$multiply: ["$quantity", "$unitPrice"]}}
  }
}]);

// Question 2

// Sample query
db.orders.find( { productName: "Steel beam" }, { _id: 0, productName: 1, status: 1 } )

// Create index
db.orders.createIndex( { productName: 1, status: 1 } )

// Check size
db.orders.stats().indexSizes
// The index size is 20480 bytes.

// I think this index will be fastest because all queries will be covered queries given the assumptions
// of the question (only ever needing productName and status). In other words,
// to retrieve the information we require, we will only need to access this index.
