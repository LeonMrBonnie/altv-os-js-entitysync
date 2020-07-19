import * as alt from "alt-client";

export class Entity {
    /**
     * An object mapped by id containing all entitiies
     *
     * @type {{}}
     * @static
     * @memberof Entity
     */
    static _entities = {};
    
    /**
     * An objected containing all entity type classes
     *
     * @static
     * @memberof Entity
     */
    static _types = {};

    /**
     * Gets entity by id
     *
     * @author LeonMrBonnie
     * @static
     * @param {Number} id
     * @param {Number} type
     * @returns {Entity}
     * @memberof Entity
     */
    static getEntity(id, type) {
        return Entity._entities[`${id}_${type}`];
    }
    /**
     * Adds an entity type class
     *
     * @author LeonMrBonnie
     * @static
     * @param {Number} id
     * @param {*} type Entity type class
     * @memberof Entity
     */
    static addType(id, type) {
        Entity._types[id] = type;
    }
    /**
     * Gets type by id
     *
     * @author LeonMrBonnie
     * @static
     * @param {Number} id
     * @returns
     * @memberof Entity
     */
    static getType(id) {
        return Entity._types[id];
    }

    /**
     * Creates an instance of Entity
     * @author LeonMrBonnie
     * @param {Number} id
     * @param {Number} type
     * @param {alt.Vector3} position
     * @param {{}} data
     * @memberof Entity
     */
    constructor(id, type, position, data) {
        this._id = id;
        this._type = type;
        this._position = position;
        this._data = data;
        this._visible = true;
        Entity._entities[`${id}_${type}`] = this;
    }
    destroy() {
        this.visible = false;
        delete Entity._entities[`${this.id}_${this.type}`];
    }
    get id() {
        return this._id;
    }
    get type() {
        return this._type;
    }
    get data() {
        return this._data;
    }
    set data(val) {
        this._data = val;
    }
    get visible() {
        return this._visible;
    }
    set visible(val) {
        this._visible = val;
        if(val) this?.show?.();
        else this?.hide?.();
    }
    get pos() {
        return this._position;
    }
    set pos(val) {
        this._position = val;
        this?.positionChanged?.();
    }
}

alt.onServer("entitySync:create", (id, type, pos, data) => {
    alt.log(`[ENTITY] Created entity ${id} (Type ${type})`);
    let entity = Entity.getEntity(id, type);
    if (entity) {
        // Entity already exists in cache, we only need to update the data
        if (data)
            for (let key in data) {
                entity.data[key] = data[key];
            }
        if (entity._position !== pos) entity.pos = pos;
        entity.visible = true;
    } else {
        // Entity doesn't exist in cache, create it
        let typeClass = Entity.getType(type);
        new typeClass(id, type, pos, data);
    }
});

alt.onServer("entitySync:remove", (id, type) => {
    alt.log(`[ENTITY] Removed entity ${id} (Type ${type})`);
    let entity = Entity.getEntity(id, type);
    if (!entity) return;
    entity.visible = false;
});

alt.onServer("entitySync:updatePosition", (id, type, pos) => {
    alt.log(`[ENTITY] Updated entity ${id} (Type ${type}) position`);
    let entity = Entity.getEntity(id, type);
    if (!entity) return;
    entity.pos = pos;
});

alt.onServer("entitySync:updateData", (id, type, data) => {
    alt.log(`[ENTITY] Updated entity ${id} (Type ${type}) data`);
    let entity = Entity.getEntity(id, type);
    if (!entity) return;
    for (let key in data) {
        entity.data[key] = data[key];
    }
});

alt.onServer("entitySync:clearCache", (id, type) => {
    let entity = Entity.getEntity(id, type);
    if (!entity) return;
    entity.destroy();
});

alt.onServer("entitySync:netOwner", (id, type, owner) => {
    alt.log(`[ENTITY] Now entity ${id} (Type ${type}) net owner`);
    let entity = Entity.getEntity(id, type);
    if (!entity) return;
    // TODO: Add net owner features
});
