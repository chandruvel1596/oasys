import { AbstractControl } from "@angular/forms";

export class matchPassword {
    static  matchPassword (match:AbstractControl):any {
        const password = match.get('password')?.value;
        const cpassword = match.get('repeatPassword')?.value;
        if(password!==cpassword){
           match.get('repeatPassword')?.setErrors({confirmPassword:true})
        }   
        else{
             match.get('repeatPassword')?.setErrors({confirmPassword:false})
             if(!match.get('repeatPassword')?.value){
                match.get('repeatPassword')?.setErrors({required:true})
             }
             else{
                match.get('repeatPassword')?.setErrors(null)
             }
             
        }


    }}

    export class matchResetPassword {
        static  matchPassword (match:AbstractControl):any {
            const password = match.get('newPassword')?.value;
            const cpassword = match.get('confirmPassword')?.value;
            if(password!=cpassword){
               match.get('confirmPassword')?.setErrors({confirmPassword:true})
            }
            else{
                match.get('confirmPassword')?.setErrors({confirmPassword:false})
                if(!match.get('confirmPassword')?.value){
                    match.get('confirmPassword')?.setErrors({required:true})
                 }
                 else{
                    match.get('confirmPassword')?.setErrors(null)
                 }
            }
    
    
        }

    }