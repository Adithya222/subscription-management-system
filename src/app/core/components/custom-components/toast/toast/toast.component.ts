import { Component, OnInit } from '@angular/core';
import {Toast} from "../../../../models/toast";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  toast: Toast = new Toast()

  constructor() { }

  ngOnInit(): void {
    this.toast.type = "success";
    this.toast.body = "success";
  }

  triggerToast(toast: Toast){
    this.setToastType(toast.type);
    this.toast.body = toast.body;
    this.show();
  }

  show(){
    const toast = document.getElementById('toast');
    if(toast != null){
      toast.classList.add('show')
      setTimeout(()=>{
        this.hide();
      }, 1000);
    }
  }

  hide(){
    const toast = document.getElementById('toast');
    if(toast != null){
      toast.classList.remove('show')
    }
  }


  setToastType(type: any){
    if(type == "success"){
      this.toast.type = "success";
    }else if(type == "warning"){
      this.toast.type = "warning";
    }else{
      this.toast.type = "danger";
    }
  }

}
