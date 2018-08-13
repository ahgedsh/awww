import Vue from "vue";
import api from '../lib/api';

export const hub = {
  cart: {},
};

export function all() {
  return hub;
};
export function read() {
  api('cart/read', { key_by: 'id', with: 'has_one:pet', limit: 50 })
    .then(r => {
      console.log(r.data);
      Vue.set(hub, 'cart', r.data);//等于hub.cart=r.data;

    })

};

export function each(fn) {
  for (let id in hub.cart) {
    let it = hub.cart[id];
    fn(it, id);
  }

}
export function add(pet_id, count) {
  api('cart/create', { pet_id, count })
    .then(r => read());

};

export function remove(id) {
  api('cart/delete', { id })
    .then(r => read());
};

export function update(id, row) {
  row.id = id;
  api('cart/update', row)
    .then(r => read());

};

// export function count() {
//   return Object.keys(hub.cars).length;
//   console.log(Object.keys(hub.cars).length)
// };

export function count () {
  if (!hub.cart)
    return 0;

  return Object.keys(hub.cart).length;
}

export function find_by_pet_id(pet_id) {
  for (let id in hub.cart) {
    let it = hub.cart[id];
    if (it.pet_id == pet_id)
    return it;
  }
};
export function pet_exist(pet_id) {
  return !!find_by_pet_id(pet_id);

};
export function init() {
  read();

};

init();





