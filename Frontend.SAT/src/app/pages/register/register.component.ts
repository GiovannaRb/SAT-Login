import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from "../../shared/services/register.service";
import { lastValueFrom } from "rxjs";
import { Router, RouterModule } from "@angular/router";
import { ToastrModule, ToastrService } from "ngx-toastr";

@Component({
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  imports: [ReactiveFormsModule, RouterModule ],
  providers: [RegisterService]
})

export class RegisterComponent {
  
  registerService = inject(RegisterService);
  toastr = inject(ToastrService);
  router = inject(Router);

  registerForm: FormGroup;

  get form (){
    return this.registerForm.controls;
} 

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group(
      {
        userName: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  async onSubmit() {
    if (this.registerForm.valid) {
    
      var response = await lastValueFrom(this.registerService.register(this.registerForm.getRawValue()))
      .catch(err =>err);

      if(response.success){
        this.toastr.success(response.message);
        this.toastr.success("Redirecionando em 5 segundos...");
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 5000);

      }
      else
        this.toastr.error(response.message);
    } else {
      this.toastr.error('Formulário inválido');
    }
  }
}
