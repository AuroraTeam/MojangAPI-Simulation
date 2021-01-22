import express from "express"
import cors from "cors"

/**
 * Обработчик сервера
 */
export default class Server {
    app: express.Express

    /**
     * Создание экземпляра сервера
     * @param port Порт вебсервера
     */
    constructor(port: number) {
        this.app = express()
        this.app.set('trust proxy', true)
        this.app.disable('x-powered-by')
        this.app.use(express.json())
        this.app.use(cors())
        this.app.listen(port, () => {
            console.log(`API Server listening at ${port} port`)
        })
    }

    addRoute(type: string, handler: any) {
        this.app.use(type, handler)
    }
}