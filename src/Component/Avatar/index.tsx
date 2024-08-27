import React, { Fragment, memo, useState } from 'react'
import { StorageImage } from '@aws-amplify/ui-react-storage';
const Avatar = memo(() => {
    const [update, set_update] = useState(false)
    return <Fragment>
        <button className='d-none trigger-avatar' onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            set_update(bol => !bol)
        }} />
        <StorageImage
            alt="avatar"
            path={({ identityId }) => {
                return `profile-pictures/${identityId}/avatar-user`
            }}
            style={{
                borderRadius: '50%',
                width: 40,
                height: 40,
            }}
            fallbackSrc={process.env.NODE_ENV == "development"
                ? `${window.location.origin}/public/default-avatar.jpg`
                : `${window.location.origin}/default-avatar.jpg`}
        />
    </Fragment>
})

export default Avatar