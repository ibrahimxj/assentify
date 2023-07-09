import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PageNotFoundComponent implements OnInit {
  countdown: number = 10;

  ngOnInit(): void {
    this.startCountdown();
  }

  startCountdown(): void {
    setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        window.history.back(); 
      }
    }, 1000);
  }
}
