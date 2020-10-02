const uIsFilled = function (inputData) {
	return typeof inputData === 'string' && inputData.trim() !== '';
};

const uIsDate = function (inputData) {
	return (inputData instanceof Date) && !Number.isNaN(inputData.getTime());
}

const mod = {

	OLSKPactAuthTypeEmail () {
		return 'OLSK_PACT_AUTH_TYPE_EMAIL';
	},

	OLSKPactAuthTypeStorage () {
		return 'OLSK_PACT_AUTH_TYPE_STORAGE';
	},

	OLSKPactAuthTypes () {
		return [
			mod.OLSKPactAuthTypeEmail(),
			mod.OLSKPactAuthTypeStorage(),
		];
	},

	OLSKPactAuthIdentityIsStorageAddress (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return !!inputData.match(/\w+\@\w+\.\w+/);
	},

	OLSKPactAuthModelErrors (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		const outputData = {};
		const _error = function (param1, param2) {
			if (!param2) {
				return;
			}

			outputData[param1] = (outputData[param1] || []).concat(param2);
		};

		if (!mod.OLSKPactAuthTypes().includes(inputData.OLSKPactAuthType)) {
			_error('OLSKPactAuthType', 'OLSKErrorNotAuthType');
		}

		if (!uIsFilled(inputData.OLSKPactAuthIdentity)) {
			_error('OLSKPactAuthIdentity', 'OLSKErrorNotFilled');
		}

		if (!uIsFilled(inputData.OLSKPactAuthProof)) {
			_error('OLSKPactAuthProof', 'OLSKErrorNotFilled');
		}

		if (inputData.OLSKPactAuthType === mod.OLSKPactAuthTypeStorage()) {
			if (!mod.OLSKPactAuthIdentityIsStorageAddress(inputData.OLSKPactAuthIdentity)) {
				_error('OLSKPactAuthIdentity', 'OLSKErrorNotValid');
			}

			const metadata = inputData.OLSKPactAuthMetadata;

			_error('OLSKPactAuthMetadata', (function() {
				if (typeof metadata !== 'object' || metadata === null) {
					return 'OLSKErrorNotObject';
				}

				if (!uIsFilled(metadata.OLSKPactAuthMetadataModuleName)) {
					return 'OLSKErrorNotValid';
				}

				if (!uIsFilled(metadata.OLSKPactAuthMetadataFolderPath)) {
					return 'OLSKErrorNotValid';
				}

				if (!metadata.OLSKPactAuthMetadataFolderPath.slice(0, -1).trim()) {
					return 'OLSKErrorNotValid';
				}

				if (metadata.OLSKPactAuthMetadataFolderPath.slice(-1) !== '/') {
					return 'OLSKErrorNotValid';
				}
			})());
		}

		if (inputData.OLSKPactAuthType === mod.OLSKPactAuthTypeEmail()) {
			if (!outputData.OLSKPactAuthIdentity && !mod.OLSKPactAuthIdentityIsStorageAddress(inputData.OLSKPactAuthIdentity)) {
				_error('OLSKPactAuthIdentity', 'OLSKErrorNotValid');
			}
		}

		return Object.entries(outputData).length ? outputData : null;
	},

	OLSKPactPayProcessorStripe () {
		return 'OLSK_PACT_PAY_PROCESSOR_STRIPE';
	},

	OLSKPactPayProcessorPayPal () {
		return 'OLSK_PACT_PAY_PROCESSOR_PAYPAL';
	},

	OLSKPactPayProcessors () {
		return [
			mod.OLSKPactPayProcessorStripe(),
			mod.OLSKPactPayProcessorPayPal(),
		];
	},

	OLSKPactPayModelErrors (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		const outputData = {};
		const _error = function (param1, param2) {
			if (!param2) {
				return;
			}

			outputData[param1] = (outputData[param1] || []).concat(param2);
		};

		if (!uIsFilled(inputData.OLSKPactPayIdentity)) {
			_error('OLSKPactPayIdentity', 'OLSKErrorNotFilled');
		}

		if (!uIsFilled(inputData.OLSKPactPayTransaction)) {
			_error('OLSKPactPayTransaction', 'OLSKErrorNotFilled');
		}

		if (!mod.OLSKPactPayProcessors().includes(inputData.OLSKPactPayProcessor)) {
			_error('OLSKPactPayProcessor', 'OLSKErrorNotValid');
		}

		return Object.entries(outputData).length ? outputData : null;
	},

	OLSKPactMetadataDecompress (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('RCSErrorInputNotValid');
		}

		const result = {};

		try {
			Object.assign(result, JSON.parse(inputData));
		} catch {
			throw new Error('RCSErrorInputFailedJSONParse');
		}

		return {
			DonateIntentIdentity: result.a,
			DonateIntentConfirmation: result.b,
			DonateIntentProject: result.c,
			DonateIntentVoucher: result.d,
		};
	},

	OLSKPactGrantFrequencyOptionYearly () {
		return 'kOLSKPactGrantFrequencyOptionYearly';
	},

	OLSKPactGrantFrequencyOptionMonthly () {
		return 'kOLSKPactGrantFrequencyOptionMonthly';
	},

	OLSKPactGrantFrequencyOptionOnce () {
		return 'kOLSKPactGrantFrequencyOptionOnce';
	},

	OLSKPactGrantFrequencyOptions () {
		return [
			mod.OLSKPactGrantFrequencyOptionYearly(),
			mod.OLSKPactGrantFrequencyOptionMonthly(),
			mod.OLSKPactGrantFrequencyOptionOnce(),
		];
	},

	OLSKPactGrantModelErrors (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		const outputData = {};
		const _error = function (param1, param2) {
			if (!param2) {
				return;
			}

			outputData[param1] = (outputData[param1] || []).concat(param2);
		};

		if (!Array.isArray(inputData.OLSKPactGrantPublicNumbers)) {
			_error('OLSKPactGrantPublicNumbers', 'OLSKErrorNotArray');
		} else if (!inputData.OLSKPactGrantPublicNumbers.length) {
			_error('OLSKPactGrantPublicNumbers', 'OLSKErrorNotFilled');
		}

		if (!uIsFilled(inputData.OLSKPactGrantIdentity)) {
			_error('OLSKPactGrantIdentity', 'OLSKErrorNotFilled');
		}

		if (!uIsFilled(inputData.OLSKPactGrantProject)) {
			_error('OLSKPactGrantProject', 'OLSKErrorNotFilled');
		}

		if (!uIsDate(inputData.OLSKPactGrantStartDate)) {
			_error('OLSKPactGrantStartDate', 'OLSKErrorNotDate');
		}

		if (!uIsDate(inputData.OLSKPactGrantEndDate)) {
			_error('OLSKPactGrantEndDate', 'OLSKErrorNotDate');
		}

		if (typeof inputData.OLSKPactGrantContribution !== 'number') {
			_error('OLSKPactGrantContribution', 'OLSKErrorNotNumber');
		}

		if (!mod.OLSKPactGrantFrequencyOptions().includes(inputData.OLSKPactGrantFrequencyOption)) {
			_error('OLSKPactGrantFrequencyOption', 'OLSKErrorNotValid');
		}

		if (!mod.OLSKPactPayProcessors().includes(inputData.OLSKPactGrantProcessor)) {
			_error('OLSKPactGrantProcessor', 'OLSKErrorNotValid');
		}

		if (!uIsFilled(inputData.OLSKPactGrantProcessorReference)) {
			_error('OLSKPactGrantProcessorReference', 'OLSKErrorNotFilled');
		}

		if (typeof inputData.OLSKPactGrantActive !== 'boolean') {
			_error('OLSKPactGrantActive', 'OLSKErrorNotBoolean');
		}

		return Object.entries(outputData).length ? outputData : null;
	},

};

Object.assign(exports, mod);
