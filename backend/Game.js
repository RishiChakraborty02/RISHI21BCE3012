class Game {
  constructor(id) {
    this.id = id;
    this.players = [];
    this.gameState = this.initialGameState();
    this.currentPlayer = "A";
  }

  initialGameState() {
    return {
      activeTileId: null,
      gameBoard: [
        {
          id: 0,
          tileDetails: {
            isOccupied: true,
            occupiedBy: "A",
            character: 0,
            characterName: "P1",
            highlight: false,
          },
        },
        {
          id: 1,
          tileDetails: {
            isOccupied: true,
            occupiedBy: "A",
            character: 0,
            characterName: "P2",
            highlight: false,
          },
        },
        {
          id: 2,
          tileDetails: {
            isOccupied: true,
            occupiedBy: "A",
            character: 1,
            characterName: "H1",
            highlight: false,
          },
        },
        {
          id: 3,
          tileDetails: {
            isOccupied: true,
            occupiedBy: "A",
            character: 2,
            characterName: "H2",
            highlight: false,
          },
        },
        {
          id: 4,
          tileDetails: {
            isOccupied: true,
            occupiedBy: "A",
            character: 0,
            characterName: "P3",
            highlight: false,
          },
        },
        {
          id: 5,
          tileDetails: {
            isOccupied: false,
            occupiedBy: null,
            character: null,
            characterName: null,
            highlight: false,
          },
        },
        {
          id: 6,
          tileDetails: {
            isOccupied: false,
            occupiedBy: null,
            character: null,
            characterName: null,
            highlight: false,
          },
        },
        {
          id: 7,
          tileDetails: {
            isOccupied: false,
            occupiedBy: null,
            character: null,
            characterName: null,
            highlight: false,
          },
        },
        {
          id: 8,
          tileDetails: {
            isOccupied: false,
            occupiedBy: null,
            character: null,
            characterName: null,
            highlight: false,
          },
        },
        {
          id: 9,
          tileDetails: {
            isOccupied: false,
            occupiedBy: null,
            character: null,
            characterName: null,
            highlight: false,
          },
        },
        {
          id: 10,
          tileDetails: {
            isOccupied: false,
            occupiedBy: null,
            character: null,
            characterName: null,
            highlight: false,
          },
        },
        {
          id: 11,
          tileDetails: {
            isOccupied: false,
            occupiedBy: null,
            character: null,
            characterName: null,
            highlight: false,
          },
        },
        {
          id: 12,
          tileDetails: {
            isOccupied: false,
            occupiedBy: null,
            character: null,
            characterName: null,
            highlight: false,
          },
        },
        {
          id: 13,
          tileDetails: {
            isOccupied: false,
            occupiedBy: null,
            character: null,
            characterName: null,
            highlight: false,
          },
        },
        {
          id: 14,
          tileDetails: {
            isOccupied: false,
            occupiedBy: null,
            character: null,
            characterName: null,
            highlight: false,
          },
        },
        {
          id: 15,
          tileDetails: {
            isOccupied: false,
            occupiedBy: null,
            character: null,
            characterName: null,
            highlight: false,
          },
        },
        {
          id: 16,
          tileDetails: {
            isOccupied: false,
            occupiedBy: null,
            character: null,
            characterName: null,
            highlight: false,
          },
        },
        {
          id: 17,
          tileDetails: {
            isOccupied: false,
            occupiedBy: null,
            character: null,
            characterName: null,
            highlight: false,
          },
        },
        {
          id: 18,
          tileDetails: {
            isOccupied: false,
            occupiedBy: null,
            character: null,
            characterName: null,
            highlight: false,
          },
        },
        {
          id: 19,
          tileDetails: {
            isOccupied: false,
            occupiedBy: null,
            character: null,
            characterName: null,
            highlight: false,
          },
        },
        {
          id: 20,
          tileDetails: {
            isOccupied: true,
            occupiedBy: "B",
            character: 0,
            characterName: "P1",
            highlight: false,
          },
        },
        {
          id: 21,
          tileDetails: {
            isOccupied: true,
            occupiedBy: "B",
            character: 0,
            characterName: "P2",
            highlight: false,
          },
        },
        {
          id: 22,
          tileDetails: {
            isOccupied: true,
            occupiedBy: "B",
            character: 1,
            characterName: "H1",
            highlight: false,
          },
        },
        {
          id: 23,
          tileDetails: {
            isOccupied: true,
            occupiedBy: "B",
            character: 2,
            characterName: "H2",
            highlight: false,
          },
        },
        {
          id: 24,
          tileDetails: {
            isOccupied: true,
            occupiedBy: "B",
            character: 0,
            characterName: "P3",
            highlight: false,
          },
        },
      ],
      sessionDetails: {},
      playerDetails: {},
      deletedObjects: [],
      winner: null,
      currentPlayer: "A",
    };
  }

  addPlayer(playerId) {
    if (this.players.length < 2) {
      this.players.push(playerId);
    }
  }

  getGameState() {
    return this.gameState;
  }

  makeMove(fromId, toId) {
    const boardSize = 5;
    const fromRow = Math.floor(fromId / boardSize);
    const fromCol = fromId % boardSize;
    const toRow = Math.floor(toId / boardSize);
    const toCol = toId % boardSize;
    const character = this.gameState.gameBoard[fromId].tileDetails.character;
    const currentPlayer =
      this.gameState.gameBoard[fromId].tileDetails.occupiedBy;
    const targetTile = this.gameState.gameBoard[toId];

    const isValidMove = (character, fromRow, fromCol, toRow, toCol) => {
      if (character === 0) {
        // Pawn
        return (
          (Math.abs(fromRow - toRow) === 1 && fromCol === toCol) ||
          (Math.abs(fromCol - toCol) === 1 && fromRow === toRow)
        );
      } else if (character === 1) {
        // Hero1
        return (
          (Math.abs(fromRow - toRow) === 2 && fromCol === toCol) ||
          (Math.abs(fromCol - toCol) === 2 && fromRow === toRow)
        );
      } else if (character === 2) {
        // Hero2
        return (
          Math.abs(fromRow - toRow) === 2 && Math.abs(fromCol - toCol) === 2
        );
      }
      return false;
    };

    if (
      isValidMove(character, fromRow, fromCol, toRow, toCol) &&
      targetTile.tileDetails.occupiedBy !== currentPlayer
    ) {
      // Check if the target tile has an opponent's character
      if (targetTile.tileDetails.isOccupied) {
        this.gameState.deletedObjects.push(targetTile.tileDetails);
      }

      // Move the character
      this.gameState.gameBoard[toId].tileDetails = {
        ...this.gameState.gameBoard[fromId].tileDetails,
      };
      // Clear the original tile
      this.gameState.gameBoard[fromId].tileDetails = {
        isOccupied: false,
        occupiedBy: null,
        character: null,
        characterName: null,
        highlight: false,
      };

      // Reset all highlights
      this.gameState.gameBoard.forEach((tile) => {
        tile.tileDetails.highlight = false;
      });

      // Reset activeTileId
      this.gameState.activeTileId = null;

      // Check for winner
      const teamA = this.gameState.gameBoard.filter(
        (tile) => tile.tileDetails.occupiedBy === "A"
      );
      const teamB = this.gameState.gameBoard.filter(
        (tile) => tile.tileDetails.occupiedBy === "B"
      );

      if (teamA.length === 0) {
        this.gameState.winner = "B";
      } else if (teamB.length === 0) {
        this.gameState.winner = "A";
      }

      // Change turn
      this.gameState.currentPlayer =
        this.gameState.currentPlayer === "A" ? "B" : "A";
    } else {
      console.log("Invalid move or target tile occupied by the same player");
    }
  }
}

export default Game;