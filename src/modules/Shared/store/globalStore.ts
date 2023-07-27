import { AlertColor, Breakpoint } from '@mui/material'
import { produce } from 'immer'
import { ReactElement } from 'react'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export type GlobalInitialState = {
  height: number | null
}

export type Global = GlobalInitialState & {
  setHeight: (height: number) => void
}

const initialGlobalState: GlobalInitialState = {
  height: null,
}

export const globalStore = create<Global>()(
  devtools(
    (set) => ({
      ...initialGlobalState,
      setHeight: (height) =>
        set(
          produce((draft: Global) => {
            draft.height = height
          }),
          false,
          'setHeight',
        ),
    }),
    { name: 'Global' },
  ),
)
