"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const characteristics_1 = require("./characteristics");
const AdaptiveLighting_1 = require("./AdaptiveLighting");
const util_1 = require("./util");
const scenes_1 = require("./characteristics/scenes");
const WizBulb = {
    is: (device) => ["SHRGB", "SHDW", "SHTW"].some((id) => device.model.includes(id)),
    getName: ({ model }) => {
        if (model.includes("SHRGB")) {
            return "RGB Bulb";
        }
        else if (model.includes("SHDW")) {
            return "Dimmer Bulb";
        }
        else if (model.includes("SHTW")) {
            return "Tunable White Bulb";
        }
        return "Unknown Bulb";
    },
    init: (accessory, device, wiz) => {
        const { Characteristic, Service } = wiz;
        // Setup the lightbulb service
        let service = accessory.getService(Service.Lightbulb);
        if (typeof service === "undefined") {
            service = new Service.Lightbulb(accessory.displayName);
            accessory.addService(service);
        }
        // All bulbs support on/off + dimming
        characteristics_1.initOnOff(accessory, device, wiz);
        characteristics_1.initDimming(accessory, device, wiz);
        // Those with these SHRGB/SHTW have color temp
        if (util_1.isRGB(device) || util_1.isTW(device)) {
            characteristics_1.initTemperature(accessory, device, wiz);
            AdaptiveLighting_1.initAdaptiveLighting(wiz, service, accessory, device);
        }
        else {
            const charcteristic = service.getCharacteristic(Characteristic.ColorTemperature);
            if (typeof charcteristic !== "undefined") {
                service.removeCharacteristic(charcteristic);
            }
        }
        // Those with SHRGB have RGB color!
        if (util_1.isRGB(device)) {
            characteristics_1.initColor(accessory, device, wiz);
        }
        else {
            const hue = service.getCharacteristic(Characteristic.Hue);
            if (typeof hue !== "undefined") {
                service.removeCharacteristic(hue);
            }
            const saturation = service.getCharacteristic(Characteristic.Saturation);
            if (typeof saturation !== "undefined") {
                service.removeCharacteristic(saturation);
            }
        }
        scenes_1.initScenes(wiz, accessory, device);
    },
};
exports.default = WizBulb;
//# sourceMappingURL=index.js.map