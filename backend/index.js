const app = require('./app')
const CONFIG = require('./config')

app.listen(CONFIG.port, () => {
  console.log(`Server started at ${CONFIG.port} port`)
})
