export interface CommentInt {
	body: string
	username: string
}

export interface BlogInt {
	_v: number
	_id: string
	author: string
	body: string
	comments: []
	date: string
	title: string
}
