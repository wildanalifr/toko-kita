type Props = {
  isLoading: boolean
  text: string
}

export default function ButtonSubmit({ isLoading, text }: Props) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`w-full py-3 hover:cursor-pointer rounded-lg font-semibold text-white transition-colors
        ${
          isLoading
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }
      `}
    >
      {isLoading ? 'Loading...' : text}
    </button>
  )
}
