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

		return Object.entries(outputData).length ? outputData : null;
	},

	OLSKPactMetadataCompress (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('RCSErrorInputNotValid');
		}

		const result = {};

		if (inputData.OLSKPactIntentIdentity) {
			result.a = inputData.OLSKPactIntentIdentity;
		}

		if (inputData.OLSKPactIntentConfirmation) {
			result.b = inputData.OLSKPactIntentConfirmation;
		}

		if (inputData.OLSKPactIntentProject) {
			result.c = inputData.OLSKPactIntentProject;
		}

		if (inputData.OLSKPactIntentVoucher) {
			result.d = inputData.OLSKPactIntentVoucher;
		}

		return JSON.stringify(result);
	},

	OLSKPactMetadataDecompress (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		const result = {};

		try {
			Object.assign(result, JSON.parse(inputData));
		} catch {
			throw new Error('OLSKErrorInputFailedJSONParse');
		}

		return {
			OLSKPactIntentIdentity: result.a,
			OLSKPactIntentConfirmation: result.b,
			OLSKPactIntentProject: result.c,
			OLSKPactIntentVoucher: result.d,
		};
	},

	OLSKPactGrantFrequencyOptionYearly () {
		return 'OLSK_PACT_GRANT_FREQUENCY_YEARLY';
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

	OLSKPactIntentModelIsValid (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('RCSErrorInputNotValid');
		}


		if (typeof inputData.OLSKPactIntentIdentity !== 'string') {
			return false;
		}

		if (parseInt(inputData.OLSKPactIntentAmount) !== inputData.OLSKPactIntentAmount) {
			return false;
		}

		if (!mod.OLSKPactGrantFrequencyOptions().includes(inputData.OLSKPactIntentFrequency)) {
			return false;
		}

		if (typeof inputData.OLSKPactIntentConfirmation !== 'string') {
			return false;
		}

		if (typeof inputData.OLSKPactIntentProject !== 'string') {
			return false;
		}

		return true;
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
		
		if (inputData.OLSKPactGrantProcessorVoucher) {
			if (!uIsFilled(inputData.OLSKPactGrantProcessorVoucher)) {
				_error('OLSKPactGrantProcessorVoucher', 'OLSKErrorNotFilled');
			}
		}

		return Object.entries(outputData).length ? outputData : null;
	},

};

Object.assign(exports, mod);
