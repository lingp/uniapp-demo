'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const {
		user_id
	} = event
	
	const userinfo = await db.collection('user').doc(user_id).get()
	const article_likes_ids = userinfo.data[0].article_likes_ids
	
	const list = await db.collection('article')
		.aggregate()
		// 追加字段
		.addFields({
			is_like:$.in(['$_id',article_likes_ids])
		})
		.match({
			is_like: true
		})
		.project({
			content: 0
		})
		.end()
	
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
		data: list.data
	}
};
