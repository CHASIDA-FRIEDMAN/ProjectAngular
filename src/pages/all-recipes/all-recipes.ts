import { Component, inject } from '@angular/core';
import { RecipeItemComponent } from '../../components/recipe-item/recipe-item';
import { RecipeService } from '../../shared/services/recipe.service';
import { CategoryService } from '../../shared/services/category.service';
import { Recipe } from '../../shared/models/recipe.modal';
import { Category } from '../../shared/models/category.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-all-recipes',
  standalone: true,
  imports: [RecipeItemComponent, MatProgressSpinnerModule,
    CommonModule, FormsModule, MatFormFieldModule, MatSelectModule,
    MatInputModule, MatButtonModule, MatCardModule
  ],
  templateUrl: './all-recipes.html',
  styleUrl: './all-recipes.scss'
})
export class AllRecipesComponent {
  private recipeService = inject(RecipeService);
  private categoryService = inject(CategoryService);

  recipes: Recipe[] = [];
  categories: Category[] = [];

  search: string = '';
  selectedCategory: string = '';
  selectedMaxTime: number | null = null;

  page = 1;
  limit = 10;
  total = 0;
  isLoading = false;

  ngOnInit() {
    this.loadCategories();
    this.loadRecipes();
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => this.categories = res,
      error: (err) => console.error('Error loading categories:', err)
    });
  }

  loadRecipes() {
    if (this.isLoading || (this.recipes.length >= this.total && this.total !== 0))
      // אם כבר טוענים או שאין עוד מתכונים להציג
      return;

    this.isLoading = true;

    // קריאה לשירות המתכונים עם החיפוש, עמוד ומגבלה
    this.recipeService.getBySearch(
      this.search,
      this.page,
      this.limit
    ).subscribe({
      next: (res) => {
        let filtered = res.data;
        console.log('מתכונים שהתקבלו:', filtered);
        // סינון לפי קטגוריה אם נבחרה
        if (this.selectedCategory) {
          filtered = filtered.filter(recipe =>
            recipe.categories.some(category => category === this.selectedCategory)
          );
        }

        // סינון לפי זמן מקסימלי אם נבחר
        if (this.selectedMaxTime !== null) {
          filtered = filtered.filter(recipe => recipe.time <= this.selectedMaxTime!);
        }
        this.recipes.push(...filtered);
        // עדכון סך הכל מתכונים
        this.total = res.total;
        this.page++;
        // עדכון מצב טעינה
        this.isLoading = false;
      },
      error: (err) => {
        console.error('שגיאה בטעינת המתכונים:', err);
        this.isLoading = false;
      }
    });
  }
  onScroll() {
    // פונקציה זו תופעל כאשר המשתמש גולל למטה
    this.loadRecipes();
  }

  onFilterChange() {
    // אפס את העמוד ואת המתכונים
    this.page = 1;
    this.recipes = [];
    this.total = 0;
    this.loadRecipes();
  }
}