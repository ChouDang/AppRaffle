import { useState } from 'react'
const useModalHook = (set_rowEditing = (row) => { }) => {
    const [open, set_open] = useState(false)
    return {
        open,
        set_open: (row) => {
            set_rowEditing(row || null)
            set_open(true)
        },
        set_close: () => {
            set_open(false)
            setTimeout(() => set_rowEditing(null), 200)
        }
    }
}
export default useModalHook