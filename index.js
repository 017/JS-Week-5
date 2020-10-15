class Player {
  constructor(playerName, playerClass, STR, AGI, CON, CHA, WIS, INT, HP, AC) {
    this.playerName = playerName;
    this.playerClass = playerClass;
    this.strength = STR;
    this.agility = AGI;
    this.constitution = CON;
    this.charisma = CHA;
    this.wisdom = WIS;
    this.intelligence = INT;
    this.hitPoints = HP;
    this.armorClass = AC;
  }

  getRollMod(stat) {
    if (stat >= 18) {
      return 5;
    } else if (stat >= 16) {
      return 4;
    } else if (stat >= 14) {
      return 3;
    } else if (stat >= 12) {
      return 2;
    } else if (stat >= 10) {
      return 1;
    } else if (stat >= 8) {
      return 0;
    } else if (stat >= 6) {
      return -1;
    } else if (stat >= 4) {
      return -2;
    } else if (stat >= 2) {
      return -3;
    } else {
      return -4;
    }
  }

  describe() {
    let result = alert(`
    Player Details:
    Name: ${this.playerName}
    Class: ${this.playerClass}
    AC: ${this.armorClass}
    HP: ${this.hitPoints}
    Constitution: ${this.constitution} (${this.getRollMod(this.constitution)})
    Strength: ${this.strength} (${this.getRollMod(this.strength)})
    Agility: ${this.agility} (${this.getRollMod(this.agility)})
    Charisma: ${this.charisma} (${this.getRollMod(this.charisma)})
    Wisdom: ${this.wisdom} (${this.getRollMod(this.wisdom)})
    Intelligence: ${this.intelligence} (${this.getRollMod(this.intelligence)})
    `);
    return result;
  }
}

class Team {
  constructor(name) {
    this.name = name;
    this.players = [];
  }

  addPlayer(ply) {
    if (ply instanceof Player) {
      this.players.push(ply);
    } else {
      throw new Error(`You can only add an instance of player. This is not a player: ${ply}`);
    }
  }

  describe() {
    let result = `[${this.name}] has ${this.players.length} players.`;
    return result;
  }
}

class Menu {
  constructor() {
    this.teams = [];
    this.selectedTeam = null;
  }

  start() {
    console.log('START');
    let selection = this.showMainMenu();
    while (selection != 0) {
      switch (selection) {
        case '1':
          this.createTeam();
          break;
        case '2':
          this.viewTeam();
          break;
        case '3':
          this.deleteTeam();
          break;
        case '4':
          this.displayTeams();
          break;
        default:
          selection = 0;
      }
      selection = this.showMainMenu();
    }

    alert('Closing Menu!');
  }

  showMainMenu() {
    return prompt(`
    0: EXIT
    1: CREATE NEW TEAM
    2: VIEW TEAM
    3: DELETE TEAM
    4: DISPLAY ALL TEAMS
    `);
  }

  showTeamMenu(teamInfo) {
    return prompt(`
    0: BACK
    1: CREATE PLAYER
    2: DELETE PLAYER
    3: VIEW PLAYERS
    `);
  }

  getTeams() {
    let list = '';
    for (let j = 0; j < this.teams.length; j++) {
      list += `[${j}] ${this.teams[j].name}
      `;
    }
    alert(list);
  }

  createTeam() {
    let name = prompt(`Please enter a name for your new team.`);
    this.teams.push(new Team(name));
  }

  deleteTeam() {
    this.getTeams();
    let index = prompt(`Enter the index of the team to delete.`);
    if (index !== -1) {
      this.teams.splice(index, 1);
    }
  }

  viewTeam() {
    this.getTeams()
    let index = prompt(`Enter the index of the team you want to view.`);
    if (index !== -1) {
      this.selectedTeam = this.teams[index];
      let description = `Team Name: ${this.selectedTeam.name}
      
      `;

      for (let i = 0; i < this.selectedTeam.players.length; i++) {

        description += `[${i}] ${this.selectedTeam.players[i].playerName}
        Class: ${this.selectedTeam.players[i].playerClass} 
        HP: ${this.selectedTeam.players[i].hitPoints}
        AC: ${this.selectedTeam.players[i].armorClass}
        `;
      }

      let selection = this.showTeamMenu(description);
      switch (selection) {
        case '1':
          this.createPlayer();
          break;
        case '2':
          this.deletePlayer();
          break;
        case '3':
          this.displayPlayers();
      }

    } else if (result === -1) {
      throw new Error(`Error: Provided input was not found. Please try again with a different name.`);
    } else {
      throw new Error(`Error: Invalid Input`);
    }
  }
  
  rollStat() {
    let result1 = Math.floor((Math.random() * 6));
    let result2 = Math.floor((Math.random() * 6));
    let result3 = Math.floor((Math.random() * 6));
    let result = 6 + result1 + result2 + result3;
    return result;
  }

  getRollMod(stat) {
    if (stat >= 18) {
      return 5;
    } else if (stat >= 16) {
      return 4;
    } else if (stat >= 14) {
      return 3;
    } else if (stat >= 12) {
      return 2;
    } else if (stat >= 10) {
      return 1;
    } else if (stat >= 8) {
      return 0;
    } else if (stat >= 6) {
      return -1;
    } else if (stat >= 4) {
      return -2;
    } else if (stat >= 2) {
      return -3;
    } else {
      return -4;
    }
  }

  rollHP(hpstat, multi) {
    let rolled = Math.floor(Math.random() * 6);
    let hpMod = this.getRollMod(hpstat + 10);
    let result = rolled * hpMod * multi;
    return result;
  }

  getAC(stat) {
    let calculatedAC = 10 + this.getRollMod(stat);
    return calculatedAC;
  }

  createPlayer() {
    let validClasses = ['Fighter', 'Rogue', 'Ranger', 'Wizard', 'Sorcerer', 'Warlock', 'Paladin', 'Barbarian'];
    let playerName = prompt('Enter new player name. Stats will be randomized for the new player.');
    let STR = this.rollStat();
    let AGI = this.rollStat();
    let CON = this.rollStat();
    let CHA = this.rollStat();
    let WIS = this.rollStat();
    let INT = this.rollStat();
    let playerClass = prompt(`
    Select a new player class.
    This can be: ${validClasses}

    Your stats:
    Strength: ${STR}
    Agility: ${AGI}
    Constitution: ${CON}
    Charisma: ${CHA}
    Wisdom: ${WIS}
    Intelligence: ${INT}
    `);

    let HP;
    if (playerClass == 'Barbarian') {
      HP = this.rollHP(CON * 2, 2);
    } else {
      HP = this.rollHP(CON, 2);
    }
    alert(`HitPoints: ${HP}`);

    let AC;
    if (playerClass == 'Paladin', 'Warlock') {
      AC = this.getAC(CHA);
    } else if (playerClass == 'Sorcerer') {
      AC = this.getAC(CHA + 5);
    } else {
      AC = this.getAC(AGI);
    }

    // function validateClass(name) {
    //   validClasses.forEach(function (name) {
    //     if (validClasses.indexOf(name) === -1) {
    //       return false;
    //     } else {
    //       return true;
    //     }
    //   });
    // }

    this.selectedTeam.players.push(new Player(playerName, playerClass, STR, AGI, CON, CHA, WIS, INT, HP, AC));
  }

  deletePlayer() {
    let list = '';
    for (let j = 0; j < this.selectedTeam.players.length; j++) {
      list += `[${j}] ${this.selectedTeam.players[j].playerName}
      `;
    }
    alert(list);
    let index = prompt(`Enter the index of the player to delete.`);
    if (index !== undefined) {
      this.selectedTeam.players.splice(index, 1);
    }
  }

  displayPlayers() {
    let list = '';
    for (let j = 0; j < this.selectedTeam.players.length; j++) {
      let ply = this.selectedTeam.players[j];
      list += `
      --------------------------------------------------
      [${j}] ${ply.playerName}
      Player Details:
      Class: ${ply.playerClass}
      AC: ${ply.armorClass}
      HP: ${ply.hitPoints}
      Constitution: ${ply.constitution} (Roll Bonus: ${this.getRollMod(ply.constitution)})
      Strength: ${ply.strength} (Roll Bonus: ${this.getRollMod(ply.strength)})
      Agility: ${ply.agility} (Roll Bonus: ${this.getRollMod(ply.agility)})
      Charisma: ${ply.charisma} (Roll Bonus: ${this.getRollMod(ply.charisma)})
      Wisdom: ${ply.wisdom} (Roll Bonus: ${this.getRollMod(ply.wisdom)})
      Intelligence: ${ply.intelligence} (Roll Bonus: ${this.getRollMod(ply.intelligence)})
      --------------------------------------------------
      `;
    }
    alert(list);
  }

  displayTeams() {
    let teamString = '';
    for (let k = 0; k < this.teams.length; k++) {
      teamString += `[${k}] ${this.teams[k].name}
      `; // Return 1 line each time at the end
    }
    alert(teamString);
  }



}

let menu = new Menu();
console.log(menu);
menu.start();