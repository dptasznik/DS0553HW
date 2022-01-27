// Question 1

db.createCollection("Customer", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["customer_numb"],
      properties: {
        customer_numb: {
          bsonType: "int"
        },
        customer_first_name: {
          bsonType: "string"
        },
        customer_last_name: {
          bsonType: "string"
        },
        customer_street: {
          bsonType: "string"
        },
        customer_city: {
          bsonType: "string"
        },
        customer_state: {
          bsonType: "string"
        },
        customer_zip: {
          bsonType: "string"
        },
        customer_phone: {
          bsonType: "string"
        },
        orders: {
          bsonType: "array",
          minItems: 0, // minimum 0 orders per customer
          additionalProperties: false,
          items: {
              bsonType: "object",
              required: ["order_numb"],
              additionalProperties: false,
              description: "'items' must contain the stated fields.",
              properties: {
                  order_numb: {
                    bsonType: "int"
                  },
                  customer_numb: {
                    bsonType: "int"
                  },
                  order_date: {
                    bsonType: "date"
                  },
                  credit_card_numb: {
                    bsonType: "string"
                  },
                  credit_card_exp_date: {
                    bsonType: "date"
                  },
                  order_complete: {
                    bsonType: "bool"
                  },
                  pickup_or_ship: {
                    enum: ["pickup", "ship"]
                  }
              }
          }
        }
      }
    }
  }
})

db.Customer.insertMany([
  {customer_numb: 1, customer_first_name: "Camryn", customer_last_name: "Matus",
    customer_street: "Haliburton Lake Road", customer_city: "Haliburton",
    customer_state: "California", customer_zip: "90210",
    customer_phone: "416-123-4567",
    orders: [
      {order_numb: 1, customer_numb: 1, order_date: new Date(2022, 01, 01),
      credit_card_numb: "123456789012", credit_card_exp_date: new Date(2027, 04, 25),
      order_complete: true, pickup_or_ship: "ship"},
      {order_numb: 2, customer_numb: 1, order_date: new Date(2022, 02, 05),
      credit_card_numb: "123456789012", credit_card_exp_date: new Date(2027, 04, 25),
      order_complete: true, pickup_or_ship: "ship"},
      {order_numb: 3, customer_numb: 1, order_date: new Date(2022, 02, 05),
      credit_card_numb: "123456789012", credit_card_exp_date: new Date(2027, 04, 25),
      order_complete: true, pickup_or_ship: "pickup"}
    ]
  },
  {customer_numb: 2, customer_first_name: "Bowie", customer_last_name: "Abramowitz",
    customer_street: "Haliburton Lake Road", customer_city: "Ontario",
    customer_state: "California", customer_zip: "90001",
    customer_phone: "416-256-4217",
    orders: [
      {order_numb: 4, customer_numb: 2, order_date: new Date(2021, 04, 20),
      credit_card_numb: "839485738472", credit_card_exp_date: new Date(2026, 09, 21),
      order_complete: true, pickup_or_ship: "ship"},
      {order_numb: 5, customer_numb: 2, order_date: new Date(2021, 02, 05),
      credit_card_numb: "902847264726", credit_card_exp_date: new Date(2028, 05, 29),
      order_complete: false, pickup_or_ship: "pickup"},
      {order_numb: 6, customer_numb: 2, order_date: new Date(2021, 03, 15),
      credit_card_numb: "902847264726", credit_card_exp_date: new Date(2028, 05, 29),
      order_complete: true, pickup_or_ship: "pickup"}
    ]
  }
]);

// Question 2
// Parts 1-4

db.Student.insertMany([
  {name: "Zuke Sandman",
  home_address: {
    address: "4250 Haliburton Lake Road",
    city: "Haliburton",
    state: "CA",
    zip: "69420"
  },
  phone: "7057542374"
  },
  {name: "Jordyn Apter",
  home_address: {
    address: "2 Good Shabbas Road",
    city: "Los Angeles",
    state: "CA",
    zip: "90007"
  },
  phone: "2132728181"
  },
  {name: "GG Kierstead",
  home_address: {
    address: "3 Fiendy Lane",
    city: "New York",
    state: "NY",
    zip: "10001"
  },
  phone: "3231231231"
  },
  {name: "Shlomo Greenbush",
  home_address: {
    address: "4 Deluxe Camp Drive",
    city: "Nipissing",
    state: "CA",
    zip: "90009"
  },
  phone: "7055942527"
  },
  {name: "Longdong Silver",
  home_address: {
    address: "5 Pickleball Ave",
    city: "Miami",
    state: "FL",
    zip: "30827"
  },
  phone: "6267172828"
  },
  {name: "Sarah Plumbus",
  home_address: {
    address: "6 Roosevelt Road",
    city: "Las Vegas",
    state: "NV",
    zip: "18272"
  },
  phone: "8281928474"
  },
  {name: "Pippy Longstocking",
  home_address: {
    address: "7 Doofus Drive",
    city: "Portland",
    state: "OR",
    zip: "87284"
  },
  phone: "1728482727"
  },
  {name: "Lina Fogel",
  home_address: {
    address: "8 Little Shmuli Path",
    city: "Detroit",
    state: "MI",
    zip: "27374"
  },
  phone: "6471827373"
  },
  {name: "Noah Ptasznik",
  home_address: {
    address: "9 Maxwell Wintergreen Drive",
    city: "Toronto",
    state: "CA",
    zip: "18249"
  },
  phone: "4167371829"
  },
  {name: "Max Ptasznik",
  home_address: {
    address: "10 Shmlonathan Road",
    city: "Oklahoma City",
    state: "OK",
    zip: "57237"
  },
  phone: "2839592828"
  }
])

// Part 5: What indexes do you recommend?
// I recommend only using phone number as the index since it is a unique identifier (unless some family in the
// collection shares a phone number). Multiple people could have the same name, zip code, city, address, etc.

// Part 6: Create indexes
db.Student.createIndex({ phone: 1 })
db.Student.createIndex({ zip: 1 })

// Part 7: Run the search queries

db.Student.find({phone: "2839592828"}).explain()
db.Student.find({zip: "18249"}).explain()

// Part 8: Proof

// Phone index
{
  queryPlanner: {
    plannerVersion: 1,
    namespace: 'dso553.Student',
    indexFilterSet: false,
    parsedQuery: { phone: { '$eq': '2839592828' } },
    winningPlan: {
      stage: 'FETCH',
      inputStage: {
        stage: 'IXSCAN',
        keyPattern: { phone: 1 },
        indexName: 'phone_1',
        isMultiKey: false,
        multiKeyPaths: { phone: [] },
        isUnique: false,
        isSparse: false,
        isPartial: false,
        indexVersion: 2,
        direction: 'forward',
        indexBounds: { phone: [ '["2839592828", "2839592828"]' ] }
      }
    },
    rejectedPlans: []
  },
  serverInfo: {
    host: 'cluster0-shard-00-02.sdimw.mongodb.net',
    port: 27017,
    version: '4.4.12',
    gitVersion: '51475a8c4d9856eb1461137e7539a0a763cc85dc'
  },
  ok: 1,
  '$clusterTime': {
    clusterTime: Timestamp({ t: 1643318733, i: 4 }),
    signature: {
      hash: Binary(Buffer.from("ff499ec54b9cc88e4674f99eb423e77a770636fe", "hex"), 0),
      keyId: Long("7001560251765882881")
    }
  },
  operationTime: Timestamp({ t: 1643318733, i: 4 })
}

// Zip code index
{
  queryPlanner: {
    plannerVersion: 1,
    namespace: 'dso553.Student',
    indexFilterSet: false,
    parsedQuery: { zip: { '$eq': '18249' } },
    winningPlan: {
      stage: 'FETCH',
      inputStage: {
        stage: 'IXSCAN',
        keyPattern: { zip: 1 },
        indexName: 'zip_1',
        isMultiKey: false,
        multiKeyPaths: { zip: [] },
        isUnique: false,
        isSparse: false,
        isPartial: false,
        indexVersion: 2,
        direction: 'forward',
        indexBounds: { zip: [ '["18249", "18249"]' ] }
      }
    },
    rejectedPlans: []
  },
  serverInfo: {
    host: 'cluster0-shard-00-02.sdimw.mongodb.net',
    port: 27017,
    version: '4.4.12',
    gitVersion: '51475a8c4d9856eb1461137e7539a0a763cc85dc'
  },
  ok: 1,
  '$clusterTime': {
    clusterTime: Timestamp({ t: 1643318963, i: 1 }),
    signature: {
      hash: Binary(Buffer.from("967ec4b6ada06afe2fa675500ae86b2074a47865", "hex"), 0),
      keyId: Long("7001560251765882881")
    }
  },
  operationTime: Timestamp({ t: 1643318963, i: 1 })
}
