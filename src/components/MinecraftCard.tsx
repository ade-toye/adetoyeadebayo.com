import type { ReactNode } from 'react'

type MinecraftCardProps = {
  title?: string
  children: ReactNode
}

/** Inventory-slot style card: sunken bevel, like a slot in the player inventory. */
export default function MinecraftCard({ title, children }: MinecraftCardProps) {
  return (
    <div className="mc-slot p-4">
      {title && <h3 className="text-base">{title}</h3>}
      <div className={title ? 'mt-2' : undefined}>{children}</div>
    </div>
  )
}
