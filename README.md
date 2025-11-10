# Tic-Tac-Toe Game

A modular tic-tac-toe game implemented using the PubSub (Publish-Subscribe) design pattern, with additional implementations in Object Literal and Revealing Module patterns.

## 🎯 Features

- **Player Registration**: Modal form for entering player names and avatars
- **Interactive Gameplay**: Click-based interface with visual feedback
- **Real-time Updates**: Dynamic turn indicators and game status
- **Multiple Design Patterns**: Compare different JavaScript architectural approaches
- **Responsive Design**: Flexbox and CSS Grid layout

## 🔧 PubSub Architecture

The main implementation uses an event-driven PubSub pattern:

### Event Flow

1. **Player Setup**: `formController.js` publishes `gameStarted` with player data
2. **Game Logic**: `gameLogic.js` subscribes to `gameStarted` and manages game state
3. **User Interaction**: `gameRendering.js` publishes `boxClicked` on player moves
4. **State Update**: `gameLogic.js` processes moves and publishes `boxMarked`
5. **UI Update**: `gameRendering.js` subscribes to `boxMarked` and updates display

### Key Modules

#### pubsub.js

- IIFE module with events registry
- `subscribe(event, callback)` - Register event listeners
- `publish(event, data)` - Trigger events with data

#### gameLogic.js

- `gameBoard` IIFE with core game mechanics
- `markBox()`, `switchPlayer()`, `checkWinner()` functions
- Manages player turns and win conditions

#### gameRendering.js

- Handles all DOM updates
- Interactive game board with click events
- Real-time player information display

#### formController.js

- Modal management and form handling
- Player data collection and validation
- Game initialization trigger

---

This project was completed as part of The Odin Project's JavaScript curriculum to demonstrate understanding of modular JavaScript, design patterns, and clean code architecture.
