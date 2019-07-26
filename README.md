# nodejs-challenge

NodeJS API to consume different resources and merge results, extracting best results.

# Libs/Technologies

* VSCode
* NodeJS
* Typescript
* Express
* Axios
* Body-parser
* Jest (test)

# Running

Clone or download code and run `npm install` . After that run command `npm run dev`.

# Running Tests

Clone or download code and run `npm install`. After that run command `npm t`.

# API

/flights -> return merge of two sources without duplicates.

query `sortBy`-> sort flights by dynamic query param:  `price`, `durationTime`, `stops`

ex: `/flights?sortBy=price`

# Requirements

* consume two APIs
* merge results and remove duplicates (based on flight number and date)
* rank result
* return result in max. 1 second
