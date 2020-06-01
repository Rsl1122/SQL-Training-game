load = storageObject => {
    if (!storageObject) return;
    // Reset everything
    inventory.removeAll();
    for (let bracket of skillTree) {
        for (let skill of bracket) {
            skill.unlocked = false;
        }
    }
    for (let task of Object.values(tasks)) {
        task.completed = false;
    }
    DISPLAY_STATE.currentTaskGroup = null;
    DISPLAY_STATE.skillMenuUnlocked = true;
    document.getElementById('skill-box').classList.remove('hidden');
    userProgress.level = 0;
    userProgress.currentGoalIndex = 0;
    userProgress.skillPoints = 0;
    userProgress.xp = 0;

    const completedTasks = storageObject.completedTasks;

    // Load inventory & progress based on unlocked task groups
    const unlockedTaskGroups = [];
    for (let taskID of completedTasks) {
        const group = taskGroups.lookupTaskGroupWithTaskId(taskID);
        const groupID = group.item.id;
        if (!unlockedTaskGroups.includes(groupID)) unlockedTaskGroups.push(groupID);

        const task = tasks[taskID];
        task.completed = true;
        userProgress.gainXp(task.xp);
    }

    if (!unlockedTaskGroups.includes('task-group-001')) {
        inventory.addItems(['item-00', 'item-000'])
    }
    inventory.addItems(unlockedTaskGroups);

    // Load levels and skillpoints
    while (true) {
        const goal = getCurrentGoal();
        if (goal.xp > userProgress.xp) {
            break;
        }
        userProgress.gainLevel();
        userProgress.gainSkillPoints(goal.skillPoints);
    }
    const xpBar = document.getElementById('xp-bar');
    xpBar.setAttribute('aria-valuenow', userProgress.xp);
    xpBar.setAttribute("aria-valuemin", progression[userProgress.currentGoalIndex - 1] ? progression[userProgress.currentGoalIndex - 1].xp : 0);
    xpBar.setAttribute("aria-valuemax", progression[userProgress.currentGoalIndex].xp);

    // Load skill tree based on unlocked task groups
    for (let bracket of skillTree) {
        for (let skill of bracket) {
            if (unlockedTaskGroups.includes(skill.tasks)) {
                skill.unlocked = true;
                userProgress.useSkillPoints(skill.cost);
            }
        }
    }
    skillTree[0][0].unlocked = true; // Unlocks first book.

    inventory.update();
    updateTaskGroupTasks();
    updateSkillTree();
    unlockXpBar();
}

save = () => {
    const completedTasks = [];
    for (let task of Object.values(tasks)) {
        if (task.completed) completedTasks.push(task.id);
    }

    return {
        completedTasks
    };
}

const s0 = save();
let s1;
saveS1 = () => {
    s1 = save();
}
loadS1 = () => {
    load(s1);
}