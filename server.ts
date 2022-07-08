import {server} from "./src";

// @ts-ignore
const PORT = +process.env.PORT || 8080

server.listen(PORT , '0.0.0.0', () => {

    console.log(`Server listening at 0.0.0.0:${PORT}`)
})
