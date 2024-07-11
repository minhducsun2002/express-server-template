import express from 'express';
import * as process from "process";

const app = express();
const port = process.env.PORT || 6775;
console.log('Starting up, main process ID', process.pid);

app.use((req, res, next) => {
    res.on("finish", function() {
        let d = new Date();
        let time = new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString().split(".")[0].replace(/[T]/g, ' ')
        console.log(`[${time}]`, req.method, decodeURI(req.url), res.statusCode, res.statusMessage);
    });
    next();
})
app.get('*', function(req, res, next) {
    res.write('Hello World!')
    res.end();
})

app.listen(+port,  '0.0.0.0', () => {
    console.log(`I am now listening on http://0.0.0.0:${port}`)
})
