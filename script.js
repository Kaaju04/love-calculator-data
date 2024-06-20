document.getElementById('loveForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const yourName = document.getElementById('yourName').value;
    const crushName = document.getElementById('crushName').value;
    const compatibility = Math.floor(Math.random() * 11) + 90; // Fake compatibility score between 90 and 100

    document.getElementById('result').textContent = `${yourName} and ${crushName} have ${compatibility}% compatibility!`;

    // Prepare the data to be saved
    const data = `${yourName} and ${crushName} have ${compatibility}% compatibility!\n`;

    // GitHub repository details
    const owner = 'Kaaju04'; // Replace with your GitHub username
    const repo = 'love-calculator-data';  // Replace with your repository name
    const path = 'data.txt';
    const token = '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'; // Replace with your personal access token

    // Function to convert string to Base64
    function toBase64(str) {
        return btoa(unescape(encodeURIComponent(str)));
    }

    // Get the current content of the file
    fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
        headers: {
            'Authorization': `token ${token}`
        }
    })
    .then(response => {
        if (response.status === 404) {
            // File doesn't exist, create it
            return {
                sha: null,
                content: ''
            };
        }
        return response.json();
    })
    .then(fileData => {
        const sha = fileData.sha;
        const content = fileData.content ? atob(fileData.content) : '';
        const newContent = toBase64(content + data);

        // Update or create the file with the new content
        fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Update data',
                content: newContent,
                sha: sha
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Data saved:', data);
        })
        .catch(error => {
            console.error('Error updating file:', error);
        });
    })
    .catch(error => {
        console.error('Error fetching file data:', error);
    });
});
