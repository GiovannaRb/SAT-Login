import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from "../../shared/services/login.service";
import { lastValueFrom } from "rxjs";
import { Router, RouterModule } from "@angular/router";
import { ToastrService } from "ngx-toastr";


@Component({    
    templateUrl:'./login.component.html',
    styleUrl:'./login.component.css',
    imports:[ReactiveFormsModule, RouterModule],
    providers:[LoginService]
})

export class LoginComponent{
    loginService = inject(LoginService);
    toastr = inject(ToastrService);
    router = inject(Router);

    loginForm: FormGroup;
    get form (){
        return this.loginForm.controls;
    } 

    constructor(private fb: FormBuilder) {
      this.loginForm = this.fb.group({
        userName: ['', [Validators.required]],
        password: ['', [Validators.required]],
      });
    }
  
    async onSubmit() {
      if (this.loginForm.valid) {
        const retornoLogin = await lastValueFrom(this.loginService.login(this.loginForm.getRawValue()))
        .catch(err => err);
       
        if(retornoLogin.accessToken){            
            this.loginService.setToken(retornoLogin.accessToken!);
            this.toastr.success("Acesso permitido.");
            this.router.navigate(['/home']);
        }else{
          this.toastr.error("Senha invalida.");
        } 
      } else {
        this.toastr.error("Formulário invalido.");
      }
    }
}