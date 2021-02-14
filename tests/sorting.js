'use strict';

QUnit.module('Тестируем функцию sorting', function () {
  QUnit.test('sorting не меняет пустой массив', function (assert) {
    const initial = [];
    const actual = sorting(initial, []);

    const expected = [];

    assert.deepEqual(actual, expected);
  });

  QUnit.test('sorting не изменяет массив, если не передано никаких полей для сортировки', function (assert) {
    const initial = [
      {prop1: 1},
      {prop1: 2},
      {prop1: 3},
      {prop1: 4}
    ];
    const actual = sorting(initial, []);

    const expected = [
      {prop1: 1},
      {prop1: 2},
      {prop1: 3},
      {prop1: 4}
    ];

    assert.deepEqual(actual, expected);
  });

  QUnit.test('sorting сортирует массив по численному свойству', function (assert) {
    const initial = [
      {prop1: 30},
      {prop1: 1000},
      {prop1: 4},
      {prop1: 200}
    ];
    const actual = sorting(initial, ['prop1']);

    const expected = [
      {prop1: 4},
      {prop1: 30},
      {prop1: 200},
      {prop1: 1000}
    ];

    assert.deepEqual(actual, expected);
  });

  QUnit.test('sorting сортирует массив по строковому свойству', function (assert) {
    const initial = [
      {prop1: '30'},
      {prop1: '1000'},
      {prop1: '4'},
      {prop1: '200'}
    ];
    const actual = sorting(initial, ['prop1']);

    const expected = [
      {prop1: '1000'},
      {prop1: '200'},
      {prop1: '30'},
      {prop1: '4'}
    ];

    assert.deepEqual(actual, expected);
  });

  QUnit.test('sorting реализует устойчивую сортировку', function (assert) {
    const initial = [
      {prop1: 3, id: 1},
      {prop1: 3, id: 2},
      {prop1: 1, id: 1},
      {prop1: 1, id: 2},
      {prop1: 4, id: 1},
      {prop1: 4, id: 2},
      {prop1: 2, id: 1},
      {prop1: 2, id: 2}
    ];
    const actual = sorting(initial, ['prop1']);

    const expected = [
      {prop1: 1, id: 1},
      {prop1: 1, id: 2},
      {prop1: 2, id: 1},
      {prop1: 2, id: 2},
      {prop1: 3, id: 1},
      {prop1: 3, id: 2},
      {prop1: 4, id: 1},
      {prop1: 4, id: 2}
    ];

    assert.deepEqual(actual, expected);
  });

  QUnit.test('sorting сортирует по нескольким полям', function (assert) {
    const initial = [
      {prop1: 3, id: '1'},
      {prop1: 3, id: '2'},
      {prop1: 1, id: '1'},
      {prop1: 1, id: '2'},
      {prop1: 4, id: '1'},
      {prop1: 4, id: '2'},
      {prop1: 2, id: '1'},
      {prop1: 2, id: '2'}
    ];
    const actual = sorting(initial, ['id', 'prop1']);

    const expected = [
      {prop1: 1, id: '1'},
      {prop1: 2, id: '1'},
      {prop1: 3, id: '1'},
      {prop1: 4, id: '1'},
      {prop1: 1, id: '2'},
      {prop1: 2, id: '2'},
      {prop1: 3, id: '2'},
      {prop1: 4, id: '2'}
    ];

    assert.deepEqual(actual, expected);
  });

  QUnit.test('sorting сортирует массив со значениями как численных, так и ' +
    'строковых типов', function (assert) {
    const initial = [
      {prop1: 30},
      {prop1: '1000'},
      {prop1: 4},
      {prop1: '200'}
    ];
    const actual = sorting(initial, ['prop1']);

    const expected = [
      {prop1: 4},
      {prop1: 30},
      {prop1: '1000'},
      {prop1: '200'}
    ];

    assert.deepEqual(actual, expected);
  });

  QUnit.test('sorting корректно работает с null в свойствах', function (assert) {
    const initial = [
      {prop1: 3, id: 1},
      {prop1: 3, id: 2},
      {prop1: 1, id: 1},
      {prop1: 1, id: 2},
      {prop1: 4, id: 1},
      {prop1: 4, id: 2},
      {prop1: 2, id: 1},
      {prop1: 2, id: 2}
    ];
    const actual = sorting(initial, [null]);

    const expected = [
      {prop1: 3, id: 1},
      {prop1: 3, id: 2},
      {prop1: 1, id: 1},
      {prop1: 1, id: 2},
      {prop1: 4, id: 1},
      {prop1: 4, id: 2},
      {prop1: 2, id: 1},
      {prop1: 2, id: 2}
    ];

    assert.deepEqual(actual, expected);
  });

  QUnit.test('sorting корректно обрабатывает неверные входные данные', function (assert) {
    const initial1 = 'tea';
    const initial2 = [
      {prop1: 3, id: 1},
      {prop1: 3, id: 2}
    ];

    assert.throws(() => sorting(initial1, 'coffee'), TypeError);
    assert.throws(() => sorting(initial2, 'coffee'), TypeError);
    assert.throws(() => sorting(initial1, ['id', 'prop1']), TypeError);
  });

  QUnit.test('sorting корректно сортирует числа в виде строк', function (assert) {
    const initial = [
      {prop1: '12'},
      {prop1: '102'},
      {prop1: '1'},
      {prop1: '13'},
      {prop1: '101'}
    ];
    const actual = sorting(initial, ['prop1']);

    const expected = [
      {prop1: '1'},
      {prop1: '101'},
      {prop1: '102'},
      {prop1: '12'},
      {prop1: '13'}
    ];

    assert.deepEqual(actual, expected);
  });

  QUnit.test('sorting корректно сортирует строки из символов латиницы', function (assert) {
    const initial = [
      {prop1: 'Hello'},
      {prop1: 'How'},
      {prop1: 'are'},
      {prop1: 'You'}
    ];
    const actual = sorting(initial, ['prop1']);

    const expected = [
      {prop1: 'are'},
      {prop1: 'Hello'},
      {prop1: 'How'},
      {prop1: 'You'}
    ];

    assert.deepEqual(actual, expected);
  });

  QUnit.test('sorting корректно сортирует строки из символов кириллицы', function (assert) {
    const initial = [
      {prop1: 'привет'},
      {prop1: 'Как'},
      {prop1: 'дела'},
      {prop1: 'Действуй'}
    ];
    const actual = sorting(initial, ['prop1']);

    const expected = [
      {prop1: 'Действуй'},
      {prop1: 'дела'},
      {prop1: 'Как'},
      {prop1: 'привет'}
    ];

    assert.deepEqual(actual, expected);
  });

  QUnit.test('sorting корректно сортирует строки из символов кириллицы и латиницы', function (assert) {
    const initial = [
      {prop1: 'Stранная'},
      {prop1: 'запись'},
      {prop1: 'neocheнь'},
      {prop1: 'neпонятно'}
    ];
    const actual = sorting(initial, ['prop1']);

    const expected = [
      {prop1: 'neocheнь'},
      {prop1: 'neпонятно'},
      {prop1: 'Stранная'},
      {prop1: 'запись'}
    ];

    assert.deepEqual(actual, expected);
  });

  QUnit.test('sorting корректно сортирует при наличии символов, кодирующихся вне общего правила', function (assert) {
    const initial = [
      {prop1: 'это'},
      {prop1: 'Виновата'},
      {prop1: 'ёлка'},
      {prop1: 'Ёлка'},
      {prop1: 'елка'},
      {prop1: 'дадада'}
    ];
    const actual = sorting(initial, ['prop1']);

    const expected = [
      {prop1: 'Виновата'},
      {prop1: 'дадада'},
      {prop1: 'елка'},
      {prop1: 'Ёлка'},
      {prop1: 'ёлка'},
      {prop1: 'это'}
    ];

    assert.deepEqual(actual, expected);
  });

});
