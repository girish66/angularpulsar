import {Component, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {FormlyFormOptions, FormlyFieldConfig, FormlyConfig} from "@ngx-formly/core";
import {Router, ActivatedRoute} from "@angular/router";
import {first} from 'rxjs/operators';

import {LoginService, GraphqlService} from "../_services";


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  form = new FormGroup({});
  options: FormlyFormOptions = {};

  model = {
    userName: "",
    password: ""
  };
  fields: FormlyFieldConfig[] = [];
  errorMessage: string = "";
  returnUrl: string = "";

  constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService, private graphqlService: GraphqlService) {
    this.loginService.getLoginData().subscribe(([f]) => {
      this.fields = f;
    });
  }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  submit() {
    if (this.form.valid) {
      //alert(JSON.stringify(this.model));
      // const token = "xyzxxyyzzz";
      //  localStorage.setItem("jwt", token);
      //  this.router.navigate(["/"]);
      const result = this.graphqlService.Login(this.model.userName, this.model.password).pipe(first())
        .subscribe(
          data => {
            //console.log(JSON.stringify(data));
            if (data) {
              // login successful so redirect to return url
              this.router.navigateByUrl(this.returnUrl);
            } else {
              this.errorMessage = "Invalid Login";
            }
          },
          error => {
            console.log(error);
            this.errorMessage = "Invalid Login";
          });
    }
  }
}
