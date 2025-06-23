import { Component,Input } from '@angular/core';
import { Recipe } from '../../shared/models/recipe.modal';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {NgIf,NgFor} from '@angular/common';


@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [MatCardModule, MatIconModule, NgIf, NgFor],
  templateUrl: './recipe-item.html',
  styleUrl: './recipe-item.scss'
})
export class RecipeItemComponent {
  @Input() recipe!: Recipe;

  getDifficulityArray():boolean[]{
    // מחזיר מערך של true/false לפי דרגת הקושי של המתכון
    return Array.from({ length: 5 }, (_, i) => i < this.recipe.level);
  }
}
