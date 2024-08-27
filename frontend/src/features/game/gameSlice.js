import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
  sessionDetails: {
    game_id: null,
    current_active_player: null,
    player_2_joined: false,
  },
  playerid: null,

  deletedObjects: [],
  winner: null,
  movesHistory: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameBoard(state, action) {
      state.gameBoard = action.payload;
    },
    setSessionDetails(state, action) {
      state.sessionDetails = action.payload;
    },
    setPlayerDetails(state, action) {
      state.playerDetails = action.payload;
    },
    makeMove(state, action) {
      const { fromId, toId } = action.payload;
      const boardSize = 5;
      const fromRow = Math.floor(fromId / boardSize);
      const fromCol = fromId % boardSize;
      const toRow = Math.floor(toId / boardSize);
      const toCol = toId % boardSize;
      const character = state.gameBoard[fromId].tileDetails.character;
      const currentPlayer = state.gameBoard[fromId].tileDetails.occupiedBy;
      const targetTile = state.gameBoard[toId];

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
          state.deletedObjects.push(targetTile.tileDetails);
        }

        // Move the character
        state.gameBoard[toId].tileDetails = {
          ...state.gameBoard[fromId].tileDetails,
        };
        // Clear the original tile
        state.gameBoard[fromId].tileDetails = {
          isOccupied: false,
          occupiedBy: null,
          character: null,
          characterName: null,
          highlight: false,
        };

        // Add move to moves history
        state.movesHistory.push({ fromId, toId, player: currentPlayer });

        // Reset all highlights
        state.gameBoard.forEach((tile) => {
          tile.tileDetails.highlight = false;
        });

        // Reset activeTileId
        state.activeTileId = null;

        // Check for winner
        const teamA = state.gameBoard.filter(
          (tile) => tile.tileDetails.occupiedBy === "A"
        );
        const teamB = state.gameBoard.filter(
          (tile) => tile.tileDetails.occupiedBy === "B"
        );

        if (teamA.length === 0) {
          state.winner = "B";
        } else if (teamB.length === 0) {
          state.winner = "A";
        }

        // Change turn
        state.sessionDetails.current_active_player =
          state.sessionDetails.current_active_player === 0 ? 1 : 0;
      } else {
        console.log("Invalid move or target tile occupied by the same player");
      }
    },

    highlightTiles(state, action) {
      const { id, character } = action.payload;
      state.activeTileId = id;
      const boardSize = 5;
      const row = Math.floor(id / boardSize);
      const col = id % boardSize;
      const currentPlayer = state.gameBoard[id].tileDetails.occupiedBy;

      // Reset all highlights
      state.gameBoard.forEach((tile) => {
        tile.tileDetails.highlight = false;
      });

      const highlightTile = (r, c) => {
        if (r >= 0 && r < boardSize && c >= 0 && c < boardSize) {
          const tileId = r * boardSize + c;
          const tile = state.gameBoard[tileId];
          if (tile.tileDetails.occupiedBy !== currentPlayer) {
            tile.tileDetails.highlight = true;
          }
        }
      };

      if (character === 0) {
        // Pawn
        highlightTile(row - 1, col); // Forward
        highlightTile(row + 1, col); // Backward
        highlightTile(row, col - 1); // Left
        highlightTile(row, col + 1); // Right
      } else if (character === 1) {
        // Hero1
        highlightTile(row - 2, col); // Forward
        highlightTile(row + 2, col); // Backward
        highlightTile(row, col - 2); // Left
        highlightTile(row, col + 2); // Right
      } else if (character === 2) {
        // Hero2
        highlightTile(row - 2, col - 2); // Forward-Left
        highlightTile(row - 2, col + 2); // Forward-Right
        highlightTile(row + 2, col - 2); // Backward-Left
        highlightTile(row + 2, col + 2); // Backward-Right
      }
    },
    validateAndMove(state, action) {
      const { fromId, toId } = action.payload;
      const boardSize = 5;
      const fromRow = Math.floor(fromId / boardSize);
      const fromCol = fromId % boardSize;
      const toRow = Math.floor(toId / boardSize);
      const toCol = toId % boardSize;
      const character = state.gameBoard[fromId].tileDetails.character;
      const currentPlayer = state.gameBoard[fromId].tileDetails.occupiedBy;
      const targetTile = state.gameBoard[toId];

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
          state.deletedObjects.push(targetTile.tileDetails);
        }

        // Move the character
        state.gameBoard[toId].tileDetails = {
          ...state.gameBoard[fromId].tileDetails,
        };
        // Clear the original tile
        state.gameBoard[fromId].tileDetails = {
          isOccupied: false,
          occupiedBy: null,
          character: null,
          characterName: null,
          highlight: false,
        };

        // Add move to moves history
        state.movesHistory.push({ fromId, toId, player: currentPlayer });

        // Reset all highlights
        state.gameBoard.forEach((tile) => {
          tile.tileDetails.highlight = false;
        });

        // Reset activeTileId
        state.activeTileId = null;

        // Check for winner
        const teamA = state.gameBoard.filter(
          (tile) => tile.tileDetails.occupiedBy === "A"
        );
        const teamB = state.gameBoard.filter(
          (tile) => tile.tileDetails.occupiedBy === "B"
        );

        if (teamA.length === 0) {
          state.winner = "B";
        } else if (teamB.length === 0) {
          state.winner = "A";
        }

        // Change turn
        state.currentPlayer = state.currentPlayer === "A" ? "B" : "A";
      } else {
        console.log("Invalid move or target tile occupied by the same player");
      }
    },
    createnewSession: (state, action) => {
      console.log(action.payload);
      state.sessionDetails.game_id = action.payload;
      state.sessionDetails.created_by = action.payload.created_by;
      state.sessionDetails.current_active_player = 1;
      state.playerid = 1;
    },
    joinSession: (state, action) => {
      state.sessionDetails.game_id = action.payload.gameId;

      state.sessionDetails.current_active_player = 2;
      state.playerid = 2;
    },
    updateGameBoard: (state, action) => {
      state.gameBoard = action.payload.gameBoard;
    },
    playerJoinUpdate: (state) => {
      state.sessionDetails.player_2_joined = true;
    },
  },
});

export const {
  setGameBoard,
  setSessionDetails,
  setPlayerDetails,
  makeMove,
  changeTurn,
  highlightTiles,
  validateAndMove,
  joinSession,
  createnewSession,
  updateGameBoard,
  playerJoinUpdate,
} = gameSlice.actions;

export default gameSlice.reducer;