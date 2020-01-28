const GAME_STATE_MENU = 'MENU';
const GAME_STATE_IN_PROGRESS = 'IN_PROGRESS';
const GAME_STATE_WON = 'WON';
const GAME_STATE_LOST = 'LOST';

const AGENTS_PLAYER = 'PLAYER';
const AGENTS_MONSTER = 'MONSTER';

// To allow the health bar animations to play
const animationDelay = 250;

new Vue({
    el: '#app',
    data: {
        gameState: GAME_STATE_MENU,
        playerTurn: true,
        monsterHealth: 100,
        playerHealth: 100,
        playerMaxAttackDamage: 20,
        playerSpecialAttackModifier: 2,
        playerMaxHealAmount: 30,
        monsterMaxAttackDamage: 20,
        battleLog: [],
        gameStates: {
            MENU: GAME_STATE_MENU,
            IN_PROGRESS: GAME_STATE_IN_PROGRESS,
            WON: GAME_STATE_WON,
            LOST: GAME_STATE_LOST
        },
        agents: {
            PLAYER: AGENTS_PLAYER,
            MONSTER: AGENTS_MONSTER
        }
    },
    computed: {
        playerClasses: function() {
            return {
                'healthbar': true,
                'healthbar--green': this.playerHealth >= 75,
                'healthbar--orange': this.playerHealth < 75 && this.playerHealth > 40,
                'healthbar--red': this.playerHealth <= 40,
            }
        },
        monsterClasses: function() {
            return {
                'healthbar': true,
                'healthbar--green': this.monsterHealth >= 75,
                'healthbar--orange': this.monsterHealth < 75 && this.monsterHealth > 40,
                'healthbar--red': this.monsterHealth <= 40,
            }
        }
    },
    methods: {
        initialise: function() {
            // Set initial conditions for a game
            this.playerTurn = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.battleLog = [];
        },

        startGame: function() {
            this.initialise();
            this.gameState = this.gameStates.IN_PROGRESS;
        },

        addBattleLog: function(agent, target, damage) {
            // Add log recording actions taken by player or monster
            this.battleLog.unshift({
                agent: agent,
                target: target,
                damage: damage
            });
        },

        monsterAttack: function() {
            const vm = this;
            // Delay monster attack slightly for clarity
            setTimeout(function() {
                if (vm.gameState === vm.gameStates.IN_PROGRESS) {
                    const damage = -1 * (Math.floor(Math.random() * vm.monsterMaxAttackDamage) + 1);
                    vm.playerHealth = Math.max(0, vm.playerHealth + damage);
                    vm.addBattleLog(vm.agents.MONSTER, vm.agents.PLAYER, damage);

                    setTimeout(function() {
                        vm.playerTurn = true;
                    }, animationDelay);
                }
            }, animationDelay);
        },

        playerAttack: function() {
            if (!this.playerTurn) return;

            const damage = -1 * (Math.floor(Math.random() * this.playerMaxAttackDamage) + 1);
            this.monsterHealth = Math.max(0, this.monsterHealth + damage);
            this.addBattleLog(this.agents.PLAYER, this.agents.MONSTER, damage);

            this.playerTurn = false;
            this.monsterAttack();
        },

        playerSpecialAttack: function() {
            if (!this.playerTurn) return;

            const damage = -1 * (Math.floor((Math.floor(Math.random() * this.playerMaxAttackDamage) + 1) * this.playerSpecialAttackModifier));
            this.monsterHealth = Math.max(0, this.monsterHealth + damage);;
            this.addBattleLog(this.agents.PLAYER, this.agents.MONSTER, damage);

            this.playerTurn = false;
            this.monsterAttack();
        },

        playerHeal: function() {
            if (!this.playerTurn) return;

            const heal = Math.floor(Math.random() * this.playerMaxHealAmount) + 1;
            this.playerHealth = Math.min(100, this.playerHealth + heal);
            this.addBattleLog(this.agents.PLAYER, this.agents.PLAYER, heal);

            this.playerTurn = false;
            this.monsterAttack();
        },

        giveUp: function() {
            this.initialise();
            this.gameState = this.gameStates.MENU;
        }
    },
    watch: {
        monsterHealth: function(monsterHP) {
            if (monsterHP <= 0) {
                this.gameState = this.gameStates.WON;
            }
        },
        playerHealth: function(playerHP) {
            if (playerHP <= 0) {
                this.gameState = this.gameStates.LOST;
            }
        }
    }
});