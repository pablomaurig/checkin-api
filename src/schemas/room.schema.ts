import joi from 'joi';

const id = joi.number();
const floor = joi.number();
const name = joi.string();
const description = joi.string();
const singleBeds = joi.number();
const doubleBeds = joi.number();

export const createRoomSchema = joi.object({
  floor: floor.required(),
  name: name.required(),
  description: description.required(),
  singleBeds: singleBeds.required(),
  doubleBeds: doubleBeds.required(),
});

export const updateRoomSchema = joi.object({
    floor: floor,
    name: name,
    description: description,
    singleBeds: singleBeds,
    doubleBeds: doubleBeds
});

export const deleteRoomSchema = joi.object({
    id: id.required()
})

