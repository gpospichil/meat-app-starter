import { Injectable } from "@angular/core";
import { CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "./login.service";

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {

    constructor(private loginService: LoginService) { }

    checkAuthentication(path: string): boolean{
        const loggedIn = this.loginService.isLoggeIn()
        if (!loggedIn) {
            this.loginService.handleLogin(`/${path}`)
        }
        return loggedIn
    }

    canLoad(route: Route): boolean {
        console.log('canLoad')
        return this.checkAuthentication(route.path)
        
    }

    canActivate(activateRoute: ActivatedRouteSnapshot,
        routerState: RouterStateSnapshot): boolean {
            console.log('canActivate')
            return this.checkAuthentication(activateRoute.routeConfig.path)
    }
}