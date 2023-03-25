import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {FormGroup, FormControl, ValidationErrors} from "@angular/forms";
import {FormlyFormOptions, FormlyFieldConfig} from "@ngx-formly/core";
import {GraphqlService} from "../_services";
import {User} from "../_models";
import {MatButton} from "@angular/material/button";
import {first} from "rxjs/operators";

@Component({
  selector: "app-user-create",
  templateUrl: "./user-create-component.html",
  styleUrls: ["./user-create-component.css"]
})


export class UserCreateComponent {
  form = new FormGroup({});
  options: FormlyFormOptions = {};

  model: User;
  fields: FormlyFieldConfig[] = [];

  // @ts-ignore

  constructor(private router: Router, private graphqlService: GraphqlService) {
    this.model = new User(1);
    this.fields = [
      {
        template: "<h5><div>Name:</div></h5><hr />"
      },
      {
        fieldGroupClassName: "display-flex",
        fieldGroup: [
          {
            className: "flex-1",
            type: "input",
            key: "profile.firstName",
            templateOptions: {
              label: "First Name",
              required: true,
              minLength: 3
            }
          },
          {
            className: "flex-1",
            type: "input",
            key: "profile.lastName",
            //hideExpression: model => !this.model.firstName,
            templateOptions: {
              label: "Last Name",
              required: true,
              minLength: 3
            },
            /*
            expressionProperties: {
              "templateOptions.disabled": "!model.firstName"
            }
            */
          }
        ]
      },
      {
        template: "<br /><h5><div>Contact Information:</div></h5><hr />"
      },
      {
        validators: {
          fieldMatch: {
            expression: (control: { value: any; }) => {
              const value = control.value;
              return (
                value.emailConfirm === value.email ||
                // avoid displaying the message error when values are empty
                (!value.emailConfirm || !value.email)
              );
            },
            message: "Email does not match",
            errorPath: "emailConfirm"
          }
        },
        fieldGroupClassName: "display-flex",
        fieldGroup: [
          {
            className: "flex-1",
            key: "email",
            type: "input",
            templateOptions: {
              type: "email",
              label: "Email",
              required: true,
              pattern: "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$"
            },
            validation: {
              messages: {
                pattern: (error, field: FormlyFieldConfig) => `"${field.formControl?.value}" is not a valid email address`
              }
            }
          },
          {
            className: "flex-1",
            key: "emailConfirm",
            type: "input",
            templateOptions: {
              type: "email",
              label: "Confirm Email",
              placeholder: "Please re-enter your email",
              required: true
            }
          }
        ]
      },
      {
        fieldGroupClassName: "display-flex",
        fieldGroup: [
          {
            className: "flex-1",
            type: "input",
            key: "password",
            templateOptions: {
              type: "password",
              pattern: "",
              label: "Password",
              required: true,
              minLength: 8
            }
          },
        ]
      },
    ];
  }

  submit(submitBtn: MatButton) {
    if (this.form.valid) {
      submitBtn.disabled = true;
      //console.log(JSON.stringify(this.model));

      let result = this.graphqlService.CreateUser(this.model).pipe(first()).subscribe(data => {
        if (data) {
          this.router.navigate(["users"]);
        } else {
          submitBtn.disabled = false;
        }
      },
        error => {
          console.log(error);
          submitBtn.disabled = false;
        });

      // result = this.graphqlService
      //   .CreateUser(this.model)
      //   .pipe(first())
      //   .subscribe(
      //     data => {
      //       console.log(data);
      //       if (data) {
      //         this.router.navigate(["users"]);
      //       }
      //     },
      //     error => {
      //       if (error.status === 400) {
      //         console.log(error.error);
      //       }
      //       //console.log(error);
      //       submitBtn.disabled = false;
      //     }
      //   );
    }
  }

  cancel() {
    this.router.navigate(["/"]);
  }
}

