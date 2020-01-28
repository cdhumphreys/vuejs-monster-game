const gameStates = {
    menu: 'MENU',
    inProgress: 'IN_PROGRESS',
    won: 'WON',
    lost: 'LOST'
};

new Vue({
    el: '#app',
    data: {
        gameState: gameStates.menu,
        monsterHealth: 100,
        playerHealth: 100
    },
    computed: {
        showStart: function() {
            return (
                this.gameState == gameStates.menu ||
                this.gameState == gameStates.won ||
                this.gameState == gameStates.lost
            );
        },
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
            
        }
    }
});