'use client'

import cx from 'classnames'
import { FirebaseApp } from 'firebase/app'
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  forwardRef,
} from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

import clientApp from 'src/firebase/client-app'
import {
  AikidokaFormType,
  aikidokasCollection,
  gradeAuthorityTypes,
  levelTypes,
} from './aikidoka-type'

async function addAikidoka(aikidoka: AikidokaFormType) {
  const { avatar, ...rest } = aikidoka

  const db = getFirestore(clientApp as FirebaseApp)
  const addedDocSnapshot = await addDoc(
    collection(db, aikidokasCollection),
    rest,
  )

  const addedDocId = addedDocSnapshot.id

  let avatarUrl = ''
  if (avatar instanceof FileList) {
    avatarUrl = await uploadAvatar(avatar[0], addedDocId)
  }

  await setDoc(
    doc(db, aikidokasCollection, addedDocId),
    { avatar: avatarUrl },
    { merge: true },
  )
}

async function uploadAvatar(avatar: File, avatarName: string) {
  const storage = getStorage(clientApp as FirebaseApp)
  const storageRef = ref(storage, `${aikidokasCollection}/${avatarName}`)

  await uploadBytes(storageRef, avatar)

  return await getDownloadURL(storageRef)
}

export default function AddAikidokaScreen() {
  const router = useRouter()

  const { control, register, handleSubmit } = useForm<AikidokaFormType>({
    defaultValues: {
      grades: [
        {
          level: levelTypes[0].value,
          date: new Date().toISOString().split('T')[0],
          type: gradeAuthorityTypes[0].value,
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'grades' })

  async function onSubmit(data: AikidokaFormType) {
    await addAikidoka(data)

    router.push('/admin/aikidokas')
  }

  return (
    <div>
      <div className='mb-3 flex items-center gap-x-4'>
        <Link href='/admin/aikidokas' className='text-xl'>
          ⬅️
        </Link>
        <h3 className='text-xl font-thin'>Add an AIKIDOKA</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className='flex max-w-2xl flex-col gap-y-4'>
          <Field id='firstName' label='First Name' {...register('firstName')} />
          <Field id='lastName' label='Last Name' {...register('lastName')} />
          <Field
            type='file'
            id='avatar'
            label='Avatar'
            {...register('avatar')}
          />

          <div className='flex flex-col rounded border-2 border-slate-700 bg-slate-800 p-3'>
            <div
              className={cx('flex justify-between', {
                'mb-2.5': fields?.length > 0,
              })}
            >
              <label htmlFor='grades'>
                Grades{fields?.length <= 0 ? '' : ` (${fields?.length})`}
              </label>

              <button
                type='button'
                className='rounded border-2 border-blue-600 px-2 text-sm'
                onClick={() => append({ level: '', date: '', type: 'Other' })}
              >
                + Add Grade
              </button>
            </div>

            <div className='flex flex-col gap-y-3'>
              {fields?.length <= 0 ? null : (
                <section className='grid grid-cols-[1fr_1fr_1fr_70px] items-center gap-x-2'>
                  <div>Level</div>
                  <div>Authority</div>
                  <div>Date</div>
                  <div></div>
                </section>
              )}

              {fields.map((field, index) => {
                return (
                  <section
                    key={field.id}
                    className='grid grid-cols-[1fr_1fr_1fr_70px] items-center gap-x-2'
                  >
                    <Field
                      containerClassName='flex-grow'
                      type='select'
                      {...register(`grades.${index}.level`)}
                    >
                      {levelTypes.map((level) => {
                        return (
                          <option value={level.value} key={level.value}>
                            {level.label}
                          </option>
                        )
                      })}
                    </Field>

                    <Field
                      containerClassName='flex-grow'
                      type='select'
                      {...register(`grades.${index}.type`)}
                    >
                      {gradeAuthorityTypes.map((grade) => {
                        return (
                          <option value={grade.value} key={grade.value}>
                            {grade.label}
                          </option>
                        )
                      })}
                    </Field>

                    <Field
                      containerClassName='flex-grow'
                      type='date'
                      max={new Date().toISOString().split('T')[0]}
                      {...register(`grades.${index}.date`)}
                    />

                    <button
                      type='button'
                      className='rounded border px-2 text-sm'
                      onClick={() => remove(index)}
                    >
                      Remove
                    </button>
                  </section>
                )
              })}
            </div>
          </div>

          <button className='self-start rounded-md border-2 border-blue-600 px-3 py-2 transition-colors duration-75 hover:bg-slate-800'>
            Add AIKIDOKA
          </button>
        </fieldset>
      </form>
    </div>
  )
}

type FieldType = {
  id?: string
  name: string
  label?: string
  feedback?: string
  type?: string
  containerClassName?: string
  labelClassName?: string
  inputClassName?: string
  feedbackClassName?: string
  colorScheme?: 'light' | 'dark'
  children?: React.ReactNode
}

const Field = forwardRef(function Field(
  {
    id,
    label,
    feedback,
    type = 'text',
    containerClassName,
    labelClassName,
    inputClassName,
    feedbackClassName,
    colorScheme = 'dark',
    children,
    ...rest
  }: FieldType,
  ref:
    | DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >['ref']
    | DetailedHTMLProps<
        SelectHTMLAttributes<HTMLSelectElement>,
        HTMLSelectElement
      >['ref'],
) {
  return (
    <div className={cx('flex flex-col', containerClassName)}>
      {!label ? null : (
        <label
          htmlFor={id}
          className={cx(
            'mb-1 self-start',
            { 'cursor-pointer': !!id },
            labelClassName,
          )}
        >
          {label}
        </label>
      )}

      {type === 'select' ? (
        <select
          id={id}
          className={cx('rounded border-gray-700 bg-black', inputClassName)}
          ref={
            ref as DetailedHTMLProps<
              SelectHTMLAttributes<HTMLSelectElement>,
              HTMLSelectElement
            >['ref']
          }
          style={{ colorScheme }}
          {...rest}
        >
          {children}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          className={cx('rounded border-gray-700 bg-black', inputClassName)}
          ref={
            ref as DetailedHTMLProps<
              InputHTMLAttributes<HTMLInputElement>,
              HTMLInputElement
            >['ref']
          }
          style={{ colorScheme }}
          {...rest}
        />
      )}

      {!feedback ? null : <span className={feedbackClassName}>{feedback}</span>}
    </div>
  )
})
