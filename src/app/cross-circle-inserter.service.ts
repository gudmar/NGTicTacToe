import { 
  Injectable,
  ComponentFactoryResolver,
  Inject,
  ReflectiveInjector
} from '@angular/core';
import { CrossCircleComponent } from './cross-circle/cross-circle.component'

@Injectable({
  providedIn: 'root'
})
export class CrossCircleInserterService {

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}


}
