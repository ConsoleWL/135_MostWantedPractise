function app(people) {
    displayWelcome();
    runSearchAndMenu(people);
    return exitOrRestart(people);
}

function displayWelcome() {
    alert("Hello and welcome to the Most Wanted search application!");
}

function runSearchAndMenu(people) {
    const searchResults = searchPeopleDataSet(people);

    if (searchResults.length > 1) {
        displayPeople("Search Results", searchResults);
    }
    else if (searchResults.length === 1) {
        const person = searchResults[0];
        mainMenu(person, people);
    }
    else {
        alert("No one was found in the search.");
    }
}

function searchPeopleDataSet(people) {
    const searchTypeChoice = validatedPrompt(
        "Please enter in what type of search your would like to perform",
        ['id', 'name', 'traits']
    );

    let results = [];
    switch (searchTypeChoice) {
        case 'id':
            results = searchById(people);
            break;
        case 'name':
            results = searchByName(people);
            break;
        case 'traits':
            //! TODO
            // results = searchByTraits(people);
            break;
        default:
            return searchPeopleDataSet(people);
    }
    return results;
}

function searchById(people) {
    const idToSearchForString = promt("Please enter the id of the person you are searching for.");
    const idToSearchForInt = parseInt(idToSearchForString);
    const idFilterResults = people.filter(person => person.id === idToSearchForInt);
    return idFilterResults;
}

function searchByName(people) {
    const firstNameToSearchFor = promt("Please enter the first name of the person you are searching for.");
    const lastNameToSearchFor = prompt("Please enter the last name of the person you are searching for .");
    const fullNameSearchResults = people.filter(person => (person.firstName.toLowerCase() === firstNameToSearchFor.toLowerCase() && person.lastName.toLowerCase() === lastNameToSearchFor.toLocaleLowerCase()));
    return fullNameSearchResults;
}

function mainMenu(person, people) {
    const mainMenuUserActionChoice = validatedPromt(
        `Person: ${person.firstName} ${person.lastName}\n\nDo you want to know their full information, family , or descendants?`,
        [`info`, `family`, `descendants`, `quit`]
    );

    switch (mainMenuUserActionChoice) {
        case "info":
            // ! TODO
            // displayPersonInfo(person);
            break;
        case "family":
            //! TODO
            // Let personDescendants = findPersonDescentants(person, people);
            // displayPeople('Descendants' , personDescendants);
            break;
        case "quit":
            return;
        default:
            alert("Invalid input. Please try again");
    }

    return mainMenu(person, people);
}


function displayPeople(displayTitle, peopleToDisplay) {
    const formatedPeopleDisplayText = peopleToDisplay.map(person => `${person.firstName} ${person.lastName}`).joint('\n');
    alert(`${displayTitle}\n\n ${formatedPeopleDisplayText}`);
}

function validatedPrompt(message, acceptableAnswers) {
    acceptableAnswers = acceptableAnswers.map(aa => aa.toLowerCase());

    const builtPromptWithAcceptableAnswers = `${message} \nAcceptable Answers: ${acceptableAnswers.map(aa => `\n-> ${aa}`).join('')}`;

    const userResponse = prompt(builtPromptWithAcceptableAnswers).toLowerCase();

    if (acceptableAnswers.includes(userResponse)) {
        return userResponse;
    }
    else {
        alert(`"${userResponse}" is not an acceptable response. The acceptable responses include: \n ${acceptableAnswers.map(aa => `\n-> ${aa}`).join('')} \n\nPlease try again.`);
        return validatedPrompt(message, acceptableAnswers);
    }
}

function exitOrRestart(people) {
    const userExitOrRestartChoise = validatedPrompt(
        "Would you like to exit or restart?",
        ['exit', 'restart']
    );

    switch (userExitOrRestartChoise) {
        case "exit":
            return;
        case "restart":
            return app(people);
        default:
            alert("Invalid input. Please try gain");
            return exitOrRestart(people);
    }
}