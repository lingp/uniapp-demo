import $http from '../http.js'

export const update_like = (data) => {
	return $http({
		url: 'update_like',
		data
	})
}

export const update_label = (data) => {
	return $http({
		url: 'update_label',
		data
	})
}