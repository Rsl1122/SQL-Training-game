for (let entry of Object.entries({
    "error": "Error",
    "username": "Mooc Username",
    "password": "Password",
    "welcome": "Welcome to the magical world of SQL-spells.",
    "login": "Login",
    "login-error-no-user": "Write a username",
    "login-error-no-password": "Write a password",
    "login-error-failed-unknown": "Login failed.",
    "logout": "Logout",
    "incorrect-password": "Incorrect username or password",
    "forgot-password": "Forgot password?",
    "register": "Register",
    "empty-table": "The table is empty",
    "ok": "Alright!",
    "close": "Close",
    "skip": "Skip",
    "back": "Back",
    "task": "Task {}",
    "example": "Example",
    "loading": "Loading..",
    "show-model-answer": "Display model answer",
    "previous-answers": "Query history",
    "table-result": "Result",
    "tables": "Tables",
    "wanted-result": "Wanted result",
    "query-results": "Query results",
    "books-text": "Books",
    "tasks-text": "Scrolls",
    "map-text": "Map",
    "found-books-text": "Books",
    "level-unlocked": 'You have completed all tasks in a task group!',
    "unlocked-more-tasks": "More tasks unlocked",
    "skill-point-count-zero": 'Complete tasks to unlock more books',
    "read": "Read",
    "read-book": "Read the book",
    "previous-page": "Previous page",
    "next-page": "Next page",
    "unlock": "Unlock",
    "unlocked": "Unlocked",
    "rewatch-animation": "Rewatch animation",
    "book-discover": "You unlocked a book!",
    "item-00-name": 'Welcome letter',
    "item-00-hint":
        "Welcome. You have been given some study material and tasks. Hopefully you find it pleasant to study here.\n" +
        "\n" +
        "May the books assist ye and your tasks be solvable!\n" +
        "\n" +
        "Great regards,\n" +
        "Principal Queryx",
    "item-999-name": "???",
    "write-query-first": "Write a query.",
    "multi-query-not-allowed": "Result has to be reached with a single query. Do not write multiple queries.",
    "sub-query-not-allowed": "Result has to be reached without subqueries. Do not use subqueries.",
    "query-no-rows": "Query matched zero rows",
    "query-placeholder": "Write a SQL query...",
    "query-test": "Send the query",
    "test": "Test {}",
    "correct": "Correct",
    "incorrect": "Incorrect",
    "task-complete": "Completed",
    "task-incomplete": "Not completed",
    "group-K-name": "Scrolls of normalization",
    "group-L-name": "Scrolls of union",
    "animation-speech-1": `hahaha.. haha ha.. Maybe it is time to introduce myself.. I am Queryx, and I have now 
        obtained knowledge of all SQL - All thanks to you!`,
    "animation-speech-2": "\n" +
        "INSERT INTO Flame (power) VALUES (SELECT power FROM Stars);",
    "animation-speech-3": "\n\n" +
        "Ehahaha! All your powers are mine!\n" +
        "UPDATE Flame SET color='evil' WHERE name='Queryx';",
    "animation-speech-4": "\n\n" +
        "YOUR WORLD SHALL FALL IN RUIN!\n" +
        "SELECT * FROM World JOIN Flame on World.location != Flame.location;",
    "animation-speech-5": "\n\n" +
        "AHAHAHAhaahahaHAHAHAahAHAHAAHAaaa",
    "animation-explanation-6": "An evil flame!\n" +
        "You are the world's only hope, you must stop Queryx from destroying everything with SQL magic!",
    "to-battle": "To battle!",
    "end-animation-speech-1": "You probably think you have won by capturing my kin..",
    "end-animation-speech-2": "\n\n" +
        "BUT I'LL MAKE MORE! Hahahahaha!",
    "end-animation-speech-3": "\n\n" +
        "<i>Queryx is preparing to cast a spell..</i>",
    "end-animation-speech-4": "\n\n" +
        "NO! What do you think you're doing!",
    "end-animation-speech-5": "\n\n" +
        "<i>Queryx, you are not strong enough. He has proven his might to us, and if you think we will do your dirty work for you, you're gravely mistaken.</i>",
    "end-animation-speech-6": "\n\n" +
        "NOOOOOOOOOOOOOOooooooooooooooo...........",
    "continue": "Continue..",
    "congratulations": "Congratulations!",
    "ending-text-1": 'You have solved the mysteries of SQL magic, won against Queryx and saved the world!',
    "ending-text-2": 'You have completed all tasks, and the course! Congratulations.',
    "return-to-game": "Back to the game",
    "profile": "Profile",
    "logged-in-as": "Logged in as {}",
    "download-your-data": "Download your answers",
    "time": "time",
    "completed-tasks": "completed tasks",
    /* Screen reader only */
    "task-groups": "Main view, task groups and items",
    "tasks": "Items related to open task group",
    "task-description": "Task description",
    "task-area": "Task area",
    "task-tests": "Tests for the task",
    "counters": "Tasks completed",
    "stars": "Stars collected",
    "flames": "Flames captured",
    "transformation-animation": "Animation, the flame assisting you turns evil and releases evil flames into the world. Can be skipped with a button. Duration: about 45 seconds.",
    "end-animation": "Animation, the flames you have captured turn against their master and destroy the evil flame. Can be skipped with a button. Duration: about 45 seconds.",
    "right-sidebar": "Right sidebar - additional navigation",
    "describe-letter": "Welcome letter",
    "describe-questionmark": "Mysterious symbol",
    "group-A-name": "Scrolls of selection",
    "group-B-name": "Scrolls of aggregation",
    "group-C-name": "Scrolls of grouping",
    "group-D-name": "Scrolls of joining",
    "group-E-name": "?-kääröt",
    "group-F-name": "Scrolls of left joining",
    "group-G-name": "Scrolls of types",
    "group-H-name": "Scrolls of limits",
    "group-I-name": "Scrolls of subqueries",
    "group-J-name": "Scrolls of windows",
    "query-input-box": "SQL-query input box",
    "model-answer": "Model answer",
    "display-letter": "Display Letter Modal",
    "display-books": "Books Modal",
    "display-profile": "Profile Modal",
    "close-modal": "close modal",
    "star-count": "Star count"
})) {
    i18n[entry[0]] = entry[1];
}

replaceI18nContent();
