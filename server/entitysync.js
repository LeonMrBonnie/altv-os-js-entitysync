import * as alt from "alt-server";
import * as Entities from "entitysync-wrapper";

export class Entity {
    /**
     * Creates an instance of Entity
     * @author LeonMrBonnie
     * @param {Number} type Entity type
     * @param {alt.Vector3} pos
     * @param {Number} dimension
     * @param {{}} data An object containing the entity data
     * @param {Number} range Entity stream range
     * @memberof Entity
     */
    constructor(type, pos, dimension, data, range) {
        this._type = type;
        this._entity = EntitySync.createEntity(
            type,
            pos,
            dimension,
            data,
            range
        );
        alt.log(`Created entity ${this._entity} with type ${type}`);
    }
    /**
     * Completely removes the entity
     *
     * @author LeonMrBonnie
     * @memberof Entity
     */
    destroy() {
        EntitySync.removeEntity(this._entity, this._type);
        alt.log(`Removed entity ${this._entity} with type ${this._type}`);
    }
    /**
     * Gets entity data by key
     *
     * @author LeonMrBonnie
     * @param {String} key
     * @returns {*}
     * @memberof Entity
     */
    getData(key) {
        return EntitySync.getEntityData(this._entity, this._type, key);
    }
    /**
     * Sets entity data by key
     *
     * @author LeonMrBonnie
     * @param {String} key
     * @param {*} value
     * @memberof Entity
     */
    setData(key, value) {
        EntitySync.setEntityData(this._entity, this._type, key, value);
    }
    get pos() {
        return EntitySync.getEntityPosition(this._entity, this._type);
    }
    set pos(val) {
        EntitySync.setEntityPosition(this._entity, this._type, val);
    }
    get dimension() {
        return EntitySync.getEntityDimension(this._entity, this._type);
    }
    set dimension(val) {
        EntitySync.setEntityDimension(this._entity, this._type, val);
    }
}

export class EntitySync {
    /**
     * Creates a new entity
     *
     * @author LeonMrBonnie
     * @static
     * @param {Number} type
     * @param {alt.Vector3} pos
     * @param {Number} dimension
     * @param {{}} data
     * @param {Number} range
     * @returns {Number} Entity id
     * @memberof EntitySync
     */
    static createEntity(type, pos, dimension, data, range) {
        let entity = Entities.createGameEntity(type, pos, dimension, range);
        for (let key in data)
            Entities.setGameEntityData(entity, type, key, data[key]);
        return entity;
    }

    /**
     * Removes the specified entity
     *
     * @author LeonMrBonnie
     * @static
     * @param {Number} id
     * @param {Number} type
     * @memberof EntitySync
     */
    static removeEntity(id, type) {
        Entities.removeGameEntity(id, type);
    }

    /**
     * Sets entity data by key
     *
     * @author LeonMrBonnie
     * @static
     * @param {Number} id
     * @param {Number} type
     * @param {String} key
     * @param {*} value
     * @memberof EntitySync
     */
    static setEntityData(id, type, key, value) {
        Entities.setGameEntityData(id, type, key, value);
    }

    /**
     * Gets entity data by key
     *
     * @author LeonMrBonnie
     * @static
     * @param {Number} id
     * @param {Number} type
     * @param {String} key
     * @returns {*}
     * @memberof EntitySync
     */
    static getEntityData(id, type, key) {
        return Entities.getGameEntityData(id, type, key);
    }

    /**
     * Sets the entity position
     *
     * @author LeonMrBonnie
     * @static
     * @param {Number} id
     * @param {Number} type
     * @param {alt.Vector3} pos
     * @memberof EntitySync
     */
    static setEntityPosition(id, type, pos) {
        Entities.setGameEntityPosition(id, type, pos);
    }

    /**
     * Gets the entity position
     *
     * @author LeonMrBonnie
     * @static
     * @param {Number} id
     * @param {Number} type
     * @returns {alt.Vector3}
     * @memberof EntitySync
     */
    static getEntityPosition(id, type) {
        return Entities.getGameEntityPosition(id, type);
    }

    /**
     * Gets the entity stream range
     *
     * @author LeonMrBonnie
     * @static
     * @param {Number} id
     * @param {Number} type
     * @returns {Number}
     * @memberof EntitySync
     */
    static getEntityRange(id, type) {
        return Entities.getGameEntityRange(id, type);
    }

    /**
     * Sets the entity dimension
     *
     * @author LeonMrBonnie
     * @static
     * @param {Number} id
     * @param {Number} type
     * @param {Number} dimension
     * @memberof EntitySync
     */
    static setEntityDimension(id, type, dimension) {
        Entities.setGameEntityDimension(id, type, dimension);
    }

    /**
     * Gets the entity dimension
     *
     * @author LeonMrBonnie
     * @static
     * @param {Number} id
     * @param {Number} type
     * @returns
     * @memberof EntitySync
     */
    static getEntityDimension(id, type) {
        return Entities.getGameEntityDimension(id, type);
    }
}
