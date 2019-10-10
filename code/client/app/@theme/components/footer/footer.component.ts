import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Created with ♥ by the <b>six-pact</b> team 2019</span>
    <div class="socials">
      <a href="https://github.com/kitzeller/six-pact" target="" class="ion ion-social-github"></a>
      <a routerLink="/privacy">
        privacy
      </a>
      <a routerLink="/terms">
        terms
      </a>
    </div>
  `,
})
export class FooterComponent {
  // constructor(){}
}
