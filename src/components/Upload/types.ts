export interface UploadProps {
	action: string
	// accept?: string //".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
	beforeUpload? : (file: File) => boolean | Promise<File>; // 返回false的时候不上传
	onProgress?: (percentage: number, file: File) => void
	onSuccess?: (data: any, file: File) => void
	onError?: (error: any, file: File) => void
}
