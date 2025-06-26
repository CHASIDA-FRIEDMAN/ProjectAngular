import { Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login';
import { RegisterComponent } from '../pages/register/register';
import { AllRecipesComponent } from '../pages/all-recipes/all-recipes';
import { RecipeFormComponent } from '../components/recipe-form/recipe-form';

export const routes: Routes = [
    { path: '', redirectTo: 'recipes', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'recipes', component: AllRecipesComponent },
    { path: 'add', component: RecipeFormComponent },
    { path: 'update/:id', component: RecipeFormComponent }
];
