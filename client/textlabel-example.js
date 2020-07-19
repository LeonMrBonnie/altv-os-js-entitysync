import * as alt from "alt-client";
import * as native from "natives";
import { Entity } from "./entitysync";

const TEXTLABEL_ENTITY_TYPE = 1;

export default class Textlabel extends Entity {
    constructor(id, type, position, data) {
        // This is called when the label gets created
        // We should should show the entity here already, because this gets called the first time we enter the streaming range of the entity
        super(id, type, position, data);
        this.show();
    }
    destroy() {
        // This is called when the entity is completely removed from the world
        // Do some cleanup here like removing the every tick, deleting the object etc.
        super.destroy();
        if (this._tick) alt.clearEveryTick(this._tick);
    }
    get text() {
        return this.data.text;
    }
    get color() {
        return new alt.RGBA(this.data.r, this.data.g, this.data.b, this.data.a);
    }
    get scale() {
        return this.data.scale;
    }
    get font() {
        return this.data.font;
    }
    show() {
        // Called every time this entity is in streaming range, so we should create/show it
        this._tick = alt.everyTick(this.render.bind(this));
    }
    hide() {
        // Called every time this entity is now out of streaming range, so we should delete/hide it
        alt.clearEveryTick(this._tick);
        this._tick = null;
    }
    positionChanged() {
        // This is called every time the position of this entity has changed, we can update the position for our object etc. here with the new this.pos
        // Because we draw in every tick and not create in once, we do not need this function for textlabels
    }
    render() {
        // This is just an own custom function, which gets executed every tick and shows our textlabel in the world
        drawText3d(
            this.text,
            this.pos.x,
            this.pos.y,
            this.pos.z,
            this.scale,
            this.font,
            this.color.r,
            this.color.g,
            this.color.b,
            this.color.a
        );
    }
}

// Credits to Stuyk (https://github.com/Stuyk) for this function
function drawText3d(
    msg,
    x,
    y,
    z,
    scale,
    fontType,
    r,
    g,
    b,
    a,
    useOutline = true,
    useDropShadow = true
) {
    let hex = msg.match("{.*}");
    if (hex) {
        const rgb = hexToRgb(hex[0].replace("{", "").replace("}", ""));
        r = rgb[0];
        g = rgb[1];
        b = rgb[2];
        msg = msg.replace(hex[0], "");
    }

    native.setDrawOrigin(x, y, z, 0);
    native.beginTextCommandDisplayText("CELL_EMAIL_BCON");
    msg.match(/.{1,99}/g).forEach((textBlock) => {
        native.addTextComponentSubstringPlayerName(textBlock);
    });
    native.setTextFont(fontType);
    native.setTextScale(1, scale);
    native.setTextWrap(0.0, 1.0);
    native.setTextCentre(true);
    native.setTextColour(r, g, b, a);

    if (useOutline) native.setTextOutline();

    if (useDropShadow) native.setTextDropShadow();

    native.endTextCommandDisplayText(0, 0);
    native.clearDrawOrigin();
}

Entity.addType(TEXTLABEL_ENTITY_TYPE, Textlabel);
