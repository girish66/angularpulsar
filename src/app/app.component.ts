import { Component } from '@angular/core';
import { RecaptchaComponent } from 'ng-recaptcha';
import { GlobalConstant } from './_helpers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = GlobalConstant.siteTitle;
}

// NOTE: Hack for captcha throwing error in console
RecaptchaComponent.prototype.ngOnDestroy = function () {
  // if (this.subscription) {
  //   this.subscription.unsubscribe();
  // }
}
