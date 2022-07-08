import {server} from "./src";

server.listen(8081 , '0.0.0.0', () => {

    console.log(`Server listening at 0.0.0.0:8081`)
})