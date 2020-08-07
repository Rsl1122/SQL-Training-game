// Task groups are filled in main.js#initializeGameDictionaries
const taskGroups = {
    asList() {
        return Object.values(this).filter(obj => obj instanceof TaskGroup);
    },
    lookupTaskGroupWithTaskId(taskID) {
        for (let taskGroup of this.asList()) {
            if (taskGroup.tasks.includes(taskID)) return taskGroup;
        }
        return null;
    },
    getCompletedTaskCount() {
        return this.asList()
            .map(taskGroup => taskGroup.getCompletedTaskCount())
            .reduce((total, num) => total + num, 0)
    },
    getTaskCount() {
        return this.asList()
            .map(taskGroup => taskGroup.getTaskCount())
            .reduce((total, num) => total + num, 0)
    }
};

/**
 * Represents a group of tasks the player needs to complete.
 */
class TaskGroup extends ItemType {
    /**
     * Construct a new TaskGroup.
     *
     * id          ID in taskGroups variable
     * tasks       List of Task IDs, without 'task-' in front eg 000, 001 etc
     * unlocked    boolean, has this task group been unlocked
     * newItem     boolean, is this item new to the player
     * book        Book ID that is related to this TaskGroup
     * requires    Array of task group IDs that this task group requires for unlock
     * requiredBy  Array of task group IDs that this task group is required for
     *
     * @param options {id, tasks, unlocked, newItem, book, requires, requiredBy}
     */
    constructor(options) {
        super({
            item: new ImageItem({
                id: `task-group-${options.id}`,
                name: `i18n-group-${options.id}-name`,
                onclick: `Views.INVENTORY.showTaskGroup('${options.id}')`,
                url: './img/scrolls.png',
                alt: "task group ${options.id}"
            }),
            unlocked: false,
            tasks: [],
            newItem: true,
            book: `Book-${options.id}`,

            onUnlock: async () => inventory.addItem(`task-group-${options.id}`),
            ...options
        });
        this.tasks = this.tasks.map(task => `task-${task}`);
    }

    getCompletedTaskCount() {
        return this.tasks.filter(taskID => tasks[taskID] && tasks[taskID].completed).length;
    }

    getTaskCount() {
        return this.tasks.filter(taskID => tasks[taskID]).length;
    }

    isCompleted() {
        return this.getCompletedTaskCount() >= this.getTaskCount();
    }

    async render() {
        const completed = this.getCompletedTaskCount();
        const outOf = this.getTaskCount();
        const completedIcon = outOf <= completed ? "<i class='fa fa-fw fa-star col-yellow' aria-hidden='true' '></i>" : '';
        const selected = Views.INVENTORY.currentTaskGroup && Views.INVENTORY.currentTaskGroup.item.id === this.item.id;
        if (selected) this.newItem = false;
        return `<button 
                    id="${this.item.id}"
                    class="item${selected ? " highlighted" : ""} ${this.unlocked ? '' : ' locked'}" 
                    onclick="${this.item.onclick}" 
                    type="button" ${this.unlocked ? '' : 'disabled'}
                    aria-expanded="${!!selected}"
                    aria-disabled="${!this.unlocked}"
                    aria-controls="viewed-tasks"
                    aria-labelledby="${this.item.id}"
                >
                    ${this.item.renderShowItem()}
                    ${this.newItem && this.unlocked ? `<div class="new-item-highlight"><div class="burst-12"> </div></div>` : ''}
                    <p id="task-group-${this.id}-label">${completedIcon} ${completed} / ${outOf}</p>
                </button>`;
    }

    async renderTaskInventory() {
        let html = getItem(this.book).render();

        const rendered = {};
        let loaded = 0;
        let started = 0;
        const toLoad = this.tasks.length;

        async function renderTask(taskID) {
            try {
                const needsBreak = (toLoad > 6 && started !== 0 && started % 4 === 0) // 7-8 tasks
                    || (toLoad >= 5 && toLoad < 6 && started !== 0 && (started + 1) % 3 === 0); // 5-6 tasks
                started++;
                rendered[taskID] = await tasks[taskID].render();
                if (needsBreak) {
                    rendered[taskID] = (needsBreak ? `<div class="break"></div>` : '') + rendered[taskID]
                }
            } catch (e) {
                rendered[taskID] = `<button class="item${tasks[taskID].completed ? " done" : ""}">
                    <img class="item-icon" alt="missing task ${taskID}" src="img/scroll.png" draggable="false">
                    <i class="task-group-color fa fa-fw fa-2x fa-bookmark"></i>
                    <p>${taskID} doesn't exist</p>     
                </button>`
            }
            loaded++;
        }

        for (let taskID of this.tasks) {
            renderTask(taskID);
        }

        await awaitUntil(() => loaded >= toLoad);

        for (let taskID of this.tasks) {
            html += rendered[taskID];
        }

        return html;
    }

    async attemptUnlock() {
        for (let required of this.requires) {
            const requiredTaskGroup = taskGroups[required];
            if (!requiredTaskGroup.isCompleted()) {
                return;
            }
        }
        this.unlocked = true;
        this.newItem = true;
        await inventory.update();
        return this;
    }


    async checkGoal() {
        if (this.isCompleted() && !this.completed) {
            eventQueue.push(Views.INVENTORY, async () => {
                this.performUnlock();
            });
            this.completed = true;
        }
    }

    async performUnlock() {
        const levelUpNotice = document.getElementById('progress-all-done');
        levelUpNotice.classList.remove('hidden');
        await delay(20);
        levelUpNotice.classList.add('active');
        unlockBookMenu();
        const relatedTaskGroups = [];
        for (let taskGroupID of this.requiredBy) {
            const unlocked = await taskGroups[taskGroupID].attemptUnlock();
            if (unlocked) relatedTaskGroups.push(unlocked);
        }
        const isLastTaskGroup = relatedTaskGroups.filter(group => group.id === 'X').length !== 0;
        if (isLastTaskGroup) {
            const questionmark = getItem('item-999');
            questionmark.unlocked = true;
            questionmark.newItem = true;
            inventory.update();
        }
        await delay(3000);
        await Views.INVENTORY.showTaskGroup(isLastTaskGroup ? undefined : relatedTaskGroups[0].id);
        await delay(5500);
        levelUpNotice.classList.remove('active');
        await delay(300);
        levelUpNotice.classList.add('hidden');
    }

}