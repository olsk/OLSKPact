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

describe('OLSKFlexAuthIdentityIsStorageAddress', function test_OLSKFlexAuthIdentityIsStorageAddress() {

	it('throws if not string', function () {
		throws(function () {
			mod.OLSKFlexAuthIdentityIsStorageAddress(null)
		}, /OLSKErrorInputNotValid/);
	});

	it('returns false if no @', function() {
		deepEqual(mod.OLSKFlexAuthIdentityIsStorageAddress('alfacharlie.delta'), false);
	});

	it('returns false if no .', function() {
		deepEqual(mod.OLSKFlexAuthIdentityIsStorageAddress('alfa@charliedelta'), false);
	});

	it('returns false if space', function() {
		deepEqual(mod.OLSKFlexAuthIdentityIsStorageAddress('alfa @charlie.delta'), false);
	});

	it('returns true', function() {
		deepEqual(mod.OLSKFlexAuthIdentityIsStorageAddress('alfa@charlie.delta'), true);
	});

	it('returns true if subdomain', function() {
		deepEqual(mod.OLSKFlexAuthIdentityIsStorageAddress('alfa@charlie.delta.echo'), true);
	});

});

describe('OLSKFlexAuthModelErrors', function test_OLSKFlexAuthModelErrors() {

	const uItem = function () {
		return Object.assign.apply(null, [{
			OLSKFlexAuthType: mod.OLSKFlexAuthTypeEmail(),
			OLSKFlexAuthIdentity: 'alfa@bravo.charlie',
			OLSKFlexAuthProof: 'delta',
		}].concat(Array.from(arguments)));
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
				'OLSKErrorNotFilled',
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
				'OLSKErrorNotFilled',
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

	context('OLSKFlexAuthTypeStorage', function () {

		const uItemStorage = function (inputData) {
			return {
				OLSKFlexAuthType: mod.OLSKFlexAuthTypeStorage(),
				OLSKFlexAuthIdentity: 'alfa@bravo.charlie',
				OLSKFlexAuthProof: 'bravo',
				OLSKFlexAuthMetadata: Object.assign({
					OLSKFlexAuthMetadataModuleName: 'charlie',
					OLSKFlexAuthMetadataFolderPath: 'delta/',
				}, inputData),
			};
		};

		it('returns object if OLSKFlexAuthIdentity not valid', function() {
			deepEqual(mod.OLSKFlexAuthModelErrors(uItem(uItemStorage(), {
				OLSKFlexAuthIdentity: 'alfabravo.charlie',
			})), {
				OLSKFlexAuthIdentity: [
					'OLSKErrorNotValid',
				],
			});
		});

		it('returns object if OLSKFlexAuthMetadata not object', function() {
			deepEqual(mod.OLSKFlexAuthModelErrors(uItem(uItemStorage(), {
				OLSKFlexAuthMetadata: null,
			})), {
				OLSKFlexAuthMetadata: [
					'OLSKErrorNotObject',
				],
			});
		});

		it('returns object if OLSKFlexAuthMetadataModuleName not string', function() {
			deepEqual(mod.OLSKFlexAuthModelErrors(uItemStorage({
				OLSKFlexAuthMetadataModuleName: null,
			})), {
				OLSKFlexAuthMetadata: [
					'OLSKErrorNotValid',
				],
			});
		});

		it('returns object if OLSKFlexAuthMetadataModuleName not filled', function() {
			deepEqual(mod.OLSKFlexAuthModelErrors(uItemStorage({
				OLSKFlexAuthMetadataModuleName: ' ',
			})), {
				OLSKFlexAuthMetadata: [
					'OLSKErrorNotValid',
				],
			});
		});

		it('returns object if OLSKFlexAuthMetadataFolderPath not string', function() {
			deepEqual(mod.OLSKFlexAuthModelErrors(uItemStorage({
				OLSKFlexAuthMetadataFolderPath: null,
			})), {
				OLSKFlexAuthMetadata: [
					'OLSKErrorNotValid',
				],
			});
		});

		it('returns object if OLSKFlexAuthMetadataFolderPath not filled', function() {
			deepEqual(mod.OLSKFlexAuthModelErrors(uItemStorage({
				OLSKFlexAuthMetadataFolderPath: '/',
			})), {
				OLSKFlexAuthMetadata: [
					'OLSKErrorNotValid',
				],
			});
		});

		it('returns object if OLSKFlexAuthMetadataFolderPath not terminated', function() {
			deepEqual(mod.OLSKFlexAuthModelErrors(uItemStorage({
				OLSKFlexAuthMetadataFolderPath: 'alfa',
			})), {
				OLSKFlexAuthMetadata: [
					'OLSKErrorNotValid',
				],
			});
		});
	
	});

	context('OLSKFlexAuthTypeEmail', function () {

		const uItemEmail = function (inputData) {
			return {
				OLSKFlexAuthType: mod.OLSKFlexAuthTypeEmail(),
				OLSKFlexAuthIdentity: 'alfa@bravo.charlie',
				OLSKFlexAuthProof: 'bravo',
			};
		};

		it('returns object if OLSKFlexAuthIdentity not valid', function() {
			deepEqual(mod.OLSKFlexAuthModelErrors(uItem(uItemEmail(), {
				OLSKFlexAuthIdentity: 'alfabravo.charlie',
			})), {
				OLSKFlexAuthIdentity: [
					'OLSKErrorNotValid',
				],
			});
		});

	});

});
