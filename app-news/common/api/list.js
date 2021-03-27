import $http from '../http.js'

export const get_label = (data) => {
	return $http({
		url: 'get_label',
		data
	})
}

export const get_list = (data) => {
	return $http({
		url: 'get_list',
		data
	})
}

export const get_search = (data) => {
	return $http({
		url: 'get_search',
		data
	})
}

export const get_comments = (data) => {
	return $http({
		url: 'get_comments',
		data
	})
}

export const get_detail = (data) => {
	return $http({
		url: "get_detail",
		data
	})
}
