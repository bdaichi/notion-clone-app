import fs from 'fs'

export default function ExpressService() {
const express = require('express')
  const app = express()
  const port = process.env.PORT || 3000

  app.get('/', (req: any, res: any) => {
    res.send('Hello World!')
  })

  app.listen(port, () => {
    console.log(`listening on *:${port}`);
  })
  
}