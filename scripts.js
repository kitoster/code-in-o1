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

// Display code with clickable lines
function displayCode(code, problemId) {
    const codeContent = document.getElementById('codeContent');
    codeContent.innerHTML = ''; // Clear previous code

    // Create clickable spans for each line of code
    code.split('\n').forEach((line, index) => {
        const lineNumber = index + 1;
        const lineElement = document.createElement('span');
        lineElement.dataset.line = lineNumber;
        lineElement.style.cursor = "pointer";
        lineElement.textContent = `${line}\n`;
        lineElement.addEventListener('click', () => {
            playAnimation(problemId, lineNumber);
        });
        codeContent.appendChild(lineElement);
    });
}


// Display the list of problems
function displayProblemList(problemArray) {
    const problemList = document.getElementById('problemList');
    problemList.innerHTML = '';  // Clear the existing list

    problemArray.forEach((problem) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item list-group-item-action bg-dark text-light';
        listItem.textContent = problem.title;
        listItem.addEventListener('click', () => {
            displayCode(problem.code, problem.id); // Pass problem ID for animations
        });
        problemList.appendChild(listItem);
    });
}

// Play animations based on problem and line number
function playAnimation(problemId, lineNumber) {
    const circle1 = document.getElementById("circle1");
    const circle2 = document.getElementById("circle2");

    // Example animation for Two Sum problem, line 1
    if (problemId === 1 && lineNumber === 1) {
        gsap.to(circle1, { x: 100, duration: 1 });
        gsap.to(circle2, { x: -100, duration: 1 });
    }

    // Add more animations for other problems/lines as needed
    console.log(`Playing animation for Problem ID: ${problemId}, Line: ${lineNumber}`);
}

// Event listener for the search bar
document.getElementById('searchBar').addEventListener('input', (e) => {
    searchProblems(e.target.value);
});

// DOMContentLoaded to ensure everything is loaded
document.addEventListener("DOMContentLoaded", function () {
    loadProblems();  // Load problems once the DOM is ready
});
