import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Copyrights © {{year}} OASYS Cybernetics Pvt Ltd. All rights reserved.
    </span>
    <div class="socials">
      <a href="https://oasys.co/privacy-policy.html" target="_blank">Privacy Policy</a>
      <a href="https://oasys.co/terms.html" target="_blank">| Terms & Condition</a>
    </div>
  `,
})  
export class FooterComponent {

  year :any;
  constructor(){
    this.year=new Date().getFullYear()
  }
}
