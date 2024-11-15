let problems = [];

// Load problems from JSON file
async function loadProblems() {
    try {
        const response = await fetch('problems.json');
        problems = await response.json();
        console.log("Problems loaded:", problems); 
        displayProblemList(problems);  // Display problems after loading
    } catch (error) {
        console.error("Error loading problems:", error);
    }
}

// Search function
function searchProblems(query) {
    const filteredProblems = problems.filter(problem =>
        problem.title.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredProblems.length > 0) {
        displayCode(filteredProblems[0].code);  // Display the first match
    } else {
        displayCode("// No matching problem found.");
    }
}

// Display code with syntax highlighting
function displayCode(code) {
    const codeContent = document.getElementById('codeContent');
    codeContent.textContent = code;  // Use textContent to avoid XSS
    //Prism.highlightElement(codeContent);  // Apply Prism.js syntax highlighting
}

// Display the list of problems
function displayProblemList(problemArray) {
    const problemList = document.getElementById('problemList');
    problemList.innerHTML = '';  // Clear the existing list

    problemArray.forEach((problem, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item list-group-item-action bg-dark text-light';
        listItem.textContent = problem.title;
        listItem.addEventListener('click', () => {
            displayCode(problem.code);  // Load code when clicked
        });
        problemList.appendChild(listItem);
    });
}

// Event listener for the search bar
document.getElementById('searchBar').addEventListener('input', (e) => {
    searchProblems(e.target.value);
});

// DOMContentLoaded to ensure everything is loaded
document.addEventListener("DOMContentLoaded", function () {
    loadProblems();  // Load problems once the DOM is ready
});
