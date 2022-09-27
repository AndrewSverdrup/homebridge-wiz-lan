"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const characteristics_1 = require("./characteristics");
const WizSocket = {
    is: (device) => ["ESP10_SOCKET_06"].some((id) => device.model.includes(id)),
    getName: (_) => {
        return "Wiz Socket";
    },
    init: (accessory, device, wiz) => {
        const { Service } = wiz;
        // Setup the outlet service
        let service = accessory.getService(Service.Outlet);
        if (typeof service === "undefined") {
            service = new Service.Outlet(accessory.displayName);
            accessory.addService(service);
        }
        // All bulbs support on/off + dimming
        characteristics_1.initOnOff(accessory, device, wiz);
    },
};
exports.default = WizSocket;
//# sourceMappingURL=index.js.map