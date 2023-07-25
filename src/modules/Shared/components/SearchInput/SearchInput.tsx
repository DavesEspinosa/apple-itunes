import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment, TextField } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'

import { useDebounce } from '@modules/Shared/hooks/useDebounce'
import { useIsMounted } from '@modules/Shared/hooks/useIsMounted'

type SearchInputProps<T> = {
  delay?: number
  placeHolder: string
  setDebounceValue: (value: T) => void
}

export const SearchInput = <T,>({ placeHolder, setDebounceValue, delay = 500 }: SearchInputProps<T>) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const debouncedValue = useDebounce<string>(searchQuery, delay)
  const isMounted = useIsMounted()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  useEffect(() => {
    if (!isMounted) {
      setDebounceValue(debouncedValue as T)
    }
  }, [debouncedValue])

  return (
    <TextField
      sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
      role="searchbox"
      value={searchQuery}
      onChange={handleChange}
      variant="outlined"
      placeholder={placeHolder}
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  )
}
