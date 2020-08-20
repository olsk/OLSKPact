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

		_error('OLSKFlexAuthIdentity', (function() {
			if (typeof inputData.OLSKFlexAuthIdentity !== 'string') {
				return 'OLSKErrorNotString';
			}

			if (inputData.OLSKFlexAuthIdentity.trim() === '') {
				return 'OLSKErrorNotFilled';
			}
		})());

		_error('OLSKFlexAuthProof', (function() {
			if (typeof inputData.OLSKFlexAuthProof !== 'string') {
				return 'OLSKErrorNotString';
			}

			if (inputData.OLSKFlexAuthProof.trim() === '') {
				return 'OLSKErrorNotFilled';
			}
		})());

		if (inputData.OLSKFlexAuthType === mod.OLSKFlexAuthTypeStorage()) {
			const metadata = inputData.OLSKFlexAuthMetadata;

			_error('OLSKFlexAuthMetadata', (function() {
				if (typeof metadata !== 'object' || metadata === null) {
					return 'OLSKErrorNotObject';
				}

				if (typeof metadata.OLSKFlexAuthMetadataModuleName !== 'string') {
					return 'OLSKErrorNotValid';
				}

				if (metadata.OLSKFlexAuthMetadataModuleName.trim() === '') {
					return 'OLSKErrorNotValid';
				}

				if (typeof metadata.OLSKFlexAuthMetadataFolderPath !== 'string') {
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
