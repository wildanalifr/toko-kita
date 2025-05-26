import dayjs from 'dayjs'

export const fDateTime = (date: string) => dayjs(date).format('DD-MM-YYYY')
export const fDateMonth = (date: string) => dayjs(date).format('MMM')
