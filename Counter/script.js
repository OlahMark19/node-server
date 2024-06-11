document.addEventListener('DOMContentLoaded', () => {
    fetch('/counter')
        .then(response => response.json())
        .then(data => {
            const counterElement = document.getElementById('counter');
            if (counterElement) {
                counterElement.innerText = `This page has been visited ${data.count} times.`;
            } else {
                console.error('Counter element not found');
            }
        })
        .catch(err => {
            console.error('Error fetching counter data:', err);
            const counterElement = document.getElementById('counter');
            if (counterElement) {
                counterElement.innerText = 'Error loading counter data.';
            }
        });
});
