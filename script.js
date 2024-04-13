const searchBox=document.querySelector('.searchBox');
const searchBtn=document.querySelector('.searchBtn');
const recipieContainer=document.querySelector('.recipie-container');
const recipeDetailContent=document.querySelector('.recpie-detail-content');
const recipeCloseBtn=document.querySelector('.recipe-close-btn')

const fetchRecipies=async (query) => {
    recipieContainer.innerHTML="<h3>Fetching Recipies.....</h3>";
    const data =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response=await data.json();
    recipieContainer.innerHTML="";
   // console.log(response);

   response.meals.forEach(meal => {
    const recipeDiv= document.createElement('div');
    recipeDiv.classList.add('recipe');
    recipeDiv.innerHTML=`
    <img src=${meal.strMealThumb}>
    <h3>${meal.strMeal}</h3>
    <p>${meal.strArea} Dish</p>
    <p>Category:-${meal.strCategory}</p>
    
    `
    const button=document.createElement('button');
    button.textContent="View Recipe";
    recipeDiv.appendChild(button);
    button.addEventListener('click',()=>{
        openRecipePopup(meal);
    })

    recipieContainer.appendChild(recipeDiv);
    
   });
}
const searchIngredients=(meal)=>{
    let ingredientList="";
    for(let i=1;i<20;i++){
        const ingredient=meal[`strIngredient${i}`];
        if(ingredient){
            const measure=meal[`strMeasure${i}`];
            ingredientList+=`<li>${measure}${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientList;
}

const openRecipePopup=(meal)=>{
    recipeDetailContent.innerHTML=`
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3 class="recipeingihead">Ingredients</h3>
    <ul class="recipeingilist">${searchIngredients(meal)}</ul>
    <div>
    <h3 class="recipeinst">Instructions</h3>
    <p class="instr">${meal.strInstructions}</p>
</div>
    

    `
    recipeDetailContent.parentElement.style.display="block";
}
recipeCloseBtn.addEventListener('click',()=>{
    recipeDetailContent.parentElement.style.display="none";
})


searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput=searchBox.value.trim();
    fetchRecipies(searchInput);
});