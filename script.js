const accessToken = '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';
const owner = 'Kaaju04'; // Your GitHub username
const repo = 'love-calculator-data'; // Replace with your repository name
const filePath = 'data.txt'; // Path to the text file in your repository

document.getElementById('loveForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const yourName = document.getElementById('yourName').value;
    const crushName = document.getElementById('crushName').value;
    const content = `Your Name: ${yourName}\nCrush's Name: ${crushName}`;

    // Make an HTTP request to GitHub API to create or update the file
    fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
        method: 'PUT',
        headers: {
            'Authorization': `token ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: 'Add data to text file',
            content: btoa(content), // Base64 encode the content
            branch: 'main' // Replace with your branch name if different
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementById('result').innerText = 'Data saved successfully!';
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').innerText = 'Error saving data. Please try again.';
    });
});
