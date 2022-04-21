import { DataAPI_PlainJS } from "./32--DataAPI_PlainJS.js";

export const DataAPI_Template = {
    pizzas: {
        create: pizza => true,
        read:   pizza => ({}),
        delete: pizza => true,
        update: pizza => true,
        readAll:   () => [{}],
    },
    ingredients: {
        create: ingredient => true,
        read:   ingredient => ({}),
        update: ingredient => true,
        delete: ingredient => true,
        readAll:        () => [{}],
    },
}

export const DataMaster =
function DataMasterFactory() {

    this.api = {
     ...DataAPI_Template,
//   ...DataAPI_PlainJS,
     ...DataAPI_PlainJS,
    };

};

export const DM = new DataMaster();
