export const UniqueListTemplate = {
    list: [],
    data: () => [],
    push: (item, position) => [],
    move: (item, position) => [],
};

export const UniqueList = function UniqueListFactory() {
    Object.assign(this, UniqueListTemplate);

    this.data = function () { return this.list; }

    this.push = function (item, position) {
        const dublicate = this.list.indexOf(item) > -1;
        if ( !dublicate ) this.list.unshift(item);
        return this.move(item, position);
    };

    this.move = function (item, position = 1) {
        const index = this.list.indexOf(item);
        const exist = index > -1;
        const keep  = exist && position > 0;
        if (exist) this.list.splice(index, 1);
        if (keep)  this.list.splice(--position, 0, item);
        return this.data();
    };

};
