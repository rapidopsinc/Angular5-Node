import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {DataResolve} from '../../@shared/services/data.resolve';
import {ModelComponent} from './model-component/model.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DemoModelComponent} from './demo-component/demo-model.component';
import {LoggedInGuard} from '../auth/shared/logged-in.guard';


const routes = [
  {
    path: 'test',
    component: DemoModelComponent
  },
  // {
  //   path: 'test2',
  //   component: EditPatientComponent
  // }
];


const profileRoutes = [

];

@NgModule({
  declarations: [DemoModelComponent,ModelComponent],
  imports: [RouterModule.forChild(routes), ReactiveFormsModule, CommonModule, FormsModule,NgbModule.forRoot()],
  exports: [],
  providers: [LoggedInGuard]
})
export class TestModule {
}
