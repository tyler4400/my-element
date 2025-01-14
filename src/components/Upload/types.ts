export interface UploadProps {
	action: string
	multiple?: boolean
	defaultFileList?: UploadFile[];
	// accept?: string //".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
	beforeUpload? : (file: File) => boolean | Promise<File>; // 返回false的时候不上传
	onProgress?: (percentage: number, file: File) => void
	onSuccess?: (data: any, file: File) => void
	onError?: (error: any, file: File) => void
	onChange?: (file: File) => void;
	onRemove?: (file: UploadFile) => void;
	headers?: {[key: string]: any };
	name?: string; // 文件name
	data?: {[key: string]: any }; // 上传信息
	withCredentials?: boolean;
	accept?: string;
	drag?: boolean;
}

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadFile {
	name: string
	size: number
	uid: string
	status: UploadFileStatus
	percent?: number
	raw?: File
	response?: any
	error?: any
}

export interface UploadListProps {
	fileList: UploadFile[];
	onRemove: (_file: UploadFile) => void;
}
