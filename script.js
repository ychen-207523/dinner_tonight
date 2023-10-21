document.addEventListener('DOMContentLoaded', () => {
    const selectButton = document.getElementById('selectButton');
    const resultText = document.getElementById('result');

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