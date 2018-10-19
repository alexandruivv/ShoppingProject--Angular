import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HeaderComponent} from './header/header.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipe/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe/recipe-item/recipe-item.component';
import { ShoppingEditComponent } from './shopping/shopping-edit/shopping-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TooltipModule} from 'ngx-bootstrap';
import {DropdownDirective} from './shared/dropdown.directive';
import {ShoppingService} from './shopping/shopping.service';
import {AppRoutingModule} from './app-routing.module';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe/recipe-start/recipe-start.component';
import {RecipesService} from './recipe/recipes.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingComponent,
    RecipeComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    ShoppingEditComponent,
    DropdownDirective,
    RecipeEditComponent,
    RecipeStartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule,
    AppRoutingModule
  ],
  providers: [RecipesService, ShoppingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
