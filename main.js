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

	OLSKFlexAuthIsFilledString (inputData) {
		return typeof inputData === 'string' && inputData.trim() !== '';
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

		if (!mod.OLSKFlexAuthIsFilledString(inputData.OLSKFlexAuthIdentity)) {
			_error('OLSKFlexAuthIdentity', 'OLSKErrorNotFilled');
		}

		if (!mod.OLSKFlexAuthIsFilledString(inputData.OLSKFlexAuthProof)) {
			_error('OLSKFlexAuthProof', 'OLSKErrorNotFilled');
		}

		if (inputData.OLSKFlexAuthType === mod.OLSKFlexAuthTypeStorage()) {
			const metadata = inputData.OLSKFlexAuthMetadata;

			_error('OLSKFlexAuthMetadata', (function() {
				if (typeof metadata !== 'object' || metadata === null) {
					return 'OLSKErrorNotObject';
				}

				if (!mod.OLSKFlexAuthIsFilledString(metadata.OLSKFlexAuthMetadataModuleName)) {
					return 'OLSKErrorNotValid';
				}

				if (!mod.OLSKFlexAuthIsFilledString(metadata.OLSKFlexAuthMetadataFolderPath)) {
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

		Object.keys(outputData).forEach(function (e) {
			if (!outputData[e]) {
				delete outputData[e];
			}
		});

		return Object.entries(outputData).length ? outputData : null;
	},

};

Object.assign(exports, mod);
