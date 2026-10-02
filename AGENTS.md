# Jack Gaffer: Football Manager Lite

## Architecture

This is a dependency-free browser game. `index.html` hosts the application, `style.css` owns responsive presentation, and the ES modules in `js/` separate fictional-world data, match simulation, persistence, and interface code. Game state belongs to the application layer; the match engine owns football outcomes and match state; the Canvas renderer reads match state and only draws it. The engine must never import or call the renderer.

## Coding conventions

- Use modern browser-native JavaScript modules, descriptive names, small functions, and comments for non-obvious simulation decisions.
- Keep data and simulation logic independent from DOM code.
- Keep player, club, and competition names fictional.
- Avoid dependencies unless a documented technical need justifies one.
- Preserve existing game behavior when adding features.

## Running and testing

Open `index.html` through a simple local static web server (for example, `python3 -m http.server 8000`) and visit `http://localhost:8000`. Browser ES modules are not reliably supported from `file://` URLs. Use the in-game new game, squad, tactics, match, season, and save/load flows for manual checks. The project may also expose lightweight browser validation helpers for the simulation.

## Simulation architecture

The match engine is event-based and deterministic for a given seed. Player attributes, roles, formation, team tactics, fitness, morale, form, home advantage, and match context influence possession, action selection, progression, chance quality, shots, and match incidents. The renderer visualizes engine state and cannot decide outcomes. AI fixtures use the same engine as the managed match.

## Renderer architecture

Canvas is a read-only view of the current match state. It scales from a modest internal resolution to its responsive CSS box and uses `requestAnimationFrame`; DOM updates happen on meaningful match events or UI changes rather than every frame.

## Mobile requirements

Support desktop Chrome and Safari and mobile Safari, including iPhone XR. Use responsive layouts, readable type, touch-sized controls, no hover-only actions, a vertically usable match view, a scaled Canvas, and no horizontal overflow.

## Save compatibility

Save data is versioned in localStorage. Validate data before loading, recover gracefully from missing or corrupt data, and migrate older versions when feasible. Do not silently discard a valid save when adding fields.

## Fictional world

All clubs, players, managers, stadiums, leagues, and competitions must be original fictional creations. Do not use real player or club databases, logos, or branding.

## Debugging

Use seeded matches to reproduce simulation behavior. Inspect engine events and match statistics before changing renderer code. Keep a hidden developer view of seed, strength, tactical modifiers, possession, phase, chances, and current event where practical.

## Permanent rules

1. Never replace the match engine with purely random outcomes.
2. Never make tactical settings cosmetic.
3. Never couple simulation logic directly to rendering.
4. Never remove existing functionality without a clear reason.
5. Preserve save-game compatibility whenever possible.
6. Mobile Safari compatibility is mandatory.
7. Do not introduce unnecessary dependencies.
8. Use fictional clubs and players.
9. Test the core match loop after major simulation changes.
10. Prefer deterministic simulations when debugging.
