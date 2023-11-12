import express, {Express, response} from "express";
import axios from "axios";

const app: Express = express();
const port: number = 8080;
let current: number = 0;
const servers = [
    "http://load-consumer:3300",
    "http://load-consumer:3301",
    "http://load-consumer:3302",
    "http://load-consumer:3303",
]

const handler = async (req, res): Promise<void> => {

    const { method, url, headers, body} = req;

    const server: string = servers[current]
    current = (current + 1) % servers.length;

    try {
        const response = await axios({
            url: `${server}${url}`,
            method: method,headers: {
                "Cache-Control": "no-cache",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: body
        });

        res.status(200).send(response.data);
    } catch (error) {
        console.log(error)
        res.status(500).send(`Server Error on ${server}${url}`)
    }
}

app.use(async (req, res): Promise<void> => {
    await handler(req, res)
})

app.get('/', (req, res): void => {
    res.status(200).send('Hello World!')
})

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
})
