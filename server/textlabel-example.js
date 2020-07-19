import * as alt from "alt-server";
import * as EntitySync from "./entitysync";

const TEXTLABEL_ENTITY_TYPE = 1;

export default class Textlabel extends EntitySync.Entity {
    /**
     * Creates an instance of Textlabel
     * @author LeonMrBonnie
     * @param {String} text
     * @param {Number} font
     * @param {Number} scale
     * @param {alt.Vector3} pos
     * @param {Number} dimension
     * @param {alt.RGBA} color
     * @param {number} [range=5]
     * @memberof Textlabel
     */
    constructor(
        text,
        font,
        scale,
        pos,
        dimension = 0,
        color = new alt.RGBA(0, 0, 0, 255),
        range = 10
    ) {
        super(
            TEXTLABEL_ENTITY_TYPE,
            pos,
            dimension,
            {
                text: text,
                r: color.r,
                g: color.g,
                b: color.b,
                a: color.a,
                scale: scale,
                font: font,
            },
            range
        );
    }
    get text() {
        return this.getData("text");
    }
    set text(val) {
        this.setData("text", val);
    }
    get color() {
        return new alt.RGBA(
            this.getData("r"),
            this.getData("g"),
            this.getData("b"),
            this.getData("a")
        );
    }
    set color(val) {
        this.setData("r", val.r);
        this.setData("g", val.g);
        this.setData("b", val.b);
        this.setData("a", val.a);
    }
    get scale() {
        return this.getData("scale");
    }
    set scale(val) {
        this.setData("scale", val);
    }
    get font() {
        return this.getData("font");
    }
    set font(val) {
        this.setData("font", val);
    }
}
