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

		if (typeof inputData.OLSKFlexAuthIdentity !== 'string') {
			errors.OLSKFlexAuthIdentity = [
				'OLSKErrorNotString',
			];
		} else if (inputData.OLSKFlexAuthIdentity.trim() === '') {
			errors.OLSKFlexAuthIdentity = [
				'OLSKErrorNotFilled',
			];
		}

		if (typeof inputData.OLSKFlexAuthProof !== 'string') {
			errors.OLSKFlexAuthProof = [
				'OLSKErrorNotString',
			];
		} else if (inputData.OLSKFlexAuthProof.trim() === '') {
			errors.OLSKFlexAuthProof = [
				'OLSKErrorNotFilled',
			];
		}

		return Object.entries(errors).length ? errors : null;
	},

};

Object.assign(exports, mod);
