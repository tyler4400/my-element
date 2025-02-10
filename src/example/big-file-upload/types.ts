export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

// export interface FileContainer {
// 	file?: File | null
// 	hash?: string
// 	worker?: Worker
// }

export interface UploadFile {
	name?: string
	size?: number
	uid?: string
	hash?: string
	status?: UploadFileStatus
	percent?: number
	hashPercent?: number // 计算hash进度
	raw?: File | Blob
	response?: any
	error?: any
	controller?: AbortController
}

export interface VerifyUploadResult {
	shouldUpload: boolean
	uploadedList: string[] // 里面是chunk文件hash
}
