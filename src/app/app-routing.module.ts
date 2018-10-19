import {RecipeComponent} from './recipe/recipe.component';
import {ShoppingComponent} from './shopping/shopping.component';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RecipeDetailComponent} from './recipe/recipe-detail/recipe-detail.component';
import {RecipeStartComponent} from './recipe/recipe-start/recipe-start.component';
import {RecipeEditComponent} from './recipe/recipe-edit/recipe-edit.component';

const appRoutes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full'},
  { path: 'recipes', component: RecipeComponent, children: [
      { path: '', component: RecipeStartComponent},
      { path: 'new', component: RecipeEditComponent},
      { path: ':id', component: RecipeDetailComponent},
      { path: ':id/edit', component: RecipeEditComponent}
    ]},
  { path: 'shopping', component: ShoppingComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
