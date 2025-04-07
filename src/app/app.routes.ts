import { Routes } from '@angular/router';
import { TaskAddComponent } from './components/task-add/task-add.component';
import { AppComponent } from './app.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

export const routes: Routes = [
    { path: '', component: TaskListComponent },
    { path: 'add', component: TaskAddComponent },
    { path: 'form', component: TaskFormComponent},
    { path: '**', component: TaskListComponent },
];
