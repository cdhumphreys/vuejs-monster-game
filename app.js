const GAME_STATE_MENU = 'MENU';
const GAME_STATE_IN_PROGRESS = 'IN_PROGRESS';
const GAME_STATE_WON = 'WON';
const GAME_STATE_LOST = 'LOST';

new Vue({
    el: '#app',
    data: {
        gameState: GAME_STATE_MENU,
        monsterHealth: 100,
        playerHealth: 100,
        playerMaxAttackDamage: 20,
        playerSpecialAttackModifier: 1.2,
        playerMaxHealAmount: 20,
        monsterMaxAttackDamage: 15,
        battleLog: [],
        gameStates: {
            MENU: GAME_STATE_MENU,
            IN_PROGRESS: GAME_STATE_IN_PROGRESS,
            WON: GAME_STATE_WON,
            LOST: GAME_STATE_LOST
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
        startGame: function() {
            this.battleLog = [];
            this.gameState = this.gameStates.IN_PROGRESS;
        },

        addBattleLog: function(agent, target, damage) {
            this.battleLog.push({
                agent: agent,
                target: target,
                damage: damage
            });
        },

        monsterAttack: function() {
            const damage = -1 * Math.floor(Math.random() * this.monsterMaxAttackDamage) + 1;
            this.playerHealth += damage;
            this.addBattleLog(agents.MONSTER, agents.PLAYER, damage);
        },

        playerAttack: function() {
            const damage = -1 * Math.floor(Math.random() * this.playerMaxAttackDamage) + 1;
            this.monsterHealth += damage;
            this.addBattleLog(agents.PLAYER, agents.MONSTER, damage);
        },

        playerSpecialAttack: function() {
            const damage = -1 * Math.Floor((Math.floor(Math.random() * this.playerMaxAttackDamage) + 1) * this.playerSpecialAttackModifier);
            this.monsterHealth += damage;
            this.addBattleLog(agents.PLAYER, agents.MONSTER, damage);
        },

        playerHeal: function() {
            const heal = Math.floor(Math.random() * this.playerMaxHealAmount) + 1;
            this.playerHealth += heal;
            this.addBattleLog(agents.PLAYER, agents.PLAYER, heal);
        }
    },
    watch: {
        monsterHealth: function(monsterHP) {
            if (monsterHP === 0) {
                this.gameState = this.gameStates.WON;
            }
        },
        playerHealth: function(playerHP) {
            if (playerHP ===0) {
                this.gameState = this.gameStates.LOST;
            }
        }
    }
});