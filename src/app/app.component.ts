import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
  <main class="p-3 m-3 prose md:prose-lg lg:prose-xl max-w-none">
    <router-outlet></router-outlet>
     <p>© Rocky Billy {{ year }}</p>
  </main> 
  `,
  styles: [],
})
export class AppComponent {
  readonly year = new Date().getFullYear();
}
