import { Component, inject } from "@angular/core";
import { LoginService } from "../../shared/services/login.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
    template:`

    <button (click)="logout()">Sair</button>

    `,
    styles:``,
    providers:[LoginService]
})
export class HomeComponent{
    loginService = inject(LoginService);
    toastr = inject(ToastrService);
    router = inject(Router);

    logout(){
        this.loginService.logout();
        this.toastr.success("Você foi deslogado.");
        this.toastr.success("Redirecionando em 5 segundos...");

        setTimeout(() => {
            this.router.navigate(['/']);
        }, 5000);
    }
}