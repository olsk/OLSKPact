const uIsFilled = function (inputData) {
	return typeof inputData === 'string' && inputData.trim() !== '';
};

const mod = {

	OLSKFlexAuthTypeEmail () {
		return 'OLSK_FLEX_AUTH_TYPE_EMAIL';
	},

	OLSKFlexAuthTypeStorage () {
		return 'OLSK_FLEX_AUTH_TYPE_STORAGE';
	},

	OLSKFlexAuthTypes () {
		return [
			mod.OLSKFlexAuthTypeEmail(),
			mod.OLSKFlexAuthTypeStorage(),
		];
	},

	OLSKFlexAuthIdentityIsStorageAddress (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return !!inputData.match(/\w+\@\w+\.\w+/);
	},

	OLSKFlexAuthModelErrors (inputData) {
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

		if (!mod.OLSKFlexAuthTypes().includes(inputData.OLSKFlexAuthType)) {
			_error('OLSKFlexAuthType', 'OLSKErrorNotAuthType');
		}

		if (!uIsFilled(inputData.OLSKFlexAuthIdentity)) {
			_error('OLSKFlexAuthIdentity', 'OLSKErrorNotFilled');
		}

		if (!uIsFilled(inputData.OLSKFlexAuthProof)) {
			_error('OLSKFlexAuthProof', 'OLSKErrorNotFilled');
		}

		if (inputData.OLSKFlexAuthType === mod.OLSKFlexAuthTypeStorage()) {
			if (!mod.OLSKFlexAuthIdentityIsStorageAddress(inputData.OLSKFlexAuthIdentity)) {
				_error('OLSKFlexAuthIdentity', 'OLSKErrorNotValid');
			}

			const metadata = inputData.OLSKFlexAuthMetadata;

			_error('OLSKFlexAuthMetadata', (function() {
				if (typeof metadata !== 'object' || metadata === null) {
					return 'OLSKErrorNotObject';
				}

				if (!uIsFilled(metadata.OLSKFlexAuthMetadataModuleName)) {
					return 'OLSKErrorNotValid';
				}

				if (!uIsFilled(metadata.OLSKFlexAuthMetadataFolderPath)) {
					return 'OLSKErrorNotValid';
				}

				if (!metadata.OLSKFlexAuthMetadataFolderPath.slice(0, -1).trim()) {
					return 'OLSKErrorNotValid';
				}

				if (metadata.OLSKFlexAuthMetadataFolderPath.slice(-1) !== '/') {
					return 'OLSKErrorNotValid';
				}
			})());
		}

		if (inputData.OLSKFlexAuthType === mod.OLSKFlexAuthTypeEmail()) {
			if (!outputData.OLSKFlexAuthIdentity && !mod.OLSKFlexAuthIdentityIsStorageAddress(inputData.OLSKFlexAuthIdentity)) {
				_error('OLSKFlexAuthIdentity', 'OLSKErrorNotValid');
			}
		}

		return Object.entries(outputData).length ? outputData : null;
	},

	OLSKFlexPayProcessorStripe () {
		return 'OLSK_FLEX_PAY_PROCESSOR_STRIPE';
	},

	OLSKFlexPayProcessorPayPal () {
		return 'OLSK_FLEX_PAY_PROCESSOR_PAYPAL';
	},

	OLSKFlexPayProcessors () {
		return [
			mod.OLSKFlexPayProcessorStripe(),
			mod.OLSKFlexPayProcessorPayPal(),
		];
	},

	OLSKFlexPayModelErrors (inputData) {
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

		if (!uIsFilled(inputData.OLSKFlexPayIdentity)) {
			_error('OLSKFlexPayIdentity', 'OLSKErrorNotFilled');
		}

		if (!uIsFilled(inputData.OLSKFlexPayTransaction)) {
			_error('OLSKFlexPayTransaction', 'OLSKErrorNotFilled');
		}

		if (!mod.OLSKFlexPayProcessors().includes(inputData.OLSKFlexPayProcessor)) {
			_error('OLSKFlexPayProcessor', 'OLSKErrorNotAuthType');
		}

		if (inputData.OLSKFlexPayProcessor === mod.OLSKFlexPayProcessorPayPal()) {
			const metadata = inputData.OLSKFlexPayMetadata;

			_error('OLSKFlexPayMetadata', (function() {
				if (typeof metadata !== 'object' || metadata === null) {
					return 'OLSKErrorNotObject';
				}
			})());
		}

		return Object.entries(outputData).length ? outputData : null;
	},

};

Object.assign(exports, mod);
