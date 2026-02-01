const calculator = require('../app/calculator');
const assert = require('assert');

describe('Calculator Tests', function() {

    describe('add()', function() {
        it('return 7 when add(5, 2)', function() {
            assert.equal(calculator.add(5, 2), 7);
        });
        
        it('return 8 when add(5, 2) - FAIL', function() {
            assert.equal(calculator.add(5, 2), 8);
        });
    });

    describe('sub()', function() {
        it('return 3 when sub(5, 2)', function() {
            assert.equal(calculator.sub(5, 2), 3);
        });
        
        it('return 5 when sub(5, 2) - FAIL', function() {
            assert.equal(calculator.sub(5, 2), 5);
        });
    });
    
    describe('mul()', function() {
        it('return 10 when mul(5, 2)', function() {
            assert.equal(calculator.mul(5, 2), 10);
        });
        
        it('return 12 when mul(5, 2) - FAIL', function() {
            assert.equal(calculator.mul(5, 2), 12);
        });
    });

    describe('div()', function() {
        it('return 5 when div(10, 2)', function() {
            assert.equal(calculator.div(10, 2), 5);
        });
        
        it('return 2 when div(10, 2) - FAIL', function() {
            assert.equal(calculator.div(10, 2), 2);
        });
    });
    
});
