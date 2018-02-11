const {OVERVIEW_TRANSFORMS} = require('../content_scripts/better');
let assert = require('assert');
describe('Validate RegExp for link matching', () => {
    it('RegExp for link matching is defined', () => {
        assert.ok(OVERVIEW_TRANSFORMS[0]['from']);
    });

    describe('Validate RegExp matches different correct variants', () => {

        let data = [
            {
                input: 'https://gridrouter.d3 wwww',
                expected: 'https://gridrouter.d3'
            },
            {
                input: 'http://gridrouter.d3/wd wwww',
                expected: 'http://gridrouter.d3/wd'
            },
            {
                input: ' http://https://gridrouter.d3/wd ',
                expected: 'https://gridrouter.d3/wd'
            },
            {
                input: 'https://web@www.gridrouter.d3/wd ',
                expected: 'https://web@www.gridrouter.d3/wd'
            },
            {
                input: 'zz https://mr.smith@www.gridrouter.d3/wd ',
                expected: 'https://mr.smith@www.gridrouter.d3/wd'
            },
            {
                input: 'http://web:web@gridrouter.d3#wd ',
                expected: 'http://web:web@gridrouter.d3#wd'
            },
            {
                input: 'https://web:web@gridrouter.d3:44441//hub ',
                expected: 'https://web:web@gridrouter.d3:44441//hub'
            },
            {
                input: 'https://web:web@gridrouter.d3:44441/_hub ',
                expected: 'https://web:web@gridrouter.d3:44441/_hub'
            },
            {
                input: 'https://web:web@gridrouter.d3:44441/?hub&pub ',
                expected: 'https://web:web@gridrouter.d3:44441/?hub&pub'
            },
            {
                input: "wwww https://web:web@gridrouter.d3:44441/?wdsession/b0721b4#1341\
 zzz ",
                expected: 'https://web:web@gridrouter.d3:44441/?wdsession/b0721b4#1341'
            },
            {
                input: ' https://web:web@gridrouter.d3:44441/?wds=(session)&wds2=(session2)#1341 ',
                expected: 'https://web:web@gridrouter.d3:44441/?wds=(session)&wds2=(session2)#1341'
            },
            {
                input: ' https://web:web@gridrouter.d3:44441/?wds#1341_(session) ',
                expected: 'https://web:web@gridrouter.d3:44441/?wds#1341_(session)'
            },
            {
                input: ' https://web:web@gridrouter.d3:44441/?z[wds]=b0721b4#1341 ',
                expected: 'https://web:web@gridrouter.d3:44441/?z[wds]=b0721b4#1341'
            },
            {
                input: ' https://web:web@gridrouter.d3 :44441/?z[wds]=b0721b4#1341 ',
                expected: 'https://web:web@gridrouter.d3'
            },
            {
                input: ' https://web:web@gridrouter.d3:44441/?z[wds]!b0721b4#1341 ',
                expected: 'https://web:web@gridrouter.d3:44441/?z[wds]!b0721b4#1341'
            }
        ];
        let testDataMatch = function (dataItem) {
            return function () {
                const regExp = new RegExp(OVERVIEW_TRANSFORMS[0]['from']);
                const match = dataItem.input.match(regExp);
                assert.ok(match);
                assert.equal(match[1], dataItem.expected);
            };
        };

        data.forEach(function (dataItem) {
            it(`${dataItem.input} matches the regexp`, testDataMatch(dataItem));
        });
    });

    describe('Validate RegExp DOES NOT match these variants', () => {
        let data = [
            {
                input: ' https://-.d3 www '
            },
            {
                input: ' htt p://gridrouter.d3/wd '
            },
            {
                input: '  http://:32323//gridrouter.d3/wd '
            }
        ];
        let testDataMatch = function (dataItem) {
            return function () {
                const regExp = new RegExp(OVERVIEW_TRANSFORMS[0]['from']);
                const match = dataItem.input.match(regExp);
                assert.ok(!match);
            };
        };

        data.forEach(function (dataItem) {
            it(`${dataItem.input} does not match the regexp`, testDataMatch(dataItem));
        });
    });
});
