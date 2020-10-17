import React from 'react'
import PhotoGet from './Api.js/endpoints/PhotoGet'
import PhotoPost from './Api.js/endpoints/PhotoPost'
import UserPost from './Api.js/endpoints/UserPost'
import UserToken from './Api.js/endpoints/UserToken'

const api = () => {
  return (
    <div>
      <h2>User Post</h2>
      <UserPost />
      <h2>User Token</h2>
      <UserToken />
      <h2>Photo Post</h2>
      <PhotoPost />
      <h2>Photo Get</h2>
      <PhotoGet />
    </div>
  )
}

export default api
