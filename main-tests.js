const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

describe('OLSKPactAuthTypeEmail', function test_OLSKPactAuthTypeEmail() {

	it('returns string', function () {
		deepEqual(mod.OLSKPactAuthTypeEmail(), 'OLSK_PACT_AUTH_TYPE_EMAIL');
	});

});

describe('OLSKPactAuthTypeStorage', function test_OLSKPactAuthTypeStorage() {

	it('returns string', function () {
		deepEqual(mod.OLSKPactAuthTypeStorage(), 'OLSK_PACT_AUTH_TYPE_STORAGE');
	});

});

describe('OLSKPactAuthTypes', function test_OLSKPactAuthTypes() {

	it('returns array', function () {
		deepEqual(mod.OLSKPactAuthTypes(), [
			mod.OLSKPactAuthTypeEmail(),
			mod.OLSKPactAuthTypeStorage(),
			]);
	});

});

describe('OLSKPactAuthIdentityIsStorageAddress', function test_OLSKPactAuthIdentityIsStorageAddress() {

	it('throws if not string', function () {
		throws(function () {
			mod.OLSKPactAuthIdentityIsStorageAddress(null)
		}, /OLSKErrorInputNotValid/);
	});

	it('returns false if no @', function() {
		deepEqual(mod.OLSKPactAuthIdentityIsStorageAddress('alfacharlie.delta'), false);
	});

	it('returns false if no .', function() {
		deepEqual(mod.OLSKPactAuthIdentityIsStorageAddress('alfa@charliedelta'), false);
	});

	it('returns false if space', function() {
		deepEqual(mod.OLSKPactAuthIdentityIsStorageAddress('alfa @charlie.delta'), false);
	});

	it('returns true', function() {
		deepEqual(mod.OLSKPactAuthIdentityIsStorageAddress('alfa@charlie.delta'), true);
	});

	it('returns true if subdomain', function() {
		deepEqual(mod.OLSKPactAuthIdentityIsStorageAddress('alfa@charlie.delta.echo'), true);
	});

});

describe('OLSKPactAuthModelErrors', function test_OLSKPactAuthModelErrors() {

	const uItem = function () {
		return Object.assign.apply(null, [{
			OLSKPactAuthType: mod.OLSKPactAuthTypeEmail(),
			OLSKPactAuthIdentity: 'alfa@bravo.charlie',
			OLSKPactAuthProof: 'delta',
		}].concat(Array.from(arguments)));
	};

	it('throws if not object', function() {
		throws(function() {
			mod.OLSKPactAuthModelErrors(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns object if OLSKPactAuthType not valid', function() {
		deepEqual(mod.OLSKPactAuthModelErrors(uItem({
			OLSKPactAuthType: null,
		})), {
			OLSKPactAuthType: [
				'OLSKErrorNotAuthType',
			],
		});
	});

	it('returns object if OLSKPactAuthIdentity not string', function() {
		deepEqual(mod.OLSKPactAuthModelErrors(uItem({
			OLSKPactAuthIdentity: null,
		})), {
			OLSKPactAuthIdentity: [
				'OLSKErrorNotFilled',
			],
		});
	});

	it('returns object if OLSKPactAuthIdentity not filled', function() {
		deepEqual(mod.OLSKPactAuthModelErrors(uItem({
			OLSKPactAuthIdentity: ' ',
		})), {
			OLSKPactAuthIdentity: [
				'OLSKErrorNotFilled',
			],
		});
	});

	it('returns object if OLSKPactAuthProof not string', function() {
		deepEqual(mod.OLSKPactAuthModelErrors(uItem({
			OLSKPactAuthProof: null,
		})), {
			OLSKPactAuthProof: [
				'OLSKErrorNotFilled',
			],
		});
	});

	it('returns object if OLSKPactAuthProof not filled', function() {
		deepEqual(mod.OLSKPactAuthModelErrors(uItem({
			OLSKPactAuthProof: ' ',
		})), {
			OLSKPactAuthProof: [
				'OLSKErrorNotFilled',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mod.OLSKPactAuthModelErrors(uItem()), null);
	});

	context('OLSKPactAuthTypeStorage', function () {

		const uItemStorage = function (inputData) {
			return {
				OLSKPactAuthType: mod.OLSKPactAuthTypeStorage(),
				OLSKPactAuthIdentity: 'alfa@bravo.charlie',
				OLSKPactAuthProof: 'bravo',
				OLSKPactAuthMetadata: Object.assign({
					OLSKPactAuthMetadataModuleName: 'charlie',
					OLSKPactAuthMetadataFolderPath: 'delta/',
				}, inputData),
			};
		};

		it('returns object if OLSKPactAuthIdentity not valid', function() {
			deepEqual(mod.OLSKPactAuthModelErrors(uItem(uItemStorage(), {
				OLSKPactAuthIdentity: 'alfabravo.charlie',
			})), {
				OLSKPactAuthIdentity: [
					'OLSKErrorNotValid',
				],
			});
		});

		it('returns object if OLSKPactAuthMetadata not object', function() {
			deepEqual(mod.OLSKPactAuthModelErrors(uItem(uItemStorage(), {
				OLSKPactAuthMetadata: null,
			})), {
				OLSKPactAuthMetadata: [
					'OLSKErrorNotObject',
				],
			});
		});

		it('returns object if OLSKPactAuthMetadataModuleName not string', function() {
			deepEqual(mod.OLSKPactAuthModelErrors(uItemStorage({
				OLSKPactAuthMetadataModuleName: null,
			})), {
				OLSKPactAuthMetadata: [
					'OLSKErrorNotValid',
				],
			});
		});

		it('returns object if OLSKPactAuthMetadataModuleName not filled', function() {
			deepEqual(mod.OLSKPactAuthModelErrors(uItemStorage({
				OLSKPactAuthMetadataModuleName: ' ',
			})), {
				OLSKPactAuthMetadata: [
					'OLSKErrorNotValid',
				],
			});
		});

		it('returns object if OLSKPactAuthMetadataFolderPath not string', function() {
			deepEqual(mod.OLSKPactAuthModelErrors(uItemStorage({
				OLSKPactAuthMetadataFolderPath: null,
			})), {
				OLSKPactAuthMetadata: [
					'OLSKErrorNotValid',
				],
			});
		});

		it('returns object if OLSKPactAuthMetadataFolderPath not filled', function() {
			deepEqual(mod.OLSKPactAuthModelErrors(uItemStorage({
				OLSKPactAuthMetadataFolderPath: '/',
			})), {
				OLSKPactAuthMetadata: [
					'OLSKErrorNotValid',
				],
			});
		});

		it('returns object if OLSKPactAuthMetadataFolderPath not terminated', function() {
			deepEqual(mod.OLSKPactAuthModelErrors(uItemStorage({
				OLSKPactAuthMetadataFolderPath: 'alfa',
			})), {
				OLSKPactAuthMetadata: [
					'OLSKErrorNotValid',
				],
			});
		});
	
	});

	context('OLSKPactAuthTypeEmail', function () {

		const uItemEmail = function (inputData) {
			return {
				OLSKPactAuthType: mod.OLSKPactAuthTypeEmail(),
				OLSKPactAuthIdentity: 'alfa@bravo.charlie',
				OLSKPactAuthProof: 'bravo',
			};
		};

		it('returns object if OLSKPactAuthIdentity not valid', function() {
			deepEqual(mod.OLSKPactAuthModelErrors(uItem(uItemEmail(), {
				OLSKPactAuthIdentity: 'alfabravo.charlie',
			})), {
				OLSKPactAuthIdentity: [
					'OLSKErrorNotValid',
				],
			});
		});

	});

});

describe('OLSKPactPayProcessorStripe', function test_OLSKPactPayProcessorStripe() {

	it('returns string', function () {
		deepEqual(mod.OLSKPactPayProcessorStripe(), 'OLSK_PACT_PAY_PROCESSOR_STRIPE');
	});

});

describe('OLSKPactPayProcessorPayPal', function test_OLSKPactPayProcessorPayPal() {

	it('returns string', function () {
		deepEqual(mod.OLSKPactPayProcessorPayPal(), 'OLSK_PACT_PAY_PROCESSOR_PAYPAL');
	});

});

describe('OLSKPactPayProcessors', function test_OLSKPactPayProcessors() {

	it('returns array', function () {
		deepEqual(mod.OLSKPactPayProcessors(), [
			mod.OLSKPactPayProcessorStripe(),
			mod.OLSKPactPayProcessorPayPal(),
			]);
	});

});

describe('OLSKPactPayModelErrors', function test_OLSKPactPayModelErrors() {

	const uItem = function (inputData) {
		return Object.assign({
			OLSKPactPayIdentity: 'alfa',
			OLSKPactPayTransaction: 'bravo',
			OLSKPactPayProcessor: mod.OLSKPactPayProcessorStripe(),
		}, ...arguments);
	};

	it('throws if not object', function() {
		throws(function() {
			mod.OLSKPactPayModelErrors(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns object if OLSKPactPayIdentity not string', function() {
		deepEqual(mod.OLSKPactPayModelErrors(uItem({
			OLSKPactPayIdentity: null,
		})), {
			OLSKPactPayIdentity: [
				'OLSKErrorNotFilled',
			],
		});
	});

	it('returns object if OLSKPactPayIdentity not filled', function() {
		deepEqual(mod.OLSKPactPayModelErrors(uItem({
			OLSKPactPayIdentity: ' ',
		})), {
			OLSKPactPayIdentity: [
				'OLSKErrorNotFilled',
			],
		});
	});

	it('returns object if OLSKPactPayTransaction not string', function() {
		deepEqual(mod.OLSKPactPayModelErrors(uItem({
			OLSKPactPayTransaction: null,
		})), {
			OLSKPactPayTransaction: [
				'OLSKErrorNotFilled',
			],
		});
	});

	it('returns object if OLSKPactPayTransaction not filled', function() {
		deepEqual(mod.OLSKPactPayModelErrors(uItem({
			OLSKPactPayTransaction: ' ',
		})), {
			OLSKPactPayTransaction: [
				'OLSKErrorNotFilled',
			],
		});
	});

	it('returns object if OLSKPactPayProcessor not valid', function() {
		deepEqual(mod.OLSKPactPayModelErrors(uItem({
			OLSKPactPayProcessor: null,
		})), {
			OLSKPactPayProcessor: [
				'OLSKErrorNotValid',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mod.OLSKPactPayModelErrors(uItem()), null);
	});

});

describe('OLSKPactMetadataCompress', function test_OLSKPactMetadataCompress() {

	it('throws if not object', function () {
		throws(function () {
			mod.OLSKPactMetadataCompress(null);
		}, /RCSErrorInputNotValid/);
	});

	it('returns string', function () {
		deepEqual(mod.OLSKPactMetadataCompress({}), '{}');
	});

	it('maps OLSKPactIntentIdentity', function () {
		deepEqual(mod.OLSKPactMetadataCompress({
			OLSKPactIntentIdentity: 'alfa',
		}), '{"a":"alfa"}');
	});

	it('maps OLSKPactIntentConfirmation', function () {
		deepEqual(mod.OLSKPactMetadataCompress({
			OLSKPactIntentConfirmation: 'alfa',
		}), '{"b":"alfa"}');
	});

	it('maps OLSKPactIntentProject', function () {
		deepEqual(mod.OLSKPactMetadataCompress({
			OLSKPactIntentProject: 'alfa',
		}), '{"c":"alfa"}');
	});

	it('maps OLSKPactIntentVoucher', function () {
		deepEqual(mod.OLSKPactMetadataCompress({
			OLSKPactIntentVoucher: 'alfa',
		}), '{"d":"alfa"}');
	});

});

describe('OLSKPactMetadataDecompress', function test_OLSKPactMetadataDecompress() {

	it('throws if not string', function () {
		throws(function () {
			mod.OLSKPactMetadataDecompress(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if fails JSON.parse', function () {
		throws(function () {
			mod.OLSKPactMetadataDecompress('alfa');
		}, /OLSKErrorInputFailedJSONParse/);
	});

	it('returns object', function () {
		deepEqual(typeof mod.OLSKPactMetadataDecompress('{}'), 'object');
	});

	it('maps OLSKPactIntentIdentity', function () {
		deepEqual(mod.OLSKPactMetadataDecompress('{"a":"alfa"}').OLSKPactIntentIdentity, 'alfa');
	});

	it('maps OLSKPactIntentConfirmation', function () {
		deepEqual(mod.OLSKPactMetadataDecompress('{"b":"alfa"}').OLSKPactIntentConfirmation, 'alfa');
	});

	it('maps OLSKPactIntentProject', function () {
		deepEqual(mod.OLSKPactMetadataDecompress('{"c":"alfa"}').OLSKPactIntentProject, 'alfa');
	});

	it('maps OLSKPactIntentVoucher', function () {
		deepEqual(mod.OLSKPactMetadataDecompress('{"d":"alfa"}').OLSKPactIntentVoucher, 'alfa');
	});

});

describe('OLSKPactGrantFrequencyOptionYearly', function test_OLSKPactGrantFrequencyOptionYearly() {

	it('returns string', function () {
		deepEqual(mod.OLSKPactGrantFrequencyOptionYearly(), 'kOLSKPactGrantFrequencyOptionYearly');
	});

});

describe('OLSKPactGrantFrequencyOptionMonthly', function test_OLSKPactGrantFrequencyOptionMonthly() {

	it('returns string', function () {
		deepEqual(mod.OLSKPactGrantFrequencyOptionMonthly(), 'kOLSKPactGrantFrequencyOptionMonthly');
	});

});

describe('OLSKPactGrantFrequencyOptionOnce', function test_OLSKPactGrantFrequencyOptionOnce() {

	it('returns string', function () {
		deepEqual(mod.OLSKPactGrantFrequencyOptionOnce(), 'kOLSKPactGrantFrequencyOptionOnce');
	});

});

describe('OLSKPactGrantFrequencyOptions', function test_OLSKPactGrantFrequencyOptions() {

	it('returns array', function () {
		deepEqual(mod.OLSKPactGrantFrequencyOptions(), [
			mod.OLSKPactGrantFrequencyOptionYearly(),
			mod.OLSKPactGrantFrequencyOptionMonthly(),
			mod.OLSKPactGrantFrequencyOptionOnce(),
			]);
	});

});

describe('OLSKPactIntentModelIsValid', function test_OLSKPactIntentModelIsValid() {

	const _OLSKPactIntentModelIsValid = function (inputData) {
		return mod.OLSKPactIntentModelIsValid(Object.assign({
			OLSKPactIntentIdentity: Math.random().toString(),
			OLSKPactIntentAmount: Date.now(),
			OLSKPactIntentFrequency: mod.OLSKPactGrantFrequencyOptions()[Date.now() % 3],
			OLSKPactIntentConfirmation: Math.random().toString(),
			OLSKPactIntentProject: Math.random().toString(),
		}, inputData))
	}

	it('throws if not object', function() {
		throws(function() {
			mod.OLSKPactIntentModelIsValid(null);
		}, /RCSErrorInputNotValid/);
	});
	
	it('returns false if OLSKPactIntentIdentity not string', function() {
		deepEqual(_OLSKPactIntentModelIsValid({
			OLSKPactIntentIdentity: null,
		}), false);
	});
	
	it('returns false if OLSKPactIntentAmount not number', function() {
		deepEqual(_OLSKPactIntentModelIsValid({
			OLSKPactIntentAmount: null,
		}), false);
	});
	
	it('returns false if OLSKPactIntentAmount not integer', function() {
		deepEqual(_OLSKPactIntentModelIsValid({
			OLSKPactIntentAmount: 1.2,
		}), false);
	});
	
	it('returns false if OLSKPactIntentFrequency not valid', function() {
		deepEqual(_OLSKPactIntentModelIsValid({
			OLSKPactIntentFrequency: 'alfa',
		}), false);
	});
	
	it('returns false if OLSKPactIntentConfirmation not string', function() {
		deepEqual(_OLSKPactIntentModelIsValid({
			OLSKPactIntentConfirmation: null,
		}), false);
	});
	
	it('returns false if OLSKPactIntentProject not string', function() {
		deepEqual(_OLSKPactIntentModelIsValid({
			OLSKPactIntentProject: null,
		}), false);
	});
	
	it('returns true', function() {
		deepEqual(_OLSKPactIntentModelIsValid(), true);
	});

});

describe('OLSKPactGrantModelErrors', function test_OLSKPactGrantModelErrors() {

	const uItem = function (inputData = {}) {
		return Object.assign({
			OLSKPactGrantPublicNumbers: ['alfa'],
			OLSKPactGrantIdentity: 'bravo',
			OLSKPactGrantProject: 'charlie',
			OLSKPactGrantStartDate: new Date(),
			OLSKPactGrantEndDate: new Date(),
			OLSKPactGrantContribution: 1,
			OLSKPactGrantFrequencyOption: mod.OLSKPactGrantFrequencyOptionYearly(),
			OLSKPactGrantProcessor: mod.OLSKPactPayProcessorStripe(),
			OLSKPactGrantProcessorReference: 'delta',
			OLSKPactGrantActive: true,
		}, inputData);
	};

	it('throws if not object', function() {
		throws(function() {
			mod.OLSKPactGrantModelErrors(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns object if OLSKPactGrantPublicNumbers not array', function() {
		deepEqual(mod.OLSKPactGrantModelErrors(uItem({
			OLSKPactGrantPublicNumbers: null,
		})), {
			OLSKPactGrantPublicNumbers: [
				'OLSKErrorNotArray',
			],
		});
	});

	it('returns object if OLSKPactGrantPublicNumbers not filled', function() {
		deepEqual(mod.OLSKPactGrantModelErrors(uItem({
			OLSKPactGrantPublicNumbers: [],
		})), {
			OLSKPactGrantPublicNumbers: [
				'OLSKErrorNotFilled',
			],
		});
	});

	it('returns object if OLSKPactGrantIdentity not string', function() {
		deepEqual(mod.OLSKPactGrantModelErrors(uItem({
			OLSKPactGrantIdentity: null,
		})), {
			OLSKPactGrantIdentity: [
				'OLSKErrorNotFilled',
			],
		});
	});

	it('returns object if OLSKPactGrantIdentity not filled', function() {
		deepEqual(mod.OLSKPactGrantModelErrors(uItem({
			OLSKPactGrantIdentity: ' ',
		})), {
			OLSKPactGrantIdentity: [
				'OLSKErrorNotFilled',
			],
		});
	});

	it('returns object if OLSKPactGrantProject not string', function() {
		deepEqual(mod.OLSKPactGrantModelErrors(uItem({
			OLSKPactGrantProject: null,
		})), {
			OLSKPactGrantProject: [
				'OLSKErrorNotFilled',
			],
		});
	});

	it('returns object if OLSKPactGrantProject not filled', function() {
		deepEqual(mod.OLSKPactGrantModelErrors(uItem({
			OLSKPactGrantProject: ' ',
		})), {
			OLSKPactGrantProject: [
				'OLSKErrorNotFilled',
			],
		});
	});

	it('returns object if OLSKPactGrantStartDate not date', function() {
		deepEqual(mod.OLSKPactGrantModelErrors(uItem({
			OLSKPactGrantStartDate: new Date('alfa'),
		})), {
			OLSKPactGrantStartDate: [
				'OLSKErrorNotDate',
			],
		});
	});

	it('returns object if OLSKPactGrantEndDate not date', function() {
		deepEqual(mod.OLSKPactGrantModelErrors(uItem({
			OLSKPactGrantEndDate: new Date('alfa'),
		})), {
			OLSKPactGrantEndDate: [
				'OLSKErrorNotDate',
			],
		});
	});

	it('returns object if OLSKPactGrantContribution not number', function() {
		deepEqual(mod.OLSKPactGrantModelErrors(uItem({
			OLSKPactGrantContribution: '1',
		})), {
			OLSKPactGrantContribution: [
				'OLSKErrorNotNumber',
			],
		});
	});

	it('returns object if OLSKPactGrantFrequencyOption not valid', function() {
		deepEqual(mod.OLSKPactGrantModelErrors(uItem({
			OLSKPactGrantFrequencyOption: null,
		})), {
			OLSKPactGrantFrequencyOption: [
				'OLSKErrorNotValid',
			],
		});
	});

	it('returns object if OLSKPactGrantProcessor not valid', function() {
		deepEqual(mod.OLSKPactGrantModelErrors(uItem({
			OLSKPactGrantProcessor: null,
		})), {
			OLSKPactGrantProcessor: [
				'OLSKErrorNotValid',
			],
		});
	});

	it('returns object if OLSKPactGrantProcessorReference not string', function() {
		deepEqual(mod.OLSKPactGrantModelErrors(uItem({
			OLSKPactGrantProcessorReference: null,
		})), {
			OLSKPactGrantProcessorReference: [
				'OLSKErrorNotFilled',
			],
		});
	});

	it('returns object if OLSKPactGrantProcessorReference not filled', function() {
		deepEqual(mod.OLSKPactGrantModelErrors(uItem({
			OLSKPactGrantProcessorReference: ' ',
		})), {
			OLSKPactGrantProcessorReference: [
				'OLSKErrorNotFilled',
			],
		});
	});

	it('returns object if OLSKPactGrantActive not boolean', function() {
		deepEqual(mod.OLSKPactGrantModelErrors(uItem({
			OLSKPactGrantActive: 'true',
		})), {
			OLSKPactGrantActive: [
				'OLSKErrorNotBoolean',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mod.OLSKPactGrantModelErrors(uItem()), null);
	});

	context('OLSKPactGrantProcessorVoucher', function () {
		
		it('returns object if OLSKPactGrantProcessorVoucher not string', function() {
			deepEqual(mod.OLSKPactGrantModelErrors(uItem({
				OLSKPactGrantProcessorVoucher: 1,
			})), {
				OLSKPactGrantProcessorVoucher: [
					'OLSKErrorNotFilled',
				],
			});
		});

		it('returns object if OLSKPactGrantProcessorVoucher not filled', function() {
			deepEqual(mod.OLSKPactGrantModelErrors(uItem({
				OLSKPactGrantProcessorVoucher: ' ',
			})), {
				OLSKPactGrantProcessorVoucher: [
					'OLSKErrorNotFilled',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mod.OLSKPactGrantModelErrors(uItem({
				OLSKPactGrantProcessorVoucher: 'alfa'
			})), null);
		});
	
	});

});
