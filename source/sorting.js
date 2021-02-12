'use strict';

/**
 * Функция принимает на вход массив plain-объектов и массив имён свойств,
 * по которым необходимо отсортировать массив объектов,
 * и реализует устойчивую сортировку этого массива в порядке возрастания
 * (строки сортируются лексикографически, числа — в порядке возрастания).
 *
 * @param {Array} initial - исходный массив, который сортируется
 * @param {Array} fields - массив имен свойств, по которым проводится сортировка
 *
 * @returns {Array} copy - возвращает отсортированный массив
 *
 * @throws {TypeError} - выбрасывает ошибку, если на вход приходят не массивы
 */

const sorting = (initial, fields) => {
  if (!Array.isArray(initial) || !Array.isArray(fields)){
    throw new TypeError('Неверные входные данные');
  }

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
}
