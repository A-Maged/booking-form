// ACTION CREATORS

export const actionTypes = {
	UPDATE_DESTINATION: 'UPDATE_DESTINATION',
	UPDATE_CHECK_IN_OUT: 'UPDATE_CHECK_IN_OUT',
	UPDATE_OCCUPANCY: 'UPDATE_OCCUPANCY'
};

export const updateDestination = value => {
	return {
		type: actionTypes.UPDATE_DESTINATION,
		value
	};
};

export const updateCheckInOut = value => {
	return {
		type: actionTypes.UPDATE_CHECK_IN_OUT,
		value
	};
};

export const updateOccopancy = value => {
	return {
		type: actionTypes.UPDATE_OCCUPANCY,
		value
	};
};
