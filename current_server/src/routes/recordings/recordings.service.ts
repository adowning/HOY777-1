import fs from 'fs/promises'
import path from 'path'

const recordingsDir = path.resolve(process.cwd(), 'recordings')

export const recordingsService = {
  async saveRecording(file: File, sessionId: string) {
    try {
      await fs.mkdir(recordingsDir, { recursive: true })

      const fileName = `session-${sessionId}-${Date.now()}.webm`
      const filePath = path.join(recordingsDir, fileName)
      
      const buffer = await file.arrayBuffer()
      await fs.writeFile(filePath, Buffer.from(buffer))

      return {
        success: true,
        message: 'Recording saved successfully.',
        filePath,
      }
    } catch (error) {
      console.error('Failed to save recording:', error)
      throw new Error('Could not save the recording.')
    }
  },
}
