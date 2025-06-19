# Angular 19 Standalone Kanban Board

## Overview

This repository contains a lightweight Angular 19 application that demonstrates a dynamic Kanban board with the following features:

- **Standalone Components** (no NgModules)
- **Reactive Forms** for task creation with validation
- **Angular Signals** for state management in a singleton `KanbanService`
- **Angular CDK Drag & Drop** in a connected sorting group
- **Angular Material** components for UI elements
- **Loading Indicator** during initial data load from JSON

## Features

| Feature                 | Description                                                                                              |
| ----------------------- | -------------------------------------------------------------------------------------------------------- |
| Dynamic Columns & Tasks | Columns and tasks are loaded from a JSON file (`assets/kanban.json`) and can be swapped for an API.      |
| Drag & Drop             | Uses CDK’s `CdkDropListGroup`, `CdkDropList`, and `CdkDrag` to reorder tasks within and across columns.  |
| State Management        | Centralized in `KanbanService` using Angular Signals (`signal`, `computed`) for reactive updates.        |
| Add / Delete Tasks      | A Reactive Form allows adding new tasks (title + optional description), and delete buttons remove tasks. |
| Validation              | Reactive Form enforces required `title` and `columnId`, with inline error messages.                      |
| Loading Indicator       | A full-screen spinner displays while tasks and columns are fetched.                                      |

## Getting Started

### Prerequisites

- Node.js v16 or higher
- npm v8 or higher
- Angular CLI v19 installed globally (`npm install -g @angular/cli`)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd <repository-name>

# Install dependencies
npm install
```

### Development Server

```bash
# Serve the app locally and open in browser
ng serve -o
```

The application will run at `http://localhost:4200/` by default.

## Project Structure

```
src/
 ├── app/
 │   ├── core/
 │   │   ├── models.ts                  # Column, Task, Board interfaces
 │   ├── feature/
 │   │   └── board/
 │   │       ├── board.component.ts     # Main Kanban logic (drag-drop, form)
 │   │       ├── board.component.html   # Template (form + board)
 │   │       └── board.component.scss   # Styles (layout, gradients, cards)
 │   ├── shared/
 │   │   ├── components/
 │   │   │   └── loading-indicator.component.ts  # Standalone spinner
 │   │   └── services/
 │   │       └── kanban.service.ts      # Signals store & data loader
 public/
 │   └── assets/
 │       └── kanban.json                # Sample data (columns + tasks)
 ├── main.ts                            # Bootstraps standalone AppComponent
 └── app.component.ts/html/scss         # Root component containing `<app-board>`

angular.json                              # CLI configuration (includes assets, theming setup)
package.json                              # Project dependencies and scripts
```

## Usage

1. **Add a Task**: Fill in the form at the top, then click **Add Task**. Title and Column are required.
2. **Drag & Drop**: Click and drag a task card to reorder within a column or move it to another column.
3. **Delete a Task**: Click the trash icon on a task card.

## Customization

- **Data Source**: To use a real backend, update the URL in `KanbanService.loadFromJson()` to point to your API.
- **Column Styles**: Adjust the `randomGradient()` method in `BoardComponent` to control gradient hues or replace with fixed colors.
- **Theming**: Modify `styles.scss` or theme files to change Material palettes.
- **Lazy Loading**: For large apps, consider using Angular’s `loadComponent` and route-level lazy loading.

## Building for Production

```bash
# Build the project in production mode
ng build --configuration production
```

The optimized output will be in the `dist/` folder, with tree-shaking and AOT compilation applied.
# tibicle-kanban
