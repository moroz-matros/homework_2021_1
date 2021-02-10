'use strict';

/**
 * сортируем по каждому свойству из массива свойств в обратном порядке
 * т.е. начиная с меньшего приоритета, передаем ф-цию сравнения в sort()
 */

const sorting = (initial, fields) => {
    try {
        const copy = Object.assign([], initial);
        fields.reverse().forEach(item => {
                copy.sort((prev, next) => {
                    if (prev[item] < next[item]) {
                        return -1;
                    }
                    if (prev[item] > next[item]) {
                        return 1;
                    }
                    return 0;
                })
            }
        )
        return copy;
    } catch (err){
        throw err;
    }
}
