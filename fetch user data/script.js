async function fetchData() {
    const startId = parseInt(document.getElementById('startId').value);
    const endId = parseInt(document.getElementById('endId').value);
    const tableBody = document.getElementById('tableBody');
    
    // Clear previous table data
    tableBody.innerHTML = '';
    
    // Validate input
    if (!startId || !endId || startId > endId || startId < 1 || endId > 10) {
        alert('Please enter a valid ID range (1-10, start ID <= end ID)');
        return;
    }

    try {
        // Fetch data for each ID in the range
        const promises = [];
        for (let id = startId; id <= endId; id++) {
            promises.push(fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
                .then(response => {
                    if (!response.ok) throw new Error(`User ID ${id} not found`);
                    return response.json();
                })
            );
        }

        const users = await Promise.all(promises);

        // Populate table with fetched data
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching data. Please try again.');
    }
}