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

function searchProblems(query) {
    const filteredProblems = problems.filter(problem =>
        problem.title.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredProblems.length > 0) {
        const { code, id, example } = filteredProblems[0];
        displayCode(code, id, example); // Pass all required data
    } else {
        displayCode("// No matching problem found.", null, '');
    }
}

// Display code with clickable lines
function displayCode(code, problemId, example = '') {
    const codeContent = document.getElementById('codeContent');
    const exampleText = document.getElementById('exampleText');

    if (example) {
        exampleText.textContent = `Example: ${example}`;
    } else {
        exampleText.textContent = ''; // Clear if no example
    }
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
            displayCode(problem.code, problem.id, problem.example); // Pass problem ID for animations
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

const animations = {
    1: { // Problem ID 1 (Two Sum)
        1: () => { // Line 1 animation
            gsap.to(circle1, { x: 100, duration: 1 });
            gsap.to(circle2, { x: -100, duration: 1 });
        },
        // Add more line animations for problem 1 as needed
    },
    // Add other problem IDs
};

function playAnimation(problemId, lineNumber) {
    const animationContainer = document.getElementById('animationContainer');
    animationContainer.innerHTML = ''; // Clear previous animations

    // Test animation for Two Sum problem, iteration line
    if (problemId === 1 && lineNumber === 3) { // Line 3: "for i, n in enumerate(nums):"
        console.log("Animating circle for Two Sum, Line 3");
        const circle = document.createElement('div');
        circle.className = 'circle'; // Add the circle class for styling
        animationContainer.appendChild(circle);

        // Animate the circle
        gsap.fromTo(
            circle,
            { x: -50, y: 50, opacity: 0 },
            { x: 50, y: -50, opacity: 1, duration: 1 }
        );

        console.log("Circle animation triggered for Two Sum, Line 3");
    }
}
