import {Component, Input, OnInit} from '@angular/core';
import {getProductById} from "../state/product.selector";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {CoreAppState} from "../../../store/app.state";

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  @Input()
  set productId(productId: any) {
    this.setProductData(productId);
  }

  productSubscription: Subscription = new Subscription();
  product: any = {};

  constructor(
    private store: Store<CoreAppState>,
  ) {
  }

  ngOnInit(): void {
  }

  setProductData(id: any) {
    if (id) {
      this.productSubscription = this.store.select(getProductById, {id}).subscribe((data) => {
        this.product = data;
      })
    }
  }

}
