const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

describe('OLSKPactAuthTypeEmail', function test_OLSKPactAuthTypeEmail() {

	it('returns string', function () {
		deepEqual(mod.OLSKPactAuthTypeEmail(), 'OLSK_PACT_AUTH_TYPE_EMAIL');
	});

});

describe('OLSKPactAuthTypeRemoteStorage', function test_OLSKPactAuthTypeRemoteStorage() {

	it('returns string', function () {
		deepEqual(mod.OLSKPactAuthTypeRemoteStorage(), 'OLSK_PACT_AUTH_TYPE_REMOTE_STORAGE');
	});

});

describe('OLSKPactAuthTypeFission', function test_OLSKPactAuthTypeFission() {

	it('returns string', function () {
		deepEqual(mod.OLSKPactAuthTypeFission(), 'OLSK_PACT_AUTH_TYPE_FISSION');
	});

});

describe('OLSKPactAuthTypes', function test_OLSKPactAuthTypes() {

	it('returns array', function () {
		deepEqual(mod.OLSKPactAuthTypes(), [
			mod.OLSKPactAuthTypeEmail(),
			mod.OLSKPactAuthTypeRemoteStorage(),
			mod.OLSKPactAuthTypeFission(),
			]);
	});

});

describe('OLSKPactAuthIdentityIsCloudAddress', function test_OLSKPactAuthIdentityIsCloudAddress() {

	it('throws if not string', function () {
		throws(function () {
			mod.OLSKPactAuthIdentityIsCloudAddress(null)
		}, /OLSKErrorInputNotValid/);
	});

	it('returns false if no @', function() {
		deepEqual(mod.OLSKPactAuthIdentityIsCloudAddress('alfacharlie.delta'), false);
	});

	it('returns false if no .', function() {
		deepEqual(mod.OLSKPactAuthIdentityIsCloudAddress('alfa@charliedelta'), false);
	});

	it('returns false if space', function() {
		deepEqual(mod.OLSKPactAuthIdentityIsCloudAddress('alfa @charlie.delta'), false);
	});

	it('returns true', function() {
		deepEqual(mod.OLSKPactAuthIdentityIsCloudAddress('alfa@charlie.delta'), true);
	});

	it('returns true if subdomain', function() {
		deepEqual(mod.OLSKPactAuthIdentityIsCloudAddress('alfa@charlie.delta.echo'), true);
	});

});

describe('OLSKPactAuthModelErrors', function test_OLSKPactAuthModelErrors() {

	const uItem = function () {
		return Object.assign.apply(null, [{
			OLSKPactAuthType: mod.OLSKPactAuthTypeEmail(),
			OLSKPactAuthIdentity: 'alfa@bravo.charlie',
			OLSKPactAuthProof: 'delta',
		}].concat(...arguments));
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

	context('OLSKPactAuthTypeRemoteStorage', function () {

		const uItemStorage = function (inputData) {
			return {
				OLSKPactAuthType: mod.OLSKPactAuthTypeRemoteStorage(),
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
			OLSKPactPayClue: 'bravo',
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

	it('returns object if OLSKPactPayClue not string', function() {
		deepEqual(mod.OLSKPactPayModelErrors(uItem({
			OLSKPactPayClue: null,
		})), {
			OLSKPactPayClue: [
				'OLSKErrorNotFilled',
			],
		});
	});

	it('returns object if OLSKPactPayClue not filled', function() {
		deepEqual(mod.OLSKPactPayModelErrors(uItem({
			OLSKPactPayClue: ' ',
		})), {
			OLSKPactPayClue: [
				'OLSKErrorNotFilled',
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

	it('maps OLSKPactIntentClue', function () {
		deepEqual(mod.OLSKPactMetadataCompress({
			OLSKPactIntentClue: 'alfa',
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

	it.skip('throws if fails JSON.parse', function () {
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

	it('maps OLSKPactIntentClue', function () {
		deepEqual(mod.OLSKPactMetadataDecompress('{"b":"alfa"}').OLSKPactIntentClue, 'alfa');
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
		deepEqual(mod.OLSKPactGrantFrequencyOptionYearly(), 'OLSK_PACT_GRANT_FREQUENCY_YEARLY');
	});

});

describe('OLSKPactGrantFrequencyOptionMonthly', function test_OLSKPactGrantFrequencyOptionMonthly() {

	it('returns string', function () {
		deepEqual(mod.OLSKPactGrantFrequencyOptionMonthly(), 'OLSK_PACT_GRANT_FREQUENCY_MONTHLY');
	});

});

describe('OLSKPactGrantFrequencyOptionOnce', function test_OLSKPactGrantFrequencyOptionOnce() {

	it('returns string', function () {
		deepEqual(mod.OLSKPactGrantFrequencyOptionOnce(), 'OLSK_PACT_GRANT_FREQUENCY_ONCE');
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
			OLSKPactIntentFrequency: uRandomElement(mod.OLSKPactGrantFrequencyOptions()),
			OLSKPactIntentClue: Math.random().toString(),
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
	
	it('returns false if OLSKPactIntentClue not string', function() {
		deepEqual(_OLSKPactIntentModelIsValid({
			OLSKPactIntentClue: null,
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

	context('OLSKPactGrantVoucher', function () {
		
		it('returns object if OLSKPactGrantVoucher not string', function() {
			deepEqual(mod.OLSKPactGrantModelErrors(uItem({
				OLSKPactGrantVoucher: 1,
			})), {
				OLSKPactGrantVoucher: [
					'OLSKErrorNotFilled',
				],
			});
		});

		it('returns object if OLSKPactGrantVoucher not filled', function() {
			deepEqual(mod.OLSKPactGrantModelErrors(uItem({
				OLSKPactGrantVoucher: ' ',
			})), {
				OLSKPactGrantVoucher: [
					'OLSKErrorNotFilled',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mod.OLSKPactGrantModelErrors(uItem({
				OLSKPactGrantVoucher: 'alfa'
			})), null);
		});
	
	});

});

describe('OLSKPactPayMatchProcessor', function test_OLSKPactPayMatchProcessor() {

	it('throws if not string', function () {
		throws(function () {
			mod.OLSKPactPayMatchProcessor(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if not valid', function () {
		throws(function () {
			mod.OLSKPactPayMatchProcessor(Math.random().toString());
		}, /OLSKErrorInputNotValid/);
	});

	context('OLSKPactPayMatchProcessorPayPal', function () {

		it('excludes if not upper case', function () {
			throws(function () {
				mod.OLSKPactPayMatchProcessor('i-' + Math.random().toString());
			}, /OLSKErrorInputNotValid/);
		});
		
		it('excludes if no prefix', function () {
			throws(function () {
				mod.OLSKPactPayMatchProcessor('II-' + Math.random().toString());
			}, /OLSKErrorInputNotValid/);
		});
		
		it('returns OLSKPactPayMatchProcessor', function () {
			deepEqual(mod.OLSKPactPayMatchProcessor('I-' + Math.random().toString()), mod.OLSKPactPayProcessorPayPal());
		});
	
	});

	context('OLSKPactPayMatchProcessorStripe', function () {

		it('excludes if not lower case', function () {
			throws(function () {
				mod.OLSKPactPayMatchProcessor('SUB_' + Math.random().toString());
			}, /OLSKErrorInputNotValid/);
		});
		
		it('excludes if no prefix', function () {
			throws(function () {
				mod.OLSKPactPayMatchProcessor('ssub_' + Math.random().toString());
			}, /OLSKErrorInputNotValid/);
		});
		
		it('returns OLSKPactPayMatchProcessor', function () {
			deepEqual(mod.OLSKPactPayMatchProcessor('sub_' + Math.random().toString()), mod.OLSKPactPayProcessorStripe());
		});
	
	});

});
