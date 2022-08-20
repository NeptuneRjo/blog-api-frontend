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

export interface UserInt {
	email: string
	username: string
	password: string
	_v: number
	_id: string
	role: string
}

export interface CleanUserInt {
	email: string
	username: string
	_id: string
	role: string
}

export interface ErrorInt {
	email: string
	password: string
	username: string
	other: string
}
