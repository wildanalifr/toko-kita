import { z } from 'zod'

export const itemSchema = z.object({
  name: z.string().min(1, 'Nama wajib diisi'),
})

export type ItemSchema = z.infer<typeof itemSchema>
