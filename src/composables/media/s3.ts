import { useEnv } from '@/composables/useEnv'

const env = useEnv()

// This is a devolepment function for environment without S3 service.
export const getS3MediumLink = (s3FileName: string | null): string => {
  // 1. 防呆：如果沒有傳入檔名，回傳 null
  if (!s3FileName) return '@/assets/demo_media.jpg'

  try {
    // 2. 依然先清理斜線，避免組合出不合法的雙斜線
    const safeBaseUrl = env.S3_BASE_URL.replace(/\/+$/, '')
    const safeFileName = s3FileName.replace(/^\/+/, '')

    // 3. 組合完畢後，丟給 URL 建構子產生 URL 物件
    const fullUrlString = `${safeBaseUrl}/${safeFileName}`
    return fullUrlString
  } catch (error) {
    // 如果 env.S3_BASE_URL 不是合法的網址格式 (例如忘記加 https://)
    // new URL() 會報錯，這裡攔截並給予提示
    console.error(`❌ 無法產生有效的 S3 網址:`, error)
    return '@/assets/demo_media.jpg'
  }
}

// return new URL('@/assets/demo_media.jpg', import.meta.url).href

// export const convertIDToS3Link = (id: string, isImage: boolean): string => {
//   if (isImage) {
//     return `${env}${id}.jpg`
//   } else {
//     return `${env}${id}.mp4`
//   }
// }
