document.addEventListener('DOMContentLoaded', () => {
    var mealList = document.getElementById('mealList');
    const selectButton = document.getElementById('selectButton');
    const addButton = document.getElementById('addButton');
    const mealInput = document.getElementById('mealInput');
    const resultText = document.getElementById('result');
    let allMeals = [];

    function createListItem(meal) {
        const li = document.createElement('li');
        li.textContent = meal;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'deleteButton';
        deleteButton.onclick = function () {
            allMeals = allMeals.filter(m => m !== meal);
            li.remove();
        };

        li.appendChild(deleteButton);
        return li;
    }

    fetch('meals.json')
        .then(response => response.json())
        .then(data => {
            const ul = document.createElement('ul');
            if (data && data.meals && data.meals.length > 0) {
                allMeals = data.meals;
                allMeals.forEach(element => {
                    const li = createListItem(element);
                    ul.appendChild(li);
                });
            }
            mealList.appendChild(ul);
        });

    selectButton.addEventListener('click', () => {
        if (allMeals.length > 0) {
            const randomIndex = Math.floor(Math.random() * allMeals.length);
            const selectedMeal = allMeals[randomIndex];
            resultText.textContent = 'Selected Meal: ' + selectedMeal;
        } else {
            resultText.textContent = 'No meals available to select.';
        }

    });

    addButton.addEventListener('click', () => {
        const newMeal = mealInput.value.trim();
        if (newMeal) {
            allMeals.push(newMeal);
            const li = createListItem(newMeal);
            mealList.querySelector('ul').appendChild(li);
            mealInput.value = ''; // Clear the input field
        }

    })
});