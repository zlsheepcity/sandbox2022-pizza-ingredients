module.exports = {

    // Update array with an item with required position
    // top position is 1
    // to delete an item set position=0

    updateList: (list, item, position = 1) => {
        const index = list.indexOf(item);
        const exist = index > -1;
        const keep  = position > 0;
        if (exist) list.splice(index, 1);
        if (keep)  list.splice(--position, 0, item);
        return list;
    }

};