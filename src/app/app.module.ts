import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS, HttpHeaders} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatBadgeModule} from '@angular/material/badge';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';

import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions
} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {FormlyModule} from "@ngx-formly/core";
import {FormlyMaterialModule} from "@ngx-formly/material";
import {MatNativeDateModule} from "@angular/material/core";
import {FormlyMatDatepickerModule} from "@ngx-formly/material/datepicker";
import {AgGridModule} from 'ag-grid-angular';
import {
  RecaptchaModule,
  RECAPTCHA_SETTINGS,
  RecaptchaSettings,
} from 'ng-recaptcha';
import {RecaptchaFormsModule} from 'ng-recaptcha';

import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';

// Environment
import {environment} from 'src/environments/environment';

// Custom Components
import {AppComponent} from './app.component';
import {NavMenuComponent} from './nav-menu/nav-menu.component';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {UsersComponent} from "./users/users.component";

// Services
import {LoginService} from './_services';
import {GraphqlService} from "./_services";

// Apollo
import {GraphQLModule} from './graphql.module';

const appearance: MatFormFieldDefaultOptions = {
  //appearance: "outline"
};

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatSidenavModule,
    MatCardModule,
    MatTableModule,
    HttpClientModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    FormlyModule.forRoot({
      validationMessages: [
        {name: "required", message: "This field is required"}
      ],
      types: [],
      wrappers: []
    }),
    FormlyMaterialModule,
    MatNativeDateModule,
    FormlyMatDatepickerModule,
    AgGridModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {path: "login", component: LoginComponent},
      {path: "users", component: UsersComponent},
    ]),
    ApolloModule,
    GraphQLModule
  ],
  providers: [LoginService, GraphQLModule
    // {
    //   provide: APOLLO_OPTIONS,
    //   useFactory(httpLink: HttpLink) {
    //     return {
    //       cache: new InMemoryCache(),
    //       link: httpLink.create({
    //         uri: environment.apiUrl + '/graphql',
    //       }),
    //       options: {
    //         connectionParams: {
    //           headers: {
    //             //Authorization: `Bearer ${localStorage.getItem("currentUser")}` || null,
    //             "authorization":"Bearer 71z2349xWXx0D1KrJan4A8K8/IiDR1Ko4IDhGTGK8AUx1aGS8sB1XT9fZE5ObQikpLBw6hMxLurX1Kxo6PVC2g=="
    //           }
    //         }
    //       }
    //       // headers: new HttpHeaders({
    //       //   //authorization: `Bearer ${localStorage.getItem("currentUser")}`
    //       //   "authorization":"Bearer 71z2349xWXx0D1KrJan4A8K8/IiDR1Ko4IDhGTGK8AUx1aGS8sB1XT9fZE5ObQikpLBw6hMxLurX1Kxo6PVC2g=="
    //       // })
    //     }
    //   },
    //   deps: [HttpLink]
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
