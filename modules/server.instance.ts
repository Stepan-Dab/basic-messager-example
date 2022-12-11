import express from 'express'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

let app = express()

app.get('/', (req, res) => {
    const app = createSSRApp({
        data: () => ({ count: 1 }),
        template: `<button @click="count++">{{ count }}</button>`
    })

    renderToString(app).then((html) => {
        console.log(html)
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Vue SSR Example</title>
            </head>
            <body>
                <div id="app">${html}</div>
            </body>
            </html>
        `)
    })
})

app.listen(3000, () => {
    console.log('ready')
})