import * as EntitySync from "./entitysync";

export { EntitySync };

// ***** EXAMPLE ***** 
// Remove this if you don't want to use the example
import * as alt from "alt-server";
import Textlabel from "./textlabel-example";

alt.on("playerConnect", (player) => {
    player.spawn(0, 0, 42, 5); // Spawns the player
    player.label = new Textlabel(`${player.name}`, 4, 0.5, new alt.Vector3(player.pos.x, player.pos.y, player.pos.z)); // Creates a new textlabel with the player name as the text
});