document.addEventListener('DOMContentLoaded', () => {
    const parent1NameInput = document.getElementById('parent1Name');
    const parent2NameInput = document.getElementById('parent2Name');
    const generateBoyNameBtn = document.getElementById('generateBoyName');
    const generateGirlNameBtn = document.getElementById('generateGirlName');
    const boyNameOutput = document.getElementById('boyNameOutput');
    const girlNameOutput = document.getElementById('girlNameOutput');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const copyButtons = document.querySelectorAll('.copy-btn');

    // --- Expanded Lists of Names ---
    const commonBoyNames = [
        "Liam", "Noah", "Oliver", "Elijah", "James", "William", "Benjamin", "Lucas",
        "Henry", "Theodore", "Leo", "Julian", "Ezra", "Gabriel", "Miles", "Owen",
        "Levi", "Asher", "Samuel", "Sebastian", "Caleb", "Isaac", "Daniel", "Matthew",
        "John", "Joseph", "David", "Michael", "Alexander", "Anthony", "Christopher",
        "Andrew", "Joshua", "Nicholas", "Jonathan", "Adam", "Eric", "Brian", "Brandon",
        "Kevin", "Justin", "Tyler", "Zachary", "Austin", "Dylan", "Ethan", "Nathan",
        "Ryan", "Connor", "Jack", "Jackson", "Logan", "Mason", "Jacob", "Luke",
        "Thomas", "Charles", "Paul", "Mark", "George", "Frank", "Robert", "Stephen",
        "Richard", "Gary", "Kenneth", "Edward", "Donald", "Ronald", "Timothy", "Walter",
        "Arthur", "Patrick", "Peter", "Scott", "Shawn", "Dennis", "Jerry", "Raymond",
        "Lawrence", "Albert", "Joe", "Juan", "Jesse", "Bryan", "Aaron", "Russell",
        "Bobby", "Philip", "Jose", "Gerald", "Harold", "Keith", "Roger", "Carl",
        "Jeremy", "Terry", "Willie", "Larry", "Sean", "Christian", "Dakota", "Cole",
        "Finn", "Jasper", "Milo", "Silas", "Brooks", "Rhys", "Arlo", "Kai", "Ronan",
        "Bodhi", "Caspian", "Atticus", "Finnian", "Lysander", "Orion", "Wilder", "Fox",
        "Bear", "Wolf", "River", "Forest", "Clay", "Stone" // Added some unique/nature names
    ];

    const commonGirlNames = [
        "Olivia", "Emma", "Ava", "Sophia", "Charlotte", "Amelia", "Isabella", "Mia",
        "Evelyn", "Harper", "Camila", "Eleanor", "Elizabeth", "Sofia", "Grace", "Chloe",
        "Victoria", "Scarlett", "Layla", "Penelope", "Riley", "Nora", "Lily", "Zoe",
        "Mila", "Aria", "Ella", "Abigail", "Luna", "Stella", "Hazel", "Aurora",
        "Natalie", "Hannah", "Audrey", "Skylar", "Bella", "Anna", "Samantha", "Sarah",
        "Jessica", "Ashley", "Emily", "Madison", "Brittany", "Kimberly", "Stephanie",
        "Heather", "Nicole", "Michelle", "Laura", "Brenda", "Pamela", "Sharon", "Debra",
        "Patricia", "Linda", "Barbara", "Elizabeth", "Jennifer", "Maria", "Susan",
        "Dorothy", "Nancy", "Karen", "Betty", "Helen", "Sandra", "Carol", "Amanda",
        "Melissa", "Rebecca", "Christine", "Shirley", "Catherine", "Angela", "Lisa",
        "Kelly", "Denise", "Diana", "Julie", "Martha", "Alice", "Jacqueline", "Frances",
        "Christina", "Joyce", "Andrea", "Kathryn", "Hannah", "Megan", "Erin", "Kayla",
        "Paisley", "Everly", "Willow", "Hazel", "Ivy", "Sage", "Juniper", "Rowan",
        "Hazel", "Violet", "Ruby", "Pearl", "Daisy", "Rose", "Sunny", "Rivera", "Terra" // Added some unique/nature names
    ];

    // Expanded common name prefixes/suffixes for blending (optional)
    const prefixes = [
        "Al", "An", "Ar", "Aub", "Bri", "Cai", "Cor", "Dyl", "El", "Em", "Ev", "Fin",
        "Ga", "Ha", "Is", "Ja", "Jo", "Ka", "Ke", "Ly", "Mi", "Na", "Ol", "Pa", "Qu",
        "Ro", "Sa", "Sk", "Ta", "Va", "Wi", "Za", "Ad", "Bell", "Cal", "Cel", "Dar",
        "Fay", "Gle", "Hyl", "Ire", "Jun", "Kyl", "Lyn", "Max", "Nev", "Oli", "Pip",
        "Quil", "Rem", "Ser", "Thal", "Urs", "Viv", "Wyn", "Xav", "Yar", "Zen"
    ];
    const suffixes = [
        "a", "ae", "ah", "an", "anda", "anna", "ara", "el", "elle", "en", "er", "es",
        "ett", "ette", "ia", "ian", "ie", "ien", "in", "ine", "ion", "is", "ith",
        "ius", "ley", "lyn", "or", "ora", "os", "ra", "rey", "son", "tan", "ter",
        "ton", "ty", "us", "yl", "yne", "belle", "don", "ford", "ham", "land", "ton",
        "ville", "wood", "bright", "brook", "field", "grace", "hope", "leigh", "rose",
        "sky", "star", "thorne", "vale", "water"
    ];

    // Function to show/hide loading indicator
    function showLoading(show) {
        if (show) {
            loadingIndicator.classList.remove('hidden');
        } else {
            loadingIndicator.classList.add('hidden');
        }
    }

    // Helper function to capitalize first letter
    function capitalizeFirstLetter(string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    // Function to generate a name without LLM
    function generateNameWithoutLLM(parent1, parent2, gender) {
        const p1 = parent1.toLowerCase();
        const p2 = parent2.toLowerCase();

        // Start with a random pick from a common list
        let suggestedName;
        if (gender === 'boy') {
            suggestedName = commonBoyNames[Math.floor(Math.random() * commonBoyNames.length)];
        } else {
            suggestedName = commonGirlNames[Math.floor(Math.random() * commonGirlNames.length)];
        }

        // --- Optional: Try a simple blend (still rudimentary but might add variety) ---
        // Increase the chance of blending slightly now that we have more parts
        if (Math.random() < 0.4) { // 40% chance to try a blend
            let blendedName = "";

            // Try to combine parts of parent names
            const p1PartLength = Math.floor(p1.length * 0.4) + Math.floor(Math.random() * (p1.length * 0.3));
            const p2PartLength = Math.floor(p2.length * 0.4) + Math.floor(Math.random() * (p2.length * 0.3));

            const p1Start = p1.substring(0, Math.min(p1PartLength, p1.length));
            const p2End = p2.substring(p2.length - Math.min(p2PartLength, p2.length));

            blendedName = p1Start + p2End;

            // Add a random prefix/suffix sometimes for more "name-like" structure
            if (Math.random() < 0.6 && prefixes.length > 0) { // 60% chance to add prefix
                blendedName = prefixes[Math.floor(Math.random() * prefixes.length)] + blendedName;
            }
            if (Math.random() < 0.6 && suffixes.length > 0) { // 60% chance to add suffix
                blendedName += suffixes[Math.floor(Math.random() * suffixes.length)];
            }

            // Clean up: remove non-alpha chars, ensure a reasonable length
            blendedName = blendedName.replace(/[^a-z]/g, ''); // Remove non-alphabetic characters
            if (blendedName.length >= 3 && blendedName.length <= 12) {
                // Only use the blended name if it doesn't just sound like a random string
                // This is still the weakest part without an LLM's understanding of phonetics
                if (Math.random() < 0.7) { // Prefer a good blend over a random common name
                     suggestedName = capitalizeFirstLetter(blendedName);
                }
            }
        }

        return suggestedName;
    }

    // Function to handle name generation
    async function handleGenerateName(gender) {
        const parent1 = parent1NameInput.value.trim();
        const parent2 = parent2NameInput.value.trim();

        if (!parent1 || !parent2) {
            alert('Please enter both parent names!');
            return;
        }

        showLoading(true);

        // Simulate a small delay for better UX (like an API call)
        await new Promise(resolve => setTimeout(resolve, 800));

        const generatedName = generateNameWithoutLLM(parent1, parent2, gender);

        if (gender === 'boy') {
            boyNameOutput.textContent = generatedName;
        } else {
            girlNameOutput.textContent = generatedName;
        }

        showLoading(false);
    }

    generateBoyNameBtn.addEventListener('click', () => handleGenerateName('boy'));
    generateGirlNameBtn.addEventListener('click', () => handleGenerateName('girl'));

    // Copy to clipboard functionality
    copyButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const targetId = event.target.dataset.target;
            const targetElement = document.getElementById(targetId);
            const textToCopy = targetElement.textContent;

            if (textToCopy === 'Type names & click!' || textToCopy === 'Error!' || !textToCopy) {
                alert('No name to copy yet!');
                return;
            }

            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    alert('Name copied to clipboard: ' + textToCopy);
                })
                .catch(err => {
                    console.error('Failed to copy text:', err);
                    alert('Failed to copy name. Please try again or copy manually.');
                });
        });
    });
});