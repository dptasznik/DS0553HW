// DSO 553 HW3
// Name: Daniel Ptasznik

// Question 1

// a)

db.orders.aggregate([
  {$group: {_id: "$productName", sumQuantity: {$sum: "$quantity"}}}
]);

// 1 stage in this pipeline

// b)

db.orders.aggregate([
  {$match: {status: "urgent"}},
  {$group: {_id: "$productName", sumQuantity: {$sum: "$quantity"}}}
]);

// 2 stages in this pipeline

// c)

db.orders.aggregate([
  {$group: {_id: ["$productName","$status"], sumQuantity: {$sum: "$quantity"}}}
]);

// 1 stage in this pipeline

// d)

db.orders.aggregate([
  {$group: {_id: ["$productName","$status"], sumQuantity: {$sum: "$quantity"}}},
  {$match: {sumQuantity: {$gte: 15}}}
]);

// 2 stages in this pipeline

// Question 2

// a)

db.grades.distinct("class_id").length
// 501 classes

// b)

db.grades.distinct("student_id").length
// 10,000 students

// c)

  db.grades.aggregate([
    {$match: {class_id: {$eq: 212}}},
    {$unwind: "$scores"},
    {$match: {"scores.type": "exam"}},
    {$group: {_id: "$scores.type", average: {$avg: "$scores.score"}}}
  ]);

// 49.32031796981391

// d)

  db.grades.aggregate([
    {$match: {class_id: {$eq: 212}}},
    {$unwind: "$scores"},
    {$match: {"scores.type": "exam"}},
    {$group: {_id: "$scores.type", stdev: {$stdDevSamp: "$scores.score"}}}
  ]);

// 29.345839403132832
