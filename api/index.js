const express = require('express'),
      cors = require('cors'),
      faker = require('faker');

const app = express();

app.use(cors())

app.listen(3002, () => {
  console.log('API started on 3002')
})

const users = Array.from({length: 50000}).map((x, i) => ({
  fullName: faker.name.findName(),
  title: faker.name.jobTitle(),
  city: faker.address.city(),
  address: faker.address.streetAddress(),
  email: faker.internet.email(),
  avatar: faker.image.avatar(),
  id: i
}))

app.get('/', (req, res) => {
  res.json(users)
})
