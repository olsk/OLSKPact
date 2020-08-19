const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

describe('OLSKFlexAuthTypeEmail', function test_OLSKFlexAuthTypeEmail() {

	it('returns string', function () {
		deepEqual(mod.OLSKFlexAuthTypeEmail(), 'OLSK_FLEX_AUTH_TYPE_EMAIL');
	});

});

describe('OLSKFlexAuthTypeStorage', function test_OLSKFlexAuthTypeStorage() {

	it('returns string', function () {
		deepEqual(mod.OLSKFlexAuthTypeStorage(), 'OLSK_FLEX_AUTH_TYPE_STORAGE');
	});

});

describe('OLSKFlexAuthTypes', function test_OLSKFlexAuthTypes() {

	it('returns array', function () {
		deepEqual(mod.OLSKFlexAuthTypes(), [
			mod.OLSKFlexAuthTypeEmail(),
			mod.OLSKFlexAuthTypeStorage(),
			]);
	});

});

describe('OLSKFlexAuthModelErrors', function test_OLSKFlexAuthModelErrors() {

	const uItem = function (inputData) {
		return Object.assign({
			OLSKFlexAuthType: mod.OLSKFlexAuthTypeEmail(),
			OLSKFlexAuthIdentity: 'alfa',
			OLSKFlexAuthProof: 'bravo',
		}, inputData);
	};

	it('throws if not object', function() {
		throws(function() {
			mod.OLSKFlexAuthModelErrors(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns object if OLSKFlexAuthType not valid', function() {
		deepEqual(mod.OLSKFlexAuthModelErrors(uItem({
			OLSKFlexAuthType: null,
		})), {
			OLSKFlexAuthType: [
				'OLSKErrorNotAuthType',
			],
		});
	});

	it('returns object if OLSKFlexAuthIdentity not string', function() {
		deepEqual(mod.OLSKFlexAuthModelErrors(uItem({
			OLSKFlexAuthIdentity: null,
		})), {
			OLSKFlexAuthIdentity: [
				'OLSKErrorNotString',
			],
		});
	});

	it('returns object if OLSKFlexAuthIdentity not filled', function() {
		deepEqual(mod.OLSKFlexAuthModelErrors(uItem({
			OLSKFlexAuthIdentity: ' ',
		})), {
			OLSKFlexAuthIdentity: [
				'OLSKErrorNotFilled',
			],
		});
	});

	it('returns object if OLSKFlexAuthProof not string', function() {
		deepEqual(mod.OLSKFlexAuthModelErrors(uItem({
			OLSKFlexAuthProof: null,
		})), {
			OLSKFlexAuthProof: [
				'OLSKErrorNotString',
			],
		});
	});

	it('returns object if OLSKFlexAuthProof not filled', function() {
		deepEqual(mod.OLSKFlexAuthModelErrors(uItem({
			OLSKFlexAuthProof: ' ',
		})), {
			OLSKFlexAuthProof: [
				'OLSKErrorNotFilled',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mod.OLSKFlexAuthModelErrors(uItem()), null);
	});

});
