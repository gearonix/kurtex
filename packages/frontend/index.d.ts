declare module '*.svg' {
  const content: any
  export const ReactComponent: any
  export default content
}

declare module '*.gql' {
  const content: any
  export default content
}

interface Window {
  ENV: Record<keyof any, unknown>
}

declare module 'freeice'
