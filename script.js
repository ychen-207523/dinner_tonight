document.addEventListener('DOMContentLoaded', () => {
    var mealList = document.getElementById('mealList');
    const selectButton = document.getElementById('selectButton');
    const resultText = document.getElementById('result');

    fetch('meals.json')
        .then(response => response.json())
        .then(data => {
            if (data && data.meals && data.meals.length > 0) {

                const ul = document.createElement('ul');
                data.meals.forEach(element => {
                    const li = document.createElement('li');
                    li.textContent = element;
                    ul.appendChild(li);
                });

                mealList.appendChild(ul);
            }
        })

    selectButton.addEventListener('click', () => {
        fetch('meals.json')
            .then(response => response.json())
            .then(data => {
                if (data && data.meals && data.meals.length > 0) {
                    const randomIndex = Math.floor(Math.random() * data.meals.length);
                    const randomMeal = data.meals[randomIndex];
                    resultText.textContent = `Tonight, you should have ${randomMeal} for dinner!`;
                } else {
                    resultText.textContent = 'No dinner options available.';
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});