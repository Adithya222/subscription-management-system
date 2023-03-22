import { Component ,ElementRef} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class AppComponent {


  constructor(

  ) { }

  ngOnInit() {

  }


}
