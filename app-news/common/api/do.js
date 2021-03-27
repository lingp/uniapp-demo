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

export const update_comment = (data) => {
	return $http({
		url: "update_comment",
		data
	})
}

export const update_thumbsup =  (data) =>{
	return $http({
		url: 'update_thumbsup',
		data
	}) 
}

export const update_author = (data) =>{
	return $http({
		url: 'update_author',
		data
	})
}