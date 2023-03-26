export const aikidokasCollection = 'aikidokas'

export const levelTypes = [
  { label: '1st Dan', value: '1st' },
  { label: '2nd Dan', value: '2nd' },
  { label: '3rd Dan', value: '3rd' },
  { label: '4th Dan', value: '4th' },
  { label: '5th Dan', value: '5th' },
  { label: '6th Dan', value: '6th' },
  { label: '7th Dan', value: '7th' },
  { label: '8th Dan', value: '8th' },
  { label: '9th Dan', value: '9th' },
  { label: '10th Dan', value: '10th' },
] as const

export type LevelType = (typeof levelTypes)[number]['value']

export const gradeAuthorityTypes = [
  { label: 'Morocco', value: 'Morocco' },
  { label: 'AIKIKAI', value: 'AIKIKAI' },
  { label: 'Other', value: 'Other' },
] as const

// get the values for the type from gradeAuthorityType array values a union type
export type GradeAuthorityType = (typeof gradeAuthorityTypes)[number]['value']

export type GradeType = {
  level: string
  date: string
  type: GradeAuthorityType
}

export type AikidokaType = {
  id: string
  firstName: string
  lastName: string
  avatar: string
  grades: GradeType[]
}

export type AikidokaFormType = Omit<AikidokaType, 'id' | 'avatar'> & {
  avatar: FileList
}
