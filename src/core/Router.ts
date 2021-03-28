export default class Router {
    routes: Set<Route> = new Set()

    addRoute(method: HandlersMethod, path: string, handler: (request: any, response: any) => void): void {
        this.routes.add({
            method,
            path,
            handler
        })
    }
}

type HandlersMethod = 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head'

interface Route {
    method: HandlersMethod,
    path: string,
    handler: (request: any, response: any) => void
}