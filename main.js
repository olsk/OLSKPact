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

		const errors = {};

		if (!mod.OLSKFlexAuthTypes().includes(inputData.OLSKFlexAuthType)) {
			errors.OLSKFlexAuthType = [
				'OLSKErrorNotAuthType',
			];
		}

		errors.OLSKFlexAuthIdentity = (function() {
			if (typeof inputData.OLSKFlexAuthIdentity !== 'string') {
				return [
					'OLSKErrorNotString',
				];
			}

			if (inputData.OLSKFlexAuthIdentity.trim() === '') {
				return [
					'OLSKErrorNotFilled',
				];
			}
		})();

		errors.OLSKFlexAuthProof = (function() {
			if (typeof inputData.OLSKFlexAuthProof !== 'string') {
				return [
					'OLSKErrorNotString',
				];
			}

			if (inputData.OLSKFlexAuthProof.trim() === '') {
				return [
					'OLSKErrorNotFilled',
				];
			}
		})();

		if (inputData.OLSKFlexAuthType === mod.OLSKFlexAuthTypeStorage()) {
			const metadata = inputData.OLSKFlexAuthMetadata;

			errors.OLSKFlexAuthMetadata = (function() {
				if (typeof metadata !== 'object' || metadata === null) {
					return [
						'OLSKErrorNotObject',
					];
				}

				if (typeof metadata.OLSKFlexAuthMetadataModuleName !== 'string') {
					return [
						'OLSKErrorNotValid',
					];
				}

				if (metadata.OLSKFlexAuthMetadataModuleName.trim() === '') {
					return [
						'OLSKErrorNotValid',
					];
				}

				if (typeof metadata.OLSKFlexAuthMetadataFolderPath !== 'string') {
					return [
						'OLSKErrorNotValid',
					];
				}

				if (!metadata.OLSKFlexAuthMetadataFolderPath.slice(0, -1).trim()) {
					return [
						'OLSKErrorNotValid',
					];
				}

				if (metadata.OLSKFlexAuthMetadataFolderPath.slice(-1) !== '/') {
					return [
						'OLSKErrorNotValid',
					];
				}
			})();
		}

		Object.keys(errors).forEach(function (e) {
			if (!errors[e]) {
				delete errors[e];
			}
		})

		return Object.entries(errors).length ? errors : null;
	},

};

Object.assign(exports, mod);
