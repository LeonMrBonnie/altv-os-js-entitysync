# Open Source - Entity Sync for JS

Created by LeonMrBonnie

⭐ This repository if you found it useful!

---

# Description

This repository provides an alt:V resource to work with the C# Entity Sync in JS.

It provides an easy base class for entities that you can expand for you own entities.

This resource handles the showing/removing of entities for you, you only need to create you own entity types.

## Installing Dependencies / Installation

**I cannot stress this enough. Ensure you have NodeJS 13+ or you will have problems.**

-   [NodeJS 13+](https://nodejs.org/en/download/current/)
-   An Existing or New Gamemode
-   General Scripting Knowledge

First download the JS wrapper for the C# entity sync from [GitHub](https://github.com/Kudze/altv-csharp-entity-sync-to-js-wrapper).<br>
Then you need to build it using `dotnet publish -c Release` and create a new resource with the type `csharp`.<br>
You should name this resource `entitysync-wrapper`. Then add it to your `server.cfg` as a resource.

After that simply add the name of this resource to your `server.cfg` resource section.

`altv-os-js-entitysync`

And also add the name of this resource to the `deps` array of your `resource.cfg` from your main gamemode.

Then simply clone this repository into your main server resources folder.

```
cd resources
git clone https://github.com/LeonMrBonnie/altv-os-js-entitysync
```

Ensure your `package.json` includes this property:

```json
"type": "module"
```

# Adding new Entity types

For every new entity type (textlabel, object, ped etc.) you need to create a new Class that extends the base Entity class.<br>
To do that you need to import this resource and extend from the `Entity` class. Then you can use the entity data etc.<br>
Make sure that every new Entity class has its own unique `type` id. Else it will cause conflicts. For more info take a look at the [Entity Sync Documentation](https://fabianterhorst.github.io/coreclr-module/articles/entity-sync.html)

You can find an example in `server/textlabel-example.js` and `client/textlabel-example.js`

! IMPORTANT !<br>
The imports in the examples are relative imports, in your own files you have to use this syntax to import the resource directly.
```js
import * as EntitySync from "altv-os-js-entitysync";
```
If this doesn't work make sure that the resource is listed in the `deps` of your resource.

# Credits

-   [Stuyk](https://github.com/Stuyk) - For the drawtext3d function used in the example and this readme layout, as well as his other contributions to the alt:V community
-   [Fabian Terhorst aka. Heron](https://github.com/fabianterhorst) - For creating the C# module as well as creating the C# Entity Sync
-   [Kudze](https://github.com/Kudze) - For creating the JS wrapper for the C# Entity Sync

# Other alt:V Open Source Resources

-   [Authentication by Stuyk](https://github.com/Stuyk/altv-os-auth)
-   [Discord Authentication by Stuyk](https://github.com/Stuyk/altv-discord-auth)
-   [Global Blip Manager by Dzeknjak](https://github.com/jovanivanovic/altv-os-global-blip-manager)
-   [Global Marker Manager by Dzeknjak](https://github.com/jovanivanovic/altv-os-global-marker-manager)
-   [Chat by Dzeknjak](https://github.com/jovanivanovic/altv-os-chat)
-   [Nametags by Stuyk](https://github.com/Stuyk/altv-os-nametags)