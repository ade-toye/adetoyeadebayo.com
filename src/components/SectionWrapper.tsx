import type { ReactNode } from 'react'

type SectionWrapperProps = {
  title: string
  children?: ReactNode
}

export default function SectionWrapper({ title, children }: SectionWrapperProps) {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-3d text-2xl md:text-3xl">{title}</h1>
      <div className="mt-6">{children}</div>
    </section>
  )
}
