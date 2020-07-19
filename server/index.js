import * as EntitySync from "./entitysync";

export { EntitySync };

// ***** EXAMPLE ***** 
// Remove this if you don't want to use the example
import * as alt from "alt-server";
import Textlabel from "./textlabel-example";

alt.on("playerConnect", (player) => {
    player.model = "mp_m_freemode_01";
    player.spawn(0, 0, 70); // Spawns the player
    player.label = new Textlabel(`~g~${player.name}`, 4, 0.5, new alt.Vector3(0, 0, 70)); // Creates a new textlabel with the player name as the text
});