document.getElementById('recipe-search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const ingredients = document.getElementById('ingredient-input').value;
    fetchRecipes(ingredients);
});

function fetchRecipes(ingredients) {
    const appId = 'YOUR_EDAMAM_APP_ID';
    const appKey = 'YOUR_EDAMAM_APP_KEY';
    const url = `https://api.edamam.com/search?q=${ingredients}&app_id=${appId}&app_key=${appKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayRecipes(data.hits))
        .catch(error => console.error('Error fetching recipes:', error));
}

function displayRecipes(recipes) {
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML = '';

    recipes.forEach(recipeData => {
        const recipe = recipeData.recipe;
        const recipeItem = document.createElement('div');
        recipeItem.classList.add('item');

        recipeItem.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.label}">
            <div class="flex-container">
                <h1 class="title">${recipe.label}</h1>
                <a class="view-btn" href="${recipe.url}" target="_blank">View Recipe</a>
            </div>
            <p class="item-data">Calories: ${Math.round(recipe.calories)}</p>
        `;

        searchResult.appendChild(recipeItem);
    });
}
